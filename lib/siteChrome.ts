import { sql, getSiteContentRow, dbErrorMessage } from "./db";

// Site-wide "chrome" copy — text that appears on every (or nearly every)
// page via the Header, Footer, and the Internal Link Grid ("Explore More
// of This Guide") — but doesn't belong in Site Settings (identity/contact)
// or Navigation (link labels/hrefs only). Kept as its own content domain
// so it gets its own admin editor rather than overloading either of those.

export interface QuickJumpLink {
  emoji: string;
  label: string;
  href: string;
}

export interface GuideLinkCard {
  href: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
}

export interface SiteChromeContent {
  header: {
    tagline: string; // small line under the site name, e.g. "Visitor & Travel Guide"
    ticketsCtaLabel: string; // shared by the desktop pill button + mobile drawer button
    ticketsCtaUrl: string;
    mobileQuickJumpHeading: string;
    mobileQuickJumpLinks: QuickJumpLink[];
    mobileGuideHeading: string; // heading above the nav-links list in the mobile drawer
    mobileBookCtaLabel: string; // mobile drawer's big CTA button (usually mirrors ticketsCtaLabel)
  };
  footer: {
    smallTagline: string; // e.g. "Unofficial Tenerife Guide"
    aboutBlurbSuffix: string; // sentence appended after siteTagline in the brand column
    badgeText: string; // e.g. "Independent Traveler Reference · 2026"
    navColumnHeading: string;
    resourcesColumnHeading: string;
    officialPortalLabel: string;
    copyrightSuffix: string; // e.g. "Unofficial visitor resource." (after "© {year} {siteName}.")
    disclaimer: string;
  };
  guideLinks: {
    heading: string; // default heading; individual pages may override
    subheading: string;
    ctaLabel: string; // "Read Chapter Guide" button text on every card
    links: GuideLinkCard[];
  };
}

export const DEFAULT_SITE_CHROME: SiteChromeContent = {
  header: {
    tagline: "Visitor & Travel Guide",
    ticketsCtaLabel: "Official Tickets",
    ticketsCtaUrl: "https://tickets.siampark.net/",
    mobileQuickJumpHeading: "Quick Jump Sections",
    mobileQuickJumpLinks: [
      { emoji: "⏰", label: "Hours & Seasons", href: "/#hours" },
      { emoji: "🎟️", label: "Tickets & Prices", href: "/#tickets" },
      { emoji: "🎢", label: "Rides & Slides", href: "/#rides-overview" },
      { emoji: "🚌", label: "Free Shuttles", href: "/#shuttles" },
    ],
    mobileGuideHeading: "Guide Chapters",
    mobileBookCtaLabel: "Book Official Park Tickets",
  },
  footer: {
    smallTagline: "Unofficial Tenerife Guide",
    aboutBlurbSuffix: "An independent, non-commercial travel resource designed to help visitors explore Siam Park in Costa Adeje, Tenerife.",
    badgeText: "Independent Traveler Reference · 2026",
    navColumnHeading: "Guide Navigation",
    resourcesColumnHeading: "Help & Resources",
    officialPortalLabel: "Official Park Portal (siampark.net)",
    copyrightSuffix: "Unofficial visitor resource.",
    disclaimer:
      "Not affiliated with, endorsed by, or operated by Siam Park or Loro Parque S.A. All tickets and bookings must be completed on official channels.",
  },
  guideLinks: {
    heading: "Explore More of This Guide",
    subheading: "Comprehensive information chapters to help plan your perfect day.",
    ctaLabel: "Read Chapter Guide",
    links: [
      {
        href: "/inside-siam-park/",
        title: "Inside the Park",
        description: "Rides catalogue, Tower of Power, Mai Thai lazy river, Wave Palace, and cabanas.",
        icon: "🌊",
        tag: "Attractions",
      },
      {
        href: "/how-to-reach-siam-park/",
        title: "Getting There & Shuttles",
        description: "Free double-decker shuttle stops, TITSA public buses, driving routes, and parking.",
        icon: "🧭",
        tag: "Transport",
      },
      {
        href: "/traveler-information/",
        title: "Traveler Practicalities",
        description: "Operating hours, ticket categories, locker/towel rentals, and packing essentials.",
        icon: "🎒",
        tag: "Planning",
      },
      {
        href: "/about-siam-park/",
        title: "About Park & Thai Heritage",
        description: "Architectural history, authentic Thai royal design, and engineering hillside story.",
        icon: "🏛️",
        tag: "History",
      },
      {
        href: "/interesting-facts-about-siam-park/",
        title: "World Records & Facts",
        description: "3.3m artificial waves, desalination plants, green energy, and verified trivia.",
        icon: "📌",
        tag: "Records",
      },
      {
        href: "/things-to-do-near-siam-park/",
        title: "Things to Do Nearby",
        description: "Costa Adeje beaches, Siam Mall shopping, Aqualand, and Loro Parque twin trip.",
        icon: "🗺️",
        tag: "Explore",
      },
    ],
  },
};

export async function getSiteChrome(): Promise<SiteChromeContent> {
  const row = await getSiteContentRow();
  const data = row?.site_chrome_json;
  if (!data || typeof data !== "object") return DEFAULT_SITE_CHROME;
  return {
    header: { ...DEFAULT_SITE_CHROME.header, ...(data.header || {}) },
    footer: { ...DEFAULT_SITE_CHROME.footer, ...(data.footer || {}) },
    guideLinks: {
      ...DEFAULT_SITE_CHROME.guideLinks,
      ...(data.guideLinks || {}),
      links:
        Array.isArray(data.guideLinks?.links) && data.guideLinks.links.length
          ? data.guideLinks.links
          : DEFAULT_SITE_CHROME.guideLinks.links,
    },
  };
}

export async function saveSiteChrome(data: SiteChromeContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, site_chrome_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET site_chrome_json = EXCLUDED.site_chrome_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}
