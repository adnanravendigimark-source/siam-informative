import { getTravelerPage } from "@/lib/pages";
import TravelerPageForm from "@/components/admin/TravelerPageForm";

export const dynamic = "force-dynamic";

export default async function AdminTravelerPagePage() {
  const page = await getTravelerPage();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Traveler Information</h1>
      <p className="mt-1 text-sm text-guide-500">
        Hero and every prose section for /traveler-information. Dining venues and park rules are edited on the
        Facilities page (sidebar).
      </p>
      <div className="mt-8 max-w-2xl">
        <TravelerPageForm initial={page} />
      </div>
    </div>
  );
}
