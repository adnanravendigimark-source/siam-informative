// Single-admin auth: this site has one product (Siam Park) and one editor
// account, not a multi-user/multi-page-permission system like the
// multi-entity sites in this portfolio — so there's no roles/PageKey
// concept here, just "is this a valid, unexpired session for the one
// admin account or not".

// SECURITY: there is no hardcoded fallback secret. If ADMIN_SESSION_SECRET
// isn't set, every session check fails closed (see requireSecretConfigured
// below) rather than silently signing/verifying tokens with a guessable
// value baked into the source — that would be a full auth bypass.
const SECRET = process.env.ADMIN_SESSION_SECRET || "";
export const ADMIN_COOKIE_NAME = "siam_admin_session";

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours, matches the login cookie's maxAge

export interface Session {
  email: string;
}

interface SignedPayload extends Session {
  iat: number;
}

async function getKey() {
  const enc = new TextEncoder();
  return crypto.subtle.importKey("raw", enc.encode(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}

function requireSecretConfigured() {
  if (!SECRET) {
    console.error(
      "[auth] ADMIN_SESSION_SECRET is not set — refusing to create or verify admin sessions. Set a long random value for ADMIN_SESSION_SECRET in your environment."
    );
    return false;
  }
  return true;
}

function toBase64Url(input: string | ArrayBuffer) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string) {
  const bin = atob(input.replace(/-/g, "+").replace(/_/g, "/"));
  return bin;
}

async function sign(payload: string) {
  const key = await getKey();
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(sigBuf);
}

export async function createSessionToken(session: Session): Promise<string> {
  if (!requireSecretConfigured()) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  const withIat: SignedPayload = { ...session, iat: Date.now() };
  const payload = toBase64Url(JSON.stringify(withIat));
  const sig = await sign(payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<Session | null> {
  if (!token) return null;
  if (!requireSecretConfigured()) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = await sign(payload);
  if (expected !== sig) return null;
  try {
    const parsed = JSON.parse(fromBase64Url(payload)) as Partial<SignedPayload>;
    if (!parsed?.email) return null;
    if (typeof parsed.iat !== "number" || Date.now() - parsed.iat > SESSION_TTL_MS) return null;
    return { email: parsed.email };
  } catch {
    return null;
  }
}
