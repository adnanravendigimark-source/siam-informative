import { getAboutPage } from "@/lib/pages";
import AboutPageForm from "@/components/admin/AboutPageForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutPagePage() {
  const page = await getAboutPage();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">About Siam Park</h1>
      <p className="mt-1 text-sm text-guide-500">Hero, article body, key facts, and SEO for /about-siam-park.</p>
      <div className="mt-8 max-w-2xl">
        <AboutPageForm initial={page} />
      </div>
    </div>
  );
}
