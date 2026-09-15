"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { DiningVenue, FacilityService, RulesAndRestrictions } from "@/lib/facilities";

type FacilitiesPageData = { diningVenues: DiningVenue[]; facilityServices: FacilityService[]; rules: RulesAndRestrictions };

export default function FacilitiesForm({ initial }: { initial: FacilitiesPageData }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<FacilitiesPageData>(initial);
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
    const res = await fetch("/api/admin/facilities", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Facilities saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title="Dining venues" description="Restaurants and bars shown on the homepage and Traveler Information page.">
        <RepeatableList<DiningVenue>
          items={data.diningVenues}
          onChange={(diningVenues) => setData((d) => ({ ...d, diningVenues }))}
          newItem={() => ({ name: "New venue", type: "", location: "", description: "", popularItems: [] })}
          addLabel="+ Add dining venue"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name">
                  <input value={item.name} onChange={(e) => update({ ...item, name: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Type">
                  <input value={item.type} onChange={(e) => update({ ...item, type: e.target.value })} className={inputClass} />
                </Field>
              </div>
              <Field label="Location">
                <input value={item.location} onChange={(e) => update({ ...item, location: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Description">
                <textarea rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Popular items" hint="One per line.">
                <textarea
                  rows={3}
                  value={item.popularItems.join("\n")}
                  onChange={(e) => update({ ...item, popularItems: e.target.value.split("\n").filter(Boolean) })}
                  className={inputClass}
                />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="Facility services" description="The amenity cards shown on the homepage Facilities section.">
        <RepeatableList<FacilityService>
          items={data.facilityServices}
          onChange={(facilityServices) => setData((d) => ({ ...d, facilityServices }))}
          newItem={() => ({ title: "New service", details: "" })}
          addLabel="+ Add service"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <Field label="Title">
                <input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Details">
                <textarea rows={2} value={item.details} onChange={(e) => update({ ...item, details: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="Park rules" description="Referenced on the homepage, Traveler Information page, and Rides page.">
        <Field label="Outside food & beverage policy">
          <textarea rows={3} value={data.rules.outsideFood} onChange={(e) => setData((d) => ({ ...d, rules: { ...d.rules, outsideFood: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Swimwear policy">
          <textarea rows={3} value={data.rules.swimwear} onChange={(e) => setData((d) => ({ ...d, rules: { ...d.rules, swimwear: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Footwear policy">
          <textarea rows={3} value={data.rules.footwear} onChange={(e) => setData((d) => ({ ...d, rules: { ...d.rules, footwear: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Cameras policy">
          <textarea rows={3} value={data.rules.cameras} onChange={(e) => setData((d) => ({ ...d, rules: { ...d.rules, cameras: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Height checks policy">
          <textarea rows={2} value={data.rules.heightChecks} onChange={(e) => setData((d) => ({ ...d, rules: { ...d.rules, heightChecks: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
