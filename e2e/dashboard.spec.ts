import { expect, test } from "@playwright/test";

test("dashboard loads and supports filtering", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "AI開発の評価とリリース判定" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "評価レール" })).toBeVisible();

  await page.getByRole("button", { name: "停止" }).click();
  const traceTable = page.getByRole("table");
  await expect(traceTable.getByText("Incident Summary Agent")).toBeVisible();
  await expect(traceTable.getByText("Support Triage Agent")).toHaveCount(0);
});

test("security tab is usable on mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "安全性" }).click();

  await expect(page.getByRole("heading", { name: "安全性チェック" })).toBeVisible();
  await expect(page.getByText("PIIに近い入力をそのまま引用する可能性")).toBeVisible();
});
