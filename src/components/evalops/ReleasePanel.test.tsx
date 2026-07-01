import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { dashboardDataset, decideReleaseReadiness } from "@/domain/evalops";
import { ReleasePanel } from "./ReleasePanel";

describe("ReleasePanel", () => {
  it("shows release gates and review reasons", () => {
    const release = decideReleaseReadiness({
      runs: dashboardDataset.runs,
      findings: dashboardDataset.findings,
      gates: dashboardDataset.releaseGates,
    });

    render(<ReleasePanel release={release} gates={dashboardDataset.releaseGates} />);

    expect(screen.getByRole("heading", { name: "リリース判定" })).toBeInTheDocument();
    expect(screen.getByText("単体テスト")).toBeInTheDocument();
    expect(screen.getByText("手動承認待ち")).toBeInTheDocument();
    expect(screen.getByText(/重要な安全性finding/)).toBeInTheDocument();
  });
});
