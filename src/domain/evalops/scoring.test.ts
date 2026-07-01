import { describe, expect, it } from "vitest";
import {
  calculateMetricScore,
  calculateRunHealth,
  calculateSecurityRisk,
  dashboardDataset,
  decideReleaseReadiness,
  summarizeFindings,
} from "@/domain/evalops";

describe("evalops scoring", () => {
  it("scores higher-is-better and lower-is-better metrics against targets", () => {
    expect(calculateMetricScore(dashboardDataset.metrics[0])).toBeGreaterThan(100);
    expect(calculateMetricScore(dashboardDataset.metrics[2])).toBeGreaterThan(100);
  });

  it("keeps run health within a predictable 0-100 range", () => {
    const scores = dashboardDataset.runs.map(calculateRunHealth);

    expect(Math.min(...scores)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...scores)).toBeLessThanOrEqual(100);
    expect(calculateRunHealth(dashboardDataset.runs[0])).toBeGreaterThan(
      calculateRunHealth(dashboardDataset.runs[2]),
    );
  });

  it("summarizes unresolved security findings by severity", () => {
    const summary = summarizeFindings(dashboardDataset.findings);

    expect(summary.totalOpen).toBe(2);
    expect(summary.bySeverity.high).toBe(1);
    expect(summary.bySeverity.medium).toBe(1);
    expect(summary.bySeverity.low).toBe(0);
    expect(summary.blockingCount).toBe(1);
  });

  it("calculates risk from unresolved finding severity", () => {
    expect(calculateSecurityRisk(dashboardDataset.findings)).toBe(85);
  });

  it("requires review when failures or blocking findings remain", () => {
    const release = decideReleaseReadiness({
      runs: dashboardDataset.runs,
      findings: dashboardDataset.findings,
      gates: dashboardDataset.releaseGates,
    });

    expect(release.decision).toBe("needs-review");
    expect(release.reasons.join(" ")).toContain("品質ゲート");
  });

  it("approves release when all runs, findings, and gates are clear", () => {
    const release = decideReleaseReadiness({
      runs: dashboardDataset.runs
        .filter((run) => run.status !== "running")
        .map((run) => ({
          ...run,
          status: "passed" as const,
          qualityScore: 96,
          safetyScore: 99.5,
          latencyMs: 900,
          costUsd: 0.012,
        })),
      findings: dashboardDataset.findings.map((finding) => ({
        ...finding,
        status: "resolved" as const,
      })),
      gates: dashboardDataset.releaseGates.map((gate) => ({
        ...gate,
        status: "passed" as const,
      })),
    });

    expect(release.decision).toBe("approved");
  });
});
