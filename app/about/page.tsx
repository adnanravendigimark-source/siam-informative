import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import { IMAGES } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const PATH = "/about/";
const TITLE = "About This Guide";
const DESCRIPTION =
  "Who writes this Siam Park guide, how we fact-check what we publish, and why this is an independent site with no affiliation to the park.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`About ${SITE_NAME}`}
        description="An independent, unofficial visitor's guide to Siam Park — here's who we are and how we work."
        image={IMAGES.tropicalBeach}
        breadcrumbs={breadcrumbs}
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <article className="prose-article max-w-none">
          <h2>Who We Are</h2>
          <p>
            {SITE_NAME} is an independent, unofficial guide written for
            people planning a visit to Siam Park in Costa Adeje, Tenerife.
            We are not affiliated with, endorsed by, or operated by Siam
            Park, its owner (the Loro Parque group), or any official
            ticketing partner. Think of this site as the kind of
            practical, plain-language briefing you'd want from a friend
            who's already done the research — not a marketing page.
          </p>

          <h2>How We Fact-Check</h2>
          <p>
            Every factual claim on this site — opening hours, ride
            descriptions, transport routes, historical details — was
            cross-referenced against multiple independent sources,
            including the park's own official pages, established travel
            and theme-park reference sites, and general reporting. Where
            sources disagreed, or where a claim (like a "world record")
            came only from the park's own marketing with no independent
            verification, we say so directly rather than repeat it as flat
            fact. You can see this approach in practice on our{" "}
            <a href="/interesting-facts-about-siam-park/">Interesting Facts</a>{" "}
            page.
          </p>

          <h2>Why Prices & Hours Are Approximate</h2>
          <p>
            Ticket prices, opening hours, and transport schedules all
            change — sometimes by season, sometimes year to year. Wherever
            we mention a figure like this, we've labeled it as approximate
            and current as of when the page was last reviewed. For a live,
            authoritative number, always check the source directly (the
            park's own website for hours and tickets, TITSA's own site for
            bus schedules, and so on) rather than relying on any
            third-party guide, including this one.
          </p>

          <h2>Affiliate & Advertising Disclosure</h2>
          <p>
            This site does not currently sell tickets, run advertising, or
            use affiliate booking links. If that changes in the future,
            we'll disclose it clearly on this page and wherever the link
            appears.
          </p>

          <h2>Corrections</h2>
          <p>
            Spotted something outdated or inaccurate? We'd genuinely like
            to know — reach out via our{" "}
            <a href="/contact/">Contact page</a> and we'll review it.
          </p>
        </article>

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card">
          <Image
            src={IMAGES.tenerifePalm.src}
            alt={IMAGES.tenerifePalm.alt}
            fill
            sizes="(min-width: 1024px) 35vw, 90vw"
            className="object-cover"
          />
        </div>
      </Container>

      <section className="bg-cream-100 py-14 sm:py-20">
        <Container>
          <InternalLinkGrid />
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
    </>
  );
}
