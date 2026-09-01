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
            className="overflow-hidden rounded-lg border border-guide-200 bg-white transition-colors"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left hover:bg-guide-50/50 transition-colors"
            >
              <span className="text-sm font-bold text-navy sm:text-[15px]">
                {faq.question}
              </span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-semibold transition-transform ${
                  open ? "bg-ocean-light text-ocean-dark rotate-45" : "bg-guide-100 text-guide-600"
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {open && (
              <div className="border-t border-guide-100 px-4 pb-4 pt-3 text-xs leading-relaxed text-guide-600 sm:px-5 sm:pb-5 sm:text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
