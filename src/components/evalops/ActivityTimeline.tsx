import type { ActivityEvent } from "@/domain/evalops";

type ActivityTimelineProps = {
  activities: ActivityEvent[];
};

const toneClass: Record<ActivityEvent["tone"], string> = {
  neutral: "bg-slate-400",
  success: "bg-emerald-300",
  warning: "bg-amber-300",
  danger: "bg-rose-300",
};

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <section
      aria-labelledby="activity-timeline"
      className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
    >
      <p className="font-mono text-xs text-slate-400">ACTIVITY</p>
      <h2 id="activity-timeline" className="mt-1 text-lg font-semibold text-white">
        アクティビティ
      </h2>
      <ol className="mt-4 space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex gap-3">
            <span
              className={`mt-1.5 h-2.5 w-2.5 rounded-full ${toneClass[activity.tone]}`}
            />
            <div>
              <p className="text-sm text-white">{activity.action}</p>
              <p className="mt-1 font-mono text-xs text-slate-500">
                {activity.happenedAt} · {activity.actor}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
