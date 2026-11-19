import { TrendingUp } from "lucide-react";
import { MetricsStrip } from "@/components/blocks/metrics-strip";
import { IconTile } from "@/components/ui/card";
import { metrics } from "@/lib/demo-data";

export default function Example() {
  return (
    <MetricsStrip
      items={metrics}
      className="w-full"
      icon={
        <IconTile tone="teal">
          <TrendingUp />
        </IconTile>
      }
      title="Prospecting this week"
      description="Last 7 days vs. the 7 days before"
    />
  );
}
