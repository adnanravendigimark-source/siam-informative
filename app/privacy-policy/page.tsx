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
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 font-display text-3xl font-bold text-indigo sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-light">Last updated: {lastUpdated}</p>

        <div className="prose-article mt-8 max-w-none">
          <h2>Overview</h2>
          <p>
            {SITE_NAME} is a static informational website. It has no user
            accounts, no login system, no comment sections, and no
            e-commerce or booking functionality — there is no admin panel
            or database behind it. This policy explains what little data
            is involved in simply visiting the site.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We do not operate any contact forms, newsletter sign-ups, or
            account systems that collect personal information directly.
            The Contact page provides a plain email address; any
            information you choose to send us by email is used only to
            respond to your message and is not shared with third parties
            or added to any marketing list.
          </p>

          <h2>Cookies & Analytics</h2>
          <p>
            This site does not set its own tracking or advertising
            cookies. If we add basic, privacy-conscious analytics in the
            future (to understand which pages are useful, for example), we
            will update this policy to name the specific tool and describe
            what it collects.
          </p>

          <h2>Hosting & Server Logs</h2>
          <p>
            Like virtually any website, our hosting provider may
            automatically log basic technical information (such as IP
            address, browser type, and request timestamps) for security
            and reliability purposes. We do not access this data for
            marketing or profiling.
          </p>

          <h2>External Links</h2>
          <p>
            This guide links out to external sites — including Siam Park's
            own official pages, transport authorities, and other
            references — for further information. We are not responsible
            for the privacy practices of any external site you visit from
            a link on this page.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            This site does not knowingly collect personal information from
            children. It is a general informational resource intended for
            travelers planning a visit.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy occasionally to reflect changes to
            the site. The "Last updated" date at the top of this page will
            always reflect the most recent revision.
          </p>

          <h2>Contact Us</h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
    </>
  );
}
