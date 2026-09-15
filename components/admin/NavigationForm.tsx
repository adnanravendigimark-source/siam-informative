"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { NavContent, NavLink } from "@/lib/nav";

export default function NavigationForm({ initial }: { initial: NavContent }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<NavContent>(initial);
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
    const res = await fetch("/api/admin/navigation", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Navigation saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title="Header navigation" description="Links shown in the top navbar.">
        <RepeatableList<NavLink>
          items={data.navLinks}
          onChange={(navLinks) => setData((d) => ({ ...d, navLinks }))}
          newItem={() => ({ label: "New link", href: "/" })}
          addLabel="+ Add nav link"
          renderItem={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Label">
                <input value={item.label} onChange={(e) => update({ ...item, label: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Link (path or #anchor)">
                <input value={item.href} onChange={(e) => update({ ...item, href: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="Footer links" description="Links shown in the footer's guide-sections and information columns.">
        <RepeatableList<NavLink>
          items={data.footerLinks}
          onChange={(footerLinks) => setData((d) => ({ ...d, footerLinks }))}
          newItem={() => ({ label: "New link", href: "/" })}
          addLabel="+ Add footer link"
          renderItem={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Label">
                <input value={item.label} onChange={(e) => update({ ...item, label: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Link (path or #anchor)">
                <input value={item.href} onChange={(e) => update({ ...item, href: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
