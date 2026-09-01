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
    description: "Slides, pools, kids' zones, and the facilities you'll find once you're through the gate.",
    icon: "🌊",
  },
  {
    href: "/about-siam-park/",
    title: "About Siam Park",
    description: "The story behind the park's Thai-inspired design, its owners, and how it was built.",
    icon: "🏛️",
  },
  {
    href: "/how-to-reach-siam-park/",
    title: "Getting There",
    description: "Driving, bus routes, taxis, and organized transport options to reach the park.",
    icon: "🧭",
  },
  {
    href: "/traveler-information/",
    title: "Traveler Information",
    description: "Location, hours, tickets, facilities, and practical tips for your visit.",
    icon: "🎒",
  },
  {
    href: "/interesting-facts-about-siam-park/",
    title: "Interesting Facts",
    description: "Record-chasing attractions and a few marketing claims worth a closer look.",
    icon: "📌",
  },
  {
    href: "/things-to-do-near-siam-park/",
    title: "Things to Do Nearby",
    description: "Make a full day of it — beaches, Siam Mall, and other Costa Adeje attractions.",
    icon: "🗺️",
  },
];

export default function InternalLinkGrid({
  exclude,
  heading = "Plan the Rest of Your Visit",
}: {
  exclude?: string;
  heading?: string;
}) {
  const links = ALL_GUIDE_LINKS.filter((l) => l.href !== exclude);
  return (
    <div>
      {heading && (
        <h2 className="font-display text-xl font-bold text-indigo sm:text-2xl">{heading}</h2>
      )}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-coral/40"
          >
            <span className="text-2xl" aria-hidden="true">{link.icon}</span>
            <span className="mt-3 font-display text-base font-bold text-indigo group-hover:text-coral">
              {link.title}
            </span>
            <span className="mt-1.5 text-sm leading-relaxed text-ink-light">{link.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
