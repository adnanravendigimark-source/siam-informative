import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getRides, saveRides, type Ride } from "@/lib/rides";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getRides());
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Ride[] | null;
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    await saveRides(body);
    revalidatePath("/");
    revalidatePath("/inside-siam-park");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
