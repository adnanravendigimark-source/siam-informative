import { withSiteRevalidate } from "@/lib/revalidateSite";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContactPage, saveContactPage, type ContactPageContent } from "@/lib/pages";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getContactPage());
}

async function PUTHandler(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ContactPageContent | null;
    if (!body?.hero?.title?.trim()) {
      return NextResponse.json({ error: "Hero heading is required." }, { status: 400 });
    }
    await saveContactPage(body);
    revalidatePath("/contact");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}

export const PUT = withSiteRevalidate(PUTHandler);
