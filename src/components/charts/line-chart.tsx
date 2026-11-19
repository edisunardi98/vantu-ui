"use client";

import { ChartSurface, ChartTooltip, colorOf, formatCompact, Legend, makeFrame, niceScale, type Series, smoothPath, SrTable, TooltipRow, useScrub, XLabels, YGrid } from "./chart-kit";

export interface LineChartProps<K extends string> {
  data: ({ label: string } & Record<K, number>)[];
  series: Series<K>[];
  format?: (n: number) => string;
  labelEvery?: number;
  /** Name each line at its last point (on by default for ≤ 4 series). */
  directLabels?: boolean;
  className?: string;
}

/**
 * Multi-series trend. Up to 6 series in fixed color order; a legend is always
 * shown and ≤ 4 series are also labeled at the line end. One shared y-axis.
 */
export function LineChart<K extends string>({ data, series, format = formatCompact, labelEvery = 1, directLabels = series.length <= 4, className }: LineChartProps<K>) {
  const f = makeFrame(640, 240, { right: directLabels ? 84 : 12 });
  const { max, ticks } = niceScale(Math.max(...data.flatMap((d) => series.map((s) => d[s.key]))));
  const step = f.iw / Math.max(data.length - 1, 1);
  const xOf = (i: number) => f.left + i * step;
  const yOf = (v: number) => f.top + f.ih - (v / max) * f.ih;
  const { active, hitProps } = useScrub(data.length, (vx) => Math.round((vx - f.left) / step));
  const last = data.length - 1;

  // Nudge end labels apart so they never overlap (min 14px).
  const ends = series.map((s, i) => ({ s, i, y: yOf(data[last]![s.key]) })).sort((a, b) => a.y - b.y);
  for (let k = 1; k < ends.length; k++) ends[k]!.y = Math.max(ends[k]!.y, ends[k - 1]!.y + 14);

  const a = active !== null ? data[active] : undefined;
  const topY = a ? Math.min(...series.map((s) => yOf(a[s.key]))) : 0;

  return (
    <div className={className}>
      <Legend className="mb-3" items={series.map((s, i) => ({ label: s.label, color: colorOf(s, i), shape: "line" }))} />
      <ChartSurface
        f={f}
        label={`Line chart comparing ${series.map((s) => s.label).join(", ")}`}
        overlay={
          a && (
            <ChartTooltip f={f} x={xOf(active!)} y={topY} title={a.label}>
              {series
                .map((s, i) => ({ s, i, v: a[s.key] }))
                .sort((p, q) => q.v - p.v)
                .map(({ s, i, v }) => (
                  <TooltipRow key={s.key} color={colorOf(s, i)} shape="line" label={s.label} value={format(v)} />
                ))}
            </ChartTooltip>
          )
        }
      >
        <YGrid f={f} ticks={ticks} max={max} format={format} />
        <XLabels f={f} labels={data.map((d) => d.label)} xOf={xOf} active={active} every={labelEvery} />
        {active !== null && <line x1={xOf(active)} x2={xOf(active)} y1={f.top} y2={f.top + f.ih} stroke="var(--color-line-strong)" pointerEvents="none" />}
        {series.map((s, i) => (
          <path
            key={s.key}
            d={smoothPath(data.map((d, j) => [xOf(j), yOf(d[s.key])]))}
            fill="none"
            stroke={colorOf(s, i)}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
        {directLabels &&
          ends.map(({ s, i, y }) => (
            <g key={s.key} aria-hidden>
              <circle cx={xOf(last)} cy={yOf(data[last]![s.key])} r={3} fill={colorOf(s, i)} />
              <text x={xOf(last) + 10} y={y} dy="0.32em" fontSize={12} fill="var(--color-fg-secondary)">
                {s.label}
              </text>
            </g>
          ))}
        {a &&
          series.map((s, i) => (
            <circle key={s.key} cx={xOf(active!)} cy={yOf(a[s.key])} r={5} fill={colorOf(s, i)} stroke="var(--color-surface)" strokeWidth={2} pointerEvents="none" />
          ))}
        <rect x={f.left - step / 2} y={f.top} width={f.iw + step} height={f.ih} aria-label="Scrub data points with arrow keys" {...hitProps} />
      </ChartSurface>
      <SrTable caption="Line chart data" columns={["Period", ...series.map((s) => s.label)]} rows={data.map((d) => [d.label, ...series.map((s) => format(d[s.key]))])} />
    </div>
  );
}
