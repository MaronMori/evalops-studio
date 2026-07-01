import type { EvaluationRun, RunFilters } from "./types";

export function filterRuns(
  runs: EvaluationRun[],
  filters: RunFilters,
): EvaluationRun[] {
  const query = filters.query?.trim().toLowerCase();

  return runs.filter((run) => {
    const matchesQuery =
      !query ||
      [run.id, run.agentName, run.scenario, run.model, run.promptVersion]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesStatus =
      !filters.status || filters.status === "all" || run.status === filters.status;

    const matchesModel =
      !filters.model || filters.model === "all" || run.model === filters.model;

    return matchesQuery && matchesStatus && matchesModel;
  });
}

export function sortRunsByStartedAt(runs: EvaluationRun[]): EvaluationRun[] {
  return [...runs].sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt));
}
