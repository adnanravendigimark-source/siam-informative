import { sql } from "./db";
import { hashPassword, verifyPassword } from "./passwords";

// Kept in its own table (not alongside public site_content) so a security
// credential never ends up in the same row/blob as editable page copy.
export async function getAdminPasswordHash(): Promise<string | null> {
  try {
    const rows = await sql`SELECT password_hash FROM admin_account WHERE id = 1 LIMIT 1`;
    return (rows[0]?.password_hash as string | null | undefined) || null;
  } catch {
    return null;
  }
}

export async function setAdminPasswordHash(plainPassword: string): Promise<void> {
  const hash = hashPassword(plainPassword);
  await sql`
    INSERT INTO admin_account (id, password_hash) VALUES (1, ${hash})
    ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash
  `;
}

// The .env ADMIN_PASSWORD is a break-glass credential the owner can always
// reset from their hosting provider's env vars — it must keep working even
// after a DB hash has been set via /admin/account, so both are checked
// rather than the DB hash short-circuiting and permanently shadowing it.
export async function verifyOwnerPassword(candidate: string): Promise<boolean> {
  const dbHash = await getAdminPasswordHash();
  const envPw = process.env.ADMIN_PASSWORD;

  if (dbHash && verifyPassword(candidate, dbHash)) return true;
  if (envPw && candidate === envPw) return true;

  return false;
}
