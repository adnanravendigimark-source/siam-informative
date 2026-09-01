import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { IMAGES } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/traveler-information/";
const TITLE = "Siam Park Traveler Information: Hours, Tickets & Tips";
const DESCRIPTION =
  "Practical traveler information for Siam Park — location, seasonal opening hours, ticket types, on-site facilities, and tips for a smoother visit.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.kidsWaterPark.src });

const toc = [
  { id: "location", label: "Location" },
  { id: "hours", label: "Opening Hours" },
  { id: "tickets", label: "Ticket Types" },
  { id: "facilities", label: "Facilities" },
  { id: "what-to-bring", label: "What to Bring" },
  { id: "tips", label: "Visitor Tips" },
];

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Traveler Information", path: PATH },
];

export default function TravelerInformationPage() {
  return (
    <>
      <PageHero
        eyebrow="Traveler Information"
        title="Siam Park: Traveler Information"
        description="The practical details — location, hours, ticket types, and facilities — pulled together in one place to help you plan a smoother visit."
        image={IMAGES.kidsWaterPark}
        breadcrumbs={breadcrumbs}
        readTime="6 min read"
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_260px] lg:items-start">
        <article className="prose-article max-w-none">
          <h2 id="location">Location</h2>
          <p>
            Siam Park is located in Costa Adeje, on the southern coast of
            Tenerife, one of Spain's Canary Islands. It sits close to the
            Playa de las Américas resort strip, within a short distance of
            the coast and surrounded by a large concentration of hotels —
            which is part of why it's a popular add-on for visitors already
            staying in the south of the island.
          </p>

          <h2 id="hours">Opening Hours</h2>
          <p>
            The park generally opens at 10:00 AM every day of the year.
            Closing time changes with the season — roughly 6:00 PM during
            the warmer months (approximately May through October) and
            around 5:00 PM in the cooler months (roughly November through
            April). The park is widely reported to close for Christmas Day
            each year. Because exact seasonal cutover dates and holiday
            closures can shift year to year, always confirm current hours
            on the park's own website before you travel.
          </p>

          <h2 id="tickets">Ticket Types</h2>
          <p>
            As an independent guide, we don't sell tickets ourselves, but
            it's useful to know broadly what's on offer so you can compare
            options wherever you book:
          </p>
          <ul>
            <li>
              <strong>General admission</strong> — full-day access to the
              park's attractions, historically priced somewhere around
              €38–€48 for adults depending on season, with reduced pricing
              for children.
            </li>
            <li>
              <strong>All-inclusive / premium packages</strong> — bundle
              extras like fast-track queueing, food and drink, towel hire,
              and locker use into a single higher-priced ticket.
            </li>
            <li>
              <strong>Combo tickets</strong> — some providers bundle Siam
              Park admission with nearby Loro Parque, useful if you're
              planning to visit both during your trip.
            </li>
          </ul>
          <p>
            Prices and package names change fairly often, so treat any
            figure you see online — including here — as a rough starting
            point rather than a live quote, and check directly with the
            park or a reputable ticket seller before booking.
          </p>

          <h2 id="facilities">Facilities</h2>
          <div className="not-prose relative my-6 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={IMAGES.tropicalBeach.src}
              alt={IMAGES.tropicalBeach.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="object-cover"
            />
          </div>
          <p>
            Expect the standard set of water park facilities: changing
            rooms and showers, rentable lockers, multiple dining options
            ranging from snack bars to sit-down restaurants, and gift shops
            near the entrance. Sun loungers, umbrellas, and flotation aids
            are generally included with standard admission — see our{" "}
            <a href="/inside-siam-park/">Inside the Park</a> page for the
            full breakdown of attractions and amenities.
          </p>

          <h2 id="what-to-bring">What to Bring</h2>
          <ul>
            <li>Swimwear and a change of clothes for after your visit.</li>
            <li>Comfortable water shoes or sandals — park surfaces get wet and can be uneven.</li>
            <li>Reef-safe sunscreen, a hat, and sunglasses — shade is limited around the pools.</li>
            <li>A dry bag or waterproof phone pouch if you want to carry a phone around the park.</li>
            <li>Your own towel, if you'd rather not pay to rent one on-site.</li>
          </ul>

          <h2 id="tips">Visitor Tips</h2>
          <ul>
            <li><strong>Arrive close to opening.</strong> The first hour is consistently the quietest for the busiest slides.</li>
            <li><strong>Check ride restrictions early.</strong> If anyone in your group is near a height or weight limit, it's better to know before you queue.</li>
            <li><strong>Pace yourself.</strong> The park covers a large area built into a hillside — comfortable shoes and regular water breaks make a real difference.</li>
            <li><strong>Book ahead in peak season.</strong> Summer months and school holidays bring the largest crowds.</li>
          </ul>
        </article>

        <aside className="lg:sticky lg:top-24">
          <TableOfContents items={toc} />
        </aside>
      </Container>

      <section className="bg-cream-100 py-14 sm:py-20">
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
