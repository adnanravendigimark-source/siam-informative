"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import { IMAGE_KEYS, IMAGE_LABELS } from "@/lib/images";
import type { HomepageContent, StatItem } from "@/lib/pages";

export default function HomepageForm({ initial }: { initial: HomepageContent }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<HomepageContent>(initial);
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
    const res = await fetch("/api/admin/homepage", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Homepage saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title="Hero">
        <Field label="Badge text">
          <input value={data.hero.badge} onChange={(e) => setData((d) => ({ ...d, hero: { ...d.hero, badge: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Location line">
          <input value={data.hero.location} onChange={(e) => setData((d) => ({ ...d, hero: { ...d.hero, location: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Heading (H1)">
          <textarea rows={2} value={data.hero.title} onChange={(e) => setData((d) => ({ ...d, hero: { ...d.hero, title: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Description">
          <textarea rows={3} value={data.hero.description} onChange={(e) => setData((d) => ({ ...d, hero: { ...d.hero, description: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Footer note (below jump links)">
          <input value={data.hero.footerNote} onChange={(e) => setData((d) => ({ ...d, hero: { ...d.hero, footerNote: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Hero image">
          <select
            value={data.hero.imageKey}
            onChange={(e) => setData((d) => ({ ...d, hero: { ...d.hero, imageKey: e.target.value as HomepageContent["hero"]["imageKey"] } }))}
            className={inputClass}
          >
            {IMAGE_KEYS.map((key) => (
              <option key={key} value={key}>
                {IMAGE_LABELS[key]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Hero image caption">
          <input value={data.hero.imageCaption} onChange={(e) => setData((d) => ({ ...d, hero: { ...d.hero, imageCaption: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Quick-jump label">
          <input value={data.hero.quickJumpLabel} onChange={(e) => setData((d) => ({ ...d, hero: { ...d.hero, quickJumpLabel: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Quick-jump capsules" hint="One per line, in order: Hours, Tickets, Rides, Shuttles, Facilities, FAQs. Emoji included in the text if you want one.">
          <textarea
            rows={6}
            value={data.hero.quickJumpLinks.join("\n")}
            onChange={(e) => setData((d) => ({ ...d, hero: { ...d.hero, quickJumpLinks: e.target.value.split("\n") } }))}
            className={inputClass}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Quick stats strip" description="The 4-tile stat row right under the hero.">
        <RepeatableList<StatItem>
          items={data.stats}
          onChange={(stats) => setData((d) => ({ ...d, stats }))}
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

      <SectionCard title="Hours & Location section">
        <Field label="Eyebrow badge">
          <input value={data.hoursSection.eyebrow} onChange={(e) => setData((d) => ({ ...d, hoursSection: { ...d.hoursSection, eyebrow: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Heading">
          <input value={data.hoursSection.heading} onChange={(e) => setData((d) => ({ ...d, hoursSection: { ...d.hoursSection, heading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Subheading">
          <input value={data.hoursSection.subheading} onChange={(e) => setData((d) => ({ ...d, hoursSection: { ...d.hoursSection, subheading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Hours card heading">
          <input value={data.hoursSection.hoursCardHeading} onChange={(e) => setData((d) => ({ ...d, hoursSection: { ...d.hoursSection, hoursCardHeading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Holiday note label">
          <input value={data.hoursSection.holidayNoteLabel} onChange={(e) => setData((d) => ({ ...d, hoursSection: { ...d.hoursSection, holidayNoteLabel: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Location card heading">
          <input value={data.hoursSection.locationCardHeading} onChange={(e) => setData((d) => ({ ...d, hoursSection: { ...d.hoursSection, locationCardHeading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Transport link text">
          <input value={data.hoursSection.transportLinkLabel} onChange={(e) => setData((d) => ({ ...d, hoursSection: { ...d.hoursSection, transportLinkLabel: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Location paragraph">
          <textarea rows={3} value={data.hoursSection.locationParagraph} onChange={(e) => setData((d) => ({ ...d, hoursSection: { ...d.hoursSection, locationParagraph: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Highlights" hint="One per line, formatted as 'Label: detail text'.">
          <textarea
            rows={4}
            value={data.hoursSection.highlights.join("\n")}
            onChange={(e) => setData((d) => ({ ...d, hoursSection: { ...d.hoursSection, highlights: e.target.value.split("\n") } }))}
            className={inputClass}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Tickets section" description="The ticket prices themselves are edited on the Tickets & Prices page, in the sidebar.">
        <Field label="Eyebrow badge">
          <input value={data.ticketsSection.eyebrow} onChange={(e) => setData((d) => ({ ...d, ticketsSection: { ...d.ticketsSection, eyebrow: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Heading">
          <input value={data.ticketsSection.heading} onChange={(e) => setData((d) => ({ ...d, ticketsSection: { ...d.ticketsSection, heading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Subheading">
          <input value={data.ticketsSection.subheading} onChange={(e) => setData((d) => ({ ...d, ticketsSection: { ...d.ticketsSection, subheading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Ticket options grid heading">
          <input value={data.ticketsSection.optionsHeading} onChange={(e) => setData((d) => ({ ...d, ticketsSection: { ...d.ticketsSection, optionsHeading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Official portal callout eyebrow">
          <input value={data.ticketsSection.ctaEyebrow} onChange={(e) => setData((d) => ({ ...d, ticketsSection: { ...d.ticketsSection, ctaEyebrow: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Official portal callout heading">
          <input value={data.ticketsSection.ctaHeading} onChange={(e) => setData((d) => ({ ...d, ticketsSection: { ...d.ticketsSection, ctaHeading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Official portal callout body">
          <textarea rows={2} value={data.ticketsSection.ctaBody} onChange={(e) => setData((d) => ({ ...d, ticketsSection: { ...d.ticketsSection, ctaBody: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Official portal button text">
          <input value={data.ticketsSection.ctaButtonLabel} onChange={(e) => setData((d) => ({ ...d, ticketsSection: { ...d.ticketsSection, ctaButtonLabel: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Rides section" description="The ride list itself is edited on the Rides page, in the sidebar.">
        <Field label="Eyebrow badge">
          <input value={data.ridesSection.eyebrow} onChange={(e) => setData((d) => ({ ...d, ridesSection: { ...d.ridesSection, eyebrow: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Heading">
          <input value={data.ridesSection.heading} onChange={(e) => setData((d) => ({ ...d, ridesSection: { ...d.ridesSection, heading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Subheading">
          <input value={data.ridesSection.subheading} onChange={(e) => setData((d) => ({ ...d, ridesSection: { ...d.ridesSection, subheading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="'View all rides' link text">
          <input value={data.ridesSection.viewAllLabel} onChange={(e) => setData((d) => ({ ...d, ridesSection: { ...d.ridesSection, viewAllLabel: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Thrill rides grid heading">
          <input value={data.ridesSection.thrillHeading} onChange={(e) => setData((d) => ({ ...d, ridesSection: { ...d.ridesSection, thrillHeading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Family rides grid heading">
          <input value={data.ridesSection.familyHeading} onChange={(e) => setData((d) => ({ ...d, ridesSection: { ...d.ridesSection, familyHeading: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Shuttles section" description="The shuttle stop list itself is edited on the Shuttles & Buses page, in the sidebar.">
        <Field label="Eyebrow badge">
          <input value={data.shuttlesSection.eyebrow} onChange={(e) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, eyebrow: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Heading">
          <input value={data.shuttlesSection.heading} onChange={(e) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, heading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Subheading">
          <input value={data.shuttlesSection.subheading} onChange={(e) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, subheading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Pickup card heading">
          <input value={data.shuttlesSection.cardHeading} onChange={(e) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, cardHeading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Frequency badge">
          <input value={data.shuttlesSection.frequencyBadge} onChange={(e) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, frequencyBadge: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="No-booking-needed note">
          <textarea rows={2} value={data.shuttlesSection.noBookingNote} onChange={(e) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, noBookingNote: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="'Also serving...' note">
          <input value={data.shuttlesSection.alsoServingNote} onChange={(e) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, alsoServingNote: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Full transport guide link text">
          <input value={data.shuttlesSection.fullGuideLabel} onChange={(e) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, fullGuideLabel: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Other transport card heading">
          <input value={data.shuttlesSection.otherModesHeading} onChange={(e) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, otherModesHeading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="GPS address label">
          <input value={data.shuttlesSection.gpsLabel} onChange={(e) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, gpsLabel: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="GPS address">
          <input value={data.shuttlesSection.gpsAddress} onChange={(e) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, gpsAddress: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Other travel options">
          <RepeatableList
            items={data.shuttlesSection.otherOptions}
            onChange={(otherOptions) => setData((d) => ({ ...d, shuttlesSection: { ...d.shuttlesSection, otherOptions } }))}
            newItem={() => ({ label: "", body: "" })}
            addLabel="+ Add option"
            renderItem={(item, update) => (
              <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
                <Field label="Label">
                  <input value={item.label} onChange={(e) => update({ ...item, label: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Body">
                  <input value={item.body} onChange={(e) => update({ ...item, body: e.target.value })} className={inputClass} />
                </Field>
              </div>
            )}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Facilities section" description="The amenities & rules list itself is edited on the Facilities page, in the sidebar.">
        <Field label="Eyebrow badge">
          <input value={data.facilitiesSection.eyebrow} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, eyebrow: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Heading">
          <input value={data.facilitiesSection.heading} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, heading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Subheading">
          <input value={data.facilitiesSection.subheading} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, subheading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Services card heading">
          <input value={data.facilitiesSection.servicesHeading} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, servicesHeading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Rules card heading">
          <input value={data.facilitiesSection.rulesHeading} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, rulesHeading: e.target.value } }))} className={inputClass} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Food policy badge">
            <input value={data.facilitiesSection.foodBadge} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, foodBadge: e.target.value } }))} className={inputClass} />
          </Field>
          <Field label="Food policy heading">
            <input value={data.facilitiesSection.foodHeading} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, foodHeading: e.target.value } }))} className={inputClass} />
          </Field>
          <Field label="Swimwear policy badge">
            <input value={data.facilitiesSection.swimwearBadge} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, swimwearBadge: e.target.value } }))} className={inputClass} />
          </Field>
          <Field label="Swimwear policy heading">
            <input value={data.facilitiesSection.swimwearHeading} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, swimwearHeading: e.target.value } }))} className={inputClass} />
          </Field>
          <Field label="Footwear policy badge">
            <input value={data.facilitiesSection.footwearBadge} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, footwearBadge: e.target.value } }))} className={inputClass} />
          </Field>
          <Field label="Footwear policy heading">
            <input value={data.facilitiesSection.footwearHeading} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, footwearHeading: e.target.value } }))} className={inputClass} />
          </Field>
          <Field label="Camera policy badge">
            <input value={data.facilitiesSection.cameraBadge} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, cameraBadge: e.target.value } }))} className={inputClass} />
          </Field>
          <Field label="Camera policy heading">
            <input value={data.facilitiesSection.cameraHeading} onChange={(e) => setData((d) => ({ ...d, facilitiesSection: { ...d.facilitiesSection, cameraHeading: e.target.value } }))} className={inputClass} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Tips section" description="The tip cards themselves are edited on the Visitor Tips page, in the sidebar.">
        <Field label="Eyebrow badge">
          <input value={data.tipsSection.eyebrow} onChange={(e) => setData((d) => ({ ...d, tipsSection: { ...d.tipsSection, eyebrow: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Heading">
          <input value={data.tipsSection.heading} onChange={(e) => setData((d) => ({ ...d, tipsSection: { ...d.tipsSection, heading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Subheading">
          <input value={data.tipsSection.subheading} onChange={(e) => setData((d) => ({ ...d, tipsSection: { ...d.tipsSection, subheading: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="FAQ section" description="The questions & answers themselves are edited on the FAQs page, in the sidebar.">
        <Field label="Eyebrow badge">
          <input value={data.faqSection.eyebrow} onChange={(e) => setData((d) => ({ ...d, faqSection: { ...d.faqSection, eyebrow: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Heading">
          <input value={data.faqSection.heading} onChange={(e) => setData((d) => ({ ...d, faqSection: { ...d.faqSection, heading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Subheading">
          <input value={data.faqSection.subheading} onChange={(e) => setData((d) => ({ ...d, faqSection: { ...d.faqSection, subheading: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Independent-resource notice" description="The closing 'we are independent' callout.">
        <Field label="Heading">
          <input value={data.independentNotice.heading} onChange={(e) => setData((d) => ({ ...d, independentNotice: { ...d.independentNotice, heading: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Body">
          <textarea rows={3} value={data.independentNotice.body} onChange={(e) => setData((d) => ({ ...d, independentNotice: { ...d.independentNotice, body: e.target.value } }))} className={inputClass} />
        </Field>
        <Field label="Link button text">
          <input value={data.independentNotice.linkLabel} onChange={(e) => setData((d) => ({ ...d, independentNotice: { ...d.independentNotice, linkLabel: e.target.value } }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="Guide chapters grid" description="Heading for the card grid at the bottom of the homepage. Card contents themselves are edited on the Header, Footer & Guide Links page.">
        <Field label="Heading">
          <input value={data.guideLinksHeading} onChange={(e) => setData((d) => ({ ...d, guideLinksHeading: e.target.value }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SectionCard title="SEO" description="Homepage title tag = Site Name + this suffix.">
        <Field label="Title suffix">
          <input value={data.metaTitleSuffix} onChange={(e) => setData((d) => ({ ...d, metaTitleSuffix: e.target.value }))} className={inputClass} />
        </Field>
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} note="Changes appear on the homepage immediately." />
    </form>
  );
}
