"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Container from "./Container";
import type { NavLink } from "@/lib/nav";
import type { SiteChromeContent } from "@/lib/siteChrome";

export default function HeaderClient({
  siteName,
  navLinks,
  chrome,
}: {
  siteName: string;
  navLinks: NavLink[];
  chrome: SiteChromeContent["header"];
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-guide-200/90 bg-white/95 shadow-sm backdrop-blur-md"
          : "border-b border-guide-200/60 bg-white/90 backdrop-blur-sm"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        {/* Brand / Logo Area */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 shrink-0"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-display text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-navy truncate">
              {siteName}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-ocean-dark truncate">
                {chrome.tagline}
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 shrink-0">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-xl px-3 py-2 text-xs xl:text-[13px] font-bold tracking-tight whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-navy/5 text-navy font-extrabold shadow-2xs"
                    : "text-guide-600 hover:bg-lagoon-50/70 hover:text-navy"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-2.5 h-0.5 rounded-full bg-ocean-cyan" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Official Tickets CTA + Mobile Menu Button */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <a
            href={chrome.ticketsCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-navy via-navy-deep to-navy-light px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:from-ocean-dark hover:to-ocean hover:shadow-glow hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>{chrome.ticketsCtaLabel}</span>
            <span className="text-lagoon-300 font-bold" aria-hidden="true">↗</span>
          </a>

          {/* Mobile / Tablet Menu Trigger */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-guide-200 bg-white text-guide-700 shadow-2xs transition-colors hover:bg-guide-50 hover:text-navy xl:hidden"
          >
            {open ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Responsive Mobile / Tablet Drawer */}
      {open && (
        <div className="border-t border-guide-200/80 bg-white/98 shadow-xl backdrop-blur-xl xl:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <Container className="py-4 space-y-4">
            {/* Quick Section Anchors for Fast Navigation */}
            <div>
              <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-guide-400 mb-2">
                {chrome.mobileQuickJumpHeading}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {chrome.mobileQuickJumpLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-xl border border-guide-200/80 bg-guide-50/70 p-2.5 text-xs font-bold text-navy hover:bg-lagoon-50 transition-colors"
                  >
                    <span>{link.emoji}</span>
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Guide Pages Navigation */}
            <div>
              <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-guide-400 mb-1">
                {chrome.mobileGuideHeading}
              </p>
              <nav className="flex flex-col divide-y divide-guide-100">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between py-3 text-sm font-semibold transition-colors ${
                        isActive
                          ? "text-ocean-dark font-bold pl-2 border-l-2 border-ocean"
                          : "text-guide-700 hover:text-navy hover:bg-guide-50/60 rounded-lg px-2"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-xs text-guide-400">→</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Booking Button */}
            <div className="pt-2">
              <a
                href={chrome.ticketsCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-navy-light"
              >
                <span>{chrome.mobileBookCtaLabel}</span>
                <span className="text-lagoon-300 font-bold" aria-hidden="true">↗</span>
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
