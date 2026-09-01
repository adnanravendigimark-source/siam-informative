import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import StatStrip from "@/components/StatStrip";
import { IMAGES } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/about-siam-park/";
const TITLE = "About Siam Park: History, Design & Story";
const DESCRIPTION =
  "How Siam Park came to be — its Thai-inspired design, its owners, when it opened, and how it earned its reputation as one of Europe's best-known water parks.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.thaiTemple.src });

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About Siam Park", path: PATH },
];

const vitalStats = [
  { value: "2008", label: "Opened" },
  { value: "~4 yrs", label: "Built In" },
  { value: "~25", label: "Thai-Style Buildings" },
  { value: "28 m", label: "Tower of Power Drop" },
];

export default function AboutSiamParkPage() {
  return (
    <>
      <PageHero
        eyebrow="About Siam Park"
        title="The Story Behind Siam Park"
        description="A Thai-themed water park built into a Tenerife hillside — here's how it came to be, and why its design stands apart from most water parks in Europe."
        image={IMAGES.thaiTemple}
        breadcrumbs={breadcrumbs}
        readTime="5 min read"
      />

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="prose-article">
            <h2>Origins</h2>
            <p>
              Siam Park opened to the public on <strong>15 September
              2008</strong>, in Costa Adeje on the southern coast of
              Tenerife. It's owned and operated by the <strong>Loro Parque
              group</strong>, the same family-run company behind Loro
              Parque, a long-established zoo and animal park on the north
              side of the island. Construction took roughly four years —
              later than originally planned, but the extra time shows in
              the finished park's level of detail.
            </p>
            <p>
              The opening itself was formally marked by{" "}
              <strong>Princess Maha Chakri Sirindhorn of Thailand</strong>,
              underlining how seriously the park's owners treated the Thai
              theme from the very start — this wasn't a generic "tropical"
              water park with a name attached, but a purpose-built homage
              to Thai design and culture.
            </p>

            <h2>The Thai Design Story</h2>
            <div className="not-prose relative my-6 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={IMAGES.thaiTemple.src}
                alt={IMAGES.thaiTemple.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="object-cover"
              />
              <p className="absolute bottom-0 w-full bg-indigo/80 px-4 py-2 text-xs text-cream-50">
                Thai temple architecture in Bangkok — the same design
                tradition that inspired Siam Park, not a photo of the park
                itself.
              </p>
            </div>
            <p>
              Before building began, the park's owners secured permission
              from Thailand's royal family to use the "Siam" name and Thai
              architectural language for the project. Out of respect for
              the culture they were drawing on, they deliberately avoided
              replicating actual royal palaces or sacred temple structures
              — instead, the park's roughly 25 buildings borrow decorative
              and structural elements from Thai design more broadly:
              carved rooflines, gilded statues, and landscaped gardens
              throughout the grounds.
            </p>

            <h2>Built Into the Hillside</h2>
            <p>
              Unlike most water parks, which are built on flat land with
              slides supported by tall scaffolding, Siam Park is
              constructed directly into a natural hillside. That's why
              several of its attractions — most notably the lazy river —
              follow the contour of the land, with more elevation change
              than you'd typically see in a ride of that type. It also
              gives the park a more layered, garden-like feel as you move
              between zones, rather than the flat, open-plan layout common
              elsewhere in the industry.
            </p>

            <h2>A Record-Chasing Reputation</h2>
            <p>
              Since opening, Siam Park has built a reputation around a
              handful of standout attractions — most famously the{" "}
              <strong>Tower of Power</strong>, a near-vertical slide that
              drops riders through a clear tube passing straight through a
              shark aquarium. The park has also picked up numerous industry
              awards over the years, including multiple TripAdvisor
              Travellers' Choice wins for World's Best Waterpark. For the
              full list of standout facts — including which of the park's
              "world record" claims are independently verifiable and which
              are marketing language — see our{" "}
              <a href="/interesting-facts-about-siam-park/">Interesting Facts</a>{" "}
              page.
            </p>
          </div>

          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-wider text-coral">Vital Stats</p>
            <div className="mt-4">
              <StatStrip stats={vitalStats} />
            </div>
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
