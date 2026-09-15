import { getThingsToDoPage } from "@/lib/pages";
import ThingsToDoPageForm from "@/components/admin/ThingsToDoPageForm";

export const dynamic = "force-dynamic";

export default async function AdminThingsToDoPagePage() {
  const page = await getThingsToDoPage();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Things to Do Near</h1>
      <p className="mt-1 text-sm text-guide-500">
        Hero, nearby attractions, and prose sections for /things-to-do-near-siam-park. Hotel cards are edited on the
        Hotels page (sidebar).
      </p>
      <div className="mt-8 max-w-2xl">
        <ThingsToDoPageForm initial={page} />
      </div>
    </div>
  );
}
