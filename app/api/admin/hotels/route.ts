import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getHotels, saveHotels, type Hotel } from "@/lib/hotels";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getHotels());
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Hotel[] | null;
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    await saveHotels(body);
    revalidatePath("/things-to-do-near-siam-park");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
