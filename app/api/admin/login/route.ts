import { NextResponse } from "next/server";
import { createSessionToken, ADMIN_COOKIE_NAME, type Session } from "@/lib/auth";
import { verifyOwnerPassword } from "@/lib/adminPassword";

export const dynamic = "force-dynamic";

// Best-effort per-IP login rate limiting. In-memory, so it only protects a
// single warm serverless instance (resets on cold start), but it's free and
// still meaningfully slows down a scripted credential-stuffing attempt.
const LOGIN_WINDOW_MS = 5 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 10;
const loginAttempts = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now - entry.windowStart > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > LOGIN_MAX_ATTEMPTS;
}

export async function POST(req: Request) {
  let email = "";
  let password = "";
  try {
    const body = await req.json();
    email = (body.email || "").trim();
    password = body.password || "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : null;
  if (ip && isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  const rootEmail = process.env.ADMIN_EMAIL;
  if (!rootEmail) {
    return NextResponse.json({ error: "Admin email is not configured on the server (.env)." }, { status: 500 });
  }

  let session: Session | null = null;
  if (email.toLowerCase() === rootEmail.toLowerCase()) {
    const ok = await verifyOwnerPassword(password);
    if (ok) session = { email: rootEmail };
  }

  if (!session) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createSessionToken(session);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
