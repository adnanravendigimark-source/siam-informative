import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getImages, saveImages, IMAGE_KEYS, type ImagesContent } from "@/lib/images";
import { dbErrorMessage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getImages());
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ImagesContent | null;
    if (!body || IMAGE_KEYS.some((key) => !body[key]?.src)) {
      return NextResponse.json({ error: "Every image needs a URL." }, { status: 400 });
    }
    await saveImages(body);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
