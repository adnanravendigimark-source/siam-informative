// Ticket type and pricing reference data — shown on the homepage and
// reused on /traveler-information/. Figures are aggregated from public,
// third-party reporting on Siam Park's admission pricing rather than a
// live feed (this site has no booking backend), so every figure here is
// explicitly labeled as approximate. Always confirm current prices at
// the official ticket page before booking.
export interface TicketType {
  id: string;
  name: string;
  priceAdult: string;
  priceChild: string;
  summary: string;
  includes: string[];
}

export const TICKET_TYPES: TicketType[] = [
  {
    id: "general",
    name: "General Admission",
    priceAdult: "≈ €38–48",
    priceChild: "≈ €26–34",
    summary: "Full-day access to every ride and attraction in the park.",
    includes: [
      "All water slides, the wave pool, and the lazy river",
      "Kids' zones and family attractions",
      "Standard sun loungers and flotation aids",
    ],
  },
  {
    id: "vip",
    name: "VIP Admission",
    priceAdult: "≈ €120–150",
    priceChild: "≈ €80–120",
    summary: "General admission plus priority access and a premium base for the day.",
    includes: [
      "Everything in General Admission",
      "Fast-track access to major rides",
      "VIP seating / lounge area",
      "Discounts on food and drink",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    priceAdult: "≈ €150–205",
    priceChild: "≈ €100–140",
    summary: "The VIP tier with a meal and a souvenir photo bundled in.",
    includes: [
      "Everything in VIP Admission",
      "A meal included during your visit",
      "A souvenir photo package",
    ],
  },
  {
    id: "fast-pass",
    name: "Fast Pass (add-on)",
    priceAdult: "≈ €15–20 / person",
    priceChild: "≈ €15–20 / person",
    summary: "Purchased on top of General or VIP admission to skip queues at busy rides.",
    includes: [
      "Priority queueing at the park's most popular slides",
      "Sold alongside another admission ticket, not standalone",
    ],
  },
  {
    id: "twin",
    name: "Twin Ticket (with Loro Parque)",
    priceAdult: "Varies by provider",
    priceChild: "Varies by provider",
    summary: "Combines Siam Park admission with Loro Parque, the operator's zoo and animal park on the north side of Tenerife.",
    includes: [
      "One-day Siam Park admission",
      "One-day Loro Parque admission (used on a separate visit — the two parks are roughly 45–60 minutes apart by car)",
    ],
  },
];

export interface HoursRow {
  label: string;
  hours: string;
}

export const SEASONAL_HOURS: HoursRow[] = [
  { label: "March – October", hours: "10:00 AM – 6:00 PM" },
  { label: "November – February", hours: "10:00 AM – 5:00 PM" },
];

export const HOLIDAY_NOTE =
  "The park is widely reported to close on Christmas Day each year; other holiday hours can vary. Always confirm before you travel.";
