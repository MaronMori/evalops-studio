# Vercel Deployment

このリポジトリは Vercel への接続を想定しています。ただし、公開repoに Vercel token や環境変数は置きません。

## Recommended Settings

- Framework Preset: Next.js
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: Next.js default
- Environment Variables: なし

## GitHub Integration

1. GitHub に public repository として push する。
2. Vercel dashboard から repository を import する。
3. Production branch を `main` にする。
4. Preview Deployments は PR ごとに有効化する。

## Release Gate

Vercelに接続する前に、GitHub Actions の `npm run validate` が通ることを必須条件にします。

## Secrets Policy

このプロジェクトは外部APIを使わないため、デプロイに秘密情報は不要です。将来API連携を足す場合も、値はVercel側の Environment Variables にのみ保存し、repoには `.env.example` だけを置きます。
