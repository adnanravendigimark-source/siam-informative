import Link from "next/link";

export default function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-guide-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-guide-300">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="font-medium text-guide-800">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-ocean-dark transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
