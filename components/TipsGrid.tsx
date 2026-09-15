import type { Tip } from "@/lib/tips";

export default function TipsGrid({ tips }: { tips: Tip[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tips.map((tip) => (
        <div
          key={tip.title}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-guide-200/90 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-ocean-cyan/50 hover:shadow-card-hover"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lagoon-50 to-guide-100 text-xl shadow-xs ring-1 ring-guide-200/60 transition-transform duration-300 group-hover:scale-110">
                <span aria-hidden="true">{tip.icon}</span>
              </div>
              <h3 className="font-display text-sm font-bold text-navy group-hover:text-ocean-dark transition-colors sm:text-base">
                {tip.title}
              </h3>
            </div>
            <p className="mt-3.5 text-xs leading-relaxed text-guide-600 sm:text-[13px]">
              {tip.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
