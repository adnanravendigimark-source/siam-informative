import { sql, getSiteContentRow, dbErrorMessage } from "./db";

export interface TicketType {
  id: string;
  name: string;
  priceAdult: string;
  priceChild: string;
  summary: string;
  includes: string[];
  bestFor: string;
  badge?: string;
  featured?: boolean;
}

export interface TicketPolicyNote {
  icon: string;
  label: string;
  body: string;
}

export interface HoursRow {
  label: string;
  hours: string;
  season: string;
}

export const DEFAULT_TICKET_TYPES: TicketType[] = [
  {
    id: "general",
    name: "General Admission (1 Day)",
    badge: "Essential",
    priceAdult: "€42.00 – €45.00",
    priceChild: "€30.00 – €32.00 (Age 3–11)",
    summary: "Standard full-day entry covering every water slide, wave pool, lazy river, and kids play zone in the park.",
    includes: [
      "Access to all 16+ water slides and thrill rides",
      "Siam Beach and Wave Palace wave pool",
      "Mai Thai River lazy river and kids zones",
      "Complimentary sun loungers, umbrellas, and lifejackets",
      "Free entry for infants under 3 years old",
    ],
    bestFor: "First-time visitors and budget-conscious travelers wanting full access.",
  },
  {
    id: "twin",
    name: "Twin Ticket (Siam Park + Loro Parque)",
    badge: "Best Value",
    featured: true,
    priceAdult: "€74.00 – €76.00",
    priceChild: "€53.00 – €55.00 (Age 3–11)",
    summary: "Combined pass granting 1 day at Siam Park (Costa Adeje) and 1 day at Loro Parque (Puerto de la Cruz). Valid for 15 days from first use.",
    includes: [
      "1 full day at Siam Park",
      "1 full day at Loro Parque zoo in the north",
      "Save ~€12–15 compared to buying tickets individually",
      "Tickets do not need to be used on consecutive days",
    ],
    bestFor: "Travelers planning to visit both of Tenerife's world-class theme parks.",
  },
  {
    id: "premium",
    name: "Premium Ticket",
    badge: "Popular",
    priceAdult: "€65.00 – €70.00",
    priceChild: "€48.00 – €52.00",
    summary: "Upgrades general admission with a dining voucher at the Beach Club buffet restaurant, towel hire, and locker rental.",
    includes: ["Standard park admission", "Lunch voucher (€15 credit for adult / €9 for child)", "Locker rental included", "Towel hire included"],
    bestFor: "Visitors wanting a hassle-free all-in-one package without carrying extra cash for lunch and locker.",
  },
  {
    id: "all-inclusive",
    name: "All-Inclusive Deluxe Ticket",
    badge: "VIP Experience",
    featured: true,
    priceAdult: "€154.00 – €160.00",
    priceChild: "€105.00 – €110.00",
    summary: "The ultimate VIP day pass including unlimited food & drinks all day, locker, towel, and a Fast Pass wristband for major rides.",
    includes: [
      "General admission ticket",
      "Fast Pass wristband (priority access to major slides)",
      "All-day unlimited dining and soft drinks at select eateries",
      "Locker rental and towel hire included",
      "Beer and non-alcoholic beverages all day",
    ],
    bestFor: "Guests visiting during peak summer season who want to maximize ride time and skip queues.",
  },
  {
    id: "fast-pass",
    name: "Fast Pass Wristband (Add-On)",
    priceAdult: "€15.00 – €28.00",
    priceChild: "€15.00 – €28.00",
    summary: "Add-on wristband allowing one priority queue access on each participating major ride (excluding Tower of Power).",
    includes: [
      "1-time priority queue access per participating slide",
      "Valid either for morning (opening–2pm) or afternoon (2pm–closing) slot depending on season",
      "Can only be purchased inside the park at the main photo desk on the day of visit (limited daily quantity)",
    ],
    bestFor: "Peak season visitors who purchased general tickets and want to reduce queue times on busy days.",
  },
  {
    id: "vip-cabana",
    name: "VIP Cabana (Up to 4 Guests)",
    priceAdult: "€510.00 – €550.00 / cabana",
    priceChild: "Included in cabana cap",
    summary: "Private Thai-style wooden cabana for 4 people with plush sofas, TV, fan, mini-bar, unlimited food/drinks, and Fast Pass wristbands.",
    includes: [
      "Admission for up to 4 guests",
      "Private shaded cabana with sun loungers on Siam Beach",
      "All-Inclusive food and beverage service all day",
      "Fast Pass wristbands for all 4 occupants",
      "Private locker, towels, and mini-fridge with drinks",
    ],
    bestFor: "Families or small groups seeking privacy, luxury, and maximum relaxation.",
  },
  {
    id: "vip-villa",
    name: "VIP House & Villa (Up to 6–8 Guests)",
    priceAdult: "€820.00 – €1,200.00 / unit",
    priceChild: "Included in villa cap",
    summary: "Exclusive private luxury house or villa equipped with a private outdoor hydromassage jacuzzi, dining terrace, shower, and dedicated VIP host.",
    includes: [
      "Admission for 6 to 8 guests",
      "Private outdoor hot tub / jacuzzi overlooking the wave pool",
      "All-Inclusive dining, cocktails, and premium beverages",
      "Unlimited Fast Pass wristbands for all occupants",
      "Private bathroom, shower, television, and hammocks",
    ],
    bestFor: "Celebrations, large families, and luxury VIP groups wanting the finest water park experience in Europe.",
  },
  {
    id: "resident",
    name: "Canary Islands Resident Rate",
    priceAdult: "€21.00 – €23.00",
    priceChild: "€15.00 – €17.00",
    summary: "Discounted admission for official residents of the Canary Islands upon presenting a valid DNI/NIE and empadronamiento certificate.",
    includes: [
      "Full standard 1-day park admission",
      "Available to Spanish and EU citizens officially registered as Canary residents",
      "ID must be presented at the ticket gates for each visitor",
    ],
    bestFor: "Local Canary Island residents and expats living in Tenerife.",
  },
];

