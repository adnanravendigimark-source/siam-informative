import { getHomepage } from "@/lib/pages";
import HomepageForm from "@/components/admin/HomepageForm";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  const homepage = await getHomepage();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Homepage</h1>
      <p className="mt-1 text-sm text-guide-500">
        Hero, stats, and every section heading on the homepage. Ticket prices, visitor tips, and FAQs shown here are
        edited on their own pages — see Tickets & Prices, Visitor Tips, and FAQs in the sidebar.
      </p>
      <div className="mt-8 max-w-2xl">
        <HomepageForm initial={homepage} />
      </div>
    </div>
  );
}
