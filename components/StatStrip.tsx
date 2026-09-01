export interface Stat {
  value: string;
  label: string;
}

export default function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-guide-200 bg-white p-4 text-center shadow-card sm:p-5"
        >
          <p className="text-xl font-bold tracking-tight text-navy sm:text-2xl">{stat.value}</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-guide-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
