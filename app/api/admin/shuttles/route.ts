import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getShuttleStops, getBusRoutes, getParkingInfo, saveShuttlesPage, type ShuttleStop, type BusRoute, type ParkingInfo } from "@/lib/shuttles";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [shuttleStops, busRoutes, parking] = await Promise.all([getShuttleStops(), getBusRoutes(), getParkingInfo()]);
  return NextResponse.json({ shuttleStops, busRoutes, parking });
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as { shuttleStops: ShuttleStop[]; busRoutes: BusRoute[]; parking: ParkingInfo } | null;
    if (!body || !Array.isArray(body.shuttleStops) || !Array.isArray(body.busRoutes) || !body.parking) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    await saveShuttlesPage(body);
    revalidatePath("/");
    revalidatePath("/how-to-reach-siam-park");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
