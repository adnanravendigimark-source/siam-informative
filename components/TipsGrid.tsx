import { VISITOR_TIPS } from "@/lib/tips";

export default function TipsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {VISITOR_TIPS.map((tip) => (
        <div
          key={tip.title}
          className="rounded-lg border border-guide-200 bg-white p-5 shadow-card"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl" aria-hidden="true">{tip.icon}</span>
            <h3 className="text-sm font-bold text-navy">{tip.title}</h3>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-guide-600">{tip.body}</p>
        </div>
      ))}
    </div>
  );
}
