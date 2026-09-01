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
    <section className="border-b border-guide-200 bg-white py-10 sm:py-14">
      <Container>
        <div className="max-w-3xl">
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded bg-guide-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-guide-700">
              {eyebrow}
            </span>
            {readTime && (
              <span className="text-xs text-guide-500">
                · {readTime}
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3.5 text-base leading-relaxed text-guide-600 sm:text-lg">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
