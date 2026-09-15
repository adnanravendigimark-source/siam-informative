"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, PageHeroFields, HtmlField, SeoFields, inputClass } from "./FormKit";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { HowToReachPageContent } from "@/lib/pages";

export default function HowToReachPageForm({ initial }: { initial: HowToReachPageContent }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<HowToReachPageContent>(initial);
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
    const res = await fetch("/api/admin/pages/how-to-reach", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Saved — live at /how-to-reach-siam-park now.");
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
        <Field label="Free shuttle bus heading">
          <input value={data.headings.freeShuttle} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, freeShuttle: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Pickup points box heading">
          <input value={data.shuttleBoxHeading} onChange={(e) => setData((d) => ({ ...d, shuttleBoxHeading: e.target.value }))} className={inputClass} />
        </Field>
        <Field label="Public bus heading">
          <input value={data.headings.publicBus} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, publicBus: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Driving directions heading">
          <input value={data.headings.byCar} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, byCar: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Parking heading">
          <input value={data.headings.parking} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, parking: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Taxis heading">
          <input value={data.headings.byTaxi} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, byTaxi: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Airport transfers heading">
          <input value={data.headings.airportTransfers} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, airportTransfers: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Transit advice heading">
          <input value={data.headings.tips} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, tips: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Intro">
        <HtmlField label="Intro HTML" value={data.introHtml} onChange={(introHtml) => setData((d) => ({ ...d, introHtml }))} rows={3} />
      </SectionCard>

      <SectionCard title="Free shuttle intro" description="Text above the shuttle-stops list (stops themselves are edited on the Shuttles & Buses page, in the sidebar).">
        <HtmlField label="Intro HTML" value={data.shuttleIntroHtml} onChange={(shuttleIntroHtml) => setData((d) => ({ ...d, shuttleIntroHtml }))} rows={5} />
      </SectionCard>

      <SectionCard title="Public bus intro" description="Text above the TITSA bus-routes table.">
        <HtmlField label="Intro HTML" value={data.publicBusIntroHtml} onChange={(publicBusIntroHtml) => setData((d) => ({ ...d, publicBusIntroHtml }))} rows={3} />
      </SectionCard>

      <SectionCard title="Driving directions">
        <Field label="Photo caption">
          <input value={data.drivingImageCaption} onChange={(e) => setData((d) => ({ ...d, drivingImageCaption: e.target.value }))} className={inputClass} />
        </Field>
        <HtmlField label="Driving HTML" value={data.drivingHtml} onChange={(drivingHtml) => setData((d) => ({ ...d, drivingHtml }))} rows={6} />
      </SectionCard>

      <SectionCard title="Parking">
        <HtmlField label="Parking HTML" value={data.parkingHtml} onChange={(parkingHtml) => setData((d) => ({ ...d, parkingHtml }))} rows={5} />
      </SectionCard>

      <SectionCard title="Taxis">
        <HtmlField label="Taxi HTML" value={data.taxiHtml} onChange={(taxiHtml) => setData((d) => ({ ...d, taxiHtml }))} rows={5} />
      </SectionCard>

      <SectionCard title="Airport transfers">
        <HtmlField label="Airport HTML" value={data.airportHtml} onChange={(airportHtml) => setData((d) => ({ ...d, airportHtml }))} rows={4} />
      </SectionCard>

      <SectionCard title="Transit advice">
        <HtmlField label="Tips HTML" value={data.tipsHtml} onChange={(tipsHtml) => setData((d) => ({ ...d, tipsHtml }))} rows={4} />
      </SectionCard>

      <SeoFields metaTitle={data.metaTitle} metaDescription={data.metaDescription} onChange={(patch) => setData((d) => ({ ...d, ...patch }))} />

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
