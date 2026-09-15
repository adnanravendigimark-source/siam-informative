import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import { getNav } from "@/lib/nav";
import { getSiteSettings } from "@/lib/site";
import { getSiteChrome } from "@/lib/siteChrome";

export default async function Footer() {
  const [nav, settings, chromeContent] = await Promise.all([getNav(), getSiteSettings(), getSiteChrome()]);
  const { footerLinks } = nav;
  const { siteName, siteTagline, contactEmail, officialSiteUrl } = settings;
  const { footer } = chromeContent;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-navy-light/40 bg-gradient-to-b from-navy-dark via-navy-deep to-navy-dark text-guide-300">
      {/* Ambient gradient top glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ocean-cyan to-transparent opacity-50" />

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10 shrink-0" />
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-white">{siteName}</span>
                <span className="text-[11px] font-medium text-lagoon-300">{footer.smallTagline}</span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-guide-400">
              {siteTagline}. {footer.aboutBlurbSuffix}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-navy-light/60 bg-navy-deep/80 px-3.5 py-1.5 text-xs text-guide-300 shadow-xs backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{footer.badgeText}</span>
            </div>
          </div>

          {/* Guide Sections */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-wider text-lagoon-300">
              {footer.navColumnHeading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium text-guide-300 transition-colors duration-200 hover:text-white hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information & Official */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-wider text-lagoon-300">
              {footer.resourcesColumnHeading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.slice(5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium text-guide-300 transition-colors duration-200 hover:text-white hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-xs font-medium text-guide-300 transition-colors duration-200 hover:text-white"
                >
                  Email: {contactEmail}
                </a>
              </li>
              <li className="pt-3">
                <a
                  href={officialSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-ocean/40 bg-ocean/10 px-3 py-1.5 text-xs font-semibold text-lagoon-300 transition-all duration-200 hover:bg-ocean/20 hover:text-white"
                >
                  <span>{footer.officialPortalLabel}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-navy-light/40 pt-8 text-xs text-guide-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteName}. {footer.copyrightSuffix}</p>
          <p className="max-w-md text-left text-[11px] leading-relaxed text-guide-500 sm:text-right">
            {footer.disclaimer}
          </p>
        </div>
      </Container>
    </footer>
  );
}
