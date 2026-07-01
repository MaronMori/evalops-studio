# Coding Standards

## Principles

- 小さく、明示的で、読みやすいコードを優先する。
- UIからドメイン判断を切り離す。
- 公開repoに秘密情報を置かない。
- テストは「壊れやすい見た目」より「意図した挙動」を検証する。

## TypeScript

- `strict` を前提にする。
- domain type は `src/domain/evalops/types.ts` に集約する。
- UI component は必要な props だけを受け取る。
- `any` は使わない。

## React / Next.js

- App Router を使う。
- Client Component は操作が必要な場所に限定する。
- 外部SDKや環境変数を module scope で初期化しない。
- build 時にネットワーク必須になる依存を避ける。

## Testing

- domain logic は unit test で境界値と分岐を検証する。
- UI component はユーザーが見る role / label / text で検証する。
- E2E は最重要導線だけに絞る。
- `npm run validate` がCI相当の品質ゲート。
