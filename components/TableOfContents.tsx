export default function TableOfContents({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 rounded-2xl border border-guide-200/90 bg-white/95 p-5 shadow-card backdrop-blur-xs"
    >
      <div className="flex items-center gap-2 border-b border-guide-100 pb-3">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-ocean/10 text-xs text-ocean-dark" aria-hidden="true">
          📑
        </span>
        <p className="font-display text-xs font-bold uppercase tracking-wider text-navy">In This Chapter</p>
      </div>
      <ul className="mt-3.5 space-y-2 text-xs">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block rounded-lg px-2.5 py-1.5 font-medium text-guide-600 transition-all duration-200 hover:bg-lagoon-50/60 hover:text-ocean-dark hover:translate-x-1"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
