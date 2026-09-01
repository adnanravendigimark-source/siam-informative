import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { IMAGES } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/how-to-reach-siam-park/";
const TITLE = "How to Get to Siam Park From Anywhere in Tenerife";
const DESCRIPTION =
  "Every way to reach Siam Park in Costa Adeje, Tenerife — driving directions, public bus routes, taxi fares, and organized transport options compared.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.coastalRoad.src });

const toc = [
  { id: "by-car", label: "By Car" },
  { id: "by-bus", label: "By Public Bus" },
  { id: "by-taxi", label: "By Taxi" },
  { id: "organized-transport", label: "Shuttles & Organized Transport" },
  { id: "parking", label: "Parking" },
  { id: "tips", label: "Getting There: Quick Tips" },
];

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Getting There", path: PATH },
];

export default function HowToReachPage() {
  return (
    <>
      <PageHero
        eyebrow="Getting There"
        title="How to Reach Siam Park"
        description="Siam Park sits in Costa Adeje on Tenerife's southern coast — here's how to get there whether you're driving, riding the bus, or arriving from another resort area."
        image={IMAGES.coastalRoad}
        breadcrumbs={breadcrumbs}
        readTime="5 min read"
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_260px] lg:items-start">
        <article className="prose-article max-w-none">
          <p>
            Siam Park is located in Costa Adeje, in the southern resort belt
            of Tenerife, close to Playa de las Américas and roughly a
            20–25 minute drive from Tenerife South Airport (Reina Sofía) —
            though actual travel time depends heavily on traffic and
            exactly where you're starting from. All the main routes below
            are realistic options depending on your budget and how much
            flexibility you want.
          </p>

          <h2 id="by-car">By Car</h2>
          <div className="not-prose relative my-6 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={IMAGES.coastalRoad.src}
              alt={IMAGES.coastalRoad.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="object-cover"
            />
          </div>
          <p>
            Driving is usually the most convenient option if you already
            have a rental car. The park is accessed from the TF-1 motorway,
            which runs along Tenerife's southern coast — take the exit
            signposted for Costa Adeje / San Eugenio and follow local
            signage toward the park. If you're coming from Santa Cruz or
            the north of the island, you'll be on the TF-1 for most of the
            journey; from the airport, it's a short, direct hop down the
            same motorway.
          </p>

          <h2 id="by-bus">By Public Bus</h2>
          <p>
            TITSA, Tenerife's public bus network, connects most of the
            island to the Costa Adeje area, though which specific route
            works best depends on where you're staying. Routes into the
            Costa Adeje / Estación Costa Adeje interchange typically
            involve a short walk from the bus stop to the park entrance —
            budget extra time for this versus a taxi or direct shuttle.
            Because TITSA updates its route numbers and schedules from time
            to time, check the current timetable on the official TITSA
            website before you travel rather than relying on a route number
            you've seen elsewhere online, including on this page.
          </p>

          <h2 id="by-taxi">By Taxi</h2>
          <p>
            Taxis are widely available across Tenerife's resort areas and
            at the airport, and fares are metered rather than negotiated.
            As a rough planning figure, a taxi from Tenerife South Airport
            to Costa Adeje has commonly been quoted in the €45–€60 range,
            but always confirm an estimate with the driver before you set
            off, since fuel prices and exact pickup/drop-off points affect
            the final fare.
          </p>

          <h2 id="organized-transport">Shuttles & Organized Transport</h2>
          <p>
            If you'd rather not deal with directions at all, many hotels
            and tour operators in the south of Tenerife offer transfer
            packages that bundle return transport with your admission
            ticket — worth comparing against a taxi fare if you're staying
            somewhere without an easy direct bus connection. Some visitors
            also arrive as part of a wider day-tour package that includes
            pickup from northern Tenerife resorts like Puerto de la Cruz,
            which is a considerably longer journey than from the south.
          </p>

          <h2 id="parking">Parking</h2>
          <p>
            An on-site car park is available for a fee, and spaces can fill
            up during busy periods in peak season — arriving earlier in the
            day generally means an easier time finding a space, on top of
            the usual benefit of shorter queues at the gate.
          </p>

          <h2 id="tips">Getting There: Quick Tips</h2>
          <ul>
            <li>Budget extra time in peak season — both roads and queues get busier from roughly May through October.</li>
            <li>If you're staying in the south of Tenerife (Costa Adeje, Los Cristianos, Playa de las Américas), you're generally closest and have the most transport options.</li>
            <li>Coming from the north of the island adds significant travel time — factor that into your day plan.</li>
            <li>Whatever route you choose, arriving close to opening time tends to mean a smoother start to the day — see our <a href="/traveler-information/">Traveler Information</a> page for current opening hours.</li>
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
