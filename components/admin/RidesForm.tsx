"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import { RIDE_CATEGORIES, RIDE_INTENSITIES, type Ride } from "@/lib/rides";

export default function RidesForm({ initial }: { initial: Ride[] }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [rides, setRides] = useState<Ride[]>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const dirty = useMemo(() => JSON.stringify(rides) !== JSON.stringify(initial), [rides, initial]);

  function handleCancel() {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setRides(initial);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/rides", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(rides) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Rides saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title={`Rides & attractions (${rides.length})`} description="Every ride, categorized into thrill / family / relax / kids. Order here is the order shown on the Rides page.">
        <RepeatableList<Ride>
          items={rides}
          onChange={setRides}
          newItem={() => ({
            id: `ride-${Date.now()}`,
            name: "New ride",
            category: "Family & Moderate",
            intensity: "Medium",
            minHeight: "",
            description: "",
            highlights: [],
            rules: "",
          })}
          addLabel="+ Add ride"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name">
                  <input value={item.name} onChange={(e) => update({ ...item, name: e.target.value })} className={inputClass} />
                </Field>
                <Field label="ID (internal, no spaces)">
                  <input value={item.id} onChange={(e) => update({ ...item, id: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Category">
                  <select value={item.category} onChange={(e) => update({ ...item, category: e.target.value as Ride["category"] })} className={inputClass}>
                    {RIDE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Intensity">
                  <select value={item.intensity} onChange={(e) => update({ ...item, intensity: e.target.value as Ride["intensity"] })} className={inputClass}>
                    {RIDE_INTENSITIES.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Minimum height">
                  <input value={item.minHeight} onChange={(e) => update({ ...item, minHeight: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Age recommendation (optional)">
                  <input value={item.ageRecommendation || ""} onChange={(e) => update({ ...item, ageRecommendation: e.target.value })} className={inputClass} />
                </Field>
              </div>
              <Field label="Description">
                <textarea rows={3} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Highlights" hint="One per line.">
                <textarea
                  rows={3}
                  value={item.highlights.join("\n")}
                  onChange={(e) => update({ ...item, highlights: e.target.value.split("\n").filter(Boolean) })}
                  className={inputClass}
                />
              </Field>
              <Field label="Rules">
                <textarea rows={2} value={item.rules} onChange={(e) => update({ ...item, rules: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
