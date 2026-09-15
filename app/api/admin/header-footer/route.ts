import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteChrome, saveSiteChrome, type SiteChromeContent } from "@/lib/siteChrome";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getSiteChrome());
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as SiteChromeContent | null;
    if (!body?.header || !body?.footer || !body?.guideLinks || !Array.isArray(body.guideLinks.links)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    await saveSiteChrome(body);
    // Header/Footer/InternalLinkGrid render on every page, so revalidate the
    // whole layout tree rather than a single path.
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
