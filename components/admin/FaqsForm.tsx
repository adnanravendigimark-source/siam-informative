"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import { FAQ_CATEGORIES, type Faq } from "@/lib/faqs";

export default function FaqsForm({ initial }: { initial: Faq[] }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [faqs, setFaqs] = useState<Faq[]>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const dirty = useMemo(() => JSON.stringify(faqs) !== JSON.stringify(initial), [faqs, initial]);

  function handleCancel() {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setFaqs(initial);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/faqs", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(faqs) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "FAQs saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title={`FAQs (${faqs.length})`} description="Shown on the homepage FAQ accordion, with FAQPage JSON-LD for SEO.">
        <RepeatableList<Faq>
          items={faqs}
          onChange={setFaqs}
          newItem={() => ({ question: "", answer: "", category: "Planning & Practicalities" })}
          addLabel="+ Add FAQ"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <Field label="Question">
                <input value={item.question} onChange={(e) => update({ ...item, question: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Answer">
                <textarea rows={3} value={item.answer} onChange={(e) => update({ ...item, answer: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Category">
                <select value={item.category || ""} onChange={(e) => update({ ...item, category: e.target.value as Faq["category"] })} className={inputClass}>
                  {FAQ_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
