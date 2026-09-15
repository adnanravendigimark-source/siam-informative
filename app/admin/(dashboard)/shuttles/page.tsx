import { getShuttleStops, getBusRoutes, getParkingInfo } from "@/lib/shuttles";
import ShuttlesForm from "@/components/admin/ShuttlesForm";

export const dynamic = "force-dynamic";

export default async function AdminShuttlesPage() {
  const [shuttleStops, busRoutes, parking] = await Promise.all([getShuttleStops(), getBusRoutes(), getParkingInfo()]);
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Shuttles & Buses</h1>
      <p className="mt-1 text-sm text-guide-500">
        Free shuttle stops, TITSA bus routes, and parking — shown on the How to Reach page and the Homepage.
      </p>
      <div className="mt-8 max-w-2xl">
        <ShuttlesForm initial={{ shuttleStops, busRoutes, parking }} />
      </div>
    </div>
  );
}
