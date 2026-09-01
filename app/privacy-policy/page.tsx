import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

const PATH = "/privacy-policy/";
const TITLE = "Privacy Policy";
const DESCRIPTION = `Privacy Policy for ${SITE_NAME} — what information this static site does and does not collect.`;

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: PATH },
];

const lastUpdated = "September 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Container className="py-10 sm:py-14">
        <div className="max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-xs text-guide-500">Last updated: {lastUpdated}</p>

          <div className="prose-article mt-8 max-w-none">
            <h2>Overview</h2>
            <p>
              {SITE_NAME} is a static informational website. It has no user accounts, no login system, no comment sections, and no e-commerce or booking functionality — there is no customer database or backend user management behind it. This policy explains what little data is involved in simply visiting the site.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We do not operate contact forms, newsletter sign-ups, or payment processors that collect personal information directly. The Contact page provides a plain email address; any information you choose to send us by email is used only to respond to your message and is not shared with third parties or added to any marketing lists.
            </p>

            <h2>Cookies & Analytics</h2>
            <p>
              This site does not set third-party tracking or behavioral advertising cookies. If we add privacy-conscious aggregated analytics in the future (to understand which guide chapters are helpful to readers), we will update this policy to describe what data is collected.
            </p>

            <h2>Hosting & Server Logs</h2>
            <p>
              Like virtually all websites, our hosting infrastructure automatically processes standard technical connection data (such as IP address, user agent, and request timestamps) to maintain network security and ensure reliable content delivery. We do not use this data for profiling or advertising.
            </p>

            <h2>External Links</h2>
            <p>
              This guide links out to external websites — including Siam Park's official pages, transport authorities (TITSA), and travel resources — for convenience. We are not responsible for the content or privacy practices of external websites.
            </p>

            <h2>Contact Us</h2>
            <p>
              Questions about this policy? Email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </div>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
    </>
  );
}
