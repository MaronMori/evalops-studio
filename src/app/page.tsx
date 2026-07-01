import { EvalOpsDashboard } from "@/components/evalops/EvalOpsDashboard";
import { dashboardDataset } from "@/domain/evalops";

export default function Home() {
  return <EvalOpsDashboard dataset={dashboardDataset} />;
}
