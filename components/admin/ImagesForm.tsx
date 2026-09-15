"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass } from "./FormKit";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import { IMAGE_KEYS, IMAGE_LABELS, type ImagesContent, type ImageKey } from "@/lib/images";

export default function ImagesForm({ initial }: { initial: ImagesContent }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<ImagesContent>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const dirty = useMemo(() => JSON.stringify(data) !== JSON.stringify(initial), [data, initial]);

  function updateImage(key: ImageKey, field: "src" | "alt" | "credit", value: string) {
    setData((d) => ({ ...d, [key]: { ...d[key], [field]: value } }));
  }

  function handleCancel() {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setData(initial);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/images", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Images saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {IMAGE_KEYS.map((key) => {
        const img = data[key];
        return (
          <SectionCard key={key} title={IMAGE_LABELS[key]}>
            <div className="grid gap-4 sm:grid-cols-[160px_1fr] sm:items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="h-24 w-full rounded-lg border border-guide-200 object-cover sm:h-28" />
              <div className="space-y-3">
                <Field label="Image URL" hint="Unsplash URL or any direct image URL.">
                  <input value={img.src} onChange={(e) => updateImage(key, "src", e.target.value)} className={inputClass} />
                </Field>
                <Field label="Alt text">
                  <input value={img.alt} onChange={(e) => updateImage(key, "alt", e.target.value)} className={inputClass} />
                </Field>
                <Field label="Photo credit">
                  <input value={img.credit} onChange={(e) => updateImage(key, "credit", e.target.value)} className={inputClass} />
                </Field>
              </div>
            </div>
          </SectionCard>
        );
      })}

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
