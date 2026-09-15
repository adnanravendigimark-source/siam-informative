export interface Stat {
  value: string;
  label: string;
}

const STAT_ICONS = ["🏆", "🎢", "🌊", "☀️"];

export default function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {stats.map((stat, idx) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-2xl border border-guide-200/80 bg-white/90 p-5 text-center shadow-card backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-ocean-border hover:shadow-card-hover"
        >
          {/* Subtle top accent gradient */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-ocean via-lagoon-400 to-gold-400 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="mb-2 flex justify-center text-xl" aria-hidden="true">
            {STAT_ICONS[idx % STAT_ICONS.length]}
          </div>
          <p className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            <span className="bg-gradient-to-r from-navy via-navy-light to-ocean-dark bg-clip-text text-transparent group-hover:from-ocean group-hover:to-lagoon-600 transition-colors">
              {stat.value}
            </span>
          </p>
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-guide-600">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
