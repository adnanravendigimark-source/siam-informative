import type { TicketType, TicketPolicyNote } from "@/lib/tickets";

// Admin can set an explicit badge per ticket type; fall back to a
// name-based guess only for older ticket entries saved before the
// badge field existed.
function getTicketBadge(t: TicketType) {
  if (t.badge) return { label: t.badge, color: "bg-lagoon-50 text-ocean-dark border-ocean-border" };
  const n = t.name.toLowerCase();
  if (n.includes("twin")) return { label: "Best Value", color: "bg-gold-50 text-gold-700 border-gold-300/80" };
  if (n.includes("all-inclusive") || n.includes("vip")) return { label: "VIP Experience", color: "bg-purple-50 text-purple-700 border-purple-200" };
  if (n.includes("premium")) return { label: "Popular", color: "bg-lagoon-50 text-ocean-dark border-ocean-border" };
  if (n.includes("standard") || n.includes("1-day")) return { label: "Essential", color: "bg-guide-100 text-guide-700 border-guide-200" };
  return null;
}

export default function PricingTable({ ticketTypes, policyNotes }: { ticketTypes: TicketType[]; policyNotes: TicketPolicyNote[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-guide-200/90 bg-white shadow-card">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-guide-200 bg-gradient-to-r from-guide-100 via-guide-50 to-guide-100 text-guide-800">
              <th className="px-6 py-4 font-display font-bold text-navy">Ticket Category</th>
              <th className="px-6 py-4 font-display font-bold text-navy text-center">Adult (12+)</th>
              <th className="px-6 py-4 font-display font-bold text-navy text-center">Child (3–11)</th>
              <th className="px-6 py-4 font-display font-bold text-navy">Best Suited For</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-guide-100">
            {ticketTypes.map((t) => {
              const badge = getTicketBadge(t);
              return (
                <tr key={t.id} className="hover:bg-lagoon-50/40 transition-colors">
                  <td className="px-6 py-4.5 font-medium text-navy">
                    <div className="flex items-center gap-2.5">
                      <span className="font-display font-bold text-base text-navy">{t.name}</span>
                      {badge && (
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${badge.color}`}>
                          {badge.label}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-guide-500">{t.summary}</div>
                  </td>
                  <td className="px-6 py-4.5 text-center whitespace-nowrap">
                    <span className="inline-flex items-center rounded-xl bg-navy/5 px-3 py-1 font-display font-extrabold text-sm text-navy">
                      {t.priceAdult}
                    </span>
                  </td>
                  <td className="px-6 py-4.5 text-center whitespace-nowrap">
                    <span className="inline-flex items-center rounded-xl bg-guide-100 px-3 py-1 font-semibold text-xs text-guide-700">
                      {t.priceChild}
                    </span>
                  </td>
                  <td className="px-6 py-4.5 text-xs leading-relaxed text-guide-600 max-w-xs">{t.bestFor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Stack View (Eliminates truncation on small screens) */}
      <div className="md:hidden divide-y divide-guide-100">
        {ticketTypes.map((t) => {
          const badge = getTicketBadge(t);
          return (
            <div key={t.id} className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-display font-bold text-base text-navy">{t.name}</h4>
                {badge && (
                  <span className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${badge.color}`}>
                    {badge.label}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-lg bg-navy/5 px-3 py-1.5">
                  <span className="text-[11px] text-guide-500 font-medium">Adult:</span>
                  <span className="font-display font-extrabold text-sm text-navy">{t.priceAdult}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-guide-100 px-3 py-1.5">
                  <span className="text-[11px] text-guide-500 font-medium">Child:</span>
                  <span className="font-bold text-xs text-guide-800">{t.priceChild}</span>
                </div>
              </div>

              <p className="text-xs text-guide-600 leading-relaxed">{t.summary}</p>
              
              <div className="rounded-xl bg-guide-50 p-2.5 text-[11px] text-guide-600 border border-guide-200/60">
                <strong className="text-navy font-bold">Best For: </strong> {t.bestFor}
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Footer Banner */}
      <div className="border-t border-guide-200 bg-gradient-to-r from-guide-50 via-lagoon-50/40 to-guide-50 p-4 sm:px-6 text-xs text-guide-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          {policyNotes.map((note, i) => (
            <p key={note.label} className="flex items-center gap-2">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] ${
                  i % 2 === 0 ? "bg-emerald-100 text-emerald-700" : "bg-gold-100 text-gold-700"
                }`}
                aria-hidden="true"
              >
                {note.icon}
              </span>
              <span>
                <strong className="text-navy font-bold">{note.label}:</strong> {note.body}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
