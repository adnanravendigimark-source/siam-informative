import { getDiningVenues, getFacilityServices, getRules } from "@/lib/facilities";
import FacilitiesForm from "@/components/admin/FacilitiesForm";

export const dynamic = "force-dynamic";

export default async function AdminFacilitiesPage() {
  const [diningVenues, facilityServices, rules] = await Promise.all([getDiningVenues(), getFacilityServices(), getRules()]);
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Facilities</h1>
      <p className="mt-1 text-sm text-guide-500">
        Dining venues, park amenities, and rules — shown on the Traveler Information page and the Homepage.
      </p>
      <div className="mt-8 max-w-2xl">
        <FacilitiesForm initial={{ diningVenues, facilityServices, rules }} />
      </div>
    </div>
  );
}
