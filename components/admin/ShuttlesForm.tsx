"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { ShuttleStop, BusRoute, ParkingInfo } from "@/lib/shuttles";

type ShuttlesPageData = { shuttleStops: ShuttleStop[]; busRoutes: BusRoute[]; parking: ParkingInfo };

export default function ShuttlesForm({ initial }: { initial: ShuttlesPageData }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<ShuttlesPageData>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const dirty = useMemo(() => JSON.stringify(data) !== JSON.stringify(initial), [data, initial]);

  function handleCancel() {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setData(initial);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/shuttles", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Shuttles saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title="Free shuttle bus stops">
        <RepeatableList<ShuttleStop>
          items={data.shuttleStops}
          onChange={(shuttleStops) => setData((d) => ({ ...d, shuttleStops }))}
          newItem={() => ({ area: "", location: "", notes: "" })}
          addLabel="+ Add stop"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Area">
                  <input value={item.area} onChange={(e) => update({ ...item, area: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Location">
                  <input value={item.location} onChange={(e) => update({ ...item, location: e.target.value })} className={inputClass} />
                </Field>
              </div>
              <Field label="Notes">
                <input value={item.notes} onChange={(e) => update({ ...item, notes: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="TITSA public bus routes">
        <RepeatableList<BusRoute>
          items={data.busRoutes}
          onChange={(busRoutes) => setData((d) => ({ ...d, busRoutes }))}
          newItem={() => ({ number: "", origin: "", destination: "", frequency: "", notes: "" })}
          addLabel="+ Add route"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Line number">
                  <input value={item.number} onChange={(e) => update({ ...item, number: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Frequency">
                  <input value={item.frequency} onChange={(e) => update({ ...item, frequency: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Origin">
                  <input value={item.origin} onChange={(e) => update({ ...item, origin: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Destination">
                  <input value={item.destination} onChange={(e) => update({ ...item, destination: e.target.value })} className={inputClass} />
                </Field>
              </div>
              <Field label="Notes">
                <input value={item.notes} onChange={(e) => update({ ...item, notes: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="Parking">
        <Field label="Daily fee">
          <input value={data.parking.fee} onChange={(e) => setData((d) => ({ ...d, parking: { ...d.parking, fee: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Capacity">
          <input value={data.parking.capacity} onChange={(e) => setData((d) => ({ ...d, parking: { ...d.parking, capacity: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Disabled parking">
          <input value={data.parking.disabledParking} onChange={(e) => setData((d) => ({ ...d, parking: { ...d.parking, disabledParking: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Operating hours">
          <input value={data.parking.operatingHours} onChange={(e) => setData((d) => ({ ...d, parking: { ...d.parking, operatingHours: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="EV charging">
          <input value={data.parking.evCharging} onChange={(e) => setData((d) => ({ ...d, parking: { ...d.parking, evCharging: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
