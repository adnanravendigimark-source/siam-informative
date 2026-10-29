import { withSiteRevalidate } from "@/lib/revalidateSite";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getFactsPage, saveFactsPage, type FactsPageContent } from "@/lib/pages";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getFactsPage());
}

async function PUTHandler(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as FactsPageContent | null;
    if (!body?.hero?.title?.trim()) {
      return NextResponse.json({ error: "Hero heading is required." }, { status: 400 });
    }
    await saveFactsPage(body);
    revalidatePath("/interesting-facts-about-siam-park");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}

export const PUT = withSiteRevalidate(PUTHandler);
