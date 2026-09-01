import { TICKET_TYPES } from "@/lib/tickets";

export default function PricingTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-guide-200 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-guide-200 bg-guide-100/80 text-guide-800">
              <th className="px-4 py-3.5 font-semibold sm:px-6">Ticket Category</th>
              <th className="px-4 py-3.5 font-semibold">Adult (12+)</th>
              <th className="px-4 py-3.5 font-semibold">Child (3–11)</th>
              <th className="hidden px-4 py-3.5 font-semibold md:table-cell sm:px-6">Ideal For</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-guide-100">
            {TICKET_TYPES.map((t) => (
              <tr key={t.id} className="hover:bg-guide-50/50 transition-colors">
                <td className="px-4 py-3.5 font-medium text-navy sm:px-6">
                  <div className="font-bold">{t.name}</div>
                  <div className="mt-0.5 text-xs text-guide-500 md:hidden">{t.summary}</div>
                </td>
                <td className="px-4 py-3.5 font-semibold text-guide-900 whitespace-nowrap">{t.priceAdult}</td>
                <td className="px-4 py-3.5 text-guide-600 whitespace-nowrap">{t.priceChild}</td>
                <td className="hidden px-4 py-3.5 text-xs text-guide-600 md:table-cell sm:px-6">{t.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-guide-200 bg-guide-50 px-4 py-3 text-xs text-guide-600 sm:px-6">
        <p>
          <strong className="text-guide-800">Infants:</strong> Children under 3 years of age receive free entry. 
          <strong className="ml-3 text-guide-800">Canary Residents:</strong> Official residents receive discounted rates (~50% off) with valid DNI/NIE and empadronamiento.
        </p>
      </div>
    </div>
  );
}
