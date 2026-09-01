import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { IMAGES } from "@/lib/images";
import { FREE_SHUTTLE_STOPS, TITSA_BUS_ROUTES, PARKING_INFO } from "@/lib/shuttles";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/how-to-reach-siam-park/";
const TITLE = "How to Reach Siam Park: Free Shuttles, Public Buses, Driving & Parking";
const DESCRIPTION =
  "Complete transport guide to Siam Park Tenerife — free shuttle bus timetables and pickup points in Los Cristianos and Las Américas, TITSA bus routes, driving directions, and parking details.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.coastalRoad.src });

const toc = [
  { id: "free-shuttle", label: "Free Siam Park Shuttle Bus" },
  { id: "public-bus", label: "Public TITSA Buses" },
  { id: "by-car", label: "Driving & Highway Exits" },
  { id: "parking", label: "On-Site Parking & Rates" },
  { id: "by-taxi", label: "Taxi Fares & Ranks" },
  { id: "airport-transfers", label: "Airport Transfers (TFS & TFN)" },
  { id: "tips", label: "Transit Advice" },
];

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Getting There", path: PATH },
];

export default function HowToReachPage() {
  return (
    <>
      <PageHero
        eyebrow="Transport & Directions"
        title="How to Reach Siam Park"
        description="Every way to travel to Siam Park in Costa Adeje — from the complimentary double-decker shuttle buses and public transit routes to driving directions, GPS coordinates, and parking."
        image={IMAGES.coastalRoad}
        breadcrumbs={breadcrumbs}
        readTime="6 min read"
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_260px] lg:items-start">
        <article className="prose-article max-w-none">
          <p>
            Siam Park is located in the Costa Adeje municipality on Tenerife's south coast, directly adjacent to the TF-1 motorway and within 5 to 10 minutes of major tourist resorts in Playa de las Américas and Los Cristianos.
          </p>

          {/* Free Shuttle Bus */}
          <h2 id="free-shuttle">Free Siam Park Shuttle Bus</h2>
          <p>
            Siam Park operates its own dedicated fleet of branded double-decker shuttle buses offering <strong>100% free transportation</strong> for all park visitors staying in Los Cristianos, Playa de las Américas, and Costa Adeje.
          </p>
          <ul>
            <li><strong>Service Frequency:</strong> Operates daily approximately every 30 minutes between <strong>9:30 AM and 1:00 PM</strong>, with return shuttles departing the park from <strong>4:00 PM to 6:30 PM</strong> (depending on season).</li>
            <li><strong>Booking:</strong> No ticket or advance reservation is required. Simply queue at the official pickup stop.</li>
          </ul>

          <div className="not-prose my-6 overflow-hidden rounded-lg border border-guide-200 bg-white shadow-card">
            <div className="border-b border-guide-200 bg-guide-100/80 px-4 py-3 text-xs sm:text-sm font-semibold text-navy">
              Official Free Shuttle Bus Pickup Points
            </div>
            <div className="divide-y divide-guide-100">
              {FREE_SHUTTLE_STOPS.map((stop) => (
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

          {/* Public TITSA Buses */}
          <h2 id="public-bus">Public TITSA Bus Network</h2>
          <p>
            Tenerife's green public bus network (TITSA) offers modern, air-conditioned connections across the entire island. The nearest major hub is <strong>Estación de Guaguas de Costa Adeje</strong> (Costa Adeje Central Bus Station), located roughly 400 meters (a 5-minute walk) from Siam Park's entrance turnstiles.
          </p>

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
                  {TITSA_BUS_ROUTES.map((bus) => (
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

          {/* Driving Directions */}
          <h2 id="by-car">Driving Directions & Highway Exits</h2>
          <div className="not-prose my-6 overflow-hidden rounded-lg border border-guide-200 bg-guide-100 shadow-card">
            <div className="relative aspect-[16/9]">
              <Image
                src={IMAGES.coastalRoad.src}
                alt={IMAGES.coastalRoad.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="object-cover"
              />
            </div>
            <p className="border-t border-guide-200 bg-guide-50 px-4 py-2 text-xs text-guide-600">
              The TF-1 coastal motorway connects Santa Cruz and the South Airport directly to Costa Adeje.
            </p>
          </div>
          <p>
            If you are driving a rental car, access is fast and direct via the <strong>Autopista del Sur (TF-1)</strong> motorway:
          </p>
          <ul>
            <li><strong>Arriving from the South / Airport (TFS) / Los Cristianos:</strong> Take <strong>Exit 73 (San Eugenio / Siam)</strong> and follow the roundabouts towards Siam Park / Siam Mall.</li>
            <li><strong>Arriving from the North / Santa Cruz / Puerto de la Cruz:</strong> Take <strong>Exit 74 (San Eugenio)</strong> and merge onto the service road leading directly to the park entry gates.</li>
            <li><strong>GPS Coordinates:</strong> 28.0718° N, 16.7262° W (Address: <em>Avenida Siam, s/n, 38660 Costa Adeje</em>).</li>
          </ul>

          {/* Parking */}
          <h2 id="parking">On-Site Parking & Facilities</h2>
          <ul>
            <li><strong>Daily Parking Fee:</strong> {PARKING_INFO.fee}.</li>
            <li><strong>Capacity:</strong> {PARKING_INFO.capacity}.</li>
            <li><strong>Accessible Bays:</strong> {PARKING_INFO.disabledParking}.</li>
            <li><strong>Hours of Operation:</strong> {PARKING_INFO.operatingHours}.</li>
          </ul>

          {/* Taxis */}
          <h2 id="by-taxi">Taxi Fares & Taxi Ranks</h2>
          <p>
            Official white metered taxis in Tenerife are regulated by local municipal tariffs. Taxi ranks are located right outside the Siam Park entrance archway and operate continuously.
          </p>
          <ul>
            <li>From <strong>Playa de las Américas / Los Cristianos:</strong> €8.00 – €12.00 (5–10 mins).</li>
            <li>From <strong>Playa del Duque / La Caleta:</strong> €10.00 – €15.00 (10 mins).</li>
            <li>From <strong>Los Gigantes / Puerto de Santiago:</strong> €35.00 – €45.00 (25 mins).</li>
          </ul>

          {/* Airport Transfers */}
          <h2 id="airport-transfers">Airport Transfers</h2>
          <ul>
            <li><strong>Tenerife South Airport (Reina Sofía - TFS):</strong> 18 km away (~15–20 minutes drive). Direct via TF-1 Highway. Public bus line 111/711 or taxi (~€40–€50).</li>
            <li><strong>Tenerife North Airport (Ciudad de La Laguna - TFN):</strong> 80 km away (~60–75 minutes drive). Direct via TF-1 or TITSA express line 343.</li>
          </ul>

          {/* Tips */}
          <h2 id="tips">Transit Advice</h2>
          <ul>
            <li><strong>Arrive by 9:45 AM</strong> if parking in the on-site lot to secure spaces close to the ticket booths.</li>
            <li>If taking the free shuttle back in the afternoon, board by 5:15 PM in winter or 6:15 PM in summer before the final departure rush.</li>
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
