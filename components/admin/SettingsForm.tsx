"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass } from "./FormKit";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { SiteSettings } from "@/lib/site";

export default function SettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<SiteSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const dirty = useMemo(() => JSON.stringify(data) !== JSON.stringify(initial), [data, initial]);

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setData((d) => ({ ...d, [key]: value }));
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
    const res = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Site settings saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title="Site Identity" description="Shown across the header, footer, and page titles.">
        <Field label="Site name">
          <input value={data.siteName} onChange={(e) => update("siteName", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Site URL" hint="Used for canonical links and JSON-LD — no trailing slash.">
          <input value={data.siteUrl} onChange={(e) => update("siteUrl", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Tagline">
          <input value={data.siteTagline} onChange={(e) => update("siteTagline", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Description" hint="Used as the default meta description and homepage description.">
          <textarea rows={3} value={data.siteDescription} onChange={(e) => update("siteDescription", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Contact email">
          <input value={data.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Official Park Links" description="This site is an independent guide — these links send visitors to the park's real site for bookings.">
        <Field label="Official tickets URL">
          <input value={data.officialTicketsUrl} onChange={(e) => update("officialTicketsUrl", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Official hours URL">
          <input value={data.officialHoursUrl} onChange={(e) => update("officialHoursUrl", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Official directions URL">
          <input value={data.officialDirectionsUrl} onChange={(e) => update("officialDirectionsUrl", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Official site URL">
          <input value={data.officialSiteUrl} onChange={(e) => update("officialSiteUrl", e.target.value)} className={inputClass} />
        </Field>
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} note="Changes appear across the whole site immediately." />
    </form>
  );
}
