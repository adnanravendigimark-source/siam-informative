import Link from "next/link";

export default function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-medium text-ink-light">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-ink-light/40">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="font-semibold text-ink">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-coral">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
