import { withSiteRevalidate } from "@/lib/revalidateSite";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPrivacyPage, savePrivacyPage, type PrivacyPageContent } from "@/lib/pages";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPrivacyPage());
}

async function PUTHandler(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as PrivacyPageContent | null;
    if (!body?.bodyHtml?.trim()) {
      return NextResponse.json({ error: "Policy body is required." }, { status: 400 });
    }
    await savePrivacyPage(body);
    revalidatePath("/privacy-policy");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}

export const PUT = withSiteRevalidate(PUTHandler);
