import { getContactPage } from "@/lib/pages";
import ContactPageForm from "@/components/admin/ContactPageForm";

export const dynamic = "force-dynamic";

export default async function AdminContactPagePage() {
  const page = await getContactPage();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Contact Page</h1>
      <p className="mt-1 text-sm text-guide-500">Hero, email card, quick answers, and SEO for /contact.</p>
      <div className="mt-8 max-w-2xl">
        <ContactPageForm initial={page} />
      </div>
    </div>
  );
}
