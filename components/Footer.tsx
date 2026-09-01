import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import { FOOTER_LINKS } from "@/lib/nav";
import { SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL, OFFICIAL_SITE_URL } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-guide-200 bg-guide-900 text-guide-300">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-8 w-8 shrink-0" />
              <span className="text-base font-bold text-white">{SITE_NAME}</span>
            </div>
            <p className="mt-3.5 max-w-sm text-xs leading-relaxed text-guide-400">
              {SITE_TAGLINE}. An independent, non-commercial travel reference. Not affiliated with, endorsed by, or operated by Siam Park or Loro Parque S.A.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded border border-guide-800 bg-guide-950/60 px-2.5 py-1 text-[11px] text-guide-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Independent Information Resource</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-guide-400">Guide Sections</p>
            <ul className="mt-3.5 space-y-2">
              {FOOTER_LINKS.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-guide-300 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-guide-400">Information & Contact</p>
            <ul className="mt-3.5 space-y-2">
              {FOOTER_LINKS.slice(5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-guide-300 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-xs text-guide-300 transition-colors hover:text-white"
                >
                  Contact: {CONTACT_EMAIL}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={OFFICIAL_SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-ocean-border hover:underline"
                >
                  Official Park Website (siampark.net) ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-guide-800 pt-6 text-[11px] text-guide-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE_NAME}. Free informational guide for travelers.</p>
          <p className="max-w-md text-left sm:text-right">
            Information aggregated from public records and subject to seasonal updates. Always verify details on the official park portal.
          </p>
        </div>
      </Container>
    </footer>
  );
}
