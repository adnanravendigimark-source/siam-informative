import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import { IMAGES } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { CONTACT_EMAIL, OFFICIAL_TICKETS_URL } from "@/lib/site";

const PATH = "/contact/";
const TITLE = "Contact Us";
const DESCRIPTION = "Get in touch with corrections, questions, or feedback about this Siam Park visitor guide — plus quick answers to common questions before you book.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: PATH },
];

const quickAnswers = [
  {
    q: "Do you sell Siam Park tickets?",
    a: "No. This is an independent information guide, not a ticket seller. Use the link below to reach the park's official ticket page.",
  },
  {
    q: "I have an existing booking — can you help?",
    a: "Not directly, since bookings are handled by the park or your ticket provider, not by us. Contact them for anything related to an existing reservation.",
  },
  {
    q: "I spotted an outdated price or fact.",
    a: "Please tell us — email the page link below and what looks wrong, and we'll review and correct it.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        description="Questions, corrections, or feedback about this guide — we'd like to hear from you."
        image={IMAGES.tropicalBeach}
        breadcrumbs={breadcrumbs}
      />

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-card sm:p-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
            </svg>
          </span>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink-light">Email us directly</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1.5 block break-all font-display text-xl font-bold text-indigo hover:text-coral"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-4 text-sm leading-relaxed text-ink-light">
            We generally reply within a few business days. Reporting an
            outdated price, an incorrect fact, or a broken link? Please
            include a link to the specific page — it helps us fix things
            faster.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-lg">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-coral">Common Questions</p>
          <div className="mt-4 space-y-3">
            {quickAnswers.map((item) => (
              <div key={item.q} className="rounded-xl border border-ink/10 bg-white p-5 shadow-card">
                <p className="font-display text-sm font-bold text-indigo">{item.q}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-light">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-lg text-center">
          <a
            href={OFFICIAL_TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-coral px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-coral-dark"
          >
            Go to Official Ticket Page ↗
          </a>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
    </>
  );
}
