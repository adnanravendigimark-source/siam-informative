"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, Field, inputClass, textareaClass } from "./FormKit";
import RepeatableList from "./RepeatableList";
import SaveBar from "./SaveBar";
import { useToast } from "./Toast";
import type { SiteChromeContent, QuickJumpLink, GuideLinkCard } from "@/lib/siteChrome";

export default function SiteChromeForm({ initial }: { initial: SiteChromeContent }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<SiteChromeContent>(initial);
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
    const res = await fetch("/api/admin/header-footer", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      const msg = body.error || "Save failed. Please try again.";
      setError(msg);
      showToast("error", msg);
      return;
    }
    showToast("success", "Header, footer & guide links saved — live everywhere now.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SectionCard title="Header" description="Shown at the top of every page. Nav link labels themselves are edited on the Navigation page.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Tagline (under site name)">
            <input
              value={data.header.tagline}
              onChange={(e) => setData((d) => ({ ...d, header: { ...d.header, tagline: e.target.value } }))}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Tickets CTA label" hint="Shown on the desktop pill button and the mobile drawer button.">
            <input
              value={data.header.ticketsCtaLabel}
              onChange={(e) => setData((d) => ({ ...d, header: { ...d.header, ticketsCtaLabel: e.target.value } }))}
              className={inputClass}
            />
          </Field>
          <Field label="Tickets CTA URL">
            <input
              value={data.header.ticketsCtaUrl}
              onChange={(e) => setData((d) => ({ ...d, header: { ...d.header, ticketsCtaUrl: e.target.value } }))}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Mobile menu — Quick Jump section heading">
          <input
            value={data.header.mobileQuickJumpHeading}
            onChange={(e) => setData((d) => ({ ...d, header: { ...d.header, mobileQuickJumpHeading: e.target.value } }))}
            className={inputClass}
          />
        </Field>
        <Field label="Mobile menu — Quick Jump cards" hint="Emoji + label + an in-page anchor (e.g. /#hours) or a full path.">
          <RepeatableList<QuickJumpLink>
            items={data.header.mobileQuickJumpLinks}
            onChange={(mobileQuickJumpLinks) => setData((d) => ({ ...d, header: { ...d.header, mobileQuickJumpLinks } }))}
            newItem={() => ({ emoji: "✨", label: "New link", href: "/#" })}
            addLabel="+ Add quick jump card"
            renderItem={(item, update) => (
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Emoji">
                  <input value={item.emoji} onChange={(e) => update({ ...item, emoji: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Label">
                  <input value={item.label} onChange={(e) => update({ ...item, label: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Anchor / path">
                  <input value={item.href} onChange={(e) => update({ ...item, href: e.target.value })} className={inputClass} />
                </Field>
              </div>
            )}
          />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Mobile menu — Guide chapters heading">
            <input
              value={data.header.mobileGuideHeading}
              onChange={(e) => setData((d) => ({ ...d, header: { ...d.header, mobileGuideHeading: e.target.value } }))}
              className={inputClass}
            />
          </Field>
          <Field label="Mobile menu — Book CTA label">
            <input
              value={data.header.mobileBookCtaLabel}
              onChange={(e) => setData((d) => ({ ...d, header: { ...d.header, mobileBookCtaLabel: e.target.value } }))}
              className={inputClass}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Footer" description="Shown at the bottom of every page. Column links themselves are edited on the Navigation page.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Small tagline (under site name)">
            <input
              value={data.footer.smallTagline}
              onChange={(e) => setData((d) => ({ ...d, footer: { ...d.footer, smallTagline: e.target.value } }))}
              className={inputClass}
            />
          </Field>
          <Field label="Badge text">
            <input
              value={data.footer.badgeText}
              onChange={(e) => setData((d) => ({ ...d, footer: { ...d.footer, badgeText: e.target.value } }))}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="About blurb suffix" hint="Appended after the site tagline (Site Settings) in the brand column.">
          <textarea
            value={data.footer.aboutBlurbSuffix}
            onChange={(e) => setData((d) => ({ ...d, footer: { ...d.footer, aboutBlurbSuffix: e.target.value } }))}
            className={textareaClass}
            rows={2}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Guide links column heading">
            <input
              value={data.footer.navColumnHeading}
              onChange={(e) => setData((d) => ({ ...d, footer: { ...d.footer, navColumnHeading: e.target.value } }))}
              className={inputClass}
            />
          </Field>
          <Field label="Resources column heading">
            <input
              value={data.footer.resourcesColumnHeading}
              onChange={(e) => setData((d) => ({ ...d, footer: { ...d.footer, resourcesColumnHeading: e.target.value } }))}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Official portal button label">
          <input
            value={data.footer.officialPortalLabel}
            onChange={(e) => setData((d) => ({ ...d, footer: { ...d.footer, officialPortalLabel: e.target.value } }))}
            className={inputClass}
          />
        </Field>
        <Field label="Copyright line suffix" hint="Shown after “© {year} {site name}.”">
          <input
            value={data.footer.copyrightSuffix}
            onChange={(e) => setData((d) => ({ ...d, footer: { ...d.footer, copyrightSuffix: e.target.value } }))}
            className={inputClass}
          />
        </Field>
        <Field label="Disclaimer">
          <textarea
            value={data.footer.disclaimer}
            onChange={(e) => setData((d) => ({ ...d, footer: { ...d.footer, disclaimer: e.target.value } }))}
            className={textareaClass}
            rows={2}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Guide links grid" description={'The "Explore More of This Guide" card grid shown on the homepage and most long-form pages.'}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Default heading" hint="The homepage has its own override, set on the Homepage editor.">
            <input
              value={data.guideLinks.heading}
              onChange={(e) => setData((d) => ({ ...d, guideLinks: { ...d.guideLinks, heading: e.target.value } }))}
              className={inputClass}
            />
          </Field>
          <Field label="Card button label">
            <input
              value={data.guideLinks.ctaLabel}
              onChange={(e) => setData((d) => ({ ...d, guideLinks: { ...d.guideLinks, ctaLabel: e.target.value } }))}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Subheading">
          <input
            value={data.guideLinks.subheading}
            onChange={(e) => setData((d) => ({ ...d, guideLinks: { ...d.guideLinks, subheading: e.target.value } }))}
            className={inputClass}
          />
        </Field>
        <Field label="Cards" hint="The href for each card should match one of this site's real page paths.">
          <RepeatableList<GuideLinkCard>
            items={data.guideLinks.links}
            onChange={(links) => setData((d) => ({ ...d, guideLinks: { ...d.guideLinks, links } }))}
            newItem={() => ({ href: "/", title: "New chapter", description: "", icon: "✨", tag: "Guide" })}
            addLabel="+ Add card"
            renderItem={(item, update) => (
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-4">
                  <Field label="Icon (emoji)">
                    <input value={item.icon} onChange={(e) => update({ ...item, icon: e.target.value })} className={inputClass} />
                  </Field>
                  <Field label="Tag">
                    <input value={item.tag} onChange={(e) => update({ ...item, tag: e.target.value })} className={inputClass} />
                  </Field>
                  <Field label="Title">
                    <input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} className={inputClass} />
                  </Field>
                  <Field label="Path">
                    <input value={item.href} onChange={(e) => update({ ...item, href: e.target.value })} className={inputClass} />
                  </Field>
                </div>
                <Field label="Description">
                  <input value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} className={inputClass} />
                </Field>
              </div>
            )}
          />
        </Field>
      </SectionCard>

      <SaveBar saving={saving} disabled={!dirty} onCancel={handleCancel} />
    </form>
  );
}
