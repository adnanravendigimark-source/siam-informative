"use client";

import { useState } from "react";

// Wraps a whole independent form (its own <form>, its own Save button) as
// one big collapsible block, for admin pages that stack several complete,
// self-contained editors on one page (e.g. a public page's hero/prose form
// next to the Rides list editor). SectionCard (FormKit.tsx) handles
// collapsing within a single form; this handles collapsing between them —
// nesting a <form> inside another <form> isn't valid HTML, so these stay
// siblings rather than being merged into one mega-form.
export default function CollapsibleBlock({
  title,
  description,
  badge,
  defaultOpen = false,
  children,
}: {
  title: string;
  description?: string;
  badge?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-guide-200 bg-guide-50/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-guide-100/60 sm:px-6"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5">
          <span className="font-display text-base font-bold text-guide-900">{title}</span>
          {badge && (
            <span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy">
              {badge}
            </span>
          )}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 shrink-0 text-guide-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {description && !open && <p className="px-5 pb-4 -mt-2 text-xs text-guide-500 sm:px-6">{description}</p>}
      {open && <div className="border-t border-guide-200 bg-white px-5 py-6 sm:px-6">{children}</div>}
    </div>
  );
}