export const DEFAULT_SEASONAL_HOURS: HoursRow[] = [
  { label: "Summer Season (May 1 – Oct 31)", hours: "10:00 AM – 6:00 PM", season: "Peak summer hours with daily wave pool and full restaurant services." },
  { label: "Winter Season (Nov 1 – Apr 30)", hours: "10:00 AM – 5:00 PM", season: "Winter schedule. All water is heated to 24–25°C throughout the park." },
];

export const DEFAULT_HOLIDAY_NOTE =
  "Siam Park is open 365 days a year (including weekends and public holidays), but is widely reported to close on Christmas Day (Dec 25). Special night sessions (Siam Night) run on selected July and August weekends from 8:00 PM to 12:00 midnight.";

export const DEFAULT_TICKET_POLICY_NOTES: TicketPolicyNote[] = [
  { icon: "✓", label: "Infants (0–2)", body: "100% Free Entry (no ticket needed)." },
  { icon: "★", label: "Canary Residents", body: "~50% local discount with valid NIE & empadronamiento." },
];

export async function getTicketTypes(): Promise<TicketType[]> {
  const row = await getSiteContentRow();
  const data = row?.tickets_json;
  return Array.isArray(data) && data.length ? data : DEFAULT_TICKET_TYPES;
}

export async function getSeasonalHours(): Promise<HoursRow[]> {
  const row = await getSiteContentRow();
  const data = row?.seasonal_hours_json;
  return Array.isArray(data) && data.length ? data : DEFAULT_SEASONAL_HOURS;
}

export async function getHolidayNote(): Promise<string> {
  const row = await getSiteContentRow();
  return typeof row?.holiday_note === "string" && row.holiday_note.trim() ? row.holiday_note : DEFAULT_HOLIDAY_NOTE;
}

export async function getTicketPolicyNotes(): Promise<TicketPolicyNote[]> {
  const row = await getSiteContentRow();
  const data = row?.ticket_policy_notes_json;
  return Array.isArray(data) && data.length ? data : DEFAULT_TICKET_POLICY_NOTES;
}

export async function saveTicketsPage(data: {
  ticketTypes: TicketType[];
  seasonalHours: HoursRow[];
  holidayNote: string;
  policyNotes: TicketPolicyNote[];
}): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, tickets_json, seasonal_hours_json, holiday_note, ticket_policy_notes_json, updated_at)
      VALUES (1, ${JSON.stringify(data.ticketTypes)}::jsonb, ${JSON.stringify(data.seasonalHours)}::jsonb, ${data.holidayNote}, ${JSON.stringify(data.policyNotes)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET
        tickets_json = EXCLUDED.tickets_json,
        seasonal_hours_json = EXCLUDED.seasonal_hours_json,
        holiday_note = EXCLUDED.holiday_note,
        ticket_policy_notes_json = EXCLUDED.ticket_policy_notes_json,
        updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

// Back-compat plain constants (built-in defaults only, not admin edits).
export const TICKET_TYPES = DEFAULT_TICKET_TYPES;
export const SEASONAL_HOURS = DEFAULT_SEASONAL_HOURS;
export const HOLIDAY_NOTE = DEFAULT_HOLIDAY_NOTE;
