import type { SecurityFinding } from "@/domain/evalops";
import { calculateSecurityRisk, summarizeFindings } from "@/domain/evalops";
import { severityTone } from "./status";

type SecurityPanelProps = {
  findings: SecurityFinding[];
};

export function SecurityPanel({ findings }: SecurityPanelProps) {
  const summary = summarizeFindings(findings);
  const risk = calculateSecurityRisk(findings);

  return (
    <section
      aria-labelledby="security-checks"
      className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-slate-400">SECURITY CHECKS</p>
          <h2 id="security-checks" className="mt-1 text-lg font-semibold text-white">
            安全性チェック
          </h2>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-semibold text-white">{risk}</p>
          <p className="text-xs text-slate-500">risk score</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
        {Object.entries(summary.bySeverity).map(([severity, count]) => (
          <div key={severity} className="rounded-md border border-white/10 p-2">
            <p className="font-mono text-lg text-white">{count}</p>
            <p className="mt-1 text-slate-500">{severity}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {findings.map((finding) => (
          <article
            key={finding.id}
            className="rounded-md border border-white/10 bg-slate-950/60 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`rounded px-2 py-1 text-xs font-semibold ${severityTone[finding.severity]}`}
              >
                {finding.severity}
              </span>
              <span className="text-xs text-slate-500">{finding.status}</span>
            </div>
            <h3 className="mt-2 text-sm font-medium text-white">{finding.title}</h3>
            <p className="mt-1 font-mono text-xs text-slate-500">
              {finding.owner} · {finding.relatedRunId}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
