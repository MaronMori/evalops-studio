import type { ReleaseGate, ReleaseSummary } from "@/domain/evalops";
import { StatusBadge } from "./StatusBadge";
import { decisionTone } from "./status";

type ReleasePanelProps = {
  release: ReleaseSummary;
  gates: ReleaseGate[];
};

export function ReleasePanel({ release, gates }: ReleasePanelProps) {
  return (
    <section
      aria-labelledby="release-readiness"
      className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-slate-400">RELEASE READINESS</p>
          <h2 id="release-readiness" className="mt-1 text-lg font-semibold text-white">
            リリース判定
          </h2>
        </div>
        <span
          className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${decisionTone[release.decision]}`}
        >
          {release.label}
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {gates.map((gate) => (
          <div
            key={gate.id}
            className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-slate-950/60 p-3"
          >
            <div>
              <p className="text-sm font-medium text-white">{gate.label}</p>
              <p className="mt-1 text-xs text-slate-500">{gate.evidence}</p>
            </div>
            <StatusBadge status={gate.status} />
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
        {release.reasons.map((reason) => (
          <li key={reason}>・{reason}</li>
        ))}
      </ul>
    </section>
  );
}
