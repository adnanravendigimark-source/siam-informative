import { TICKET_TYPES } from "@/lib/tickets";

export default function TicketTypeGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TICKET_TYPES.map((t) => (
        <div key={t.id} className="flex flex-col rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-display text-base font-bold text-indigo">{t.name}</p>
          </div>
          <p className="mt-1 text-lg font-bold text-coral">{t.priceAdult}</p>
          <p className="text-xs text-ink-light">Adult · child {t.priceChild}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-light">{t.summary}</p>
          <ul className="mt-3 space-y-1.5 text-xs text-ink-light">
            {t.includes.map((item) => (
              <li key={item} className="flex gap-1.5">
                <span className="mt-0.5 shrink-0 text-coral" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
