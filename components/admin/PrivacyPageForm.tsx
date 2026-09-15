"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, HtmlField, SeoFields, inputClass } from "./FormKit";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { PrivacyPageContent } from "@/lib/pages";

export default function PrivacyPageForm({ initial }: { initial: PrivacyPageContent }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<PrivacyPageContent>(initial);
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
    const res = await fetch("/api/admin/pages/privacy", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Saved — live at /privacy-policy now.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title="Page heading">
        <Field label="Breadcrumb label">
          <input value={data.breadcrumbLabel} onChange={(e) => setData((d) => ({ ...d, breadcrumbLabel: e.target.value }))} className={inputClass} />
        </Field>
        <Field label="Page title (H1)">
          <input value={data.title} onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))} className={inputClass} />
        </Field>
        <Field label="Date text" hint="e.g. 'September 2026'.">
          <input value={data.lastUpdated} onChange={(e) => setData((d) => ({ ...d, lastUpdated: e.target.value }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Policy body">
        <HtmlField label="Body HTML" value={data.bodyHtml} onChange={(bodyHtml) => setData((d) => ({ ...d, bodyHtml }))} rows={20} />
      </SectionCard>

      <SeoFields metaTitle={data.metaTitle} metaDescription={data.metaDescription} onChange={(patch) => setData((d) => ({ ...d, ...patch }))} />

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
