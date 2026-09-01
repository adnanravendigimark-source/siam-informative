import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import TableOfContents from "@/components/TableOfContents";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { IMAGES } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/interesting-facts-about-siam-park/";
const TITLE = "14 Interesting Facts & Record Claims About Siam Park, Tenerife";
const DESCRIPTION =
  "The real facts and verified records behind Siam Park — Tower of Power shark tank, world's highest artificial waves, royal Thai inauguration, and marketing claim fact-checks.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: IMAGES.thaiTemple.src });

const toc = [
  { id: "origins", label: "Origins & Royal Opening" },
  { id: "design-records", label: "Thai Architecture & Design" },
  { id: "ride-records", label: "Ride Heights & Wave Records" },
  { id: "awards", label: "Awards & Recognition" },
  { id: "sustainability", label: "Environmental Technology" },
  { id: "fact-check", label: "Editorial Fact-Check on Claims" },
];

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Interesting Facts", path: PATH },
];

export default function FactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Park Background"
        title="14 Interesting Facts & Verified Records About Siam Park"
        description="A closer look at Siam Park's design history, record-setting water attractions, environmental innovation, and fact-checks on common online claims."
        image={IMAGES.thaiTemple}
        breadcrumbs={breadcrumbs}
        readTime="7 min read"
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_260px] lg:items-start">
        <article className="prose-article max-w-none">
          {/* Origins */}
          <h2 id="origins">Origins & Royal Opening</h2>
          <ol>
            <li>
              <strong>Royal Thai Inauguration:</strong> Siam Park was officially inaugurated on 15 September 2008 in the presence of Her Royal Highness Princess Maha Chakri Sirindhorn of Thailand.
            </li>
            <li>
              <strong>Family-Owned Heritage:</strong> The park was founded and built by Wolfgang Kiessling and his son Christoph Kiessling, the visionaries behind the renowned Loro Parque sanctuary.
            </li>
            <li>
              <strong>Four Years of Hillside Sculpting:</strong> Construction required nearly four years to excavate, reinforce, and contour the natural 35-degree volcanic hillside in Costa Adeje.
            </li>
          </ol>

          {/* Architecture */}
          <h2 id="design-records">Thai Architecture & Design</h2>
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
          <ol start={4}>
            <li>
              <strong>Monarchy Approval:</strong> The park obtained royal permission from Thailand to use the historic name "Siam" and incorporate Thai architectural traditions, while respectfully avoiding the duplication of actual religious temples.
            </li>
            <li>
              <strong>25+ Authentic Thai Buildings:</strong> Siam Park features over 25 individual structures built in classic Thai architectural styles, representing one of the largest single collections of Thai-themed buildings outside Southeast Asia.
            </li>
            <li>
              <strong>The Floating Market:</strong> The central retail and dining village is built on wooden stilts over a naturalistic freshwater lake, replicating the traditional water markets of Bangkok.
            </li>
          </ol>

          {/* Rides */}
          <h2 id="ride-records">Ride Heights & Wave Records</h2>
          <ol start={7}>
            <li>
              <strong>Tower of Power Shark Tunnel:</strong> The 28-meter (92 ft) near-vertical slide accelerates riders up to 80 km/h before passing through a submerged, transparent acrylic tube surrounded by live sharks and rays.
            </li>
            <li>
              <strong>World's Largest Artificial Waves:</strong> The Wave Palace wave pool produces clean rolling waves reaching up to 3 to 4 meters (10 to 13 feet) high, suitable for both recreational swimming and professional surfing events.
            </li>
            <li>
              <strong>The Longest Elevated Lazy River:</strong> The 1,000-meter Mai Thai River is one of the world's longest lazy rivers and incorporates a mechanical water conveyor that lifts rafts 8 meters above the ground to an elevated slide descent.
            </li>
            <li>
              <strong>Singha's High-Speed Water Jets:</strong> Singha uses specialized water-injection propulsion technology to propel 3-person rafts uphill at speeds exceeding 65 km/h across 14 changes of direction.
            </li>
          </ol>

          {/* Awards */}
          <h2 id="awards">Awards & Recognition</h2>
          <ol start={11}>
            <li>
              <strong>TripAdvisor #1 Water Park in the World:</strong> Siam Park has repeatedly received TripAdvisor's Travellers' Choice "Best Water Park in the World" award for more than nine consecutive years.
            </li>
            <li>
              <strong>European Star Award:</strong> Awarded multiple times as Europe's Best Water Park by the leading international theme park industry body (Kirmes & Park Revue).
            </li>
          </ol>

          {/* Sustainability */}
          <h2 id="sustainability">Environmental Technology</h2>
          <ol start={13}>
            <li>
              <strong>On-Site Desalination:</strong> The park pumps seawater directly from the Atlantic Ocean and desalinates up to 1,800 m³ of fresh water daily using an eco-efficient reverse osmosis plant.
            </li>
            <li>
              <strong>100% Water Recycling:</strong> Water cycled out of the filtration systems is purified and reused exclusively to irrigate the thousands of tropical palms, bamboo, and exotic flora throughout the grounds.
            </li>
          </ol>

          {/* Fact Check */}
          <div id="fact-check" className="not-prose mt-10 rounded-lg border border-guide-300 bg-guide-50 p-6 shadow-card">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
              Editorial Note on Common Marketing Claims
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-guide-700">
              Several online sources claim that the golden sand on Siam Beach was imported directly from Thailand. Official park documents confirm that the sand is natural high-grade sand sourced from the Canary Islands. Similarly, while Siam Park has won numerous consumer choice awards, superlatives like "world's first green water park" represent marketing terminology rather than ISO-certified titles. As an independent travel guide, we provide these distinctions for accuracy.
            </p>
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
