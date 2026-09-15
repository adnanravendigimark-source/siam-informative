import { getImages } from "@/lib/images";
import ImagesForm from "@/components/admin/ImagesForm";

export const dynamic = "force-dynamic";

export default async function AdminImagesPage() {
  const images = await getImages();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Images</h1>
      <p className="mt-1 text-sm text-guide-500">Every photo used across the site — swap the URL to replace it without a redeploy.</p>
      <div className="mt-8 max-w-2xl">
        <ImagesForm initial={images} />
      </div>
    </div>
  );
}
