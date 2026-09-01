import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import StatStrip from "@/components/StatStrip";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import FAQAccordion from "@/components/FAQAccordion";
import PricingTable from "@/components/PricingTable";
import TicketTypeGrid from "@/components/TicketTypeGrid";
import TipsGrid from "@/components/TipsGrid";
import { IMAGES } from "@/lib/images";
import { FAQS } from "@/lib/faqs";
import { SEASONAL_HOURS, HOLIDAY_NOTE } from "@/lib/tickets";
import { PARK_RIDES } from "@/lib/rides";
import { FREE_SHUTTLE_STOPS } from "@/lib/shuttles";
import { FACILITY_SERVICES, RULES_AND_RESTRICTIONS } from "@/lib/facilities";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_DESCRIPTION, OFFICIAL_TICKETS_URL, OFFICIAL_SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} — Full Travel Guide: Rides, Tickets, Hours & Shuttles`,
  description: SITE_DESCRIPTION,
  path: "/",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const stats = [
  { value: "Costa Adeje", label: "Tenerife, Spain" },
  { value: "10:00 AM", label: "Opens Daily 365 Days" },
  { value: "18.5 ha", label: "Park Grounds (46 Acres)" },
  { value: "24–25°C", label: "Heated Water Year-Round" },
];

export default function HomePage() {
  const thrillRides = PARK_RIDES.filter((r) => r.category === "Adrenaline / Thrill").slice(0, 4);
  const familyRides = PARK_RIDES.filter((r) => r.category === "Family & Moderate" || r.category === "Relax & Leisure").slice(0, 4);

  return (
    <>
      {/* Editorial Hero Banner */}
      <section className="border-b border-guide-200 bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded bg-guide-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-guide-700">
                  Comprehensive Visitor Guide
                </span>
                <span className="text-xs text-guide-500">
                  Costa Adeje, Tenerife, Canary Islands
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                Siam Park Tenerife: The Complete Visitor Guide
              </h1>

              <p className="mt-4 text-base leading-relaxed text-guide-600 sm:text-lg">
                Your independent, all-in-one resource for planning a visit to Siam Park in Tenerife. Find complete information on all 16+ water slides, seasonal operating hours, ticket pricing tiers, height/weight restrictions, free shuttle bus stops, on-site food and locker policies, and practical tips.
              </p>

              {/* Quick Jump Navigation */}
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-guide-600">
                <span className="text-guide-400">Jump to:</span>
                <a href="#hours" className="rounded-md border border-guide-200 bg-guide-50 px-2.5 py-1.5 hover:border-guide-300 hover:text-navy transition-colors">
                  Hours & Seasons
                </a>
                <a href="#tickets" className="rounded-md border border-guide-200 bg-guide-50 px-2.5 py-1.5 hover:border-guide-300 hover:text-navy transition-colors">
                  Tickets & Prices
                </a>
                <a href="#rides-overview" className="rounded-md border border-guide-200 bg-guide-50 px-2.5 py-1.5 hover:border-guide-300 hover:text-navy transition-colors">
                  Rides & Restrictions
                </a>
                <a href="#shuttles" className="rounded-md border border-guide-200 bg-guide-50 px-2.5 py-1.5 hover:border-guide-300 hover:text-navy transition-colors">
                  Free Shuttles & Buses
                </a>
                <a href="#facilities" className="rounded-md border border-guide-200 bg-guide-50 px-2.5 py-1.5 hover:border-guide-300 hover:text-navy transition-colors">
                  Food & Lockers
                </a>
                <a href="#faq" className="rounded-md border border-guide-200 bg-guide-50 px-2.5 py-1.5 hover:border-guide-300 hover:text-navy transition-colors">
                  FAQs
                </a>
              </div>

              <p className="mt-4 text-xs text-guide-400">
                This is a 100% free informational guide for travelers. We do not sell tickets or take commissions.
              </p>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-guide-200 bg-guide-100 shadow-card">
              <Image
                src={IMAGES.homeHero.src}
                alt={IMAGES.homeHero.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 95vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-navy/80 px-3.5 py-2 text-[11px] text-guide-200 backdrop-blur-xs">
                Siam Park grounds & attractions, Costa Adeje, South Tenerife
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Metrics */}
      <section className="border-b border-guide-200 bg-guide-50/50 py-8">
        <Container>
          <StatStrip stats={stats} />
        </Container>
      </section>

      {/* Operating Hours & Seasons */}
      <section id="hours" className="scroll-mt-20 py-12 sm:py-16">
        <Container>
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
              Operating Hours & Seasonal Schedule
            </h2>
            <p className="mt-1 text-sm text-guide-500">
              Siam Park is open 365 days a year. All pools and water rides are heated to 24–25°C.
            </p>
          </div>

          <div className="grid gap-6 rounded-lg border border-guide-200 bg-white p-6 shadow-card lg:grid-cols-2">
            <div>
              <h3 className="text-base font-bold text-navy">Daily Operating Hours</h3>
              <div className="mt-4 divide-y divide-guide-200 rounded-md border border-guide-200">
                {SEASONAL_HOURS.map((row, i) => (
                  <div key={row.label} className={`p-4 text-xs sm:text-sm ${i % 2 === 0 ? "bg-white" : "bg-guide-50"}`}>
                    <div className="flex items-center justify-between font-semibold text-guide-900">
                      <span>{row.label}</span>
                      <span className="text-ocean-dark font-bold">{row.hours}</span>
                    </div>
                    <p className="mt-1 text-xs text-guide-500">{row.season}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded bg-guide-50 p-3 text-xs text-guide-600 border border-guide-200">
                <span className="font-semibold text-guide-800">Holiday Note: </span>
                {HOLIDAY_NOTE}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-navy">Location & Weather Highlights</h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-guide-600">
                Siam Park is located in <strong>Costa Adeje</strong> in sunny southern Tenerife, known for having over 300 days of sunshine per year. The park is situated immediately off the TF-1 motorway (Exits 73 and 74).
              </p>
              <div className="mt-4 space-y-2.5 text-xs text-guide-700">
                <div className="flex items-start gap-2">
                  <span className="text-ocean font-bold">✓</span>
                  <span><strong>Heated Water:</strong> All water is continuously heated to 24–25°C (75–77°F) year-round.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-ocean font-bold">✓</span>
                  <span><strong>Airport Proximity:</strong> 18 km (15–20 minutes) from Tenerife South Airport (TFS).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-ocean font-bold">✓</span>
                  <span><strong>Best Days to Visit:</strong> Tuesdays, Wednesdays, and Thursdays typically have the shortest queues.</span>
                </div>
              </div>
              <div className="mt-5">
                <Link
                  href="/how-to-reach-siam-park/"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-ocean-dark hover:underline"
                >
                  View complete transport & shuttle details →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Ticket Pricing & Budgeting Guide */}
      <section id="tickets" className="scroll-mt-20 border-t border-guide-200 bg-guide-50/50 py-12 sm:py-16">
        <Container>
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
              Ticket Pricing Reference & Admission Tiers
            </h2>
            <p className="mt-1 text-sm text-guide-500">
              Overview of 1-day standard tickets, Twin Tickets (with Loro Parque), Premium packages, Fast Passes, and VIP Cabanas.
            </p>
          </div>

          <div className="space-y-6">
            <PricingTable />

            <div>
              <h3 className="text-base font-bold text-navy mb-4">Ticket Options Explained</h3>
              <TicketTypeGrid />
            </div>

            <div className="rounded-lg border border-guide-200 bg-white p-5 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-navy">Official Ticket Verification</h4>
                  <p className="mt-1 text-xs text-guide-600">
                    To check real-time availability, purchase official admission tickets directly, or reserve VIP cabanas, visit the operator's official portal.
                  </p>
                </div>
                <a
                  href={OFFICIAL_TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 shrink-0 rounded-md border border-guide-300 bg-guide-100 px-4 py-2 text-xs font-semibold text-navy hover:bg-guide-200 transition-colors"
                >
                  <span>Official Park Ticket Portal</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Rides & Attractions Spotlight */}
      <section id="rides-overview" className="scroll-mt-20 border-t border-guide-200 py-12 sm:py-16">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
                Rides, Slides & Attractions Overview
              </h2>
              <p className="mt-1 text-sm text-guide-500">
                16+ world-class water attractions ranging from adrenaline mega-slides to relaxing lagoons.
              </p>
            </div>
            <Link
              href="/inside-siam-park/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-ocean-dark hover:underline whitespace-nowrap"
            >
              View all 16+ rides & height rules →
            </Link>
          </div>

          {/* Thrill Rides Grid */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-guide-500 mb-3">High-Intensity & Adrenaline Slides</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {thrillRides.map((ride) => (
                <div key={ride.id} className="flex flex-col justify-between rounded-lg border border-guide-200 bg-white p-4 shadow-card">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-700 border border-rose-200">
                        {ride.intensity} Thrill
                      </span>
                      <span className="text-[11px] font-semibold text-guide-600">Min: {ride.minHeight}</span>
                    </div>
                    <h4 className="mt-2.5 text-base font-bold text-navy">{ride.name}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-guide-600 line-clamp-3">{ride.description}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-guide-100 text-[11px] text-guide-500">
                    {ride.rules}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Family & Relaxation Grid */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-guide-500 mb-3">Family, Leisure & Wave Pool</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {familyRides.map((ride) => (
                <div key={ride.id} className="flex flex-col justify-between rounded-lg border border-guide-200 bg-white p-4 shadow-card">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-sky-50 px-2 py-0.5 text-[10px] font-bold uppercase text-sky-700 border border-sky-200">
                        {ride.category}
                      </span>
                      <span className="text-[11px] font-semibold text-guide-600">{ride.minHeight}</span>
                    </div>
                    <h4 className="mt-2.5 text-base font-bold text-navy">{ride.name}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-guide-600 line-clamp-3">{ride.description}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-guide-100 text-[11px] text-guide-500">
                    {ride.rules}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Free Shuttle & Getting There Snapshot */}
      <section id="shuttles" className="scroll-mt-20 border-t border-guide-200 bg-guide-50/50 py-12 sm:py-16">
        <Container>
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
              Free Shuttle Bus Service & Getting There
            </h2>
            <p className="mt-1 text-sm text-guide-500">
              Siam Park provides complimentary double-decker bus transport across major southern Tenerife resort towns.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-guide-200 bg-white p-5 shadow-card lg:col-span-2">
              <h3 className="text-base font-bold text-navy">Free Shuttle Bus Stops (Every 30 mins from 9:30 AM)</h3>
              <p className="mt-1 text-xs text-guide-600">No prior reservation is required. Simply wait at the designated hotel or shopping center pickup point.</p>
              
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {FREE_SHUTTLE_STOPS.slice(0, 6).map((stop) => (
                  <div key={stop.location} className="rounded border border-guide-100 bg-guide-50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-ocean-dark uppercase tracking-wider">{stop.area}</span>
                    </div>
                    <p className="mt-1 font-semibold text-xs text-navy">{stop.location}</p>
                    <p className="mt-0.5 text-[11px] text-guide-500">{stop.notes}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-guide-100 pt-3">
                <span className="text-xs text-guide-500">Also serving CC El Duque & Hotel Ocean Park.</span>
                <Link href="/how-to-reach-siam-park/" className="text-xs font-semibold text-ocean-dark hover:underline">
                  Full Transport Guide →
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-guide-200 bg-white p-5 shadow-card">
              <div>
                <h3 className="text-base font-bold text-navy">Other Travel Options</h3>
                <ul className="mt-3 space-y-3 text-xs text-guide-600">
                  <li>
                    <strong className="text-guide-800">Public Bus (TITSA):</strong> Lines 111, 473, 467, 711 terminate at Costa Adeje Bus Station (5-min walk).
                  </li>
                  <li>
                    <strong className="text-guide-800">Driving & Parking:</strong> Direct off TF-1 Highway exit 73/74. On-site secure parking is €5.00/day.
                  </li>
                  <li>
                    <strong className="text-guide-800">Taxis:</strong> Metered taxis from Playa de las Américas / Los Cristianos cost ~€8–€12.
                  </li>
                </ul>
              </div>
              <div className="mt-4 rounded bg-guide-50 p-3 border border-guide-200 text-xs text-guide-600">
                <span className="font-semibold text-guide-800">GPS Address:</span> Av. Siam, s/n, 38660 Costa Adeje, Santa Cruz de Tenerife.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Facilities, Food & Rules */}
      <section id="facilities" className="scroll-mt-20 border-t border-guide-200 py-12 sm:py-16">
        <Container>
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
              Facilities, Dining & Visitor Rules
            </h2>
            <p className="mt-1 text-sm text-guide-500">
              Essential knowledge regarding locker hire, outside food regulations, swimwear, and accessibility.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-navy">Park Services & Amenities</h3>
              <div className="space-y-3">
                {FACILITY_SERVICES.map((facility) => (
                  <div key={facility.title} className="rounded-lg border border-guide-200 bg-white p-4 shadow-card">
                    <h4 className="text-xs sm:text-sm font-bold text-navy">{facility.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-guide-600">{facility.details}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-navy">Important Safety & Park Rules</h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-guide-200 bg-white p-4 shadow-card">
                  <h4 className="text-xs sm:text-sm font-bold text-navy">Outside Food & Beverage Policy</h4>
                  <p className="mt-1 text-xs leading-relaxed text-guide-600">{RULES_AND_RESTRICTIONS.outsideFood}</p>
                </div>
                <div className="rounded-lg border border-guide-200 bg-white p-4 shadow-card">
                  <h4 className="text-xs sm:text-sm font-bold text-navy">Permitted Swimwear & Clothing</h4>
                  <p className="mt-1 text-xs leading-relaxed text-guide-600">{RULES_AND_RESTRICTIONS.swimwear}</p>
                </div>
                <div className="rounded-lg border border-guide-200 bg-white p-4 shadow-card">
                  <h4 className="text-xs sm:text-sm font-bold text-navy">Water Shoes & Footwear Guidelines</h4>
                  <p className="mt-1 text-xs leading-relaxed text-guide-600">{RULES_AND_RESTRICTIONS.footwear}</p>
                </div>
                <div className="rounded-lg border border-guide-200 bg-white p-4 shadow-card">
                  <h4 className="text-xs sm:text-sm font-bold text-navy">Action Cameras & GoPro Rules</h4>
                  <p className="mt-1 text-xs leading-relaxed text-guide-600">{RULES_AND_RESTRICTIONS.cameras}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Guide Chapters Directory */}
      <section className="border-t border-guide-200 bg-guide-50/50 py-12 sm:py-16">
        <Container>
          <InternalLinkGrid heading="Guide Chapters & Detailed Topic Articles" />
        </Container>
      </section>

      {/* Practical Tips */}
      <section className="border-t border-guide-200 py-12 sm:py-16">
        <Container>
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
              Practical Advice for a Smoother Visit
            </h2>
            <p className="mt-1 text-sm text-guide-500">
              Tried-and-tested advice to avoid long queues, protect your belongings, and stay sun-safe.
            </p>
          </div>

          <TipsGrid />
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-20 border-t border-guide-200 bg-guide-50/50 py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-1 text-sm text-guide-500">
                Answers to the top 16 questions asked by travelers planning a visit.
              </p>
            </div>

            <FAQAccordion faqs={FAQS} />
          </div>
        </Container>
      </section>

      {/* Independent Resource Notice */}
      <section className="border-t border-guide-200 bg-white py-10">
        <Container>
          <div className="rounded-lg border border-guide-200 bg-guide-50 p-6 text-center sm:p-8">
            <h3 className="text-base font-bold text-navy sm:text-lg">
              Independent Traveler Reference
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-guide-600">
              This guide is created independently to provide clear, accurate, and unbiased information for tourists visiting Tenerife. To verify live park announcements, current ride maintenance, or to purchase official entry, please visit the park's official portal.
            </p>
            <div className="mt-4">
              <a
                href={OFFICIAL_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-guide-300 bg-white px-4 py-2 text-xs font-medium text-navy hover:bg-guide-100 transition-colors shadow-subtle"
              >
                <span>Visit Official Siam Park Site (siampark.net)</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
