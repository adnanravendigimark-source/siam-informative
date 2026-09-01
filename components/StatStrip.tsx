export interface Stat {
  value: string;
  label: string;
}

export default function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-ink/10 bg-white p-5 text-center shadow-card"
        >
          <p className="font-display text-2xl font-bold text-coral sm:text-3xl">{stat.value}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-light">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
