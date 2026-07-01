# Security Policy

## Supported Versions

`main` branch をサポート対象とします。

## Reporting

公開issueに秘密情報を書かないでください。脆弱性を見つけた場合は、再現手順から秘密情報を取り除いた形で報告してください。

## Secret Handling

- `.env` は不要です。
- APIキー、個人情報、顧客情報、未公開仕様はコミットしません。
- `.gitignore` は `.env*`、`.vercel`、build artifacts、test artifacts を除外します。
- 将来外部APIを追加する場合、secret はホスティング環境側で管理し、repoには値を置きません。

## Dependency Policy

依存関係は `npm audit` と Dependabot で継続的に確認します。自動修正が破壊的な downgrade や major change を提案する場合は採用せず、公式の安全な更新版へ追従します。
