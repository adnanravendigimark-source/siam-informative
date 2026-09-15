import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site";
import { getPrivacyPage } from "@/lib/pages";

const PATH = "/privacy-policy/";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPrivacyPage();
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: PATH });
}

export default async function PrivacyPolicyPage() {
  const [settings, page] = await Promise.all([getSiteSettings(), getPrivacyPage()]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: page.breadcrumbLabel, path: PATH },
  ];

  return (
    <>
      <Container className="py-10 sm:py-14">
        <div className="max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{page.title}</h1>
          <p className="mt-2 text-xs text-guide-500">Last updated: {page.lastUpdated}</p>

          <div className="prose-article mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
        </div>
      </Container>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs, settings.siteUrl)) }} />
    </>
  );
}
