import { Activity } from "lucide-react";
import { Sparkline } from "@/components/charts/sparkline";
import { Card, CardHeader, IconTile } from "@/components/ui/card";
import { Delta } from "@/components/ui/metric";

const kpis = [
  { label: "Prospects discovered", value: "1,284", delta: 18, values: [62, 70, 66, 81, 77, 92, 104, 98, 112, 121] },
  { label: "Reply rate", value: "8.6%", delta: 1.4, deltaLabel: "+1.4 pts", values: [6.1, 6.4, 6.2, 7.0, 7.3, 7.1, 7.8, 8.2, 8.0, 8.6] },
  { label: "Bounce rate", value: "3.2%", delta: -0.8, deltaLabel: "−0.8 pts", values: [4.4, 4.1, 4.3, 3.9, 3.8, 3.6, 3.7, 3.4, 3.3, 3.2], invert: true },
];

export default function Example() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader
        icon={
          <IconTile tone="teal">
            <Activity />
          </IconTile>
        }
        title="Outreach health"
        description="Last 10 days"
      />
      {/* Same panel as Usage Card: cells divided by 1px lines inside one rounded panel. */}
      <div className="grid gap-px overflow-hidden rounded-[12px] border border-line bg-line sm:grid-cols-3">
        {kpis.map((k) => (
          <div key={k.label} className="flex flex-col gap-2 bg-surface p-4">
            <span className="text-sm text-fg-muted">{k.label}</span>
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-2xl font-semibold tabular-nums text-fg">{k.value}</div>
                <Delta value={k.delta} invert={k.invert} className="whitespace-nowrap">
                  {k.deltaLabel}
                </Delta>
              </div>
              <Sparkline values={k.values} label={`${k.label}, last 10 days`} tone={k.invert ? "success" : "accent"} className="w-24 shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
