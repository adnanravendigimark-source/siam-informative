import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import StatStrip from "@/components/StatStrip";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import FAQAccordion from "@/components/FAQAccordion";
import PricingTable from "@/components/PricingTable";
import TicketTypeGrid from "@/components/TicketTypeGrid";
import TipsGrid from "@/components/TipsGrid";
import { IMAGES } from "@/lib/images";
import { FAQS } from "@/lib/faqs";
import { SEASONAL_HOURS, HOLIDAY_NOTE } from "@/lib/tickets";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_DESCRIPTION, OFFICIAL_TICKETS_URL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} — Tickets, Prices, Hours & Full Visitor Guide`,
  description: SITE_DESCRIPTION,
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
        <Container className="relative py-16 sm:py-24 lg:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand">
            Unofficial Visitor Guide · Costa Adeje, Tenerife
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Everything You Need to Know Before You Visit Siam Park
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream-50/85 sm:text-lg">
            Ticket prices, opening hours, what's actually inside the park,
            and how to get there — one independent guide with everything a
            first-time visitor needs, so you can book with confidence
            wherever you choose to buy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={OFFICIAL_TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-coral px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-coral-dark"
            >
              Check Official Ticket Prices ↗
            </a>
            <Link
              href="/traveler-information/"
              className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              Read the Full Visitor Guide
            </Link>
          </div>
          <p className="mt-4 text-xs text-cream-50/60">
            This is an independent guide, not the official Siam Park
            website — "Check Official Ticket Prices" opens siampark.net in
            a new tab.
          </p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <StatStrip stats={stats} />
        </Container>
      </section>

      <section id="hours" className="scroll-mt-24 pb-14 sm:pb-20">
        <Container className="grid gap-8 rounded-3xl border border-ink/10 bg-white p-7 shadow-card sm:p-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">Hours & Location</p>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-indigo">Opening Hours</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-ink/10">
              {SEASONAL_HOURS.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-cream-100"}`}
                >
                  <span className="font-semibold text-ink">{row.label}</span>
                  <span className="text-ink-light">{row.hours}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-light">{HOLIDAY_NOTE}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">Address</p>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-indigo">Where It Is</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-light">
              Siam Park sits in Costa Adeje, on the southern coast of
              Tenerife, close to the Playa de las Américas resort strip and
              roughly a 20–25 minute drive from Tenerife South Airport.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-light">
              See our full <Link href="/how-to-reach-siam-park/" className="font-semibold text-coral hover:underline">Getting There</Link> guide
              for driving directions, bus routes, and taxi estimates.
            </p>
          </div>
        </Container>
      </section>

      <section id="tickets" className="scroll-mt-24 bg-cream-100 py-14 sm:py-20">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">Tickets & Pricing</p>
          <h2 className="mt-2.5 font-display text-2xl font-bold text-indigo sm:text-3xl">
            What a Siam Park Ticket Costs
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-light">
            We don't sell tickets ourselves, so here's a straightforward
            comparison of the ticket tiers you'll typically find, with
            approximate pricing to help you budget before you book.
          </p>
          <div className="mt-6">
            <PricingTable />
          </div>
          <div className="mt-10">
            <h3 className="font-display text-xl font-bold text-indigo">Ticket Types Explained</h3>
            <div className="mt-5">
              <TicketTypeGrid />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl bg-indigo p-6 text-white">
            <p className="flex-1 text-sm leading-relaxed text-cream-50/90">
              Ready to book? Prices and availability are managed directly by
              the park — check the current rate before your visit.
            </p>
            <a
              href={OFFICIAL_TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg bg-coral px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-coral-dark"
            >
              View Official Prices ↗
            </a>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <InternalLinkGrid />
        </Container>
      </section>

      <section className="bg-cream-100 py-14 sm:py-20">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">Know Before You Go</p>
          <h2 className="mt-2.5 font-display text-2xl font-bold text-indigo sm:text-3xl">
            Practical Tips for Your Visit
          </h2>
          <div className="mt-6">
            <TipsGrid />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-8 rounded-3xl border border-ink/10 bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={IMAGES.thaiTemple.src}
              alt={IMAGES.thaiTemple.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">The Story</p>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-indigo">
              A Thai-Inspired Water Park Built Into a Hillside
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-light">
              Siam Park opened in 2008 with permission from Thailand's royal
              family to use its Thai design language — around 25 buildings
              in Thai architectural style, built directly into a natural
              hillside so several slides follow the terrain instead of
              sitting on scaffolding. Read the full story, including how
              the park earned its record-chasing reputation, on our{" "}
              <Link href="/about-siam-park/" className="font-semibold text-coral hover:underline">
                About Siam Park
              </Link>{" "}
              page.
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

      <section className="py-14 sm:py-20">
        <Container className="rounded-3xl bg-coral-light/50 p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold text-indigo sm:text-3xl">
            Ready to Visit Siam Park?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-light">
            You now have everything this independent guide can offer —
            pricing, hours, what's inside, and how to get there. Booking
            itself happens on the park's own official site.
          </p>
          <a
            href={OFFICIAL_TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-coral px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-coral-dark"
          >
            Book on the Official Site ↗
          </a>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
