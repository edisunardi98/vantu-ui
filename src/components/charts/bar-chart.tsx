"use client";

import { useState } from "react";
import { barPath, ChartSurface, ChartTooltip, colorOf, formatCompact, Legend, makeFrame, niceScale, type Series, SrTable, TooltipRow, XLabels, YGrid } from "./chart-kit";

export interface BarChartProps<K extends string> {
  data: ({ label: string } & Record<K, number>)[];
  series: Series<K>[];
  /** "grouped" places series side by side; "stacked" piles them with 2px gaps. */
  layout?: "grouped" | "stacked";
  format?: (n: number) => string;
  className?: string;
}

/**
 * Vertical bars, grouped or stacked. Bars have 4px rounded data ends anchored to
 * a square baseline, 2px surface gaps between fills, and a tooltip per category.
 */
export function BarChart<K extends string>({ data, series, layout = "grouped", format = formatCompact, className }: BarChartProps<K>) {
  const [active, setActive] = useState<number | null>(null);
  const f = makeFrame(640, 240);
  const stacked = layout === "stacked";
  const totals = data.map((d) => series.reduce((sum, s) => sum + d[s.key], 0));
  const { max, ticks } = niceScale(stacked ? Math.max(...totals) : Math.max(...data.flatMap((d) => series.map((s) => d[s.key]))));
  const band = f.iw / data.length;
  const groupW = Math.min(band * 0.64, stacked ? 28 : series.length * 18 + (series.length - 1) * 2);
  const barW = stacked ? groupW : (groupW - (series.length - 1) * 2) / series.length;
  const xOf = (i: number) => f.left + band * i + band / 2;
  const hOf = (v: number) => (v / max) * f.ih;
  const base = f.top + f.ih;
  const a = active !== null ? data[active] : undefined;

  return (
    <div className={className}>
      {series.length > 1 && <Legend className="mb-3" items={series.map((s, i) => ({ label: s.label, color: colorOf(s, i) }))} />}
      <ChartSurface
        f={f}
        label={`${stacked ? "Stacked" : "Grouped"} bar chart of ${series.map((s) => s.label).join(", ")}`}
        overlay={
          a && (
            <ChartTooltip f={f} x={xOf(active!)} y={base - hOf(stacked ? totals[active!]! : Math.max(...series.map((s) => a[s.key])))} title={a.label}>
              {series.map((s, i) => (
                <TooltipRow key={s.key} color={colorOf(s, i)} label={s.label} value={format(a[s.key])} />
              ))}
              {stacked && series.length > 1 && (
                <div className="mt-1 border-t border-line pt-1">
                  <TooltipRow label="Total" value={format(totals[active!]!)} />
                </div>
              )}
            </ChartTooltip>
          )
        }
      >
        <YGrid f={f} ticks={ticks} max={max} format={format} />
        <XLabels f={f} labels={data.map((d) => d.label)} xOf={xOf} active={active} />
        {data.map((d, i) => {
          const x0 = xOf(i) - groupW / 2;
          let acc = 0;
          return (
            <g
              key={d.label}
              tabIndex={0}
              role="img"
              aria-label={`${d.label}: ${series.map((s) => `${s.label} ${format(d[s.key])}`).join(", ")}`}
              className="outline-none"
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              opacity={active === null || active === i ? 1 : 0.45}
              style={{ transition: "opacity 120ms" }}
            >
              {/* Hit target spans the whole band, taller than the marks. */}
              <rect x={f.left + band * i} y={f.top} width={band} height={f.ih} fill="transparent" />
              {active === i && <rect x={f.left + band * i + 2} y={f.top} width={band - 4} height={f.ih} rx={6} fill="var(--color-chart-grid)" opacity={0.6} />}
              {series.map((s, k) => {
                const v = d[s.key];
                const h = hOf(v);
                if (stacked) {
                  const isTop = k === series.length - 1 || series.slice(k + 1).every((n) => d[n.key] === 0);
                  const y = base - acc - h;
                  acc += h;
                  // 2px surface gap between stacked segments; only the top segment is rounded.
                  const gap = k === 0 ? 0 : 2;
                  return isTop ? (
                    <path key={s.key} d={barPath(x0, y, barW, h - gap)} fill={colorOf(s, k)} />
                  ) : (
                    <rect key={s.key} x={x0} y={y} width={barW} height={Math.max(h - gap, 0)} fill={colorOf(s, k)} />
                  );
                }
                return <path key={s.key} d={barPath(x0 + k * (barW + 2), base - h, barW, h)} fill={colorOf(s, k)} />;
              })}
            </g>
          );
        })}
      </ChartSurface>
      <SrTable
        caption="Bar chart data"
        columns={["Category", ...series.map((s) => s.label), ...(stacked ? ["Total"] : [])]}
        rows={data.map((d, i) => [d.label, ...series.map((s) => format(d[s.key])), ...(stacked ? [format(totals[i]!)] : [])])}
      />
    </div>
  );
}
