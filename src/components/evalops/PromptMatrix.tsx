import type { PromptVersion } from "@/domain/evalops";

type PromptMatrixProps = {
  versions: PromptVersion[];
};

export function PromptMatrix({ versions }: PromptMatrixProps) {
  return (
    <section
      aria-labelledby="prompt-matrix"
      className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
    >
      <div>
        <p className="font-mono text-xs text-slate-400">PROMPT VERSIONING</p>
        <h2 id="prompt-matrix" className="mt-1 text-lg font-semibold text-white">
          プロンプト版管理
        </h2>
      </div>
      <div className="mt-4 space-y-3">
        {versions.map((version) => (
          <article
            key={version.id}
            className="rounded-md border border-white/10 bg-slate-950/60 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-cyan-200">{version.id}</p>
                <h3 className="mt-1 text-sm font-semibold text-white">
                  {version.name}
                </h3>
              </div>
              <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300">
                {version.status}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{version.note}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-xs tabular-nums">
              <Delta label="品質" value={version.qualityDelta} />
              <Delta label="安全性" value={version.safetyDelta} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Delta({ label, value }: { label: string; value: number }) {
  const isPositive = value >= 0;
  return (
    <div className="rounded border border-white/10 bg-white/[0.03] px-2 py-2">
      <span className="text-slate-500">{label}</span>{" "}
      <span className={isPositive ? "text-emerald-200" : "text-rose-200"}>
        {isPositive ? "+" : ""}
        {value.toFixed(1)}
      </span>
    </div>
  );
}
