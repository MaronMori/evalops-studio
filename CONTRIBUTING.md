# Contributing

## Development Flow

1. 依存関係を入れる。
   ```bash
   npm install
   ```
2. 開発サーバーを起動する。
   ```bash
   npm run dev
   ```
3. 変更前後で検証する。
   ```bash
   npm run validate
   npm run test:e2e
   ```

## Commit Style

Conventional Commits に近い形式を使います。

- `feat:` 機能追加
- `test:` テスト追加
- `docs:` ドキュメント
- `ci:` CI/CD
- `chore:` 設定や依存関係
- `fix:` バグ修正

## Pull Request Checklist

- UI変更は desktop / mobile の崩れを確認した
- domain logic は unit test を追加した
- 公開してはいけない情報を含めていない
- `npm run validate` が通る
- 必要なら `npm run test:e2e` が通る
