"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, PageHeroFields, HtmlField, SeoFields, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { AboutPageContent, StatItem } from "@/lib/pages";

export default function AboutPageForm({ initial }: { initial: AboutPageContent }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<AboutPageContent>(initial);
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
    const res = await fetch("/api/admin/pages/about", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Saved — live at /about-siam-park now.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <PageHeroFields value={data.hero} onChange={(hero) => setData((d) => ({ ...d, hero }))} />

      <SectionCard title="Breadcrumb & table of contents" description="The short label shown in the breadcrumb trail, and the sidebar jump-links. Section headings themselves are written directly into the Page body HTML below.">
        <Field label="Breadcrumb label">
          <input value={data.breadcrumbLabel} onChange={(e) => setData((d) => ({ ...d, breadcrumbLabel: e.target.value }))} className={inputClass} />
        </Field>
        <Field label="Table of contents labels" hint="One per line, in order: Origins, Thai Heritage, Engineering, Sustainability, Loro Parque Group, Key Statistics.">
          <textarea
            rows={6}
            value={data.tocLabels.join("\n")}
            onChange={(e) => setData((d) => ({ ...d, tocLabels: e.target.value.split("\n") }))}
            className={inputClass}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Section photo caption" description="Caption under the Thai-architecture photo in the article body.">
        <Field label="Caption">
          <input value={data.sectionImageCaption} onChange={(e) => setData((d) => ({ ...d, sectionImageCaption: e.target.value }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Page body" description="The full article — write it top to bottom, headings included.">
        <HtmlField label="Body HTML" value={data.bodyHtml} onChange={(bodyHtml) => setData((d) => ({ ...d, bodyHtml }))} rows={20} />
      </SectionCard>

      <SectionCard title="Key facts strip" description="The stat tiles at the end of the article.">
        <Field label="Strip heading">
          <input value={data.vitalStatsHeading} onChange={(e) => setData((d) => ({ ...d, vitalStatsHeading: e.target.value }))} className={inputClass} />
        </Field>
        <RepeatableList<StatItem>
          items={data.vitalStats}
          onChange={(vitalStats) => setData((d) => ({ ...d, vitalStats }))}
          newItem={() => ({ value: "", label: "" })}
          addLabel="+ Add stat"
          renderItem={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Value">
                <input value={item.value} onChange={(e) => update({ ...item, value: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Label">
                <input value={item.label} onChange={(e) => update({ ...item, label: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SeoFields metaTitle={data.metaTitle} metaDescription={data.metaDescription} onChange={(patch) => setData((d) => ({ ...d, ...patch }))} />

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
