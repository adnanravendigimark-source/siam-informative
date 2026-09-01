// Primary navigation — mirrors the reference site's page flow (Inside /
// Getting There / Traveler Information / Facts), adapted with our own
// labels and an About page added for site transparency/E-E-A-T.
export const NAV_LINKS = [
  { label: "Inside the Park", href: "/inside-siam-park/" },
  { label: "Getting There", href: "/how-to-reach-siam-park/" },
  { label: "Traveler Information", href: "/traveler-information/" },
  { label: "Facts", href: "/interesting-facts-about-siam-park/" },
  { label: "About", href: "/about/" },
] as const;

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { label: "Contact", href: "/contact/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
] as const;
