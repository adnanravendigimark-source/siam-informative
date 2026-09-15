import Breadcrumbs from "./Breadcrumbs";
import Container from "./Container";
import type { SiteImage } from "@/lib/images";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  readTime,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: SiteImage;
  breadcrumbs: { name: string; path: string }[];
  readTime?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-guide-200/80 bg-gradient-to-b from-white via-lagoon-50/25 to-guide-50 py-12 sm:py-16">
      {/* Decorative ambient background blur lights */}
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-ocean-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />

      <Container className="relative">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ocean-border/60 bg-lagoon-50/80 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ocean-dark shadow-xs backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-ocean-cyan" />
              {eyebrow}
            </span>
            {readTime && (
              <span className="text-xs font-semibold text-guide-500">
                · {readTime}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-guide-600 sm:text-lg">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
