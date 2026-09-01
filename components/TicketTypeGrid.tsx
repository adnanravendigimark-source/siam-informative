import { TICKET_TYPES } from "@/lib/tickets";

export default function TicketTypeGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TICKET_TYPES.map((t) => (
        <div
          key={t.id}
          className="flex flex-col justify-between rounded-lg border border-guide-200 bg-white p-5 shadow-card"
        >
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="text-base font-bold text-navy">{t.name}</h4>
            </div>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-lg font-bold text-guide-900">{t.priceAdult}</span>
              <span className="text-xs text-guide-500">Adult · {t.priceChild} Child</span>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-guide-600">{t.summary}</p>
            <div className="mt-3.5 border-t border-guide-100 pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-guide-500">Included Features:</p>
              <ul className="mt-2 space-y-1 text-xs text-guide-600">
                {t.includes.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="mt-0.5 text-ocean font-bold text-xs" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 rounded bg-guide-50 p-2.5 text-[11px] text-guide-600 border border-guide-100">
            <span className="font-semibold text-guide-700">Best For: </span>
            {t.bestFor}
          </div>
        </div>
      ))}
    </div>
  );
}
