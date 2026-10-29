import { withSiteRevalidate } from "@/lib/revalidateSite";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDiningVenues, getFacilityServices, getRules, saveFacilitiesPage, type DiningVenue, type FacilityService, type RulesAndRestrictions } from "@/lib/facilities";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [diningVenues, facilityServices, rules] = await Promise.all([getDiningVenues(), getFacilityServices(), getRules()]);
  return NextResponse.json({ diningVenues, facilityServices, rules });
}

async function PUTHandler(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as { diningVenues: DiningVenue[]; facilityServices: FacilityService[]; rules: RulesAndRestrictions } | null;
    if (!body || !Array.isArray(body.diningVenues) || !Array.isArray(body.facilityServices) || !body.rules) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    await saveFacilitiesPage(body);
    revalidatePath("/");
    revalidatePath("/traveler-information");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}

export const PUT = withSiteRevalidate(PUTHandler);
