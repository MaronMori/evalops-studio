import type { ReleaseDecision, RunStatus, Severity } from "@/domain/evalops";

export const statusLabel: Record<RunStatus, string> = {
  passed: "合格",
  warning: "要確認",
  failed: "停止",
  running: "実行中",
};

export const statusTone: Record<RunStatus, string> = {
  passed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  warning: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  failed: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  running: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
};

export const severityTone: Record<Severity, string> = {
  critical: "bg-rose-500 text-white",
  high: "bg-orange-400 text-slate-950",
  medium: "bg-amber-300 text-slate-950",
  low: "bg-slate-500 text-white",
};

export const decisionTone: Record<ReleaseDecision, string> = {
  approved: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
  "needs-review": "border-amber-400/40 bg-amber-400/10 text-amber-100",
  blocked: "border-rose-400/40 bg-rose-400/10 text-rose-100",
};
