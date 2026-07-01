"use client";

import type { EvaluationRun, RunFilters, RunStatus } from "@/domain/evalops";
import { calculateRunHealth, filterRuns, sortRunsByStartedAt } from "@/domain/evalops";
import { StatusBadge } from "./StatusBadge";

type RunTracePanelProps = {
  runs: EvaluationRun[];
  selectedRunId: string;
  filters: RunFilters;
  onFiltersChange: (filters: RunFilters) => void;
  onSelectRun: (runId: string) => void;
};

const statuses: Array<RunStatus | "all"> = [
  "all",
  "passed",
  "warning",
  "failed",
  "running",
];

const statusFilterLabel: Record<RunStatus | "all", string> = {
  all: "すべて",
  passed: "合格",
  warning: "要確認",
  failed: "停止",
  running: "実行中",
};

export function RunTracePanel({
  runs,
  selectedRunId,
  filters,
  onFiltersChange,
  onSelectRun,
}: RunTracePanelProps) {
  const filteredRuns = sortRunsByStartedAt(filterRuns(runs, filters));
  const selectedRun =
    runs.find((run) => run.id === selectedRunId) ?? filteredRuns[0] ?? runs[0];

  return (
    <section
      aria-labelledby="run-traces"
      className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]"
    >
      <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="font-mono text-xs text-slate-400">RUN TRACE</p>
            <h2 id="run-traces" className="mt-1 text-lg font-semibold text-white">
              実行トレース
            </h2>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="run-search">
              実行トレースを検索
            </label>
            <input
              id="run-search"
              value={filters.query ?? ""}
              onChange={(event) =>
                onFiltersChange({ ...filters, query: event.target.value })
              }
              placeholder="agent / model / prompt"
              className="h-10 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-cyan-300"
            />
            <div className="flex rounded-md border border-white/10 bg-slate-950 p-1">
              {statuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => onFiltersChange({ ...filters, status })}
                  className={`h-8 rounded px-2.5 text-xs font-medium transition ${
                    (filters.status ?? "all") === status
                      ? "bg-white text-slate-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {statusFilterLabel[status]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
            <thead className="text-xs text-slate-500">
              <tr>
                <th className="border-b border-white/10 py-2 font-medium">Run</th>
                <th className="border-b border-white/10 py-2 font-medium">シナリオ</th>
                <th className="border-b border-white/10 py-2 font-medium">状態</th>
                <th className="border-b border-white/10 py-2 font-medium">ヘルス</th>
                <th className="border-b border-white/10 py-2 font-medium">遅延</th>
                <th className="border-b border-white/10 py-2 font-medium">コスト</th>
              </tr>
            </thead>
            <tbody>
              {filteredRuns.map((run) => (
                <tr
                  key={run.id}
                  className={`cursor-pointer transition ${
                    selectedRun.id === run.id ? "bg-cyan-300/10" : "hover:bg-white/5"
                  }`}
                  onClick={() => onSelectRun(run.id)}
                >
                  <td className="border-b border-white/5 py-3 pr-4">
                    <p className="font-mono text-xs text-cyan-200">{run.id}</p>
                    <p className="mt-1 text-white">{run.agentName}</p>
                  </td>
                  <td className="border-b border-white/5 py-3 pr-4 text-slate-300">
                    {run.scenario}
                    <p className="mt-1 font-mono text-xs text-slate-500">
                      {run.model} · {run.promptVersion}
                    </p>
                  </td>
                  <td className="border-b border-white/5 py-3 pr-4">
                    <StatusBadge status={run.status} />
                  </td>
                  <td className="border-b border-white/5 py-3 pr-4 font-mono tabular-nums text-white">
                    {calculateRunHealth(run)}
                  </td>
                  <td className="border-b border-white/5 py-3 pr-4 font-mono tabular-nums text-slate-300">
                    {run.latencyMs.toLocaleString("ja-JP")}ms
                  </td>
                  <td className="border-b border-white/5 py-3 font-mono tabular-nums text-slate-300">
                    ${run.costUsd.toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
        <p className="font-mono text-xs text-slate-400">SELECTED TRACE</p>
        <h3 className="mt-1 text-lg font-semibold text-white">
          {selectedRun.agentName}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">{selectedRun.summary}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3">
          <TraceStat label="品質" value={`${selectedRun.qualityScore.toFixed(1)}%`} />
          <TraceStat label="安全性" value={`${selectedRun.safetyScore.toFixed(1)}%`} />
          <TraceStat label="Prompt" value={selectedRun.promptVersion} />
          <TraceStat label="Model" value={selectedRun.model} />
        </dl>
      </aside>
    </section>
  );
}

function TraceStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-slate-950/70 p-3">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="mt-1 font-mono text-sm text-white">{value}</dd>
    </div>
  );
}
