import { withSiteRevalidate } from "@/lib/revalidateSite";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getTips, saveTips, type Tip } from "@/lib/tips";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getTips());
}

async function PUTHandler(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Tip[] | null;
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    await saveTips(body);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}

export const PUT = withSiteRevalidate(PUTHandler);
