import type {
  EvalMetric,
  EvaluationRun,
  FindingSummary,
  ReleaseGate,
  ReleaseSummary,
  SecurityFinding,
  Severity,
} from "./types";

const severityWeights: Record<Severity, number> = {
  critical: 100,
  high: 60,
  medium: 25,
  low: 5,
};

export function calculateMetricScore(metric: EvalMetric): number {
  if (metric.target <= 0) {
    return 0;
  }

  const ratio =
    metric.direction === "higher-is-better"
      ? metric.value / metric.target
      : metric.target / metric.value;

  return clamp(Math.round(ratio * 100), 0, 120);
}

export function calculateRunHealth(run: EvaluationRun): number {
  const quality = run.qualityScore * 0.45;
  const safety = run.safetyScore * 0.4;
  const latencyPenalty = Math.max(0, (run.latencyMs - 1500) / 25);
  const costPenalty = Math.max(0, (run.costUsd - 0.025) * 1000);

  return clamp(
    Math.round(quality + safety + 15 - latencyPenalty - costPenalty),
    0,
    100,
  );
}

export function summarizeFindings(findings: SecurityFinding[]): FindingSummary {
  const bySeverity: Record<Severity, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  const openFindings = findings.filter((finding) => finding.status !== "resolved");

  for (const finding of openFindings) {
    bySeverity[finding.severity] += 1;
  }

  return {
    totalOpen: openFindings.length,
    bySeverity,
    blockingCount: openFindings.filter(
      (finding) => finding.severity === "critical" || finding.severity === "high",
    ).length,
  };
}

export function calculateSecurityRisk(findings: SecurityFinding[]): number {
  const openFindings = findings.filter((finding) => finding.status !== "resolved");
  return openFindings.reduce(
    (total, finding) => total + severityWeights[finding.severity],
    0,
  );
}

export function decideReleaseReadiness(input: {
  runs: EvaluationRun[];
  findings: SecurityFinding[];
  gates: ReleaseGate[];
}): ReleaseSummary {
  const failedRuns = input.runs.filter((run) => run.status === "failed");
  const blockingFindings = summarizeFindings(input.findings).blockingCount;
  const failedGates = input.gates.filter((gate) => gate.status === "failed");
  const warningGates = input.gates.filter((gate) => gate.status === "warning");
  const averageHealth = average(input.runs.map(calculateRunHealth));

  const reasons: string[] = [];

  if (failedRuns.length > 0) {
    reasons.push(`${failedRuns.length}件の実行が品質ゲートで停止しています`);
  }

  if (blockingFindings > 0) {
    reasons.push(`${blockingFindings}件の重要な安全性findingがあります`);
  }

  if (failedGates.length > 0) {
    reasons.push(`${failedGates.length}件のリリースゲートが失敗しています`);
  }

  if (averageHealth < 88) {
    reasons.push(`平均ヘルススコアが${Math.round(averageHealth)}です`);
  }

  if (failedGates.length > 0 || blockingFindings >= 2) {
    return {
      decision: "blocked",
      label: "ブロック",
      reasons,
      score: Math.round(averageHealth),
    };
  }

  if (failedRuns.length > 0 || blockingFindings > 0 || warningGates.length > 0) {
    return {
      decision: "needs-review",
      label: "要確認",
      reasons: reasons.length > 0 ? reasons : ["手動承認が必要な警告があります"],
      score: Math.round(averageHealth),
    };
  }

  return {
    decision: "approved",
    label: "リリース可能",
    reasons: ["すべての評価ゲートが基準を満たしています"],
    score: Math.round(averageHealth),
  };
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((total, value) => total + value, 0) / values.length;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}
