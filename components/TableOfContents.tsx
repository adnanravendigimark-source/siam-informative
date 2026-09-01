export default function TableOfContents({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav
      aria-label="Table of contents"
      className="rounded-lg border border-guide-200 bg-white p-4 shadow-card"
    >
      <p className="text-[11px] font-bold uppercase tracking-wider text-guide-500">In This Chapter</p>
      <ul className="mt-3 space-y-2 text-xs">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-guide-600 transition-colors hover:text-ocean-dark"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
