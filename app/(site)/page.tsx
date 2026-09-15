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
import { getImages } from "@/lib/images";
import { getFaqs } from "@/lib/faqs";
import { getTicketTypes, getSeasonalHours, getHolidayNote, getTicketPolicyNotes } from "@/lib/tickets";
import { getRides } from "@/lib/rides";
import { getShuttleStops } from "@/lib/shuttles";
import { getFacilityServices, getRules } from "@/lib/facilities";
import { getTips } from "@/lib/tips";
import { buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site";
import { getHomepage } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, homepage] = await Promise.all([getSiteSettings(), getHomepage()]);
  return buildMetadata({
    title: `${settings.siteName} ${homepage.metaTitleSuffix}`,
    description: settings.siteDescription,
    path: "/",
  });
}

export default async function HomePage() {
  const [homepage, images, faqs, ticketTypes, seasonalHours, holidayNote, ticketPolicyNotes, rides, shuttleStops, facilityServices, rules, tips, settings] =
    await Promise.all([
      getHomepage(),
      getImages(),
      getFaqs(),
      getTicketTypes(),
      getSeasonalHours(),
      getHolidayNote(),
      getTicketPolicyNotes(),
      getRides(),
      getShuttleStops(),
      getFacilityServices(),
      getRules(),
      getTips(),
      getSiteSettings(),
    ]);

  const { hero, stats, hoursSection, ticketsSection, ridesSection, shuttlesSection, facilitiesSection, tipsSection, faqSection, independentNotice } =
    homepage;
  const heroImage = images[hero.imageKey];

  const thrillRides = rides.filter((r) => r.category === "Adrenaline / Thrill").slice(0, 4);
  const familyRides = rides.filter((r) => r.category === "Family & Moderate" || r.category === "Relax & Leisure").slice(0, 4);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      {/* Visual Editorial Hero Banner */}
      <section className="relative overflow-hidden border-b border-guide-200/80 bg-gradient-to-b from-white via-lagoon-50/30 to-guide-50 py-12 sm:py-20">
        {/* Ambient background light spheres */}
        <div className="pointer-events-none absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full bg-ocean-cyan/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-32 h-[450px] w-[450px] rounded-full bg-gold-400/10 blur-3xl" />

        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              {/* Trust Badge & Location */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ocean-border bg-lagoon-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ocean-dark shadow-xs backdrop-blur-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  {hero.badge}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-guide-600">
                  <span className="text-gold-500">📍</span>
                  {hero.location}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
                {hero.title}
              </h1>

              {/* Subheading Body */}
              <p className="mt-5 text-base leading-relaxed text-guide-600 sm:text-lg">
                {hero.description}
              </p>

              {/* Quick Jump Navigation Capsules */}
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-wider text-guide-500 mb-2.5">
                  {hero.quickJumpLabel}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-guide-700">
                  {(["#hours", "#tickets", "#rides-overview", "#shuttles", "#facilities", "#faq"] as const).map((href, i) => (
                    <a
                      key={href}
                      href={href}
                      className="rounded-xl border border-guide-200/90 bg-white px-3 py-2 shadow-xs transition-all duration-200 hover:border-ocean-border hover:bg-lagoon-50 hover:text-ocean-dark hover:-translate-y-0.5"
                    >
                      {hero.quickJumpLinks[i]}
                    </a>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-xs text-guide-500">{hero.footerNote}</p>
            </div>

            {/* Visual Hero Photo Container */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-guide-200/80 bg-guide-100 shadow-luxury transition-transform duration-500 hover:scale-[1.01]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 95vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-navy/80 px-3 py-1.5 text-xs font-semibold text-guide-100 backdrop-blur-md border border-white/10">
                  <span className="text-gold-400">🌊</span>
                  {hero.imageCaption}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Metrics Bar */}
      <section className="border-b border-guide-200/80 bg-white/60 py-10 backdrop-blur-xs">
        <Container>
          <StatStrip stats={stats} />
        </Container>
      </section>

      {/* Operating Hours & Seasons */}
      <section id="hours" className="scroll-mt-24 py-14 sm:py-20">
        <Container>
          <div className="mb-8 max-w-2xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-lagoon-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ocean-dark mb-2">
              {hoursSection.eyebrow}
            </span>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              {hoursSection.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-guide-600 sm:text-base">
              {hoursSection.subheading}
            </p>
          </div>

          <div className="grid gap-8 rounded-3xl border border-guide-200/90 bg-white p-6 sm:p-8 shadow-card lg:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-bold text-navy flex items-center gap-2">
                {hoursSection.hoursCardHeading}
              </h3>
              <div className="mt-5 divide-y divide-guide-100 overflow-hidden rounded-2xl border border-guide-200">
                {seasonalHours.map((row, i) => (
                  <div key={row.label} className={`p-4 sm:p-5 text-xs sm:text-sm ${i % 2 === 0 ? "bg-white" : "bg-guide-50/70"}`}>
                    <div className="flex items-center justify-between font-bold text-navy">
                      <span className="font-display text-sm sm:text-base">{row.label}</span>
                      <span className="rounded-lg bg-navy/5 px-2.5 py-1 font-display font-extrabold text-ocean-dark text-sm sm:text-base">
                        {row.hours}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs font-medium text-guide-500">{row.season}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-gradient-to-r from-gold-50 via-gold-50/50 to-guide-50 p-4 text-xs text-guide-700 border border-gold-200/70 shadow-xs">
                <span className="font-bold text-gold-700">{hoursSection.holidayNoteLabel} </span>
                {holidayNote}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-navy flex items-center gap-2">
                  {hoursSection.locationCardHeading}
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-guide-600">{hoursSection.locationParagraph}</p>
                <div className="mt-5 space-y-3 text-xs sm:text-sm text-guide-700">
                  {hoursSection.highlights.map((h) => {
                    const [label, ...rest] = h.split(":");
                    const body = rest.join(":").trim();
                    return (
                      <div key={h} className="flex items-start gap-2.5 rounded-xl bg-guide-50/80 p-3 border border-guide-200/60">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lagoon-100 text-ocean-dark font-bold text-xs">✓</span>
                        <span>
                          <strong className="text-navy">{label}:</strong> {body || h}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-guide-100">
                <Link href="/how-to-reach-siam-park/" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ocean-dark hover:text-ocean transition-colors">
                  <span>{hoursSection.transportLinkLabel}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Ticket Pricing & Budgeting Guide */}
      <section id="tickets" className="scroll-mt-24 border-t border-guide-200/80 bg-gradient-to-b from-guide-50/60 via-white to-guide-50/60 py-14 sm:py-20">
        <Container>
          <div className="mb-8 max-w-2xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold-700 mb-2">
              {ticketsSection.eyebrow}
            </span>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              {ticketsSection.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-guide-600 sm:text-base">
              {ticketsSection.subheading}
            </p>
          </div>

          <div className="space-y-8">
            <PricingTable ticketTypes={ticketTypes} policyNotes={ticketPolicyNotes} />

            <div>
              <h3 className="font-display text-xl font-bold text-navy mb-5 flex items-center gap-2">
                {ticketsSection.optionsHeading}
              </h3>
              <TicketTypeGrid ticketTypes={ticketTypes} />
            </div>

            {/* Official Booking CTA Box */}
            <div className="relative overflow-hidden rounded-3xl border border-ocean-cyan/30 bg-gradient-to-r from-navy via-navy-deep to-navy-light p-6 sm:p-8 shadow-luxury text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
                <div className="max-w-xl">
                  <span className="inline-block rounded-full bg-ocean-cyan/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lagoon-300 mb-2">
                    {ticketsSection.ctaEyebrow}
                  </span>
                  <h4 className="font-display text-lg sm:text-xl font-bold text-white">{ticketsSection.ctaHeading}</h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-guide-200 leading-relaxed">{ticketsSection.ctaBody}</p>
                </div>
                <a
                  href={settings.officialTicketsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 shrink-0 rounded-2xl bg-gradient-to-r from-ocean-cyan to-ocean px-6 py-3.5 text-xs sm:text-sm font-bold text-navy hover:from-white hover:to-lagoon-100 shadow-glow transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>{ticketsSection.ctaButtonLabel}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Rides & Attractions Spotlight */}
      <section id="rides-overview" className="scroll-mt-24 border-t border-guide-200/80 py-14 sm:py-20">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-lagoon-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ocean-dark mb-2">
                {ridesSection.eyebrow}
              </span>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
                {ridesSection.heading}
              </h2>
              <p className="mt-2 text-sm text-guide-600">{ridesSection.subheading}</p>
            </div>
            <Link
              href="/inside-siam-park/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-guide-200 bg-white px-4 py-2 text-xs font-bold text-ocean-dark shadow-xs hover:bg-lagoon-50 hover:text-navy transition-all duration-200 whitespace-nowrap"
            >
              <span>{ridesSection.viewAllLabel}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Thrill Rides Grid */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                {ridesSection.thrillHeading}
              </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {thrillRides.map((ride) => (
                <div
                  key={ride.id}
                  className="group flex flex-col justify-between rounded-3xl border border-guide-200/90 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-red-300 hover:shadow-card-hover"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-red-700 border border-red-200 shadow-2xs">
                        <span>⚡</span>
                        <span>{ride.intensity} Thrill</span>
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-navy/5 px-2.5 py-0.5 text-[11px] font-bold text-navy">
                        <span>📏</span>
                        <span>{ride.minHeight}</span>
                      </span>
                    </div>
                    <h4 className="mt-4 font-display text-base sm:text-lg font-bold text-navy group-hover:text-ocean-dark transition-colors">
                      {ride.name}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-guide-600 line-clamp-3">
                      {ride.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3.5 border-t border-guide-100 text-[11px] font-medium text-guide-500 flex items-center gap-1.5">
                    <span className="text-ocean-dark font-bold">ℹ</span>
                    <span className="truncate">{ride.rules}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Family & Relaxation Grid */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500" />
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                {ridesSection.familyHeading}
              </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {familyRides.map((ride) => (
                <div
                  key={ride.id}
                  className="group flex flex-col justify-between rounded-3xl border border-guide-200/90 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-ocean-cyan/60 hover:shadow-card-hover"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-lagoon-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-ocean-dark border border-lagoon-200 shadow-2xs">
                        <span>🌴</span>
                        <span>{ride.category}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-guide-100 px-2.5 py-0.5 text-[11px] font-bold text-guide-700">
                        <span>📏</span>
                        <span>{ride.minHeight}</span>
                      </span>
                    </div>
                    <h4 className="mt-4 font-display text-base sm:text-lg font-bold text-navy group-hover:text-ocean-dark transition-colors">
                      {ride.name}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-guide-600 line-clamp-3">
                      {ride.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3.5 border-t border-guide-100 text-[11px] font-medium text-guide-500 flex items-center gap-1.5">
                    <span className="text-ocean-dark font-bold">ℹ</span>
                    <span className="truncate">{ride.rules}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Free Shuttle & Getting There Snapshot */}
      <section id="shuttles" className="scroll-mt-24 border-t border-guide-200/80 bg-gradient-to-b from-guide-50/60 via-white to-guide-50/60 py-14 sm:py-20">
        <Container>
          <div className="mb-8 max-w-2xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2">
              {shuttlesSection.eyebrow}
            </span>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              {shuttlesSection.heading}
            </h2>
            <p className="mt-2 text-sm text-guide-600">{shuttlesSection.subheading}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-guide-200/90 bg-white p-6 sm:p-8 shadow-card lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-guide-100 pb-4">
                <h3 className="font-display text-base sm:text-lg font-bold text-navy flex items-center gap-2">
                  {shuttlesSection.cardHeading}
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                  {shuttlesSection.frequencyBadge}
                </span>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-guide-600 leading-relaxed">
                {shuttlesSection.noBookingNote}
              </p>

              <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
                {shuttleStops.slice(0, 6).map((stop) => (
                  <div key={stop.location} className="rounded-2xl border border-guide-200/70 bg-guide-50/70 p-4 transition-colors hover:bg-lagoon-50/40">
                    <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-ocean-dark shadow-2xs border border-guide-200/60">
                      {stop.area}
                    </span>
                    <p className="mt-2 font-display font-bold text-xs sm:text-sm text-navy">{stop.location}</p>
                    <p className="mt-1 text-[11px] text-guide-500 leading-snug">{stop.notes}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-guide-100 pt-4">
                <span className="text-xs text-guide-500">{shuttlesSection.alsoServingNote}</span>
                <Link href="/how-to-reach-siam-park/" className="text-xs sm:text-sm font-bold text-ocean-dark hover:text-ocean transition-colors">
                  {shuttlesSection.fullGuideLabel}
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-guide-200/90 bg-white p-6 sm:p-8 shadow-card">
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-navy flex items-center gap-2">
                  {shuttlesSection.otherModesHeading}
                </h3>
                <ul className="mt-4 space-y-3.5 text-xs sm:text-sm text-guide-600">
                  {shuttlesSection.otherOptions.map((opt) => (
                    <li key={opt.label} className="rounded-xl bg-guide-50/70 p-3 border border-guide-200/60">
                      <strong className="font-bold text-navy block mb-0.5">{opt.label}:</strong> {opt.body}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-guide-100 to-lagoon-50 p-4 border border-guide-200 text-xs text-guide-700">
                <span className="font-bold text-navy">{shuttlesSection.gpsLabel}</span> {shuttlesSection.gpsAddress}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Facilities, Food & Rules */}
      <section id="facilities" className="scroll-mt-24 border-t border-guide-200/80 py-14 sm:py-20">
        <Container>
          <div className="mb-8 max-w-2xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-lagoon-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ocean-dark mb-2">
              {facilitiesSection.eyebrow}
            </span>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              {facilitiesSection.heading}
            </h2>
            <p className="mt-2 text-sm text-guide-600">{facilitiesSection.subheading}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-navy flex items-center gap-2">
                {facilitiesSection.servicesHeading}
              </h3>
              <div className="space-y-3.5">
                {facilityServices.map((facility) => (
                  <div key={facility.title} className="rounded-2xl border border-guide-200/90 bg-white p-5 shadow-card transition-all hover:border-ocean-border">
                    <h4 className="font-display text-sm sm:text-base font-bold text-navy">{facility.title}</h4>
                    <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-guide-600">{facility.details}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-navy flex items-center gap-2">
                {facilitiesSection.rulesHeading}
              </h3>
              <div className="space-y-4">
                {/* Dedicated Icon Callout: Food Policy */}
                <div className="rounded-2xl border-l-4 border-l-amber-500 border border-guide-200/90 bg-white p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xl text-amber-600">
                      🥪
                    </div>
                    <div>
                      <span className="inline-block rounded-full bg-amber-100/70 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                        {facilitiesSection.foodBadge}
                      </span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-navy">
                        {facilitiesSection.foodHeading}
                      </h4>
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-guide-600">{rules.outsideFood}</p>
                </div>

                {/* Dedicated Icon Callout: Swimwear Policy */}
                <div className="rounded-2xl border-l-4 border-l-ocean border border-guide-200/90 bg-white p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lagoon-50 text-xl text-ocean-dark">
                      🩳
                    </div>
                    <div>
                      <span className="inline-block rounded-full bg-lagoon-100/70 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-ocean-dark">
                        {facilitiesSection.swimwearBadge}
                      </span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-navy">
                        {facilitiesSection.swimwearHeading}
                      </h4>
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-guide-600">{rules.swimwear}</p>
                </div>

                {/* Dedicated Icon Callout: Footwear Guidelines */}
                <div className="rounded-2xl border-l-4 border-l-emerald-500 border border-guide-200/90 bg-white p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600">
                      👟
                    </div>
                    <div>
                      <span className="inline-block rounded-full bg-emerald-100/70 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                        {facilitiesSection.footwearBadge}
                      </span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-navy">
                        {facilitiesSection.footwearHeading}
                      </h4>
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-guide-600">{rules.footwear}</p>
                </div>

                {/* Dedicated Icon Callout: Camera Rules */}
                <div className="rounded-2xl border-l-4 border-l-indigo-500 border border-guide-200/90 bg-white p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600">
                      📹
                    </div>
                    <div>
                      <span className="inline-block rounded-full bg-indigo-100/70 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-800">
                        {facilitiesSection.cameraBadge}
                      </span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-navy">
                        {facilitiesSection.cameraHeading}
                      </h4>
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-guide-600">{rules.cameras}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Guide Chapters Directory */}
      <section className="border-t border-guide-200/80 bg-gradient-to-b from-guide-50/60 via-white to-guide-50/60 py-14 sm:py-20">
        <Container>
          <InternalLinkGrid heading={homepage.guideLinksHeading} />
        </Container>
      </section>

      {/* Practical Tips */}
      <section className="border-t border-guide-200/80 py-14 sm:py-20">
        <Container>
          <div className="mb-8 max-w-2xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold-700 mb-2">
              {tipsSection.eyebrow}
            </span>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              {tipsSection.heading}
            </h2>
            <p className="mt-2 text-sm text-guide-600">{tipsSection.subheading}</p>
          </div>

          <TipsGrid tips={tips} />
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-24 border-t border-guide-200/80 bg-gradient-to-b from-guide-50/60 via-white to-guide-50/60 py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <span className="inline-flex items-center gap-1 rounded-full bg-lagoon-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ocean-dark mb-2">
                {faqSection.eyebrow}
              </span>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
                {faqSection.heading}
              </h2>
              <p className="mt-2 text-sm text-guide-600">{faqSection.subheading}</p>
            </div>

            <FAQAccordion faqs={faqs} />
          </div>
        </Container>
      </section>

      {/* Independent Resource Verification Notice */}
      <section className="border-t border-guide-200/80 bg-white py-12 sm:py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-guide-200/90 bg-gradient-to-br from-guide-50 via-white to-lagoon-50/40 p-8 text-center sm:p-12 shadow-card">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-2xl text-white shadow-md">
              🌴
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-navy sm:text-2xl">{independentNotice.heading}</h3>
            <p className="mx-auto mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-guide-600">{independentNotice.body}</p>
            <div className="mt-6">
              <a
                href={settings.officialSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-guide-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-navy shadow-sm transition-all duration-200 hover:bg-navy hover:text-white hover:border-navy"
              >
                <span>{independentNotice.linkLabel}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
