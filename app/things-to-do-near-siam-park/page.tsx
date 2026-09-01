import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { IMAGES } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/things-to-do-near-siam-park/";
const TITLE = "Things to Do Near Siam Park, Costa Adeje";
const DESCRIPTION =
  "Make a full day (or trip) of it — what's within easy reach of Siam Park in Costa Adeje, from the mall next door to nearby beaches and Tenerife's other big attractions.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.tropicalBeach.src });

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Things to Do Nearby", path: PATH },
];

const nearby = [
  {
    title: "Siam Mall",
    distance: "Right next door",
    body: "A shopping and dining complex built directly alongside Siam Park, sharing the same Thai-inspired design theme — an easy stop before or after your visit, whether you want lunch, a coffee, or just some shade.",
  },
  {
    title: "Aqualand Costa Adeje",
    distance: "A short distance away, in the Las Américas area",
    body: "Tenerife's other major water park, with its own slides, a dolphin show, and a lazy river. Some visitors compare the two parks directly — useful to know about if you're deciding between them or have time for both.",
  },
  {
    title: "Playa del Duque & Playa de Fañabe",
    distance: "A short drive or walk, depending on where you're based",
    body: "Two of Costa Adeje's best-known beaches, both with calm water and a boardwalk lined with restaurants — a straightforward way to spend a beach day on either side of your park visit.",
  },
  {
    title: "Loro Parque",
    distance: "~45–60 minute drive, north side of the island",
    body: "The Loro Parque group's original zoo and animal park in Puerto de la Cruz. It's the same operator as Siam Park and some ticket bundles combine the two, but geographically it's a proper drive away, not a nearby add-on.",
  },
];

export default function ThingsToDoNearbyPage() {
  return (
    <>
      <PageHero
        eyebrow="Things to Do Nearby"
        title="Make a Full Day of It"
        description="Siam Park sits in one of Tenerife's busiest resort areas — here's what's realistically within reach if you want to build a bigger day (or trip) around your visit."
        image={IMAGES.tropicalBeach}
        breadcrumbs={breadcrumbs}
        readTime="4 min read"
      />

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="not-prose relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={IMAGES.coastalRoad.src}
              alt={IMAGES.coastalRoad.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-5">
            {nearby.map((item) => (
              <div key={item.title} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-lg font-bold text-indigo">{item.title}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-coral">{item.distance}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-light">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="prose-article mt-10">
            <h2>Planning Your Day</h2>
            <p>
              Because Siam Park covers a large hillside site and can
              comfortably fill most of a day on its own, most visitors
              treat it as the main event rather than one stop among
              several — but if you're staying in Costa Adeje for a longer
              trip, pairing it with a beach morning or an evening at Siam
              Mall is an easy way to round things out without much extra
              planning.
            </p>
          </div>
        </div>
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
