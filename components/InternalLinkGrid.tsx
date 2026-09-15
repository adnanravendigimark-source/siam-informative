import Link from "next/link";
import { getSiteChrome } from "@/lib/siteChrome";

export default async function InternalLinkGrid({
  exclude,
  heading,
}: {
  exclude?: string;
  heading?: string;
}) {
  const { guideLinks } = await getSiteChrome();
  const links = guideLinks.links.filter((l) => l.href !== exclude);
  const resolvedHeading = heading ?? guideLinks.heading;

  return (
    <div>
      {resolvedHeading && (
        <div className="mb-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{resolvedHeading}</h2>
          <p className="mt-1.5 text-sm text-guide-600">{guideLinks.subheading}</p>
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-guide-200/90 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-ocean-cyan/60 hover:shadow-card-hover"
          >
            {/* Top subtle highlight */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-ocean-cyan to-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-lagoon-50 to-guide-100 text-xl shadow-xs transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                  {link.icon}
                </span>
                <span className="rounded-full bg-guide-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-guide-600">
                  {link.tag}
                </span>
              </div>

              <h3 className="mt-4 font-display text-base font-bold text-navy group-hover:text-ocean-dark transition-colors sm:text-lg">
                {link.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-guide-600 sm:text-[13px]">
                {link.description}
              </p>
            </div>

            <div className="mt-5 flex items-center gap-1.5 border-t border-guide-100 pt-3.5 text-xs font-bold text-ocean-dark group-hover:text-ocean transition-colors">
              <span>{guideLinks.ctaLabel}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
