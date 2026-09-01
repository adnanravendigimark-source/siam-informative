import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { IMAGES } from "@/lib/images";
import { NEARBY_HOTELS } from "@/lib/hotels";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/things-to-do-near-siam-park/";
const TITLE = "Things to Do Near Siam Park & Top Hotels in Costa Adeje";
const DESCRIPTION =
  "Complete guide to attractions, beaches, shopping malls, and top-rated hotels near Siam Park in Costa Adeje and Playa de las Américas, Tenerife.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.tropicalBeach.src });

const toc = [
  { id: "nearby-attractions", label: "Nearby Attractions & Beaches" },
  { id: "siam-mall", label: "Siam Mall Shopping" },
  { id: "hotels-near", label: "Top Hotels Near Siam Park" },
  { id: "loro-parque", label: "Twin Day Trip: Loro Parque" },
  { id: "itinerary", label: "Suggested Itineraries" },
];

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Things to Do Nearby", path: PATH },
];

const nearbyAttractions = [
  {
    title: "Siam Mall",
    distance: "Directly Adjacent (5-minute walk)",
    body: "An open-air Thai-styled shopping, dining, and leisure complex located directly next to the water park. Houses over 70 international retail brands (Zara, Mango, H&M), a large HiperDino supermarket, cafes, and rooftop dining with sunset ocean views.",
  },
  {
    title: "Playa del Duque & Playa de Fañabé",
    distance: "5–10 minute drive / taxi",
    body: "Two of Tenerife's cleanest and most luxurious golden sand beaches, lined with a wide promenade, sunbeds, beachside restaurants, and water sports.",
  },
  {
    title: "Puerto Colón Marina",
    distance: "15-minute walk / 3-minute drive",
    body: "The primary harbor for whale and dolphin watching catamaran excursions, jet ski rentals, scuba diving, and yacht charters along the Adeje coastline.",
  },
  {
    title: "Aqualand Costa Adeje",
    distance: "5-minute drive / 1.5 km away",
    body: "Tenerife's traditional family water park featuring dedicated toddler splash pools and daily educational dolphin shows.",
  },
  {
    title: "Golf Costa Adeje",
    distance: "10-minute drive / 6 km away",
    body: "An acclaimed 27-hole championship golf course integrated into natural volcanic terraces with panoramic views of the Atlantic and La Gomera island.",
  },
];

export default function ThingsToDoNearbyPage() {
  return (
    <>
      <PageHero
        eyebrow="Local Surroundings"
        title="Things to Do & Hotels Near Siam Park"
        description="Explore the best attractions, beaches, shopping centers, and top-rated hotels within easy reach of Siam Park in Costa Adeje."
        image={IMAGES.tropicalBeach}
        breadcrumbs={breadcrumbs}
        readTime="6 min read"
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_260px] lg:items-start">
        <article className="prose-article max-w-none">
          <div className="not-prose mb-8 overflow-hidden rounded-lg border border-guide-200 bg-guide-100 shadow-card">
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
              Costa Adeje beachfront and coastal resort strip in South Tenerife.
            </p>
          </div>

          <h2 id="nearby-attractions">Nearby Attractions & Beaches</h2>
          <p>
            Siam Park is situated right in the center of Costa Adeje, one of the most developed holiday resort corridors in the Canary Islands. Here is what is situated right on the park's doorstep:
          </p>

          <div className="not-prose my-6 space-y-4">
            {nearbyAttractions.map((item) => (
              <div key={item.title} className="rounded-lg border border-guide-200 bg-white p-5 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-navy">{item.title}</h3>
                  <span className="rounded bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-800 border border-sky-200">
                    {item.distance}
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-guide-600">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Siam Mall */}
          <h2 id="siam-mall">Siam Mall Shopping & Dining</h2>
          <p>
            Located right across the street from the park entrance, <strong>Siam Mall</strong> is open 365 days a year from 10:00 AM to 10:00 PM. It is the ideal place to grab dinner, buy sunscreen, or relax in air-conditioned cafes after a day on the slides. The mall also provides free underground parking and EV charging points.
          </p>

          {/* Hotels Near Siam Park */}
          <h2 id="hotels-near">Top Hotels Near Siam Park</h2>
          <p>
            If you want to stay within walking distance or a short shuttle ride from Siam Park, these are the highest-rated accommodations in Costa Adeje and Playa de las Américas:
          </p>

          <div className="not-prose my-6 space-y-4">
            {NEARBY_HOTELS.map((hotel) => (
              <div key={hotel.name} className="rounded-lg border border-guide-200 bg-white p-5 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-navy">{hotel.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-guide-100 px-2 py-0.5 text-[11px] font-semibold text-guide-700">
                      {hotel.category}
                    </span>
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

          {/* Twin Day Trip */}
          <h2 id="loro-parque">Twin Day Trip: Loro Parque (Puerto de la Cruz)</h2>
          <p>
            Many visitors combine Siam Park with <strong>Loro Parque</strong> in northern Tenerife using the discounted <strong>Twin Ticket</strong>. Loro Parque is famous for its lush botanical gardens, dolphin and sea lion presentations, and world-leading parrot conservation center.
          </p>
          <p>
            The two parks are approximately 75 km apart (a 60-to-75-minute drive across the island). The Twin Ticket gives you up to 15 days between visits, so you do not need to do them on consecutive days.
          </p>

          {/* Itineraries */}
          <h2 id="itinerary">Suggested Costa Adeje Itineraries</h2>
          <ul>
            <li><strong>The Thrill & Chill Day:</strong> Full day at Siam Park (10:00 AM – 4:30 PM), followed by sunset drinks and dinner at the open-air terraces of Siam Mall or Puerto Colón marina.</li>
            <li><strong>The Family Beach & Water Weekend:</strong> Day 1 at Siam Park, Day 2 enjoying water sports and swimming at Playa del Duque and a dolphin-watching catamaran cruise from Puerto Colón.</li>
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
