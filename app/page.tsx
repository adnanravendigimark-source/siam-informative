import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import StatStrip from "@/components/StatStrip";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import FAQAccordion from "@/components/FAQAccordion";
import { IMAGES } from "@/lib/images";
import { FAQS } from "@/lib/faqs";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} — Unofficial Guide to Siam Park, Tenerife`,
  description:
    "An independent, unofficial guide to Siam Park in Costa Adeje, Tenerife — what's inside the park, how to get there, practical traveler information, and interesting facts.",
  path: "/",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const stats = [
  { value: "2008", label: "Year Opened" },
  { value: "~18.5 ha", label: "Park Size" },
  { value: "16+", label: "Slides & Rides" },
  { value: "Costa Adeje", label: "Location, Tenerife" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-indigo">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.homeHero.src}
            alt={IMAGES.homeHero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo via-indigo/85 to-indigo/50" />
        </div>
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand">
            Unofficial Visitor Guide · Tenerife, Canary Islands
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Your Independent Guide to Siam Park
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream-50/85 sm:text-lg">
            Everything a first-time visitor actually needs to know about
            Europe&apos;s Thai-themed water park in Costa Adeje — what&apos;s
            inside, how to get there, and what to expect, written and
            fact-checked independently.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/inside-siam-park/"
              className="rounded-lg bg-coral px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-coral-dark"
            >
              What&apos;s Inside the Park
            </Link>
            <Link
              href="/traveler-information/"
              className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              Plan Your Visit
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <StatStrip stats={stats} />
        </Container>
      </section>

      <section className="pb-14 sm:pb-20">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
              What Is Siam Park?
            </p>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-indigo sm:text-3xl">
              A Thai-inspired water park on Tenerife&apos;s southern coast
            </h2>
            <div className="prose-article mt-4">
              <p>
                Siam Park sits in Costa Adeje, on the southern coast of
                Tenerife in Spain&apos;s Canary Islands. It opened its gates
                in 2008 and was built around a Thai design theme — its
                buildings, statues, and landscaping draw on Thai
                architecture and were completed with the blessing of
                Thailand&apos;s royal family, giving the park a distinct
                look compared to most water parks in Europe.
              </p>
              <p>
                The park spans roughly 18.5 hectares built into the natural
                slope of a hillside, which lets several of its slides wind
                through the terrain rather than sit on tall scaffolding.
                Inside you&apos;ll find everything from steep, fast slides
                to a long lazy river, a wave pool, and dedicated areas for
                younger children — we cover the full layout on our{" "}
                <Link href="/inside-siam-park/" className="font-semibold text-coral hover:underline">
                  Inside the Park
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
            <Image
              src={IMAGES.thaiTemple.src}
              alt={IMAGES.thaiTemple.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-cream-100 py-14 sm:py-20">
        <Container>
          <InternalLinkGrid />
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-8 rounded-3xl border border-ink/10 bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={IMAGES.tenerifePalm.src}
              alt={IMAGES.tenerifePalm.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
              Why Trust This Guide
            </p>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-indigo">
              Independent, fact-checked, and clearly labeled
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-light">
              We are not affiliated with Siam Park, its operator, or any
              ticket seller. Every figure on this site — opening hours,
              pricing ranges, transport routes — was cross-checked against
              multiple sources, and anywhere information is disputed or
              could not be independently confirmed, we say so rather than
              guess. Read more on our{" "}
              <Link href="/about/" className="font-semibold text-coral hover:underline">
                About page
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-indigo py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">FAQ</p>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-white sm:text-3xl">
              Common Questions About Siam Park
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <FAQAccordion faqs={FAQS} />
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
