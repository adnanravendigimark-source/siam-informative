import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { IMAGES } from "@/lib/images";
import { PARK_RIDES } from "@/lib/rides";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/inside-siam-park/";
const TITLE = "Complete Siam Park Rides, Attractions & Height Restrictions Guide";
const DESCRIPTION =
  "A complete breakdown of every ride, slide, and zone inside Siam Park Tenerife — height limits, weight rules, adrenaline coasters, wave pool, lazy river, and kids areas.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.insideAttractions.src });

const toc = [
  { id: "overview", label: "Park Layout & Zones" },
  { id: "height-restrictions", label: "Height & Restrictions Table" },
  { id: "adrenaline-slides", label: "Adrenaline & Thrill Rides" },
  { id: "family-rides", label: "Family & Moderate Slides" },
  { id: "relax-leisure", label: "Relaxation, Beach & Lazy River" },
  { id: "kids-zones", label: "Kids & Toddler Play Zones" },
  { id: "facilities-inside", label: "On-Site Amenities" },
  { id: "ride-strategy", label: "Queue Strategy & Tips" },
];

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Rides & Attractions", path: PATH },
];

export default function InsideSiamParkPage() {
  const adrenaline = PARK_RIDES.filter((r) => r.category === "Adrenaline / Thrill");
  const family = PARK_RIDES.filter((r) => r.category === "Family & Moderate");
  const relax = PARK_RIDES.filter((r) => r.category === "Relax & Leisure");
  const kids = PARK_RIDES.filter((r) => r.category === "Kids & Toddlers");

  return (
    <>
      <PageHero
        eyebrow="Attractions Directory"
        title="Complete Guide to Siam Park Rides & Zones"
        description="Every slide, coaster, pool, and family area inside the park — complete with height requirements, rider rules, and queue strategies."
        image={IMAGES.insideAttractions}
        breadcrumbs={breadcrumbs}
        readTime="8 min read"
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_260px] lg:items-start">
        <article className="prose-article max-w-none">
          <h2 id="overview">Park Layout & Zones</h2>
          <p>
            Siam Park is set across 18.5 hectares (46 acres) of natural hillside in Costa Adeje, Tenerife. The park's attractions are divided into four distinct categories: high-adrenaline speed slides and water coasters, moderate family raft rides, relaxing lagoons and beaches, and dedicated shallow-water playgrounds for younger children.
          </p>
          <p>
            Because the park is built directly into a 35-degree natural slope, water slides follow the terrain rather than relying on scaffold towers. All pools and water rides are continuously heated to <strong>24°C to 25°C (75°F to 77°F)</strong> year-round.
          </p>

          {/* Restrictions Table */}
          <h2 id="height-restrictions">Height & Safety Restrictions Table</h2>
          <p>
            Height limits are strictly checked at ride queue entrances. Children are measured barefoot or with flat water socks.
          </p>
          
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
                  {PARK_RIDES.map((ride) => (
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

          {/* Adrenaline Slides */}
          <h2 id="adrenaline-slides">Adrenaline & Thrill Rides</h2>
          <p>
            These are Siam Park's flagship high-intensity attractions, designed for thrill-seekers and older children.
          </p>
          
          <div className="not-prose my-6 space-y-4">
            {adrenaline.map((ride) => (
              <div key={ride.id} className="rounded-lg border border-guide-200 bg-white p-5 shadow-card">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <h3 className="text-base font-bold text-navy">{ride.name}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block shrink-0 whitespace-nowrap rounded bg-rose-50 px-2 py-0.5 text-[11px] font-bold uppercase text-rose-700 border border-rose-200">
                      {ride.intensity} Thrill
                    </span>
                    <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-guide-600">Min: {ride.minHeight}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-guide-600">{ride.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ride.highlights.map((h) => (
                    <span key={h} className="rounded bg-guide-100 px-2 py-1 text-[11px] font-medium text-guide-700">
                      ★ {h}
                    </span>
                  ))}
                </div>
                <div className="mt-3 border-t border-guide-100 pt-2 text-xs text-guide-500">
                  <strong className="text-guide-700">Rules & Restrictions: </strong>{ride.rules}
                </div>
              </div>
            ))}
          </div>

          {/* Family Rides */}
          <h2 id="family-rides">Family & Moderate Rides</h2>
          <p>
            These attractions are suited for groups, families, and riders looking for excitement without extreme vertical drops.
          </p>

          <div className="not-prose my-6 space-y-4">
            {family.map((ride) => (
              <div key={ride.id} className="rounded-lg border border-guide-200 bg-white p-5 shadow-card">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <h3 className="text-base font-bold text-navy">{ride.name}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block shrink-0 whitespace-nowrap rounded bg-sky-50 px-2 py-0.5 text-[11px] font-bold uppercase text-sky-700 border border-sky-200">
                      {ride.category}
                    </span>
                    <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-guide-600">Min: {ride.minHeight}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-guide-600">{ride.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ride.highlights.map((h) => (
                    <span key={h} className="rounded bg-guide-100 px-2 py-1 text-[11px] font-medium text-guide-700">
                      ★ {h}
                    </span>
                  ))}
                </div>
                <div className="mt-3 border-t border-guide-100 pt-2 text-xs text-guide-500">
                  <strong className="text-guide-700">Rules: </strong>{ride.rules}
                </div>
              </div>
            ))}
          </div>

          {/* Relaxation, Beach & Lazy River */}
          <h2 id="relax-leisure">Relaxation, Beach & Lazy River</h2>
          
          <div className="not-prose my-6 overflow-hidden rounded-lg border border-guide-200 bg-guide-100 shadow-card">
            <div className="relative aspect-[16/9]">
              <Image
                src={IMAGES.lazyRiver.src}
                alt={IMAGES.lazyRiver.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="object-cover"
              />
            </div>
            <p className="border-t border-guide-200 bg-guide-50 px-4 py-2 text-xs text-guide-600">
              The Mai Thai River lazy river weaving through the tropical hillside gardens.
            </p>
          </div>

          <p>
            When you want to relax between high-speed slides, the park offers world-class leisure zones:
          </p>

          <div className="not-prose my-6 space-y-4">
            {relax.map((ride) => (
              <div key={ride.id} className="rounded-lg border border-guide-200 bg-white p-5 shadow-card">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <h3 className="text-base font-bold text-navy">{ride.name}</h3>
                  <span className="inline-block shrink-0 whitespace-nowrap rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold uppercase text-emerald-700">
                    {ride.category}
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-guide-600">{ride.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ride.highlights.map((h) => (
                    <span key={h} className="rounded bg-guide-100 px-2 py-1 text-[11px] font-medium text-guide-700">
                      ★ {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Kids Play Areas */}
          <h2 id="kids-zones">Kids & Toddler Play Zones</h2>
          <p>
            Siam Park provides extensive, dedicated aquatic playgrounds specifically designed for younger children and infants.
          </p>

          <div className="not-prose my-6 space-y-4">
            {kids.map((ride) => (
              <div key={ride.id} className="rounded-lg border border-guide-200 bg-white p-5 shadow-card">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <h3 className="text-base font-bold text-navy">{ride.name}</h3>
                  <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-guide-600">{ride.minHeight}</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-guide-600">{ride.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ride.highlights.map((h) => (
                    <span key={h} className="rounded bg-guide-100 px-2 py-1 text-[11px] font-medium text-guide-700">
                      ★ {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Facilities */}
          <h2 id="facilities-inside">On-Site Amenities</h2>
          <ul>
            <li><strong>Changing Rooms & Showers:</strong> Spacious locker houses equipped with hot showers, hair dryers, and changing cubicles.</li>
            <li><strong>Locker Rentals:</strong> Small (€5/day) and large (€7/day) digital lockers activated with waterproof RFID wristbands (€5 deposit).</li>
            <li><strong>Sun Loungers:</strong> Over 1,000 sunbeds across Siam Beach and Coco Beach provided free of charge.</li>
            <li><strong>Complimentary Lifejackets:</strong> Flotation vests in multiple sizes available free at all ride stations for kids and non-swimmers.</li>
          </ul>

          {/* Strategy */}
          <h2 id="ride-strategy">Queue Strategy & Tips</h2>
          <ul>
            <li><strong>Head straight to Tower of Power, Singha, or Saifa at 10:00 AM opening.</strong> Lines are consistently shortest during the first 45 minutes of the morning.</li>
            <li><strong>Visit the Wave Palace during the lunchtime lull (1:00 PM – 2:30 PM)</strong> when many visitors head to the restaurants.</li>
            <li><strong>Wear water shoes.</strong> The paths cover significant elevation gains and can become hot under the midday sun.</li>
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
