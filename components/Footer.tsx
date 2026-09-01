import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import { FOOTER_LINKS } from "@/lib/nav";
import { SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-indigo text-cream-50">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-9 w-9 shrink-0" />
              <span className="font-display text-lg font-bold">{SITE_NAME}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-50/70">
              {SITE_TAGLINE}. This is an independent, unofficial guide —
              not affiliated with, endorsed by, or operated by Siam Park or
              the Loro Parque group. Prices and hours are summarized from
              public information and can change without notice; always
              verify before you travel.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-sand">Guide</p>
            <ul className="mt-3.5 space-y-2.5">
              {FOOTER_LINKS.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream-50/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-sand">More</p>
            <ul className="mt-3.5 space-y-2.5">
              {FOOTER_LINKS.slice(5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream-50/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm text-cream-50/80 hover:text-white"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-cream-50/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE_NAME}. All rights reserved.</p>
          <p>This is an independent guide and is not the official Siam Park website.</p>
        </div>
      </Container>
    </footer>
  );
}
