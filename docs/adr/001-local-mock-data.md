# ADR 001: Use Local Mock Data For v1

## Status

Accepted

## Context

EvalOps Studio は公開GitHubで実装品質を見せることが目的です。実API連携を入れると、APIキー管理、外部サービス依存、CIでのsecret管理が必要になります。

## Decision

v1では完全ローカルの seed data を使います。評価スコア、セキュリティ集計、リリース判定は `src/domain/evalops` の純粋関数で実装します。

## Consequences

- clone 直後に秘密情報なしで動作する。
- CIが安定する。
- ドメインロジックをテストしやすい。
- 実サービス連携のリアリティは、将来のADRで追加判断する。
