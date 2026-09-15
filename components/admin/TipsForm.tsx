"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { Tip } from "@/lib/tips";

export default function TipsForm({ initial }: { initial: Tip[] }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [tips, setTips] = useState<Tip[]>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const dirty = useMemo(() => JSON.stringify(tips) !== JSON.stringify(initial), [tips, initial]);

  function handleCancel() {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setTips(initial);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/tips", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(tips) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Tips saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title="Visitor tips" description="Shown on the homepage 'Practical Advice' grid.">
        <RepeatableList<Tip>
          items={tips}
          onChange={setTips}
          newItem={() => ({ icon: "💡", title: "New tip", body: "" })}
          addLabel="+ Add tip"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
                <Field label="Emoji">
                  <input value={item.icon} onChange={(e) => update({ ...item, icon: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Title">
                  <input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} className={inputClass} />
                </Field>
              </div>
              <Field label="Body">
                <textarea rows={2} value={item.body} onChange={(e) => update({ ...item, body: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
