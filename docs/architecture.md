# Architecture

EvalOps Studio は、UIの見た目だけでなく、AI開発基盤らしい判断ロジックをコードで読めるように分離しています。

## Goals

- 公開repoでも安全に動くこと
- 評価、セキュリティ、リリース判定のロジックをUIから独立させること
- 採用担当者とエンジニアの両方が、設計意図を短時間で追えること

## Layers

### `src/domain/evalops`

AI評価基盤の中核です。ReactやNext.jsに依存しない純粋なTypeScriptとして、以下を扱います。

- 評価メトリクスのスコアリング
- 実行トレースのヘルス計算
- security finding の集計
- release readiness の判定
- run の検索、フィルタ、ソート
- seed data

### `src/components/evalops`

日本語UIの表示と操作を担当します。

- `EvalOpsDashboard`: 画面全体の状態管理
- `EvaluationRail`: 品質、安全性、遅延、コスト、デプロイ判定の横断表示
- `RunTracePanel`: 実行トレースの検索、フィルタ、詳細表示
- `PromptMatrix`: プロンプト版管理
- `SecurityPanel`: finding summary
- `ReleasePanel`: CI/CDのリリース判定

### `src/app`

Next.js App Router の entrypoint です。現在は外部データ取得を行わず、ローカル seed data を server boundary からUIに渡します。

## Data Flow

1. `dashboardDataset` がローカル模擬データを提供する。
2. `page.tsx` が `EvalOpsDashboard` に dataset を渡す。
3. `EvalOpsDashboard` が tab、filter、selected run のUI状態を持つ。
4. domain 関数が release summary、risk summary、filtered runs を計算する。
5. 各パネルは props を受け取り、表示に集中する。

## Why No External API?

このプロジェクトの目的は、公開repoで実装品質を見せることです。API連携を入れると `.env`、APIキー、失敗時の運用、利用規約が主役になりやすいため、v1では完全ローカルにしています。
