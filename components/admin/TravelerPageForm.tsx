"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, PageHeroFields, HtmlField, SeoFields, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { TravelerPageContent } from "@/lib/pages";

export default function TravelerPageForm({ initial }: { initial: TravelerPageContent }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<TravelerPageContent>(initial);
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
    const res = await fetch("/api/admin/pages/traveler", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Saved — live at /traveler-information now.");
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
        <Field label="Hours & admission heading">
          <input value={data.headings.hoursAdmission} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, hoursAdmission: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Lockers/towels heading">
          <input value={data.headings.lockersAmenities} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, lockersAmenities: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Dining heading">
          <input value={data.headings.foodDining} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, foodDining: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Outside food policy heading">
          <input value={data.headings.outsideFood} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, outsideFood: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Swimwear/footwear/cameras heading">
          <input value={data.headings.swimwearRules} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, swimwearRules: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Accessibility heading">
          <input value={data.headings.accessibility} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, accessibility: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Packing checklist heading">
          <input value={data.headings.whatToPack} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, whatToPack: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Best time to visit heading">
          <input value={data.headings.bestTime} onChange={(e) => setData((d) => ({ ...d, headings: { ...d.headings, bestTime: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Hours & admission basics">
        <HtmlField label="Body HTML" value={data.hoursAdmissionHtml} onChange={(hoursAdmissionHtml) => setData((d) => ({ ...d, hoursAdmissionHtml }))} rows={6} />
      </SectionCard>

      <SectionCard title="Lockers, towels & wetsuits">
        <HtmlField label="Intro HTML" value={data.lockersIntroHtml} onChange={(lockersIntroHtml) => setData((d) => ({ ...d, lockersIntroHtml }))} rows={2} />
        <Field label="Locker/towel pricing cards">
          <RepeatableList
            items={data.lockerPricing}
            onChange={(lockerPricing) => setData((d) => ({ ...d, lockerPricing }))}
            newItem={() => ({ title: "", price: "", note: "" })}
            addLabel="+ Add pricing card"
            renderItem={(item, update) => (
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Title">
                    <input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} className={inputClass} />
                  </Field>
                  <Field label="Price">
                    <input value={item.price} onChange={(e) => update({ ...item, price: e.target.value })} className={inputClass} />
                  </Field>
                </div>
                <Field label="Note">
                  <input value={item.note} onChange={(e) => update({ ...item, note: e.target.value })} className={inputClass} />
                </Field>
              </div>
            )}
          />
        </Field>
        <HtmlField label="Wetsuit note HTML" value={data.wetsuitNoteHtml} onChange={(wetsuitNoteHtml) => setData((d) => ({ ...d, wetsuitNoteHtml }))} rows={2} />
      </SectionCard>

      <SectionCard title="Dining" description="Dining venue cards themselves are edited on the Facilities page, in the sidebar.">
        <Field label="Photo caption">
          <input value={data.diningImageCaption} onChange={(e) => setData((d) => ({ ...d, diningImageCaption: e.target.value }))} className={inputClass} />
        </Field>
        <HtmlField label="Intro HTML" value={data.diningIntroHtml} onChange={(diningIntroHtml) => setData((d) => ({ ...d, diningIntroHtml }))} rows={2} />
      </SectionCard>

      <SectionCard title="Outside food policy" description="The policy callout itself is edited on the Facilities page, in the sidebar — this is the extra note shown below it.">
        <HtmlField label="Extra note HTML" value={data.outsideFoodExtraHtml} onChange={(outsideFoodExtraHtml) => setData((d) => ({ ...d, outsideFoodExtraHtml }))} rows={3} />
      </SectionCard>

      <SectionCard title="Swimwear & gear rules" description="Swimwear/footwear/camera rules are edited on the Facilities page, in the sidebar — this is the one extra rule shown alongside them.">
        <Field label="Eyewear note">
          <input value={data.eyewearNote} onChange={(e) => setData((d) => ({ ...d, eyewearNote: e.target.value }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Accessibility">
        <HtmlField label="Body HTML" value={data.accessibilityHtml} onChange={(accessibilityHtml) => setData((d) => ({ ...d, accessibilityHtml }))} rows={6} />
      </SectionCard>

      <SectionCard title="Packing checklist">
        <HtmlField label="Body HTML" value={data.packingHtml} onChange={(packingHtml) => setData((d) => ({ ...d, packingHtml }))} rows={6} />
      </SectionCard>

      <SectionCard title="Best time to visit">
        <HtmlField label="Body HTML" value={data.bestTimeHtml} onChange={(bestTimeHtml) => setData((d) => ({ ...d, bestTimeHtml }))} rows={5} />
      </SectionCard>

      <SeoFields metaTitle={data.metaTitle} metaDescription={data.metaDescription} onChange={(patch) => setData((d) => ({ ...d, ...patch }))} />

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
