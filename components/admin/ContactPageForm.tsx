"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, PageHeroFields, SeoFields, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { ContactPageContent } from "@/lib/pages";

export default function ContactPageForm({ initial }: { initial: ContactPageContent }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<ContactPageContent>(initial);
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
    const res = await fetch("/api/admin/pages/contact", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Saved — live at /contact now.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <PageHeroFields value={data.hero} onChange={(hero) => setData((d) => ({ ...d, hero }))} />

      <SectionCard title="Breadcrumb label">
        <Field label="Breadcrumb label">
          <input value={data.breadcrumbLabel} onChange={(e) => setData((d) => ({ ...d, breadcrumbLabel: e.target.value }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Email card">
        <Field label="Card heading">
          <input value={data.cardHeading} onChange={(e) => setData((d) => ({ ...d, cardHeading: e.target.value }))} className={inputClass} />
        </Field>
        <Field label="Card note" hint="Contact email itself is edited on the Site Settings page.">
          <textarea rows={2} value={data.cardNote} onChange={(e) => setData((d) => ({ ...d, cardNote: e.target.value }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Quick answers">
        <Field label="Section heading">
          <input value={data.faqHeading} onChange={(e) => setData((d) => ({ ...d, faqHeading: e.target.value }))} className={inputClass} />
        </Field>
        <RepeatableList
          items={data.quickAnswers}
          onChange={(quickAnswers) => setData((d) => ({ ...d, quickAnswers }))}
          newItem={() => ({ q: "", a: "" })}
          addLabel="+ Add Q&A"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <Field label="Question">
                <input value={item.q} onChange={(e) => update({ ...item, q: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Answer">
                <textarea rows={2} value={item.a} onChange={(e) => update({ ...item, a: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="Official site link" description="The button at the bottom of the page linking out to siampark.net.">
        <Field label="Link text">
          <input value={data.officialLinkLabel} onChange={(e) => setData((d) => ({ ...d, officialLinkLabel: e.target.value }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SeoFields metaTitle={data.metaTitle} metaDescription={data.metaDescription} onChange={(patch) => setData((d) => ({ ...d, ...patch }))} />

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
