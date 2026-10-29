import { cache } from "react";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.warn(
    "[db] DATABASE_URL is not set — every page falls back to its built-in default content, and every admin save will fail until it's configured."
  );
}

// Fallback to a syntactically valid postgresql connection URI so neon() constructor
// does not crash during import/build when DATABASE_URL is not defined in the environment.
const connectionUrl =
  process.env.DATABASE_URL?.trim() ||
  "postgresql://postgres:postgres@localhost:5432/postgres";

const neonClient = neon(connectionUrl);

export const sql = ((strings: any, ...values: any[]) => {
  if (!process.env.DATABASE_URL) {
    return Promise.resolve([]);
  }
  return neonClient(strings, ...values);
}) as unknown as typeof neonClient;

export const DB_ERROR_MESSAGE =
  "Couldn't save — the database couldn't be reached. Check that DATABASE_URL is set correctly (and that your Neon project is active), then try again.";

export function dbErrorMessage(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  if (/column .* does not exist|relation .* does not exist/i.test(message)) {
    return "Couldn't save — the database is missing a column or table this feature needs. Run `node scripts/setup-db.mjs` against this database (see README), then try again.";
  }
  return DB_ERROR_MESSAGE;
}

// The entire site's editable content lives in one singleton row
// (site_content, id=1) — one JSONB column per content domain. Every
// lib/*.ts getter reads its own column out of this same row rather than
// running its own SELECT, so a single page render costs one query no
// matter how many content domains it needs. Cached per request.
export const getSiteContentRow = cache(async (): Promise<Record<string, any> | null> => {
  try {
    const rows = await sql`SELECT * FROM site_content WHERE id = 1 LIMIT 1`;
    return rows.length ? (rows[0] as Record<string, any>) : null;
  } catch (err) {
    console.error("[db] Failed to load site_content row — falling back to built-in defaults:", err);
    return null;
  }
});
