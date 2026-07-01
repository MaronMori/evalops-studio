"use client";

import { useMemo, useState } from "react";
import type { DashboardDataset, RunFilters } from "@/domain/evalops";
import { decideReleaseReadiness } from "@/domain/evalops";
import { ActivityTimeline } from "./ActivityTimeline";
import { EvaluationRail } from "./EvaluationRail";
import { PromptMatrix } from "./PromptMatrix";
import { ReleasePanel } from "./ReleasePanel";
import { RunTracePanel } from "./RunTracePanel";
import { SecurityPanel } from "./SecurityPanel";

type EvalOpsDashboardProps = {
  dataset: DashboardDataset;
};

const tabs = ["全体", "評価", "安全性", "リリース"] as const;

export function EvalOpsDashboard({ dataset }: EvalOpsDashboardProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("全体");
  const [filters, setFilters] = useState<RunFilters>({ status: "all" });
  const [selectedRunId, setSelectedRunId] = useState(dataset.runs[0]?.id ?? "");
  const release = useMemo(
    () =>
      decideReleaseReadiness({
        runs: dataset.runs,
        findings: dataset.findings,
        gates: dataset.releaseGates,
      }),
    [dataset.findings, dataset.releaseGates, dataset.runs],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_32rem),#090b0f] text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[248px_1fr]">
        <aside className="border-b border-white/10 bg-black/20 px-5 py-4 lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between gap-3 lg:block">
            <div>
              <p className="font-mono text-xs text-cyan-200">EvalOps</p>
              <h1 className="mt-1 text-xl font-semibold text-white">Studio</h1>
            </div>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
              public demo
            </span>
          </div>
          <nav className="mt-6 flex gap-2 overflow-x-auto lg:block lg:space-y-1">
            {["ダッシュボード", "実行トレース", "プロンプト", "安全性", "設定"].map(
              (item, index) => (
                <a
                  key={item}
                  href={index === 0 ? "/" : `#${item}`}
                  className={`block whitespace-nowrap rounded-md px-3 py-2 text-sm transition ${
                    index === 0
                      ? "bg-white text-slate-950"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ),
            )}
          </nav>
          <div className="mt-8 hidden rounded-lg border border-white/10 bg-white/[0.04] p-3 lg:block">
            <p className="text-xs text-slate-500">公開repo方針</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              外部APIや秘密情報は使わず、評価ロジックとUI品質をコードで示します。
            </p>
          </div>
        </aside>

        <main className="min-w-0 px-4 py-4 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="font-mono text-xs text-slate-500">AI RELEASE GOVERNANCE</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                AI開発の評価とリリース判定
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                品質、安全性、遅延、コスト、CI結果を同じ文脈で見て、手動承認が必要な変更だけを浮かび上がらせます。
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`h-10 rounded-md px-3 text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-cyan-300 text-slate-950"
                      : "border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </header>

          <div className="mt-5 space-y-5">
            <EvaluationRail metrics={dataset.metrics} release={release} />

            {(activeTab === "全体" || activeTab === "評価") && (
              <RunTracePanel
                runs={dataset.runs}
                selectedRunId={selectedRunId}
                filters={filters}
                onFiltersChange={setFilters}
                onSelectRun={setSelectedRunId}
              />
            )}

            <div className="grid gap-5 xl:grid-cols-[1fr_1fr_0.85fr]">
              {(activeTab === "全体" || activeTab === "評価") && (
                <PromptMatrix versions={dataset.promptVersions} />
              )}
              {(activeTab === "全体" || activeTab === "安全性") && (
                <SecurityPanel findings={dataset.findings} />
              )}
              {(activeTab === "全体" || activeTab === "リリース") && (
                <ReleasePanel release={release} gates={dataset.releaseGates} />
              )}
            </div>

            <ActivityTimeline activities={dataset.activities} />
          </div>
        </main>
      </div>
    </div>
  );
}
