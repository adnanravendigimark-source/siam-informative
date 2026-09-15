import { sql, getSiteContentRow, dbErrorMessage } from "./db";

// Central site settings. Admin-editable at /admin/settings. Falls back to
// these defaults if the database is unreachable or the row hasn't been
// seeded yet (see scripts/setup-db.mjs), so the site never breaks.
export interface SiteSettings {
  siteName: string;
  siteUrl: string;
  siteTagline: string;
  siteDescription: string;
  contactEmail: string;
  officialTicketsUrl: string;
  officialHoursUrl: string;
  officialDirectionsUrl: string;
  officialSiteUrl: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Siam Park Visitor Guide",
  siteUrl: "https://www.siam-informative.com",
  siteTagline: "Tickets, Prices & Visitor Guide",
  siteDescription:
    "An independent, unofficial visitor's guide to Siam Park in Costa Adeje, Tenerife — ticket prices, opening hours, what's inside the park, getting there, and everything else you need to plan your visit.",
  contactEmail: "jrandrewclark@gmaill.com",
  officialTicketsUrl: "https://siampark.net/en/tickets-and-prices",
  officialHoursUrl: "https://siampark.net/plan-your-visit/opening-hours/",
  officialDirectionsUrl: "https://siampark.net/plan-your-visit/directions/",
  officialSiteUrl: "https://siampark.net/en",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const row = await getSiteContentRow();
  const data = row?.settings_json;
  if (!data || typeof data !== "object") return DEFAULT_SETTINGS;
  return { ...DEFAULT_SETTINGS, ...data };
}

export async function saveSiteSettings(data: SiteSettings): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, settings_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET settings_json = EXCLUDED.settings_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

// Back-compat plain constants for any code that still imports these
// directly instead of calling getSiteSettings(). Prefer the async getter
// in new code — these reflect the built-in defaults only, not admin edits.
export const SITE_NAME = DEFAULT_SETTINGS.siteName;
export const SITE_URL = DEFAULT_SETTINGS.siteUrl;
export const SITE_TAGLINE = DEFAULT_SETTINGS.siteTagline;
export const SITE_DESCRIPTION = DEFAULT_SETTINGS.siteDescription;
export const CONTACT_EMAIL = DEFAULT_SETTINGS.contactEmail;
export const OFFICIAL_TICKETS_URL = DEFAULT_SETTINGS.officialTicketsUrl;
export const OFFICIAL_HOURS_URL = DEFAULT_SETTINGS.officialHoursUrl;
export const OFFICIAL_DIRECTIONS_URL = DEFAULT_SETTINGS.officialDirectionsUrl;
export const OFFICIAL_SITE_URL = DEFAULT_SETTINGS.officialSiteUrl;
