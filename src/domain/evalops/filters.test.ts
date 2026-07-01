import { describe, expect, it } from "vitest";
import { dashboardDataset, filterRuns, sortRunsByStartedAt } from "@/domain/evalops";

describe("evalops run filters", () => {
  it("filters runs by query across agent, scenario, model, and prompt version", () => {
    const byAgent = filterRuns(dashboardDataset.runs, { query: "support" });
    const byPrompt = filterRuns(dashboardDataset.runs, { query: "prompt-v12" });

    expect(byAgent).toHaveLength(1);
    expect(byAgent[0].id).toBe("run_1042");
    expect(byPrompt).toHaveLength(1);
    expect(byPrompt[0].id).toBe("run_1041");
  });

  it("filters by status without mutating the source list", () => {
    const source = [...dashboardDataset.runs];
    const failed = filterRuns(source, { status: "failed" });

    expect(failed).toHaveLength(1);
    expect(failed[0].id).toBe("run_1040");
    expect(source).toEqual(dashboardDataset.runs);
  });

  it("sorts newest runs first", () => {
    const sorted = sortRunsByStartedAt(dashboardDataset.runs);

    expect(sorted[0].id).toBe("run_1039");
    expect(sorted.at(-1)?.id).toBe("run_1040");
  });
});
