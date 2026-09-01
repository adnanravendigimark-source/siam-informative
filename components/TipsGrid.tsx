import { VISITOR_TIPS } from "@/lib/tips";

export default function TipsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {VISITOR_TIPS.map((tip) => (
        <div key={tip.title} className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
          <span className="text-2xl" aria-hidden="true">{tip.icon}</span>
          <p className="mt-3 font-display text-base font-bold text-indigo">{tip.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-light">{tip.body}</p>
        </div>
      ))}
    </div>
  );
}
