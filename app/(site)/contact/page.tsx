import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import { getImages } from "@/lib/images";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site";
import { getContactPage } from "@/lib/pages";

const PATH = "/contact/";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: PATH });
}

export default async function ContactPage() {
  const [images, settings, page] = await Promise.all([getImages(), getSiteSettings(), getContactPage()]);
  const heroImage = images[page.hero.imageKey];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: page.breadcrumbLabel, path: PATH },
  ];

  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} description={page.hero.description} image={heroImage} breadcrumbs={breadcrumbs} />

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-xl rounded-lg border border-guide-200 bg-white p-6 sm:p-8 text-center shadow-card">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="mt-4 text-base font-bold text-navy">{page.cardHeading}</h2>
          <a href={`mailto:${settings.contactEmail}`} className="mt-2 block break-all text-lg font-semibold text-ocean-dark hover:underline">
            {settings.contactEmail}
          </a>
          <p className="mt-3 text-xs leading-relaxed text-guide-600">{page.cardNote}</p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <h2 className="text-center text-xs font-bold uppercase tracking-wider text-guide-500">{page.faqHeading}</h2>
          <div className="mt-4 space-y-3">
            {page.quickAnswers.map((item) => (
              <div key={item.q} className="rounded-lg border border-guide-200 bg-white p-4 sm:p-5 shadow-card">
                <h3 className="text-xs sm:text-sm font-bold text-navy">{item.q}</h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-guide-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-xl text-center">
          <a
            href={settings.officialTicketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-guide-300 bg-guide-100 px-4 py-2 text-xs font-semibold text-navy hover:bg-guide-200 transition-colors"
          >
            <span>{page.officialLinkLabel}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </Container>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs, settings.siteUrl)) }} />
    </>
  );
}
