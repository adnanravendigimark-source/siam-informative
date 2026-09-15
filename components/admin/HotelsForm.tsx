"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import { HOTEL_CATEGORIES, type Hotel } from "@/lib/hotels";

export default function HotelsForm({ initial }: { initial: Hotel[] }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [hotels, setHotels] = useState<Hotel[]>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const dirty = useMemo(() => JSON.stringify(hotels) !== JSON.stringify(initial), [hotels, initial]);

  function handleCancel() {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setHotels(initial);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/hotels", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(hotels) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Hotels saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title={`Nearby hotels (${hotels.length})`}>
        <RepeatableList<Hotel>
          items={hotels}
          onChange={setHotels}
          newItem={() => ({ name: "New hotel", category: "Family Resort 4-Star", distance: "", description: "", features: [] })}
          addLabel="+ Add hotel"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name">
                  <input value={item.name} onChange={(e) => update({ ...item, name: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Category">
                  <select value={item.category} onChange={(e) => update({ ...item, category: e.target.value as Hotel["category"] })} className={inputClass}>
                    {HOTEL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Distance">
                <input value={item.distance} onChange={(e) => update({ ...item, distance: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Description">
                <textarea rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Features" hint="One per line.">
                <textarea
                  rows={3}
                  value={item.features.join("\n")}
                  onChange={(e) => update({ ...item, features: e.target.value.split("\n").filter(Boolean) })}
                  className={inputClass}
                />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
