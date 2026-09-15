import { getHowToReachPage } from "@/lib/pages";
import HowToReachPageForm from "@/components/admin/HowToReachPageForm";

export const dynamic = "force-dynamic";

export default async function AdminHowToReachPagePage() {
  const page = await getHowToReachPage();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">How to Reach</h1>
      <p className="mt-1 text-sm text-guide-500">
        Hero and every prose section for /how-to-reach-siam-park. Shuttle stops and bus routes are edited on the
        Shuttles & Buses page (sidebar).
      </p>
      <div className="mt-8 max-w-2xl">
        <HowToReachPageForm initial={page} />
      </div>
    </div>
  );
}
