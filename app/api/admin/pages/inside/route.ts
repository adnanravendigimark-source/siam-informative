import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getInsidePage, saveInsidePage, type InsidePageContent } from "@/lib/pages";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getInsidePage());
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as InsidePageContent | null;
    if (!body?.hero?.title?.trim()) {
      return NextResponse.json({ error: "Hero heading is required." }, { status: 400 });
    }
    await saveInsidePage(body);
    revalidatePath("/inside-siam-park");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
