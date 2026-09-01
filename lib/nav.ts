// Primary navigation. Kept short on purpose (4 links + a prominent
// tickets/pricing anchor) — every other page is still reachable via the
// homepage's "Plan the Rest of Your Visit" cards and the footer sitemap.
export const NAV_LINKS = [
  { label: "Tickets & Prices", href: "/#tickets" },
  { label: "Inside the Park", href: "/inside-siam-park/" },
  { label: "About Siam Park", href: "/about-siam-park/" },
  { label: "Getting There", href: "/how-to-reach-siam-park/" },
] as const;

export const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Inside the Park", href: "/inside-siam-park/" },
  { label: "About Siam Park", href: "/about-siam-park/" },
  { label: "Getting There", href: "/how-to-reach-siam-park/" },
  { label: "Traveler Information", href: "/traveler-information/" },
  { label: "Interesting Facts", href: "/interesting-facts-about-siam-park/" },
  { label: "Things to Do Nearby", href: "/things-to-do-near-siam-park/" },
  { label: "Contact", href: "/contact/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
] as const;
