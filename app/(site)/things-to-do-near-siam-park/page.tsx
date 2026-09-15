import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { getImages } from "@/lib/images";
import { getHotels } from "@/lib/hotels";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getThingsToDoPage } from "@/lib/pages";
import { getSiteSettings } from "@/lib/site";

const PATH = "/things-to-do-near-siam-park/";

export async function generateMetadata(): Promise<Metadata> {
  const [images, page] = await Promise.all([getImages(), getThingsToDoPage()]);
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: PATH, image: images[page.hero.imageKey].src });
}

export default async function ThingsToDoNearbyPage() {
  const [images, hotels, page, settings] = await Promise.all([getImages(), getHotels(), getThingsToDoPage(), getSiteSettings()]);
  const heroImage = images[page.hero.imageKey];
  const introImage = images.coastalRoad;
  const h = page.headings;

  const toc = [
    { id: "nearby-attractions", label: h.nearbyAttractions },
    { id: "siam-mall", label: h.siamMall },
    { id: "hotels-near", label: h.hotelsNear },
    { id: "loro-parque", label: h.loroParque },
    { id: "itinerary", label: h.itinerary },
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
          <div className="not-prose mb-8 overflow-hidden rounded-lg border border-guide-200 bg-guide-100 shadow-card">
            <div className="relative aspect-[16/9]">
              <Image src={introImage.src} alt={introImage.alt} fill sizes="(min-width: 1024px) 60vw, 90vw" className="object-cover" />
            </div>
            <p className="border-t border-guide-200 bg-guide-50 px-4 py-2 text-xs text-guide-600">{page.imageCaption}</p>
          </div>

          <h2 id="nearby-attractions">{h.nearbyAttractions}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.nearbyIntroHtml }} />

          <div className="not-prose my-6 space-y-4">
            {page.nearbyAttractions.map((item) => (
              <div key={item.title} className="rounded-lg border border-guide-200 bg-white p-5 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-navy">{item.title}</h3>
                  <span className="rounded bg-guide-100 px-2 py-0.5 text-[11px] font-semibold text-guide-700 border border-guide-200">
                    {item.distance}
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-guide-600">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 id="siam-mall">{h.siamMall}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.siamMallHtml }} />

          <h2 id="hotels-near">{h.hotelsNear}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.hotelsIntroHtml }} />

          <div className="not-prose my-6 space-y-4">
            {hotels.map((hotel) => (
              <div key={hotel.name} className="rounded-lg border border-guide-200 bg-white p-5 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-navy">{hotel.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-guide-100 px-2 py-0.5 text-[11px] font-semibold text-guide-700">{hotel.category}</span>
                    <span className="text-xs text-ocean-dark font-medium">{hotel.distance}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-guide-600">{hotel.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {hotel.features.map((feat) => (
                    <span key={feat} className="rounded bg-guide-50 border border-guide-200 px-2 py-0.5 text-[11px] text-guide-600">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 id="loro-parque">{h.loroParque}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.loroParqueHtml }} />

          <h2 id="itinerary">{h.itinerary}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.itineraryHtml }} />
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
