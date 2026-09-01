import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { IMAGES } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/interesting-facts-about-siam-park/";
const TITLE = "12 Interesting Facts About Siam Park, Tenerife";
const DESCRIPTION =
  "The real story behind Siam Park's Thai-inspired design, its record-chasing attractions, and a few marketing claims worth taking with a grain of salt.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.thaiTemple.src });

const toc = [
  { id: "origins", label: "Origins & Opening" },
  { id: "design", label: "The Thai Design Story" },
  { id: "scale", label: "Scale & Records" },
  { id: "recognition", label: "Awards & Recognition" },
  { id: "sustainability", label: "Sustainability" },
  { id: "fact-check", label: "A Note on Marketing Claims" },
];

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Interesting Facts", path: PATH },
];

export default function FactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Interesting Facts"
        title="12 Interesting Facts About Siam Park"
        description="A closer look at the park's origin story, its Thai design theme, and which of its record-setting claims actually hold up under scrutiny."
        image={IMAGES.thaiTemple}
        breadcrumbs={breadcrumbs}
        readTime="6 min read"
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_260px] lg:items-start">
        <article className="prose-article max-w-none">
          <h2 id="origins">Origins & Opening</h2>
          <ol>
            <li>
              Siam Park opened to the public on <strong>15 September 2008</strong>,
              after roughly four years of construction — later than its
              original planned opening, but the wait is part of why the
              build quality and theming stand out compared to many
              competitors.
            </li>
            <li>
              It was formally opened by <strong>Princess Maha Chakri
              Sirindhorn of Thailand</strong>, a detail that underlines just
              how seriously the park's owners took the Thai theme from day
              one.
            </li>
            <li>
              The park is owned and operated by the <strong>Loro Parque
              group</strong>, the same family-run company behind Loro
              Parque, a long-running zoo and animal park elsewhere on
              Tenerife.
            </li>
          </ol>

          <h2 id="design">The Thai Design Story</h2>
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
          <ol start={4}>
            <li>
              The park's owners received permission from Thailand's royal
              family to use the "Siam" name and Thai design language for
              the project — but deliberately avoided replicating actual
              royal palaces or sacred temple structures out of respect for
              the culture they were drawing on.
            </li>
            <li>
              Siam Park is reported to include around 25 individual
              buildings built in Thai architectural style, described as one
              of the largest collections of Thai-themed architecture found
              outside Thailand itself.
            </li>
            <li>
              The park is built directly into a natural hillside, which is
              why several of its slides follow the contour of the land
              instead of sitting on the tall metal scaffolding you'd see at
              a flat-site water park.
            </li>
          </ol>

          <h2 id="scale">Scale & Records</h2>
          <ol start={7}>
            <li>
              The park covers roughly <strong>18.5 hectares (about 185,000
              m²)</strong> — commonly described as the largest water park
              in Europe, though that specific ranking is the park's own
              marketing claim rather than something we could verify against
              an independent, measured comparison of every competing park.
            </li>
            <li>
              Its signature ride, the <strong>Tower of Power</strong>, drops
              riders roughly 28 meters through a clear tube that passes
              through a large shark aquarium — one of the more distinctive
              ride concepts in the water park industry.
            </li>
            <li>
              The <strong>Mai Thai River</strong>, the park's lazy river,
              is regularly cited as one of the longest and highest-elevation
              rides of its type anywhere, thanks to the way it winds through
              the hillside terrain.
            </li>
          </ol>

          <h2 id="recognition">Awards & Recognition</h2>
          <ol start={10}>
            <li>
              Siam Park has repeatedly won <strong>TripAdvisor's Travellers'
              Choice award for World's Best Waterpark</strong>, with wins
              reported across most years between 2014 and 2022, and related
              recognition in subsequent years as well.
            </li>
          </ol>

          <h2 id="sustainability">Sustainability</h2>
          <ol start={11}>
            <li>
              The park operates its own <strong>desalination plant</strong>{" "}
              to convert seawater into fresh water for park use, alongside a
              solar power installation and several third-party environmental
              certifications — a notable investment for a facility this
              size.
            </li>
            <li>
              A second Siam Park was announced for Gran Canaria, but public
              reporting on legal and permitting disputes suggests the
              project was significantly delayed; we couldn't confirm a
              current, completed opening, so treat its status as unresolved
              rather than assume it has opened.
            </li>
          </ol>

          <div id="fact-check" className="not-prose mt-10 rounded-2xl border border-coral/30 bg-coral-light/40 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-coral-dark">
              A Note on Marketing Claims
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              A few claims associated with Siam Park — "world's largest
              artificial wave," "first air-conditioned outdoor water park,"
              and a handful of other self-reported "world records" — come
              directly from the park's own marketing rather than an
              independent verifying body like Guinness World Records. We
              haven't repeated those as flat fact here. Similarly, a popular
              claim that the sand at the park's beach area was imported
              from Thailand isn't supported by the park's own official
              materials, which describe it only as natural Canary Islands
              sand — so we've left that claim out entirely rather than
              pass along something we couldn't confirm.
            </p>
          </div>
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
