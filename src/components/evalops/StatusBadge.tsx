import type { RunStatus } from "@/domain/evalops";
import { statusLabel, statusTone } from "./status";

type StatusBadgeProps = {
  status: RunStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-medium ${statusTone[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}
