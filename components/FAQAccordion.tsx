"use client";

import { useState } from "react";
import type { Faq } from "@/lib/faqs";

export default function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div
            key={faq.question}
            className={`overflow-hidden rounded-xl border bg-white transition-colors ${
              open ? "border-coral shadow-card" : "border-ink/10"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-display text-[15px] font-bold text-indigo sm:text-base">
                {faq.question}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-transform ${
                  open ? "rotate-45 bg-coral text-white" : "bg-cream-100 text-indigo"
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {open && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-ink-light">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
