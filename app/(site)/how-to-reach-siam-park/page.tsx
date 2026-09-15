import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { getImages } from "@/lib/images";
import { getShuttleStops, getBusRoutes } from "@/lib/shuttles";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getHowToReachPage } from "@/lib/pages";
import { getSiteSettings } from "@/lib/site";

const PATH = "/how-to-reach-siam-park/";

export async function generateMetadata(): Promise<Metadata> {
  const [images, page] = await Promise.all([getImages(), getHowToReachPage()]);
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: PATH, image: images[page.hero.imageKey].src });
}

export default async function HowToReachPage() {
  const [images, shuttleStops, busRoutes, page, settings] = await Promise.all([
    getImages(),
    getShuttleStops(),
    getBusRoutes(),
    getHowToReachPage(),
    getSiteSettings(),
  ]);
  const heroImage = images[page.hero.imageKey];
  const drivingImage = images.coastalRoad;
  const h = page.headings;

  const toc = [
    { id: "free-shuttle", label: h.freeShuttle },
    { id: "public-bus", label: h.publicBus },
    { id: "by-car", label: h.byCar },
    { id: "parking", label: h.parking },
    { id: "by-taxi", label: h.byTaxi },
    { id: "airport-transfers", label: h.airportTransfers },
    { id: "tips", label: h.tips },
  ];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: page.breadcrumbLabel, path: PATH },
  ];

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
          <div dangerouslySetInnerHTML={{ __html: page.introHtml }} />

          <h2 id="free-shuttle">{h.freeShuttle}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.shuttleIntroHtml }} />

          <div className="not-prose my-6 overflow-hidden rounded-lg border border-guide-200 bg-white shadow-card">
            <div className="border-b border-guide-200 bg-guide-100/80 px-4 py-3 text-xs sm:text-sm font-semibold text-navy">
              {page.shuttleBoxHeading}
            </div>
            <div className="divide-y divide-guide-100">
              {shuttleStops.map((stop) => (
                <div key={stop.location} className="p-4 hover:bg-guide-50/50">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-bold text-xs sm:text-sm text-navy">{stop.location}</span>
                    <span className="rounded bg-guide-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-guide-700 border border-guide-200">
                      {stop.area}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-guide-600">{stop.notes}</p>
                </div>
              ))}
            </div>
          </div>

          <h2 id="public-bus">{h.publicBus}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.publicBusIntroHtml }} />

          <div className="not-prose my-6 overflow-hidden rounded-lg border border-guide-200 bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-guide-200 bg-guide-100/80 text-guide-800">
                    <th className="px-4 py-3 font-semibold">Line</th>
                    <th className="px-4 py-3 font-semibold">Origin / Route</th>
                    <th className="px-4 py-3 font-semibold">Frequency</th>
                    <th className="px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-guide-100">
                  {busRoutes.map((bus) => (
                    <tr key={bus.number} className="hover:bg-guide-50/50">
                      <td className="px-4 py-3 font-bold text-navy whitespace-nowrap">{bus.number}</td>
                      <td className="px-4 py-3 text-guide-700">{bus.origin}</td>
                      <td className="px-4 py-3 text-guide-600 whitespace-nowrap">{bus.frequency}</td>
                      <td className="px-4 py-3 text-xs text-guide-500">{bus.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h2 id="by-car">{h.byCar}</h2>
          <div className="not-prose my-6 overflow-hidden rounded-lg border border-guide-200 bg-guide-100 shadow-card">
            <div className="relative aspect-[16/9]">
              <Image src={drivingImage.src} alt={drivingImage.alt} fill sizes="(min-width: 1024px) 60vw, 90vw" className="object-cover" />
            </div>
            <p className="border-t border-guide-200 bg-guide-50 px-4 py-2 text-xs text-guide-600">{page.drivingImageCaption}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: page.drivingHtml }} />

          <h2 id="parking">{h.parking}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.parkingHtml }} />

          <h2 id="by-taxi">{h.byTaxi}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.taxiHtml }} />

          <h2 id="airport-transfers">{h.airportTransfers}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.airportHtml }} />

          <h2 id="tips">{h.tips}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.tipsHtml }} />
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
