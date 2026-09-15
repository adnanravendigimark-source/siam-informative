import { sql, getSiteContentRow, dbErrorMessage } from "./db";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavContent {
  navLinks: NavLink[];
  footerLinks: NavLink[];
}

export const DEFAULT_NAV: NavContent = {
  navLinks: [
    { label: "Overview", href: "/" },
    { label: "Rides & Attractions", href: "/inside-siam-park/" },
    { label: "Tickets & Prices", href: "/#tickets" },
    { label: "Traveler Guide", href: "/traveler-information/" },
    { label: "Getting There & Shuttles", href: "/how-to-reach-siam-park/" },
    { label: "About & History", href: "/about-siam-park/" },
  ],
  footerLinks: [
    { label: "Home Guide", href: "/" },
    { label: "Rides & Attractions", href: "/inside-siam-park/" },
    { label: "Tickets & Admission Prices", href: "/#tickets" },
    { label: "Traveler Practicalities & Tips", href: "/traveler-information/" },
    { label: "Getting There & Free Shuttles", href: "/how-to-reach-siam-park/" },
    { label: "About Siam Park & Design", href: "/about-siam-park/" },
    { label: "Interesting Facts & Records", href: "/interesting-facts-about-siam-park/" },
    { label: "Things to Do & Hotels Nearby", href: "/things-to-do-near-siam-park/" },
    { label: "Contact & Inquiries", href: "/contact/" },
    { label: "Privacy Policy", href: "/privacy-policy/" },
  ],
};

export async function getNav(): Promise<NavContent> {
  const row = await getSiteContentRow();
  const data = row?.nav_json;
  if (!data || typeof data !== "object") return DEFAULT_NAV;
  return {
    navLinks: Array.isArray(data.navLinks) && data.navLinks.length ? data.navLinks : DEFAULT_NAV.navLinks,
    footerLinks: Array.isArray(data.footerLinks) && data.footerLinks.length ? data.footerLinks : DEFAULT_NAV.footerLinks,
  };
}

export async function saveNav(data: NavContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, nav_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET nav_json = EXCLUDED.nav_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

// Back-compat plain constants (built-in defaults only, not admin edits).
export const NAV_LINKS = DEFAULT_NAV.navLinks;
export const FOOTER_LINKS = DEFAULT_NAV.footerLinks;
