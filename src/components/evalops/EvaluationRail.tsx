import type { EvalMetric, ReleaseSummary } from "@/domain/evalops";
import { calculateMetricScore } from "@/domain/evalops";
import { decisionTone } from "./status";

type EvaluationRailProps = {
  metrics: EvalMetric[];
  release: ReleaseSummary;
};

export function EvaluationRail({ metrics, release }: EvaluationRailProps) {
  return (
    <section
      aria-labelledby="evaluation-rail"
      className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs text-cyan-200">EVALUATION RAIL</p>
          <h2 id="evaluation-rail" className="mt-1 text-lg font-semibold text-white">
            評価レール
          </h2>
        </div>
        <div
          className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-sm font-semibold ${decisionTone[release.decision]}`}
        >
          {release.label} · {release.score}
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-5">
        {metrics.map((metric) => {
          const score = calculateMetricScore(metric);
          return (
            <div
              key={metric.id}
              className="relative overflow-hidden rounded-md border border-white/10 bg-slate-950/60 p-3"
            >
              <div
                className="absolute inset-x-0 bottom-0 h-1 bg-cyan-300"
                style={{ width: `${Math.min(score, 100)}%` }}
              />
              <p className="text-xs text-slate-400">{metric.label}</p>
              <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-white">
                {formatMetricValue(metric)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                目標 {formatTargetValue(metric)}
              </p>
            </div>
          );
        })}
        <div className="rounded-md border border-cyan-300/20 bg-cyan-300/10 p-3">
          <p className="text-xs text-cyan-100">デプロイ判定</p>
          <p className="mt-2 text-2xl font-semibold text-white">{release.label}</p>
          <p className="mt-1 text-xs leading-5 text-cyan-100/75">
            {release.reasons[0]}
          </p>
        </div>
      </div>
    </section>
  );
}

function formatMetricValue(metric: EvalMetric): string {
  if (metric.unit === "USD") {
    return `$${metric.value.toFixed(3)}`;
  }

  if (metric.unit === "ms") {
    return `${metric.value.toLocaleString("ja-JP")}ms`;
  }

  return `${metric.value.toFixed(1)}${metric.unit === "%" ? "%" : ""}`;
}

function formatTargetValue(metric: EvalMetric): string {
  if (metric.unit === "USD") {
    return `$${metric.target.toFixed(3)}以下`;
  }

  if (metric.unit === "ms") {
    return `${metric.target.toLocaleString("ja-JP")}ms以下`;
  }

  return `${metric.target}${metric.unit === "%" ? "%以上" : ""}`;
}
