"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, PageHeroFields, HtmlField, SeoFields, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { ThingsToDoPageContent } from "@/lib/pages";

export default function ThingsToDoPageForm({ initial }: { initial: ThingsToDoPageContent }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<ThingsToDoPageContent>(initial);
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
    const res = await fetch("/api/admin/pages/things-to-do", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Saved — live at /things-to-do-near-siam-park now.");
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
        <Field label="Nearby attractions heading">
          <input value={data.headings.nearbyAttractions} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, nearbyAttractions: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Siam Mall heading">
          <input value={data.headings.siamMall} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, siamMall: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Hotels heading">
          <input value={data.headings.hotelsNear} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, hotelsNear: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Loro Parque heading">
          <input value={data.headings.loroParque} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, loroParque: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Itinerary heading">
          <input value={data.headings.itinerary} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, itinerary: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Intro photo caption">
        <Field label="Caption">
          <input value={data.imageCaption} onChange={(e) => setData((d) => ({ ...d, imageCaption: e.target.value }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Nearby attractions intro">
        <HtmlField label="Intro HTML" value={data.nearbyIntroHtml} onChange={(nearbyIntroHtml) => setData((d) => ({ ...d, nearbyIntroHtml }))} rows={3} />
      </SectionCard>

      <SectionCard title="Nearby attractions">
        <RepeatableList
          items={data.nearbyAttractions}
          onChange={(nearbyAttractions) => setData((d) => ({ ...d, nearbyAttractions }))}
          newItem={() => ({ title: "New attraction", distance: "", body: "" })}
          addLabel="+ Add attraction"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Title">
                  <input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Distance">
                  <input value={item.distance} onChange={(e) => update({ ...item, distance: e.target.value })} className={inputClass} />
                </Field>
              </div>
              <Field label="Description">
                <textarea rows={2} value={item.body} onChange={(e) => update({ ...item, body: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="Siam Mall">
        <HtmlField label="Body HTML" value={data.siamMallHtml} onChange={(siamMallHtml) => setData((d) => ({ ...d, siamMallHtml }))} rows={4} />
      </SectionCard>

      <SectionCard title="Hotels intro" description="Hotel cards themselves are edited on the Hotels page, in the sidebar.">
        <HtmlField label="Intro HTML" value={data.hotelsIntroHtml} onChange={(hotelsIntroHtml) => setData((d) => ({ ...d, hotelsIntroHtml }))} rows={3} />
      </SectionCard>

      <SectionCard title="Loro Parque twin trip">
        <HtmlField label="Body HTML" value={data.loroParqueHtml} onChange={(loroParqueHtml) => setData((d) => ({ ...d, loroParqueHtml }))} rows={4} />
      </SectionCard>

      <SectionCard title="Suggested itineraries">
        <HtmlField label="Itinerary HTML" value={data.itineraryHtml} onChange={(itineraryHtml) => setData((d) => ({ ...d, itineraryHtml }))} rows={4} />
      </SectionCard>

      <SeoFields metaTitle={data.metaTitle} metaDescription={data.metaDescription} onChange={(patch) => setData((d) => ({ ...d, ...patch }))} />

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
