import { withSiteRevalidate } from "@/lib/revalidateSite";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getFaqs, saveFaqs, type Faq } from "@/lib/faqs";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getFaqs());
}

async function PUTHandler(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Faq[] | null;
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    await saveFaqs(body);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}

export const PUT = withSiteRevalidate(PUTHandler);
