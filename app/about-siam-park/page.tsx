import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import StatStrip from "@/components/StatStrip";
import { IMAGES } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/about-siam-park/";
const TITLE = "About Siam Park: History, Thai Architecture & Eco-Engineering";
const DESCRIPTION =
  "The comprehensive history of Siam Park Tenerife — royal Thai design heritage, construction into a natural hillside, owner Wolfgang Kiessling, and on-site eco-sustainability.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.thaiTemple.src });

const toc = [
  { id: "origins", label: "Origins & Royal Opening" },
  { id: "thai-heritage", label: "Thai Architectural Heritage" },
  { id: "engineering", label: "Hillside Engineering" },
  { id: "sustainability", label: "Desalination & Eco-Systems" },
  { id: "loro-parque-group", label: "The Loro Parque Group" },
  { id: "vital-stats", label: "Key Park Statistics" },
];

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About Siam Park", path: PATH },
];

const vitalStats = [
  { value: "2008", label: "Opening Year" },
  { value: "18.5 ha", label: "Park Grounds" },
  { value: "25+", label: "Thai Buildings" },
  { value: "28 m", label: "Tower of Power" },
];

export default function AboutSiamParkPage() {
  return (
    <>
      <PageHero
        eyebrow="History & Background"
        title="The Story & Design of Siam Park"
        description="From royal Thai permissions and hillside construction to custom desalination technology — here is the comprehensive background of Europe's premier water park."
        image={IMAGES.thaiTemple}
        breadcrumbs={breadcrumbs}
        readTime="6 min read"
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_260px] lg:items-start">
        <article className="prose-article max-w-none">
          {/* Origins */}
          <h2 id="origins">Origins & Royal Opening</h2>
          <p>
            Siam Park was officially inaugurated on <strong>15 September 2008</strong> in Costa Adeje, Tenerife, after nearly four years and over €52 million of specialized construction. The park was conceived by German-Canarian entrepreneur <strong>Wolfgang Kiessling</strong>, founder of the famous Loro Parque animal sanctuary in Puerto de la Cruz.
          </p>
          <p>
            The grand opening ceremony was presided over by <strong>Her Royal Highness Princess Maha Chakri Sirindhorn of Thailand</strong>, emphasizing the deep relationship and mutual respect established between the park's founders and the Thai royal family.
          </p>

          {/* Thai Heritage */}
          <h2 id="thai-heritage">Thai Architectural Heritage</h2>
          <div className="not-prose my-6 overflow-hidden rounded-lg border border-guide-200 bg-guide-100 shadow-card">
            <div className="relative aspect-[16/9]">
              <Image
                src={IMAGES.thaiTemple.src}
                alt={IMAGES.thaiTemple.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="object-cover"
              />
            </div>
            <p className="border-t border-guide-200 bg-guide-50 px-4 py-2 text-xs text-guide-600">
              Traditional Thai design traditions that guided the architectural styling of Siam Park.
            </p>
          </div>
          <p>
            Prior to breaking ground, the park's designers obtained formal authorization from the Thai monarchy to use the ancient name "Siam" and incorporate Thai artistic traditions. Out of respect for Thai cultural and religious sensibilities, the creators deliberately avoided copying actual Buddhist temples or royal palaces.
          </p>
          <p>
            Instead, architect and designer <strong>Christoph Kiessling</strong> crafted an original interpretation of classic Thai village and pavilion architecture across more than <strong>25 authentic structures</strong>. Hand-carved teak woodwork, gilded roof ridges, ornamental dragons, and traditional floating village markets over water create one of the largest assemblies of Thai architectural motifs found outside Asia.
          </p>

          {/* Hillside Engineering */}
          <h2 id="engineering">Hillside Terrain Engineering</h2>
          <p>
            Most commercial water parks worldwide are built on flat agricultural land, using exposed steel scaffolding and stair towers to support elevated slide platforms. In contrast, Siam Park was engineered directly into a <strong>35-degree natural volcanic hillside</strong>.
          </p>
          <p>
            By molding the slides and raft tracks directly into the contours of the terrain, riders experience a lush, garden-immersed journey surrounded by imported tropical trees, palms, and natural volcanic rock formations rather than industrial metal girders. This natural elevation gradient also enabled the construction of the 1-kilometer Mai Thai River with its unique elevated rapids section.
          </p>

          {/* Sustainability */}
          <h2 id="sustainability">Desalination & Environmental Eco-Systems</h2>
          <p>
            Due to Tenerife's volcanic island geography and limited natural fresh groundwater, Siam Park was engineered with a state-of-the-art <strong>closed-loop eco-water management system</strong>:
          </p>
          <ul>
            <li><strong>Seawater Desalination:</strong> The park pumps seawater directly from the Atlantic Ocean into its on-site reverse osmosis desalination plant, producing up to 1,800 cubic meters of fresh water daily.</li>
            <li><strong>Thermal Heat Recovery:</strong> The water is heated to a consistent 24°C–25°C using natural gas and heat recovery systems, making year-round swimming comfortable.</li>
            <li><strong>Botanical Recycling:</strong> After water completes its circulation and filtration in the rides, it is recycled through an on-site treatment plant to irrigate the thousands of tropical palms and botanical plants throughout the park grounds, ensuring zero water waste.</li>
          </ul>

          {/* The Loro Parque Group */}
          <h2 id="loro-parque-group">The Loro Parque Group</h2>
          <p>
            Siam Park is part of the <strong>Loro Parque Group</strong> (comprising Loro Parque zoo, Siam Park, the Poema del Mar aquarium in Gran Canaria, and the Hotel Botanico in Puerto de la Cruz). The company has received numerous international certifications for animal welfare, biodiversity conservation, and environmental sustainability.
          </p>

          {/* Vital Stats */}
          <div id="vital-stats" className="not-prose mt-10 rounded-lg border border-guide-200 bg-guide-50/50 p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-guide-500">Key Facts at a Glance</h3>
            <div className="mt-4">
              <StatStrip stats={vitalStats} />
            </div>
          </div>
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
