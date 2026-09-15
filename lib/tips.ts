import { sql, getSiteContentRow, dbErrorMessage } from "./db";

export interface Tip {
  icon: string;
  title: string;
  body: string;
}

export const DEFAULT_VISITOR_TIPS: Tip[] = [
  { icon: "👕", title: "What to Wear", body: "Swimwear under comfortable clothes, plus water-friendly sandals — park surfaces get wet and some paths are uneven underfoot." },
  { icon: "☀️", title: "Sun Protection", body: "Shade is limited around the pools. Reef-safe sunscreen, a hat, and sunglasses make a real difference over a full day outdoors." },
  { icon: "🔒", title: "Lockers & Towels", body: "Lockers are available to rent inside the park. Bring your own towel if you'd rather not pay to rent one on-site." },
  { icon: "♿", title: "Accessibility", body: "Large water parks built into hillside terrain can involve slopes and stairs between zones — if mobility is a concern, it's worth checking current accessibility details directly with the park before you go." },
  { icon: "🍽️", title: "Dining On-Site", body: "Multiple restaurants and snack bars are spread throughout the park, from quick bites to sit-down meals — no need to leave for lunch." },
  { icon: "📸", title: "Photography", body: "A waterproof phone pouch or action camera is worth bringing if you want photos on the slides and in the wave pool." },
];

export async function getTips(): Promise<Tip[]> {
  const row = await getSiteContentRow();
  const data = row?.tips_json;
  return Array.isArray(data) && data.length ? data : DEFAULT_VISITOR_TIPS;
}

export async function saveTips(data: Tip[]): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, tips_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET tips_json = EXCLUDED.tips_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

// Back-compat plain constant (built-in defaults only, not admin edits).
export const VISITOR_TIPS = DEFAULT_VISITOR_TIPS;
