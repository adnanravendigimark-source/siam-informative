"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, PageHeroFields, HtmlField, SeoFields, inputClass } from "./FormKit";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { InsidePageContent } from "@/lib/pages";

export default function InsidePageForm({ initial }: { initial: InsidePageContent }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<InsidePageContent>(initial);
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
    const res = await fetch("/api/admin/pages/inside", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Saved — live at /inside-siam-park now.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <PageHeroFields value={data.hero} onChange={(hero) => setData((d) => ({ ...d, hero }))} />

      <SectionCard title="Breadcrumb & section headings" description="The short label shown in the breadcrumb trail, and every section heading (H2) on this page.">
        <Field label="Breadcrumb label">
          <input value={data.breadcrumbLabel} onChange={(e) => setData((d) => ({ ...d, breadcrumbLabel: e.target.value }))} className={inputClass} />
        </Field>
        <Field label="Park Layout & Zones heading">
          <input value={data.headings.overview} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, overview: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Height restrictions table heading">
          <input value={data.headings.heightRestrictions} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, heightRestrictions: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Adrenaline rides heading">
          <input value={data.headings.adrenalineSlides} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, adrenalineSlides: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Family rides heading">
          <input value={data.headings.familyRides} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, familyRides: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Relax/leisure heading">
          <input value={data.headings.relaxLeisure} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, relaxLeisure: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Kids zones heading">
          <input value={data.headings.kidsZones} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, kidsZones: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="On-site amenities heading">
          <input value={data.headings.facilitiesInside} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, facilitiesInside: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Queue strategy heading">
          <input value={data.headings.rideStrategy} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, rideStrategy: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Park layout overview">
        <HtmlField label="Overview HTML" value={data.overviewHtml} onChange={(overviewHtml) => setData((d) => ({ ...d, overviewHtml }))} rows={5} />
      </SectionCard>

      <SectionCard title="Height restrictions intro" description="Text shown just before the ride table (rides & heights are edited on the Rides page, in the sidebar).">
        <HtmlField label="Intro HTML" value={data.restrictionsIntroHtml} onChange={(restrictionsIntroHtml) => setData((d) => ({ ...d, restrictionsIntroHtml }))} rows={3} />
      </SectionCard>

      <SectionCard title="Ride category intros" description="Short intro paragraph shown above each ride-category grid.">
        <Field label="Adrenaline & Thrill">
          <textarea rows={2} value={data.sectionIntros.adrenaline} onChange={(e) => setData((d) => ({ ...d, sectionIntros: { ...d.sectionIntros, adrenaline: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Family & Moderate">
          <textarea rows={2} value={data.sectionIntros.family} onChange={(e) => setData((d) => ({ ...d, sectionIntros: { ...d.sectionIntros, family: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Relax & Leisure">
          <textarea rows={2} value={data.sectionIntros.relax} onChange={(e) => setData((d) => ({ ...d, sectionIntros: { ...d.sectionIntros, relax: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Kids & Toddlers">
          <textarea rows={2} value={data.sectionIntros.kids} onChange={(e) => setData((d) => ({ ...d, sectionIntros: { ...d.sectionIntros, kids: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Lazy river photo caption">
        <Field label="Caption">
          <input value={data.relaxImageCaption} onChange={(e) => setData((d) => ({ ...d, relaxImageCaption: e.target.value }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="On-site amenities">
        <HtmlField label="Amenities HTML" value={data.amenitiesHtml} onChange={(amenitiesHtml) => setData((d) => ({ ...d, amenitiesHtml }))} rows={6} />
      </SectionCard>

      <SectionCard title="Queue strategy & tips">
        <HtmlField label="Strategy HTML" value={data.strategyHtml} onChange={(strategyHtml) => setData((d) => ({ ...d, strategyHtml }))} rows={5} />
      </SectionCard>

      <SeoFields metaTitle={data.metaTitle} metaDescription={data.metaDescription} onChange={(patch) => setData((d) => ({ ...d, ...patch }))} />

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
