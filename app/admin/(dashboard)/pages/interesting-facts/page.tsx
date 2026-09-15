import { getFactsPage } from "@/lib/pages";
import FactsPageForm from "@/components/admin/FactsPageForm";

export const dynamic = "force-dynamic";

export default async function AdminFactsPagePage() {
  const page = await getFactsPage();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Interesting Facts</h1>
      <p className="mt-1 text-sm text-guide-500">Hero, facts list, fact-check callout, and SEO for /interesting-facts-about-siam-park.</p>
      <div className="mt-8 max-w-2xl">
        <FactsPageForm initial={page} />
      </div>
    </div>
  );
}
