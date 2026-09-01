import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import { IMAGES } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { CONTACT_EMAIL, OFFICIAL_TICKETS_URL } from "@/lib/site";

const PATH = "/contact/";
const TITLE = "Contact Us & Guide Inquiries";
const DESCRIPTION = "Get in touch with corrections, feedback, or general questions regarding this Siam Park independent visitor guide.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: PATH },
];

const quickAnswers = [
  {
    q: "Does this website sell park tickets or process bookings?",
    a: "No. This is an independent, non-commercial travel guide. We do not sell tickets, manage bookings, or collect payments. For tickets and official bookings, please visit siampark.net.",
  },
  {
    q: "I have a question about an existing ticket purchase or refund.",
    a: "Please contact the official Siam Park customer support or the authorized third-party agency from which you bought your tickets. We do not have access to booking databases.",
  },
  {
    q: "I noticed outdated information or want to suggest a correction.",
    a: "We welcome visitor feedback. Please email us with the specific page URL and the information that needs updating.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & Inquiries"
        title="Get in Touch"
        description="Questions, corrections, or feedback regarding this independent guide — we'd like to hear from you."
        image={IMAGES.tropicalBeach}
        breadcrumbs={breadcrumbs}
      />

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-xl rounded-lg border border-guide-200 bg-white p-6 sm:p-8 text-center shadow-card">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="mt-4 text-base font-bold text-navy">Email Inquiries</h2>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 block break-all text-lg font-semibold text-ocean-dark hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-3 text-xs leading-relaxed text-guide-600">
            We aim to review submissions and reply within a few business days. If you are reporting an outdated price or broken link, please include the relevant page link.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <h2 className="text-center text-xs font-bold uppercase tracking-wider text-guide-500">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            {quickAnswers.map((item) => (
              <div key={item.q} className="rounded-lg border border-guide-200 bg-white p-4 sm:p-5 shadow-card">
                <h3 className="text-xs sm:text-sm font-bold text-navy">{item.q}</h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-guide-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-xl text-center">
          <a
            href={OFFICIAL_TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-guide-300 bg-guide-100 px-4 py-2 text-xs font-semibold text-navy hover:bg-guide-200 transition-colors"
          >
            <span>Visit Official Siam Park Website (siampark.net)</span>
            <span aria-hidden="true">↗</span>
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
