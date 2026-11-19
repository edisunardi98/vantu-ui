"use client";

import { BarChart3 } from "lucide-react";
import { useState } from "react";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { Delta, Metric } from "@/components/ui/metric";
import { SegmentedControl } from "@/components/ui/segmented-control";

export interface PerformancePoint {
  day: string;
  discovered: number;
  qualified: number;
}

/**
 * Stacked bar chart: qualified (solid accent) inside discovered (hatched neutral).
 * Plain SVG — no chart library required.
 */
export function PerformanceChart({ data, className }: { data: PerformancePoint[]; className?: string }) {
  const [range, setRange] = useState("14d");
  const max = 300;
  const ticks = [0, 100, 200, 300];
  const h = 200;
  const barW = 22;
  const gap = 14;
  const left = 32;
  const w = left + data.length * (barW + gap);
  const totals = data.reduce((a, d) => ({ q: a.q + d.qualified, d: a.d + d.discovered }), { q: 0, d: 0 });

  return (
    <Card className={className}>
      <CardHeader
        icon={
          <IconTile>
            <BarChart3 />
          </IconTile>
        }
        title="Prospecting performance"
        description="Discovered vs. qualified · last 14 days"
        actions={
          <SegmentedControl
            aria-label="Range"
            size="sm"
            value={range}
            onChange={setRange}
            options={[
              { id: "7d", label: "7D" },
              { id: "14d", label: "14D" },
              { id: "30d", label: "30D" },
            ]}
          />
        }
      />
      <CardBody>
        <div className="grid grid-cols-3 gap-px border-b border-line bg-line">
          <Metric size="md" className="bg-surface p-4" label="Discovered" value="2,372" delta={<Delta value={18} />} />
          <Metric size="md" className="bg-surface p-4" label="Qualified" value="648" delta={<Delta value={12} />} />
          <Metric size="md" className="bg-surface p-4" label="Qualification rate" value="27%" delta={<Delta value={1.2}>+1.2 pts</Delta>} />
        </div>
        <div className="p-4">
          <svg viewBox={`0 0 ${w} ${h + 24}`} className="h-auto w-full" role="img" aria-label="Bar chart of discovered and qualified prospects per day">
            <defs>
              <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="5" height="5" fill="var(--color-subtle)" />
                <line x1="0" y1="0" x2="0" y2="5" stroke="var(--color-chart-neutral-soft)" strokeWidth="2" />
              </pattern>
            </defs>
            {ticks.map((t) => {
              const y = h - (t / max) * h + 4;
              return (
                <g key={t}>
                  <line x1={left} x2={w} y1={y} y2={y} stroke="var(--color-chart-grid)" strokeDasharray={t === 0 ? undefined : "3 3"} />
                  <text x={0} y={y + 4} fontSize="10" fill="var(--color-fg-muted)">
                    {t}
                  </text>
                </g>
              );
            })}
            {data.map((d, i) => {
              const x = left + 8 + i * (barW + gap);
              const dh = (d.discovered / max) * h;
              const qh = (d.qualified / max) * h;
              return (
                <g key={d.day}>
                  <title>{`${d.day}: ${d.qualified} qualified of ${d.discovered}`}</title>
                  <rect x={x} y={h - dh + 4} width={barW} height={dh} rx={4} fill="url(#hatch)" stroke="var(--color-chart-neutral-soft)" />
                  <rect x={x} y={h - qh + 4} width={barW} height={qh} rx={4} fill="var(--color-chart-primary)" />
                  <text x={x + barW / 2} y={h + 20} fontSize="10" textAnchor="middle" fill={i === data.length - 1 ? "var(--color-fg)" : "var(--color-fg-muted)"} fontWeight={i === data.length - 1 ? 600 : 400}>
                    {d.day}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-5 text-sm text-fg-secondary">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-[3px] bg-chart-primary" /> Qualified (score ≥ 80) <b className="font-medium text-fg">{totals.q.toLocaleString("en-US")}</b>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-[3px] border border-chart-neutral-soft bg-subtle" /> Discovered, not qualified{" "}
              <b className="font-medium text-fg">{(totals.d - totals.q).toLocaleString("en-US")}</b>
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
