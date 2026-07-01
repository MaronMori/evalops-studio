import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { dashboardDataset } from "@/domain/evalops";
import { EvalOpsDashboard } from "./EvalOpsDashboard";

describe("EvalOpsDashboard", () => {
  it("renders the Japanese dashboard shell", () => {
    render(<EvalOpsDashboard dataset={dashboardDataset} />);

    expect(
      screen.getByRole("heading", { name: "AI開発の評価とリリース判定" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "実行トレース" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "プロンプト版管理" }),
    ).toBeInTheDocument();
  });

  it("filters run traces by status and query", async () => {
    const user = userEvent.setup();
    render(<EvalOpsDashboard dataset={dashboardDataset} />);

    await user.click(screen.getByRole("button", { name: "停止" }));

    expect(screen.getAllByText("Incident Summary Agent").length).toBeGreaterThan(0);
    expect(screen.queryByText("Support Triage Agent")).not.toBeInTheDocument();

    await user.clear(screen.getByLabelText("実行トレースを検索"));
    await user.type(screen.getByLabelText("実行トレースを検索"), "prompt-v17");

    expect(screen.getAllByText("Incident Summary Agent").length).toBeGreaterThan(0);
  });

  it("switches to the security tab", async () => {
    const user = userEvent.setup();
    render(<EvalOpsDashboard dataset={dashboardDataset} />);

    await user.click(screen.getByRole("button", { name: "安全性" }));

    expect(screen.getByRole("heading", { name: "安全性チェック" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "実行トレース" }),
    ).not.toBeInTheDocument();
  });
});
