import { getInsidePage } from "@/lib/pages";
import InsidePageForm from "@/components/admin/InsidePageForm";

export const dynamic = "force-dynamic";

export default async function AdminInsidePagePage() {
  const page = await getInsidePage();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Rides & Attractions Page</h1>
      <p className="mt-1 text-sm text-guide-500">
        Hero, intro copy, and section text for /inside-siam-park. The ride list itself is edited on the Rides page (sidebar).
      </p>
      <div className="mt-8 max-w-2xl">
        <InsidePageForm initial={page} />
      </div>
    </div>
  );
}
