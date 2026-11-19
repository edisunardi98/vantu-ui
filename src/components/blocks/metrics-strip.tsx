import type { ReactNode } from "react";
import { Sparkline } from "@/components/charts/sparkline";
import { Card, CardHeader } from "@/components/ui/card";
import { Delta, Metric, Sparkbars } from "@/components/ui/metric";

export interface MetricsStripItem {
  label: string;
  value: string;
  delta: number;
  deltaLabel?: string;
  caption?: string;
  spark?: number[];
}

export interface MetricsStripProps {
  items: MetricsStripItem[];
  /** Optional card header. Leave it out under a page header that already names the view. */
  title?: ReactNode;
  description?: ReactNode;
  /** An <IconTile>. */
  icon?: ReactNode;
  actions?: ReactNode;
  /** How `spark` is drawn: sparkbars (default) or a Sparkline trend line. */
  trend?: "bars" | "line";
  className?: string;
}

/** KPI cells divided by 1px rules in one panel, inside the layered card shell. */
export function MetricsStrip({ items, title, description, icon, actions, trend = "bars", className }: MetricsStripProps) {
  return (
    <Card className={className}>
      {title && <CardHeader icon={icon} title={title} description={description} actions={actions} />}
      {/* gap-px over a line-colored background draws the dividers at every breakpoint. */}
      <div className="grid gap-px overflow-hidden rounded-[12px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((m) => (
        <Metric
          key={m.label}
          className="bg-surface p-5"
          label={m.label}
          value={m.value}
          delta={
            <Delta value={m.delta} className="whitespace-nowrap">
              {m.deltaLabel}
            </Delta>
          }
          caption={m.caption}
          aside={
            m.spark &&
            (trend === "line" ? (
              <Sparkline values={m.spark} label={`${m.label}, recent trend`} tone={m.delta < 0 ? "error" : "accent"} className="w-20 shrink-0" />
            ) : (
              <Sparkbars values={m.spark} />
            ))
          }
        />
      ))}
      </div>
    </Card>
  );
}
