import Link from "next/link";

export interface LinkCard {
  href: string;
  title: string;
  description: string;
  icon: string;
}

export const ALL_GUIDE_LINKS: LinkCard[] = [
  {
    href: "/inside-siam-park/",
    title: "Inside the Park",
    description: "Slides, pools, kids' zones, and on-site facilities once you're inside.",
    icon: "🌊",
  },
  {
    href: "/how-to-reach-siam-park/",
    title: "Getting There & Transport",
    description: "Driving directions, TITSA public bus routes, taxi fares, and parking.",
    icon: "🧭",
  },
  {
    href: "/traveler-information/",
    title: "Traveler Practicalities",
    description: "Hours, ticket overview, locker rentals, packing checklist, and tips.",
    icon: "🎒",
  },
  {
    href: "/about-siam-park/",
    title: "About the Park & Design",
    description: "The history of the park, Thai architectural heritage, and hillside construction.",
    icon: "🏛️",
  },
  {
    href: "/interesting-facts-about-siam-park/",
    title: "Facts & Claims Review",
    description: "Record-setting attractions, sustainability features, and marketing fact-checks.",
    icon: "📌",
  },
  {
    href: "/things-to-do-near-siam-park/",
    title: "Things to Do Nearby",
    description: "Costa Adeje beaches, Siam Mall shopping, and surrounding attractions.",
    icon: "🗺️",
  },
];

export default function InternalLinkGrid({
  exclude,
  heading = "Explore More of This Guide",
}: {
  exclude?: string;
  heading?: string;
}) {
  const links = ALL_GUIDE_LINKS.filter((l) => l.href !== exclude);
  return (
    <div>
      {heading && (
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">{heading}</h2>
          <p className="mt-1 text-sm text-guide-500">Comprehensive information chapters to help plan your visit.</p>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-col justify-between rounded-lg border border-guide-200 bg-white p-5 shadow-card transition-all hover:border-ocean/60 hover:shadow-lift"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl" aria-hidden="true">{link.icon}</span>
                <h3 className="text-base font-bold text-navy group-hover:text-ocean-dark transition-colors">
                  {link.title}
                </h3>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-guide-600">
                {link.description}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-ocean-dark">
              <span>Read guide chapter</span>
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
