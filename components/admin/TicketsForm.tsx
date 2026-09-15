"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { TicketType, HoursRow, TicketPolicyNote } from "@/lib/tickets";

type TicketsPageData = { ticketTypes: TicketType[]; seasonalHours: HoursRow[]; holidayNote: string; policyNotes: TicketPolicyNote[] };

export default function TicketsForm({ initial }: { initial: TicketsPageData }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<TicketsPageData>(initial);
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
    const res = await fetch("/api/admin/tickets", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Tickets saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title="Ticket types" description="Every admission tier shown on the homepage pricing table and ticket grid.">
        <RepeatableList<TicketType>
          items={data.ticketTypes}
          onChange={(ticketTypes) => setData((d) => ({ ...d, ticketTypes }))}
          newItem={() => ({ id: `ticket-${Date.now()}`, name: "New ticket", priceAdult: "", priceChild: "", summary: "", includes: [], bestFor: "" })}
          addLabel="+ Add ticket type"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name">
                  <input value={item.name} onChange={(e) => update({ ...item, name: e.target.value })} className={inputClass} />
                </Field>
                <Field label="ID (internal, no spaces)">
                  <input value={item.id} onChange={(e) => update({ ...item, id: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Adult price">
                  <input value={item.priceAdult} onChange={(e) => update({ ...item, priceAdult: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Child price">
                  <input value={item.priceChild} onChange={(e) => update({ ...item, priceChild: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Badge" hint="Small label shown next to the name, e.g. 'Best Value'. Leave blank for none.">
                  <input value={item.badge ?? ""} onChange={(e) => update({ ...item, badge: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Featured (highlighted card)">
                  <select
                    value={item.featured ? "yes" : "no"}
                    onChange={(e) => update({ ...item, featured: e.target.value === "yes" })}
                    className={inputClass}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes — highlight this ticket</option>
                  </select>
                </Field>
              </div>
              <Field label="Summary">
                <textarea rows={2} value={item.summary} onChange={(e) => update({ ...item, summary: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Includes" hint="One item per line.">
                <textarea
                  rows={4}
                  value={item.includes.join("\n")}
                  onChange={(e) => update({ ...item, includes: e.target.value.split("\n").filter(Boolean) })}
                  className={inputClass}
                />
              </Field>
              <Field label="Best for">
                <input value={item.bestFor} onChange={(e) => update({ ...item, bestFor: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="Seasonal hours">
        <RepeatableList<HoursRow>
          items={data.seasonalHours}
          onChange={(seasonalHours) => setData((d) => ({ ...d, seasonalHours }))}
          newItem={() => ({ label: "", hours: "", season: "" })}
          addLabel="+ Add season"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Label">
                  <input value={item.label} onChange={(e) => update({ ...item, label: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Hours">
                  <input value={item.hours} onChange={(e) => update({ ...item, hours: e.target.value })} className={inputClass} />
                </Field>
              </div>
              <Field label="Note">
                <input value={item.season} onChange={(e) => update({ ...item, season: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="Holiday note">
        <textarea rows={3} value={data.holidayNote} onChange={(e) => setData((d) => ({ ...d, holidayNote: e.target.value }))} className={inputClass} />
      </SectionCard>

      <SectionCard title="Pricing table footer notes" description="Small policy call-outs shown under the pricing table (e.g. infant/resident discounts).">
        <RepeatableList<TicketPolicyNote>
          items={data.policyNotes}
          onChange={(policyNotes) => setData((d) => ({ ...d, policyNotes }))}
          newItem={() => ({ icon: "✓", label: "", body: "" })}
          addLabel="+ Add note"
          renderItem={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-[60px_1fr_2fr]">
              <Field label="Icon">
                <input value={item.icon} onChange={(e) => update({ ...item, icon: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Label">
                <input value={item.label} onChange={(e) => update({ ...item, label: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Body">
                <input value={item.body} onChange={(e) => update({ ...item, body: e.target.value })} className={inputClass} />
              </Field>
            </div>
          )}
        />
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
