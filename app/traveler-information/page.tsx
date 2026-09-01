import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { IMAGES } from "@/lib/images";
import { DINING_VENUES, FACILITY_SERVICES, RULES_AND_RESTRICTIONS } from "@/lib/facilities";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/traveler-information/";
const TITLE = "Siam Park Practical Traveler Guide: Lockers, Dining, Rules & Tips";
const DESCRIPTION =
  "Essential practical guide for visiting Siam Park Tenerife — locker hire, towel rentals, dining venues, outside food rules, accessibility, packing list, and queue tips.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.kidsWaterPark.src });

const toc = [
  { id: "hours-admission", label: "Hours & Admission Basics" },
  { id: "lockers-amenities", label: "Lockers, Towels & Wetsuits" },
  { id: "food-dining", label: "Restaurants & Dining Venues" },
  { id: "outside-food", label: "Outside Food & Bag Policy" },
  { id: "swimwear-rules", label: "Swimwear, Footwear & Cameras" },
  { id: "accessibility", label: "Accessibility & Special Needs" },
  { id: "what-to-pack", label: "Packing Checklist" },
  { id: "best-time", label: "Best Time & Queue Strategies" },
];

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Traveler Practicalities", path: PATH },
];

export default function TravelerInformationPage() {
  return (
    <>
      <PageHero
        eyebrow="Traveler Practicalities"
        title="Siam Park: Practical Visitor Guide"
        description="Everything you need to know before stepping through the gates — locker rentals, on-site dining, outside food rules, safety regulations, accessibility, and packing advice."
        image={IMAGES.kidsWaterPark}
        breadcrumbs={breadcrumbs}
        readTime="7 min read"
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_260px] lg:items-start">
        <article className="prose-article max-w-none">
          {/* Hours & Admission */}
          <h2 id="hours-admission">Hours & Admission Basics</h2>
          <p>
            Siam Park is open every single day of the year at <strong>10:00 AM</strong>. Closing time is <strong>6:00 PM</strong> in the summer season (May 1 to October 31) and <strong>5:00 PM</strong> in the winter season (November 1 to April 30).
          </p>
          <ul>
            <li><strong>Standard Entry:</strong> Grants full-day access to all 16+ slides, wave pool, lazy river, sun loungers, and lifejackets.</li>
            <li><strong>Twin Ticket:</strong> Bundles Siam Park and Loro Parque zoo at a discounted combination price, valid for 15 days.</li>
            <li><strong>Fast Pass Wristband:</strong> Sold only inside the park at the photo desk for ~€15–€28 on the morning of your visit, giving 1 priority access per participating ride.</li>
          </ul>

          {/* Lockers & Amenities */}
          <h2 id="lockers-amenities">Lockers, Towels & Wetsuits</h2>
          <p>
            The park features automated electronic locker houses positioned near the entrance turnstiles and changing areas. Lockers use RFID silicone wristbands that you wear on slides.
          </p>

          <div className="not-prose my-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-guide-200 bg-white p-4 shadow-card">
              <h3 className="font-bold text-sm text-navy">Small Locker</h3>
              <p className="mt-1 text-lg font-bold text-guide-900">€5.00 <span className="text-xs font-normal text-guide-500">/ day</span></p>
              <p className="mt-2 text-xs text-guide-600">Fits 1–2 small backpacks, shoes, wallets, and dry clothes. +€5 refundable deposit.</p>
            </div>
            <div className="rounded-lg border border-guide-200 bg-white p-4 shadow-card">
              <h3 className="font-bold text-sm text-navy">Large Locker</h3>
              <p className="mt-1 text-lg font-bold text-guide-900">€7.00 <span className="text-xs font-normal text-guide-500">/ day</span></p>
              <p className="mt-2 text-xs text-guide-600">Ideal for family bags, towels, and bulkier gear. +€5 refundable deposit.</p>
            </div>
            <div className="rounded-lg border border-guide-200 bg-white p-4 shadow-card">
              <h3 className="font-bold text-sm text-navy">Towel Hire</h3>
              <p className="mt-1 text-lg font-bold text-guide-900">€5.00 <span className="text-xs font-normal text-guide-500">/ day</span></p>
              <p className="mt-2 text-xs text-guide-600">Clean plush beach towel rental. +€5 refundable deposit on return.</p>
            </div>
          </div>

          <p>
            <strong>Wetsuits:</strong> During the winter months (November to March), shorty neoprene wetsuits are available to rent for €5/day, which is useful on breezy afternoons.
          </p>

          {/* Food & Dining */}
          <h2 id="food-dining">Restaurants & Dining Venues</h2>
          <div className="not-prose my-6 overflow-hidden rounded-lg border border-guide-200 bg-guide-100 shadow-card">
            <div className="relative aspect-[16/9]">
              <Image
                src={IMAGES.tropicalBeach.src}
                alt={IMAGES.tropicalBeach.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="object-cover"
              />
            </div>
            <p className="border-t border-guide-200 bg-guide-50 px-4 py-2 text-xs text-guide-600">
              The Beach Club and Siam Beach dining terraces.
            </p>
          </div>

          <p>
            Siam Park features 5 primary dining and refreshment hubs spread across the grounds:
          </p>

          <div className="not-prose my-6 space-y-4">
            {DINING_VENUES.map((venue) => (
              <div key={venue.name} className="rounded-lg border border-guide-200 bg-white p-5 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-navy">{venue.name}</h3>
                  <span className="rounded bg-guide-100 px-2 py-0.5 text-[11px] font-semibold text-guide-700">
                    {venue.type}
                  </span>
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

          {/* Outside Food Policy */}
          <h2 id="outside-food">Outside Food & Security Check Policy</h2>
          <div className="not-prose my-4 rounded-lg border border-amber-200 bg-amber-50/60 p-4 text-xs sm:text-sm text-guide-800">
            <strong className="font-semibold text-navy">Official Park Policy: </strong>
            {RULES_AND_RESTRICTIONS.outsideFood}
          </div>
          <p>
            If you wish to eat outside food that does not qualify under the medical/infant exception, there are shaded picnic benches located just outside the main turnstiles. You can have your hand stamped for re-entry at the gate.
          </p>

          {/* Swimwear & Safety Rules */}
          <h2 id="swimwear-rules">Swimwear, Footwear & Action Cameras</h2>
          <ul>
            <li><strong>Swimwear:</strong> {RULES_AND_RESTRICTIONS.swimwear}</li>
            <li><strong>Water Shoes:</strong> {RULES_AND_RESTRICTIONS.footwear}</li>
            <li><strong>GoPro & Action Cameras:</strong> {RULES_AND_RESTRICTIONS.cameras}</li>
            <li><strong>Eyewear:</strong> Sunglasses and prescription glasses must be secured with a tight sports strap or removed on thrill rides.</li>
          </ul>

          {/* Accessibility */}
          <h2 id="accessibility">Accessibility & Special Needs</h2>
          <p>
            Siam Park welcomes guests with disabilities and reduced mobility:
          </p>
          <ul>
            <li><strong>Wheelchair Access:</strong> Ramped pathways connect the main entrance, Floating Market, restaurant terraces, and Siam Beach. An elevator provides direct access to the beach level.</li>
            <li><strong>Parking & Restrooms:</strong> Dedicated disabled parking bays are located next to the ticket gates, and all major toilet facilities include accessible stalls.</li>
            <li><strong>Terrain Considerations:</strong> Because the park is built on a natural hillside, the upper slides (Tower of Power, Singha, Saifa) require walking up stairways. Guests with mobility concerns are advised to consult guest services upon arrival for assistance.</li>
          </ul>

          {/* Packing Checklist */}
          <h2 id="what-to-pack">What to Pack for Siam Park</h2>
          <ul>
            <li><strong>Fitted water shoes / neoprene socks</strong> (protects feet against hot paths and allowed on all rides).</li>
            <li><strong>High-SPF water-resistant sunscreen</strong> (reapply frequently throughout the day).</li>
            <li><strong>Waterproof phone pouch with lanyard</strong> (keeps your phone dry for photos).</li>
            <li><strong>Microfiber towel</strong> (compact, quick-drying, and avoids on-site towel hire fees).</li>
            <li><strong>Change of dry clothes and light fleece</strong> (for the evening ride home).</li>
          </ul>

          {/* Best Times & Strategy */}
          <h2 id="best-time">Best Time to Visit & Queue Strategies</h2>
          <ul>
            <li><strong>Best Days of the Week:</strong> Tuesday, Wednesday, and Thursday have the lightest crowds. Weekends and Mondays (package holiday check-in day) are busier.</li>
            <li><strong>Best Time of Day:</strong> Arrive at 9:40 AM (20 minutes before gates open) and head immediately to the popular Tower of Power, Singha, or Saifa water coasters.</li>
            <li><strong>Lunch Hour Lull:</strong> From 1:00 PM to 2:30 PM, slide lines noticeably decrease as crowds move to the restaurants. Use this window to hit major rides.</li>
          </ul>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
    </>
  );
}
