"use client";

// Generic add/remove/reorder list editor, used for every repeatable admin
// field on this site: ticket types, rides, dining venues, hotels, shuttle
// stops, bus routes, tips, FAQs, nav/footer links, stat strips, etc.
export default function RepeatableList<T>({
  items,
  onChange,
  newItem,
  renderItem,
  addLabel = "+ Add",
  emptyLabel = "Nothing added yet.",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, update: (next: T) => void, index: number) => React.ReactNode;
  addLabel?: string;
  emptyLabel?: string;
}) {
  function updateAt(i: number, next: T) {
    const copy = [...items];
    copy[i] = next;
    onChange(copy);
  }

  function removeAt(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  function moveAt(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-guide-200 bg-guide-50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-guide-500 ring-1 ring-guide-200">
              #{i + 1}
            </span>
            <div className="flex items-center gap-3 text-xs">
              <button type="button" onClick={() => moveAt(i, -1)} disabled={i === 0} className="text-guide-500 hover:text-navy disabled:opacity-30">
                ↑
              </button>
              <button type="button" onClick={() => moveAt(i, 1)} disabled={i === items.length - 1} className="text-guide-500 hover:text-navy disabled:opacity-30">
                ↓
              </button>
              <button type="button" onClick={() => removeAt(i)} className="text-red-600 hover:text-red-700">
                Remove
              </button>
            </div>
          </div>
          {renderItem(item, (next) => updateAt(i, next), i)}
        </div>
      ))}
      {items.length === 0 && (
        <p className="rounded-lg border border-dashed border-guide-300 p-4 text-center text-xs text-guide-500">{emptyLabel}</p>
      )}
      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="rounded-lg border border-guide-300 px-3 py-1.5 text-xs font-medium text-guide-700 transition hover:bg-guide-50"
      >
        {addLabel}
      </button>
    </div>
  );
}
