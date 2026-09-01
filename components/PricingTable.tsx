import { TICKET_TYPES } from "@/lib/tickets";

export default function PricingTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-indigo text-white">
            <th className="px-4 py-3.5 font-semibold sm:px-6">Ticket Type</th>
            <th className="px-4 py-3.5 font-semibold sm:px-6">Adult</th>
            <th className="hidden px-4 py-3.5 font-semibold sm:table-cell sm:px-6">Child (3–11)</th>
          </tr>
        </thead>
        <tbody>
          {TICKET_TYPES.map((t, i) => (
            <tr key={t.id} className={i % 2 === 0 ? "bg-white" : "bg-cream-100"}>
              <td className="px-4 py-3.5 font-semibold text-indigo sm:px-6">{t.name}</td>
              <td className="px-4 py-3.5 font-bold text-coral sm:px-6">{t.priceAdult}</td>
              <td className="hidden px-4 py-3.5 text-ink-light sm:table-cell sm:px-6">{t.priceChild}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-ink/10 bg-cream-100 px-4 py-3 text-xs text-ink-light sm:px-6">
        Prices are approximate, aggregated from public reporting, and change by season — always confirm the current rate on the official ticket page before booking.
      </p>
    </div>
  );
}
