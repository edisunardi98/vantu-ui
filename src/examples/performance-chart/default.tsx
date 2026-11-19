import { PerformanceChart } from "@/components/blocks/performance-chart";
import { performance } from "@/lib/demo-data";

export default function Example() {
  return <PerformanceChart data={performance} className="w-full max-w-2xl" />;
}
