# EvalOps Studio

EvalOps Studio は、AIエージェント開発における **評価・安全性・コスト・遅延・リリース判定**を一画面で扱う、日本語UIの Next.js ダッシュボードです。

このリポジトリは、公開GitHubで読まれることを前提に、実務に近い設計、テスト、CI、ドキュメントを揃えたポートフォリオプロジェクトとして作っています。外部APIや秘密情報は使わず、完全なローカル模擬データだけで動作します。

## Highlights

- Next.js App Router + TypeScript strict + Tailwind CSS
- AI評価ドメインを `src/domain/evalops` に分離
- 評価スコア、セキュリティ集計、リリース判定を純粋関数として実装
- 日本語の実務SaaSダッシュボードUI
- Vitest + React Testing Library + Playwright
- `npm run validate` で format / lint / typecheck / test / build を一括検証
- GitHub Actions と Dependabot を想定した公開repo運用

## Local Setup

```bash
npm install
npm run dev
```

ブラウザで `http://127.0.0.1:3000` を開きます。

## Commands

```bash
npm run format        # Prettierで整形
npm run format:check  # 整形チェック
npm run lint          # ESLint
npm run typecheck     # TypeScript
npm run test          # Unit / component tests
npm run test:e2e      # Playwright smoke tests
npm run build         # Production build
npm run validate      # CI相当の一括検証
```

## Project Structure

```text
src/
  app/                  Next.js App Router
  components/evalops/   日本語ダッシュボードUI
  domain/evalops/       評価・安全性・リリース判定の純粋ロジック
  test/                 テストセットアップ
e2e/                    Playwright smoke tests
docs/                   設計・運用ドキュメント
```

## Security And Privacy

- `.env` は不要です。
- 公開repoにAPIキー、個人情報、顧客情報、未公開仕様を置かない方針です。
- 外部API連携は実装していません。
- `npm audit` は Next.js 依存内の advisory を検出する場合があります。壊れる自動修正は使わず、Next.js の安全な更新版へ追従する方針です。

## Documentation

- [Architecture](./docs/architecture.md)
- [Coding Standards](./docs/coding-standards.md)
- [Vercel Deployment](./docs/vercel-deployment.md)
- [ADR 001: Local Mock Data](./docs/adr/001-local-mock-data.md)
- [Security Policy](./SECURITY.md)
- [Contribution Guide](./CONTRIBUTING.md)

## Deployment

Vercel連携を想定しています。GitHub repository を Vercel に接続し、Build Command は `npm run build`、Install Command は `npm ci` を使います。トークンや環境変数はこのrepoには含めません。
