// Central site constants. This is a 100% static informational guide — no
// CMS, no database, no admin — so every piece of "settings" content lives
// directly in source, here and in lib/*.ts data files.
export const SITE_NAME = "Siam Park Visitor Guide";
export const SITE_URL = "https://www.siam-informative.com";
export const SITE_TAGLINE = "Tickets, Prices & Visitor Guide";
export const SITE_DESCRIPTION =
  "An independent, unofficial visitor's guide to Siam Park in Costa Adeje, Tenerife — ticket prices, opening hours, what's inside the park, getting there, and everything else you need to plan your visit.";
export const CONTACT_EMAIL = "jrandrewclark@gmaill.com";

// This site does not sell tickets itself — it's an independent
// information resource. Where visitors are ready to actually book, we
// send them to the park's own official pages rather than pretend to
// process a booking ourselves. These URLs were verified during research
// (siampark.net) and should be spot-checked again periodically in case
// the operator restructures its site.
export const OFFICIAL_TICKETS_URL = "https://siampark.net/en/tickets-and-prices";
export const OFFICIAL_HOURS_URL = "https://siampark.net/plan-your-visit/opening-hours/";
export const OFFICIAL_DIRECTIONS_URL = "https://siampark.net/plan-your-visit/directions/";
export const OFFICIAL_SITE_URL = "https://siampark.net/en";
