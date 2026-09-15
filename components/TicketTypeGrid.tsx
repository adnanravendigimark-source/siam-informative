import type { TicketType } from "@/lib/tickets";

export default function TicketTypeGrid({ ticketTypes }: { ticketTypes: TicketType[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {ticketTypes.map((t, idx) => {
        const isFeatured = t.featured ?? (t.name.toLowerCase().includes("twin") || t.name.toLowerCase().includes("all-inclusive"));
        return (
          <div
            key={t.id}
            className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
              isFeatured
                ? "border-ocean-cyan/60 bg-gradient-to-b from-white via-lagoon-50/20 to-white shadow-lift ring-1 ring-ocean-cyan/30"
                : "border-guide-200/90 bg-white shadow-card"
            } p-6`}
          >
            {isFeatured && (
              <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-navy to-ocean-dark px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                Recommended
              </div>
            )}

            <div>
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-display text-lg font-bold text-navy group-hover:text-ocean-dark transition-colors">
                  {t.name}
                </h4>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-2xl font-extrabold text-navy">
                  {t.priceAdult}
                </span>
                <span className="text-xs font-semibold text-guide-500">
                  Adult · {t.priceChild} Child
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-guide-600">
                {t.summary}
              </p>

              <div className="mt-5 border-t border-guide-100 pt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-navy">
                  What's Included:
                </p>
                <ul className="mt-2.5 space-y-2 text-xs text-guide-600">
                  {t.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lagoon-100 text-ocean-dark text-[10px] font-bold" aria-hidden="true">
                        ✓
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-guide-50 p-3 text-[11px] text-guide-600 border border-guide-200/70">
              <span className="font-bold text-navy">Best For: </span>
              {t.bestFor}
            </div>
          </div>
        );
      })}
    </div>
  );
}
