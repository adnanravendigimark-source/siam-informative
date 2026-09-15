import { getTicketTypes, getSeasonalHours, getHolidayNote, getTicketPolicyNotes } from "@/lib/tickets";
import TicketsForm from "@/components/admin/TicketsForm";

export const dynamic = "force-dynamic";

export default async function AdminTicketsPage() {
  const [ticketTypes, seasonalHours, holidayNote, policyNotes] = await Promise.all([
    getTicketTypes(),
    getSeasonalHours(),
    getHolidayNote(),
    getTicketPolicyNotes(),
  ]);
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Tickets & Prices</h1>
      <p className="mt-1 text-sm text-guide-500">Ticket types, pricing, inclusions, and seasonal opening hours — shown on the Homepage.</p>
      <div className="mt-8 max-w-2xl">
        <TicketsForm initial={{ ticketTypes, seasonalHours, holidayNote, policyNotes }} />
      </div>
    </div>
  );
}
