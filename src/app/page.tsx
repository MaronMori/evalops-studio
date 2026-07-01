export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <p className="font-mono text-sm text-cyan-300">EvalOps Studio</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white">
          AI開発の評価、安全性、リリース判定を一画面で確認する。
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          このリポジトリは、公開GitHubで設計・テスト・CI・ドキュメントの品質を示すための
          Next.js
          実装です。機密情報や外部APIキーを使わず、ローカル模擬データだけで動作します。
        </p>
      </main>
    </div>
  );
}
