"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Container from "./Container";
import { NAV_LINKS } from "@/lib/nav";
import { SITE_NAME } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-guide-200 bg-white/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between sm:h-18">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-navy sm:text-base">
              {SITE_NAME}
            </span>
            <span className="text-[11px] font-medium text-guide-500 hidden sm:inline">
              Independent Visitor & Travel Guide
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-guide-600 transition-colors hover:text-ocean-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-guide-200 text-guide-700 hover:bg-guide-100 lg:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </Container>

      {open && (
        <nav className="border-t border-guide-200 bg-white lg:hidden">
          <Container className="flex flex-col py-2 divide-y divide-guide-100">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-guide-800 hover:text-ocean-dark"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
