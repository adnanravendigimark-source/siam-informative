import { getTips } from "@/lib/tips";
import TipsForm from "@/components/admin/TipsForm";

export const dynamic = "force-dynamic";

export default async function AdminTipsPage() {
  const tips = await getTips();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Visitor Tips</h1>
      <p className="mt-1 text-sm text-guide-500">Practical tips for visitors — shown on the Homepage.</p>
      <div className="mt-8 max-w-2xl">
        <TipsForm initial={tips} />
      </div>
    </div>
  );
}
