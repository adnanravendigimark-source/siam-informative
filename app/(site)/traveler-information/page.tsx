import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { getImages } from "@/lib/images";
import { getDiningVenues, getRules } from "@/lib/facilities";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getTravelerPage } from "@/lib/pages";
import { getSiteSettings } from "@/lib/site";

const PATH = "/traveler-information/";

export async function generateMetadata(): Promise<Metadata> {
  const [images, page] = await Promise.all([getImages(), getTravelerPage()]);
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: PATH, image: images[page.hero.imageKey].src });
}

export default async function TravelerInformationPage() {
  const [images, diningVenues, rules, page, settings] = await Promise.all([
    getImages(),
    getDiningVenues(),
    getRules(),
    getTravelerPage(),
    getSiteSettings(),
  ]);
  const heroImage = images[page.hero.imageKey];
  const diningImage = images.tropicalBeach;
  const h = page.headings;

  const toc = [
    { id: "hours-admission", label: h.hoursAdmission },
    { id: "lockers-amenities", label: h.lockersAmenities },
    { id: "food-dining", label: h.foodDining },
    { id: "outside-food", label: h.outsideFood },
    { id: "swimwear-rules", label: h.swimwearRules },
    { id: "accessibility", label: h.accessibility },
    { id: "what-to-pack", label: h.whatToPack },
    { id: "best-time", label: h.bestTime },
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
          <h2 id="hours-admission">{h.hoursAdmission}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.hoursAdmissionHtml }} />

          <h2 id="lockers-amenities">{h.lockersAmenities}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.lockersIntroHtml }} />

          <div className="not-prose my-6 grid gap-4 sm:grid-cols-3">
            {page.lockerPricing.map((item) => (
              <div key={item.title} className="rounded-lg border border-guide-200 bg-white p-4 shadow-card">
                <h3 className="font-bold text-sm text-navy">{item.title}</h3>
                <p className="mt-1 text-lg font-bold text-guide-900">{item.price}</p>
                <p className="mt-2 text-xs text-guide-600">{item.note}</p>
              </div>
            ))}
          </div>

          <div dangerouslySetInnerHTML={{ __html: page.wetsuitNoteHtml }} />

          <h2 id="food-dining">{h.foodDining}</h2>
          <div className="not-prose my-6 overflow-hidden rounded-lg border border-guide-200 bg-guide-100 shadow-card">
            <div className="relative aspect-[16/9]">
              <Image src={diningImage.src} alt={diningImage.alt} fill sizes="(min-width: 1024px) 60vw, 90vw" className="object-cover" />
            </div>
            <p className="border-t border-guide-200 bg-guide-50 px-4 py-2 text-xs text-guide-600">{page.diningImageCaption}</p>
          </div>

          <div dangerouslySetInnerHTML={{ __html: page.diningIntroHtml }} />

          <div className="not-prose my-6 space-y-4">
            {diningVenues.map((venue) => (
              <div key={venue.name} className="rounded-lg border border-guide-200 bg-white p-5 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-navy">{venue.name}</h3>
                  <span className="rounded bg-guide-100 px-2 py-0.5 text-[11px] font-semibold text-guide-700">{venue.type}</span>
                </div>
                <p className="mt-1 text-xs text-ocean-dark font-medium">{venue.location}</p>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-guide-600">{venue.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {venue.popularItems.map((item) => (
                    <span key={item} className="rounded bg-guide-50 border border-guide-200 px-2 py-0.5 text-[11px] text-guide-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 id="outside-food">{h.outsideFood}</h2>
          <div className="not-prose my-4 rounded-lg border border-amber-200 bg-amber-50/60 p-4 text-xs sm:text-sm text-guide-800">
            <strong className="font-semibold text-navy">Official Park Policy: </strong>
            {rules.outsideFood}
          </div>
          <div dangerouslySetInnerHTML={{ __html: page.outsideFoodExtraHtml }} />

          <h2 id="swimwear-rules">{h.swimwearRules}</h2>
          <ul>
            <li>
              <strong>Swimwear:</strong> {rules.swimwear}
            </li>
            <li>
              <strong>Water Shoes:</strong> {rules.footwear}
            </li>
            <li>
              <strong>GoPro & Action Cameras:</strong> {rules.cameras}
            </li>
            <li>
              <strong>Eyewear:</strong> {page.eyewearNote}
            </li>
          </ul>

          <h2 id="accessibility">{h.accessibility}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.accessibilityHtml }} />

          <h2 id="what-to-pack">{h.whatToPack}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.packingHtml }} />

          <h2 id="best-time">{h.bestTime}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.bestTimeHtml }} />
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
