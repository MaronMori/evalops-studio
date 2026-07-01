import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EvalOps Studio",
  description:
    "AI開発の評価、品質、安全性、リリース判定を可視化する日本語ダッシュボード。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
