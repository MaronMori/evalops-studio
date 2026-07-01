import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { dashboardDataset } from "@/domain/evalops";
import { SecurityPanel } from "./SecurityPanel";

describe("SecurityPanel", () => {
  it("renders security finding summary and finding rows", () => {
    render(<SecurityPanel findings={dashboardDataset.findings} />);

    expect(screen.getByRole("heading", { name: "安全性チェック" })).toBeInTheDocument();
    expect(
      screen.getByText("PIIに近い入力をそのまま引用する可能性"),
    ).toBeInTheDocument();
    expect(screen.getByText("risk score")).toBeInTheDocument();
    expect(screen.getAllByText("high")).toHaveLength(2);
  });
});
