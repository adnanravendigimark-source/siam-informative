import { getPrivacyPage } from "@/lib/pages";
import PrivacyPageForm from "@/components/admin/PrivacyPageForm";

export const dynamic = "force-dynamic";

export default async function AdminPrivacyPagePage() {
  const page = await getPrivacyPage();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Privacy Policy</h1>
      <p className="mt-1 text-sm text-guide-500">The full policy body and SEO for /privacy-policy.</p>
      <div className="mt-8 max-w-2xl">
        <PrivacyPageForm initial={page} />
      </div>
    </div>
  );
}
