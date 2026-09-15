import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getTicketTypes,
  getSeasonalHours,
  getHolidayNote,
  getTicketPolicyNotes,
  saveTicketsPage,
  type TicketType,
  type HoursRow,
  type TicketPolicyNote,
} from "@/lib/tickets";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [ticketTypes, seasonalHours, holidayNote, policyNotes] = await Promise.all([
    getTicketTypes(),
    getSeasonalHours(),
    getHolidayNote(),
    getTicketPolicyNotes(),
  ]);
  return NextResponse.json({ ticketTypes, seasonalHours, holidayNote, policyNotes });
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      ticketTypes: TicketType[];
      seasonalHours: HoursRow[];
      holidayNote: string;
      policyNotes: TicketPolicyNote[];
    } | null;
    if (!body || !Array.isArray(body.ticketTypes) || !Array.isArray(body.seasonalHours) || !Array.isArray(body.policyNotes)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    await saveTicketsPage(body);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
