"use client";

export default function SaveBar({
  saving,
  disabled = false,
  label = "Save Changes",
  savingLabel = "Saving…",
  note,
  onCancel,
}: {
  saving: boolean;
  disabled?: boolean;
  label?: string;
  savingLabel?: string;
  note?: string;
  onCancel?: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-20 mt-8 flex flex-wrap items-center justify-between gap-3 rounded-t-lg border-t border-guide-200 bg-white/95 px-4 py-3.5 shadow-lift backdrop-blur">
      <p className="text-xs text-guide-500">{note}</p>
      <div className="flex items-center gap-2.5">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving || disabled}
            className="rounded-lg border border-guide-300 px-4 py-2.5 text-sm font-medium text-guide-700 transition hover:bg-guide-50 disabled:opacity-40"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={saving || disabled}
          className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light disabled:opacity-60"
        >
          {saving ? savingLabel : label}
        </button>
      </div>
    </div>
  );
}
