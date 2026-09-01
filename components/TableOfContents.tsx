export default function TableOfContents({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-coral">On this page</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm text-ink-light transition-colors hover:text-coral"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
