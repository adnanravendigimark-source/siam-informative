import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteSettings, saveSiteSettings, type SiteSettings } from "@/lib/site";
import { dbErrorMessage } from "@/lib/db";

// Force this route to always run live rather than get statically
// optimized at build time — same reasoning on every /api/admin/* route.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getSiteSettings());
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as SiteSettings | null;
    if (!body || !body.siteName?.trim()) {
      return NextResponse.json({ error: "Site name is required." }, { status: 400 });
    }
    await saveSiteSettings(body);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
