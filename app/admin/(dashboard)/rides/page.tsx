import { getRides } from "@/lib/rides";
import RidesForm from "@/components/admin/RidesForm";

export const dynamic = "force-dynamic";

export default async function AdminRidesPage() {
  const rides = await getRides();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Rides</h1>
      <p className="mt-1 text-sm text-guide-500">
        Every ride and attraction — shown on the Rides & Attractions page and the Homepage.
      </p>
      <div className="mt-8 max-w-2xl">
        <RidesForm initial={rides} />
      </div>
    </div>
  );
}
