import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { IMAGES } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/inside-siam-park/";
const TITLE = "What's Inside Siam Park? Rides, Slides & Facilities";
const DESCRIPTION =
  "A breakdown of what's actually inside Siam Park in Tenerife — thrill slides, family rides, the lazy river and wave pool, kids' zones, and on-site facilities.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.insideAttractions.src });

const toc = [
  { id: "thrill-slides", label: "Thrill & Adrenaline Slides" },
  { id: "family-rides", label: "Family-Friendly Rides" },
  { id: "kids-zones", label: "Areas for Younger Children" },
  { id: "lazy-river", label: "Lazy River & Wave Pool" },
  { id: "facilities", label: "Facilities & Services" },
  { id: "good-to-know", label: "Good to Know" },
];

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Inside the Park", path: PATH },
];

export default function InsideSiamParkPage() {
  return (
    <>
      <PageHero
        eyebrow="Inside the Park"
        title="What's Inside Siam Park?"
        description="From vertical drop slides to a lazy river long enough to actually relax on — here's what you'll find once you're through the gate."
        image={IMAGES.insideAttractions}
        breadcrumbs={breadcrumbs}
        readTime="6 min read"
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_260px] lg:items-start">
        <article className="prose-article max-w-none">
          <p>
            Siam Park groups its attractions loosely by intensity — a
            cluster of steep, fast slides for thrill-seekers, a set of
            gentler family rides, dedicated zones for younger children, and
            a slower-paced lazy river and wave pool for when you want a
            break. Here's what's actually in each category.
          </p>

          <h2 id="thrill-slides">Thrill & Adrenaline Slides</h2>
          <p>
            The park's most talked-about ride is the <strong>Tower of
            Power</strong>, a near-vertical drop slide that sends riders
            through a clear tube passing straight through a large shark
            aquarium — it's the attraction most visitors mention first, and
            it comes with height and age restrictions worth checking before
            you queue. Alongside it sit several other high-intensity
            slides: <strong>The Dragon</strong>, a wide funnel slide marked
            by a large dragon statue overlooking the drop, and newer
            coaster-style water rides including <strong>Singha</strong> and{" "}
            <strong>Saifa</strong>, which use launch and braking sections
            more like a rollercoaster than a traditional slide.
          </p>
          <p>
            These rides typically carry minimum height and/or age limits and
            aren't aimed at younger children — if you're travelling with
            kids, plan to split up or save these for later in the day.
          </p>

          <h2 id="family-rides">Family-Friendly Rides</h2>
          <p>
            Several attractions are built for groups and mixed-age families
            rather than solo thrill-seekers. <strong>Mekong Rapids</strong>{" "}
            is a multi-person raft ride that works well for families riding
            together, while the <strong>Naga Racer</strong> is a multi-lane
            mat-racing slide where you can race friends side by side. The{" "}
            <strong>Jungle Snakes</strong> — a set of four twisting enclosed
            slides — offer a middle ground between the extreme rides and
            the gentler family options.
          </p>

          <h2 id="kids-zones">Areas for Younger Children</h2>
          <p>
            Younger visitors have their own dedicated space, generally
            referred to as <strong>The Lost City</strong> — a shallow water
            playground with smaller slides, climbing elements, and
            interactive water features scaled for kids rather than adults.
            A separate shallow, sandy-edged pool area gives smaller children
            somewhere to splash around away from the taller slides and
            faster currents elsewhere in the park.
          </p>

          <h2 id="lazy-river">Lazy River & Wave Pool</h2>
          <div className="not-prose relative my-6 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={IMAGES.lazyRiver.src}
              alt={IMAGES.lazyRiver.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="object-cover"
            />
          </div>
          <p>
            The <strong>Mai Thai River</strong> is Siam Park's lazy river —
            a long, winding float that runs through landscaped gardens,
            past waterfalls, and through a couple of short indoor sections.
            It's one of the park's most-cited highlights specifically
            because of its length and elevation changes, which are unusual
            for a ride in this category.
          </p>
          <p>
            For open water, the park's wave pool area (marketed as{" "}
            <strong>Siam Beach</strong> / the Wave Palace) generates large
            artificial waves next to a sandy beach-style shoreline. The
            park has described these as among the largest artificial waves
            at any water park — that's the operator's own claim rather than
            an independently verified record, so we'd treat "biggest in the
            world" framing as marketing language rather than confirmed
            fact.
          </p>

          <h2 id="facilities">Facilities & Services</h2>
          <ul>
            <li>
              <strong>Dining:</strong> multiple restaurants, snack bars, and
              a beach-club-style dining area spread throughout the park.
            </li>
            <li>
              <strong>Lockers:</strong> rentable in a couple of sizes near
              the entrance and other points in the park.
            </li>
            <li>
              <strong>Changing rooms & showers:</strong> available at
              multiple points, included with admission.
            </li>
            <li>
              <strong>Sun loungers, umbrellas & flotation devices:</strong>{" "}
              generally included free of charge with standard admission.
            </li>
            <li>
              <strong>VIP areas:</strong> premium cabana and lounge zones
              available at extra cost for those who want a quieter base for
              the day.
            </li>
          </ul>

          <h2 id="good-to-know">Good to Know</h2>
          <p>
            Several rides have published weight or height limits — this is
            fairly standard for water coaster-style attractions and isn't
            unique to Siam Park, but it's worth checking current
            restrictions if you or someone in your group is near a limit.
            Not every ride is included in every ticket tier either; some
            multi-person raft attractions and premium experiences may be
            priced or gated separately. See our{" "}
            <a href="/traveler-information/">Traveler Information</a> page
            for ticket types and practical planning tips.
          </p>
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
