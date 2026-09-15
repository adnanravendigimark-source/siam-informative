"use client";

// Shared style tokens + small layout primitives reused by every admin form
// in this app, so each per-domain form file only has to describe its own
// fields, not re-invent input styling each time.
import { useState } from "react";

export const inputClass =
  "w-full rounded-lg border border-guide-300 px-3 py-2 text-sm text-guide-900 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy";
export const textareaClass = inputClass + " font-mono text-xs leading-relaxed";
export const labelClass = "mb-1 block text-xs font-medium text-guide-700";
export const hintClass = "mt-1 text-[11px] text-guide-400";

// Collapsible by default — every admin form is built from these, so this
// one change makes every section on every page (old and new) an accordion
// without touching the ~20 form files that render <SectionCard>.
export function SectionCard({
  title,
  description,
  children,
  defaultOpen = true,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-guide-200 bg-white p-5 sm:p-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <span>
          <span className="font-semibold text-guide-900">{title}</span>
          {description && <span className="mt-0.5 block text-xs text-guide-500">{description}</span>}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 shrink-0 text-guide-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="mt-4 space-y-4">{children}</div>}
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {hint && <p className={hintClass}>{hint}</p>}
    </div>
  );
}

// A visual WYSIWYG editor for admin-authored prose (headings, bold/italic,
// lists, links, tables) — no more hand-typed HTML tags. `rows` is kept in
// the signature so every existing call site (~20 form files) still works
// unchanged; it's translated into a minimum editor height.
import RichTextEditor from "./RichTextEditor";

export function HtmlField({
  label,
  value,
  onChange,
  rows = 6,
  hint,
  allowedHeadings = [2, 3],
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
  allowedHeadings?: (1 | 2 | 3)[];
}) {
  return (
    <Field label={label} hint={hint}>
      <RichTextEditor
        value={value}
        onChange={onChange}
        minHeight={`${Math.max(rows, 3) * 1.6}rem`}
        allowedHeadings={allowedHeadings}
      />
    </Field>
  );
}

// Shared hero block (eyebrow/title/description/image/readTime) used at the
// top of every long-form page's admin form.
import { IMAGE_KEYS, IMAGE_LABELS, type ImageKey } from "@/lib/images";

export interface PageHeroFieldsValue {
  eyebrow: string;
  title: string;
  description: string;
  imageKey: ImageKey;
  readTime?: string;
}

export function PageHeroFields({ value, onChange }: { value: PageHeroFieldsValue; onChange: (v: PageHeroFieldsValue) => void }) {
  return (
    <SectionCard title="Page hero" description="The banner at the top of this page.">
      <Field label="Eyebrow label">
        <input value={value.eyebrow} onChange={(e) => onChange({ ...value, eyebrow: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Heading (H1)">
        <textarea rows={2} value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Description">
        <textarea rows={3} value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Hero image">
        <select value={value.imageKey} onChange={(e) => onChange({ ...value, imageKey: e.target.value as ImageKey })} className={inputClass}>
          {IMAGE_KEYS.map((key) => (
            <option key={key} value={key}>
              {IMAGE_LABELS[key]}
            </option>
          ))}
        </select>
      </Field>
      {value.readTime !== undefined && (
        <Field label="Read time badge" hint="e.g. '6 min read'. Leave blank to hide.">
          <input value={value.readTime} onChange={(e) => onChange({ ...value, readTime: e.target.value })} className={inputClass} />
        </Field>
      )}
    </SectionCard>
  );
}

export function SeoFields({
  metaTitle,
  metaDescription,
  onChange,
}: {
  metaTitle: string;
  metaDescription: string;
  onChange: (patch: { metaTitle?: string; metaDescription?: string }) => void;
}) {
  return (
    <SectionCard title="SEO" description="Page title and meta description for search engines.">
      <Field label="Meta title">
        <input value={metaTitle} onChange={(e) => onChange({ metaTitle: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Meta description">
        <textarea rows={2} value={metaDescription} onChange={(e) => onChange({ metaDescription: e.target.value })} className={inputClass} />
      </Field>
    </SectionCard>
  );
}
