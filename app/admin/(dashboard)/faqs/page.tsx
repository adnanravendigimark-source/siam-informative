import { getFaqs } from "@/lib/faqs";
import FaqsForm from "@/components/admin/FaqsForm";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const faqs = await getFaqs();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">FAQs</h1>
      <p className="mt-1 text-sm text-guide-500">Frequently asked questions — shown on the Homepage.</p>
      <div className="mt-8 max-w-2xl">
        <FaqsForm initial={faqs} />
      </div>
    </div>
  );
}
