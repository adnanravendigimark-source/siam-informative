import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { getImages } from "@/lib/images";
import { getRides } from "@/lib/rides";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getInsidePage } from "@/lib/pages";
import { getSiteSettings } from "@/lib/site";

const PATH = "/inside-siam-park/";

export async function generateMetadata(): Promise<Metadata> {
  const [images, page] = await Promise.all([getImages(), getInsidePage()]);
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: PATH, image: images[page.hero.imageKey].src });
}

export default async function InsideSiamParkPage() {
  const [images, rides, page, settings] = await Promise.all([getImages(), getRides(), getInsidePage(), getSiteSettings()]);
  const heroImage = images[page.hero.imageKey];
  const relaxImage = images.lazyRiver;
  const h = page.headings;

  const toc = [
    { id: "overview", label: h.overview },
    { id: "height-restrictions", label: h.heightRestrictions },
    { id: "adrenaline-slides", label: h.adrenalineSlides },
    { id: "family-rides", label: h.familyRides },
    { id: "relax-leisure", label: h.relaxLeisure },
    { id: "kids-zones", label: h.kidsZones },
    { id: "facilities-inside", label: h.facilitiesInside },
    { id: "ride-strategy", label: h.rideStrategy },
  ];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: page.breadcrumbLabel, path: PATH },
  ];

  const adrenaline = rides.filter((r) => r.category === "Adrenaline / Thrill");
  const family = rides.filter((r) => r.category === "Family & Moderate");
  const relax = rides.filter((r) => r.category === "Relax & Leisure");
  const kids = rides.filter((r) => r.category === "Kids & Toddlers");

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        image={heroImage}
        breadcrumbs={breadcrumbs}
        readTime={page.hero.readTime}
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_260px] lg:items-start">
        <article className="prose-article max-w-none">
          <h2 id="overview">{h.overview}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.overviewHtml }} />

          <h2 id="height-restrictions">{h.heightRestrictions}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.restrictionsIntroHtml }} />

          <div className="not-prose my-6 overflow-hidden rounded-lg border border-guide-200 bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-guide-200 bg-guide-100/80 text-guide-800">
                    <th className="px-4 py-3 font-semibold">Attraction</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Min Height</th>
                    <th className="px-4 py-3 font-semibold">Raft / Rider Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-guide-100">
                  {rides.map((ride) => (
                    <tr key={ride.id} className="hover:bg-guide-50/50">
                      <td className="px-4 py-3 font-semibold text-navy">{ride.name}</td>
                      <td className="px-4 py-3 text-guide-600">{ride.category}</td>
                      <td className="px-4 py-3 font-medium text-ocean-dark">{ride.minHeight}</td>
                      <td className="px-4 py-3 text-guide-500 text-xs">{ride.rules.split(".")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h2 id="adrenaline-slides">{h.adrenalineSlides}</h2>
          <p>{page.sectionIntros.adrenaline}</p>

          <div className="not-prose my-6 space-y-4">
            {adrenaline.map((ride) => (
              <div key={ride.id} className="rounded-2xl border border-guide-200/90 bg-white p-6 shadow-card transition-all duration-300 hover:border-red-300 hover:shadow-card-hover">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <h3 className="font-display text-base sm:text-lg font-bold text-navy">{ride.name}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block shrink-0 whitespace-nowrap rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700 border border-red-200">
                      {ride.intensity} Thrill
                    </span>
                    <span className="shrink-0 whitespace-nowrap rounded-md bg-guide-100 px-2 py-0.5 text-xs font-bold text-guide-700">Min: {ride.minHeight}</span>
                  </div>
                </div>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-guide-600">{ride.description}</p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {ride.highlights.map((h) => (
                    <span key={h} className="rounded-lg bg-lagoon-50 px-2.5 py-1 text-[11px] font-semibold text-ocean-dark border border-lagoon-100">
                      ★ {h}
                    </span>
                  ))}
                </div>
                <div className="mt-4 border-t border-guide-100 pt-3 text-xs text-guide-500">
                  <strong className="text-navy font-bold">Rules & Restrictions: </strong>
                  {ride.rules}
                </div>
              </div>
            ))}
          </div>

          <h2 id="family-rides">{h.familyRides}</h2>
          <p>{page.sectionIntros.family}</p>

          <div className="not-prose my-6 space-y-4">
            {family.map((ride) => (
              <div key={ride.id} className="rounded-2xl border border-guide-200/90 bg-white p-6 shadow-card transition-all duration-300 hover:border-ocean-border hover:shadow-card-hover">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <h3 className="font-display text-base sm:text-lg font-bold text-navy">{ride.name}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block shrink-0 whitespace-nowrap rounded-full bg-lagoon-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ocean-dark border border-lagoon-200">
                      {ride.category}
                    </span>
                    <span className="shrink-0 whitespace-nowrap rounded-md bg-guide-100 px-2 py-0.5 text-xs font-bold text-guide-700">Min: {ride.minHeight}</span>
                  </div>
                </div>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-guide-600">{ride.description}</p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {ride.highlights.map((h) => (
                    <span key={h} className="rounded-lg bg-lagoon-50 px-2.5 py-1 text-[11px] font-semibold text-ocean-dark border border-lagoon-100">
                      ★ {h}
                    </span>
                  ))}
                </div>
                <div className="mt-4 border-t border-guide-100 pt-3 text-xs text-guide-500">
                  <strong className="text-navy font-bold">Rules: </strong>
                  {ride.rules}
                </div>
              </div>
            ))}
          </div>

          <h2 id="relax-leisure">{h.relaxLeisure}</h2>

          <div className="not-prose my-6 overflow-hidden rounded-2xl border border-guide-200/80 bg-guide-100 shadow-card">
            <div className="relative aspect-[16/9]">
              <Image src={relaxImage.src} alt={relaxImage.alt} fill sizes="(min-width: 1024px) 60vw, 90vw" className="object-cover" />
            </div>
            <p className="border-t border-guide-200 bg-guide-50 px-4 py-2.5 text-xs font-medium text-guide-600">{page.relaxImageCaption}</p>
          </div>

          <p>{page.sectionIntros.relax}</p>

          <div className="not-prose my-6 space-y-4">
            {relax.map((ride) => (
              <div key={ride.id} className="rounded-2xl border border-guide-200/90 bg-white p-6 shadow-card transition-all duration-300 hover:border-ocean-border hover:shadow-card-hover">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <h3 className="font-display text-base sm:text-lg font-bold text-navy">{ride.name}</h3>
                  <span className="inline-block shrink-0 whitespace-nowrap rounded-full bg-lagoon-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ocean-dark border border-lagoon-200">
                    {ride.category}
                  </span>
                </div>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-guide-600">{ride.description}</p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {ride.highlights.map((h) => (
                    <span key={h} className="rounded-lg bg-lagoon-50 px-2.5 py-1 text-[11px] font-semibold text-ocean-dark border border-lagoon-100">
                      ★ {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 id="kids-zones">{h.kidsZones}</h2>
          <p>{page.sectionIntros.kids}</p>

          <div className="not-prose my-6 space-y-4">
            {kids.map((ride) => (
              <div key={ride.id} className="rounded-2xl border border-guide-200/90 bg-white p-6 shadow-card transition-all duration-300 hover:border-ocean-border hover:shadow-card-hover">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <h3 className="font-display text-base sm:text-lg font-bold text-navy">{ride.name}</h3>
                  <span className="shrink-0 whitespace-nowrap rounded-md bg-guide-100 px-2 py-0.5 text-xs font-bold text-guide-700">{ride.minHeight}</span>
                </div>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-guide-600">{ride.description}</p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {ride.highlights.map((h) => (
                    <span key={h} className="rounded-lg bg-lagoon-50 px-2.5 py-1 text-[11px] font-semibold text-ocean-dark border border-lagoon-100">
                      ★ {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 id="facilities-inside">{h.facilitiesInside}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.amenitiesHtml }} />

          <h2 id="ride-strategy">{h.rideStrategy}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.strategyHtml }} />
        </article>

        <aside className="lg:sticky lg:top-24">
          <TableOfContents items={toc} />
        </aside>
      </Container>

      <section className="border-t border-guide-200 bg-guide-50/50 py-12 sm:py-16">
        <Container>
          <InternalLinkGrid exclude={PATH} />
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs, settings.siteUrl)) }} />
    </>
  );
}
