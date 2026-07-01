import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { dashboardDataset, decideReleaseReadiness } from "@/domain/evalops";
import { EvaluationRail } from "./EvaluationRail";

describe("EvaluationRail", () => {
  it("renders each metric and release decision", () => {
    const release = decideReleaseReadiness({
      runs: dashboardDataset.runs,
      findings: dashboardDataset.findings,
      gates: dashboardDataset.releaseGates,
    });

    render(<EvaluationRail metrics={dashboardDataset.metrics} release={release} />);

    expect(screen.getByRole("heading", { name: "評価レール" })).toBeInTheDocument();
    expect(screen.getByText("出力品質")).toBeInTheDocument();
    expect(screen.getByText("安全性")).toBeInTheDocument();
    expect(screen.getByText("デプロイ判定")).toBeInTheDocument();
    expect(screen.getAllByText("要確認").length).toBeGreaterThan(0);
  });
});
