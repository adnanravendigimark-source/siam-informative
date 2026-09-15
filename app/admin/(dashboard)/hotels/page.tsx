import { getHotels } from "@/lib/hotels";
import HotelsForm from "@/components/admin/HotelsForm";

export const dynamic = "force-dynamic";

export default async function AdminHotelsPage() {
  const hotels = await getHotels();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Hotels</h1>
      <p className="mt-1 text-sm text-guide-500">Nearby hotel recommendations — shown on the Things to Do Near page.</p>
      <div className="mt-8 max-w-2xl">
        <HotelsForm initial={hotels} />
      </div>
    </div>
  );
}
