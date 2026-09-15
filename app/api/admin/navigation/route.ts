import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getNav, saveNav, type NavContent } from "@/lib/nav";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getNav());
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as NavContent | null;
    if (!body || !Array.isArray(body.navLinks) || !Array.isArray(body.footerLinks)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    await saveNav(body);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
