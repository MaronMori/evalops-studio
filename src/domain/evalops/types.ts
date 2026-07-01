export type RunStatus = "passed" | "warning" | "failed" | "running";

export type Severity = "critical" | "high" | "medium" | "low";

export type ReleaseDecision = "approved" | "needs-review" | "blocked";

export type PromptVersionStatus = "candidate" | "stable" | "deprecated";

export type EvalMetric = {
  id: string;
  label: string;
  value: number;
  target: number;
  unit: "%" | "ms" | "USD" | "score";
  direction: "higher-is-better" | "lower-is-better";
};

export type EvaluationRun = {
  id: string;
  agentName: string;
  scenario: string;
  model: string;
  promptVersion: string;
  status: RunStatus;
  startedAt: string;
  durationMs: number;
  costUsd: number;
  qualityScore: number;
  safetyScore: number;
  latencyMs: number;
  summary: string;
};

export type SecurityFinding = {
  id: string;
  title: string;
  severity: Severity;
  status: "open" | "triaged" | "resolved";
  owner: string;
  relatedRunId: string;
};

export type PromptVersion = {
  id: string;
  name: string;
  status: PromptVersionStatus;
  author: string;
  changedAt: string;
  qualityDelta: number;
  safetyDelta: number;
  note: string;
};

export type ReleaseGate = {
  id: string;
  label: string;
  status: RunStatus;
  evidence: string;
};

export type ActivityEvent = {
  id: string;
  happenedAt: string;
  actor: string;
  action: string;
  tone: "neutral" | "success" | "warning" | "danger";
};

export type DashboardDataset = {
  metrics: EvalMetric[];
  runs: EvaluationRun[];
  findings: SecurityFinding[];
  promptVersions: PromptVersion[];
  releaseGates: ReleaseGate[];
  activities: ActivityEvent[];
};

export type ReleaseSummary = {
  decision: ReleaseDecision;
  label: string;
  reasons: string[];
  score: number;
};

export type FindingSummary = {
  totalOpen: number;
  bySeverity: Record<Severity, number>;
  blockingCount: number;
};

export type RunFilters = {
  query?: string;
  status?: RunStatus | "all";
  model?: string | "all";
};
