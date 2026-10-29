import { withSiteRevalidate } from "@/lib/revalidateSite";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { verifyOwnerPassword, setAdminPasswordHash } from "@/lib/adminPassword";
import { DB_ERROR_MESSAGE } from "@/lib/db";

export const dynamic = "force-dynamic";

// PUT /api/admin/profile — the single admin changes their own password.
// Requires the current password for verification. Works whether the
// currently-valid password came from ADMIN_PASSWORD (env) or a previously
// saved DB hash.
async function PUTHandler(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const currentPassword: string = body?.currentPassword || "";
  const newPassword: string = body?.newPassword || "";
  const confirmPassword: string = body?.confirmPassword || "";

  if (!currentPassword) {
    return NextResponse.json({ error: "Current password is required." }, { status: 400 });
  }
  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
  }
  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
  }

  const verified = await verifyOwnerPassword(currentPassword);
  if (!verified) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
  }

  try {
    await setAdminPasswordHash(newPassword);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const isDbError = typeof err === "object" && err !== null && "code" in err;
    const message = isDbError ? DB_ERROR_MESSAGE : (err as Error).message || "Could not update password.";
    return NextResponse.json({ error: message }, { status: isDbError ? 500 : 400 });
  }
}

export const PUT = withSiteRevalidate(PUTHandler);
