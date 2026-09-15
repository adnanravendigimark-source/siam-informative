"use client";

import { useState, useMemo } from "react";
import type { Faq } from "@/lib/faqs";

export default function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return ["All", ...Array.from(set)];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    if (selectedCategory === "All") return faqs;
    return faqs.filter((f) => f.category === selectedCategory);
  }, [faqs, selectedCategory]);

  return (
    <div>
      {/* Category Pills */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(0);
              }}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-navy text-white shadow-sm"
                  : "bg-white text-guide-600 border border-guide-200/80 hover:bg-lagoon-50 hover:text-navy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Accordion Items */}
      <div className="space-y-3.5">
        {filteredFaqs.map((faq, i) => {
          const open = openIndex === i;
          return (
            <div
              key={faq.question}
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                open
                  ? "border-ocean-cyan/60 bg-white shadow-lift ring-1 ring-ocean-cyan/20"
                  : "border-guide-200/90 bg-white/95 shadow-card hover:border-guide-300"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-display text-sm font-bold text-navy sm:text-base">
                    {faq.question}
                  </span>
                  {faq.category && (
                    <span className="inline-block w-fit rounded-full bg-guide-100 px-2 py-0.5 text-[10px] font-bold text-guide-600 uppercase tracking-wider">
                      {faq.category}
                    </span>
                  )}
                </div>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 ${
                    open
                      ? "bg-navy text-white rotate-180 shadow-xs"
                      : "bg-guide-100 text-guide-600 hover:bg-guide-200"
                  }`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>
              {open && (
                <div className="border-t border-guide-100/80 bg-gradient-to-b from-white to-guide-50/40 px-5 pb-5 pt-4 text-xs leading-relaxed text-guide-600 sm:px-6 sm:pb-6 sm:text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
