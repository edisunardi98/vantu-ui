"use client";

import { useId } from "react";
import { ChartSurface, ChartTooltip, formatCompact, Legend, makeFrame, niceScale, smoothPath, SrTable, TooltipRow, useScrub, XLabels, YGrid } from "./chart-kit";

export interface AreaPoint {
  label: string;
  value: number;
  /** Same period last cycle, drawn as a dashed neutral line. */
  previous?: number;
}

export interface AreaChartProps {
  data: AreaPoint[];
  /** Names the series in the tooltip, legend and screen-reader table. */
  seriesLabel?: string;
  previousLabel?: string;
  format?: (n: number) => string;
  /** Show every nth x label. */
  labelEvery?: number;
  className?: string;
}

/**
 * Single-series trend with a soft gradient fill and an optional prior-period
 * comparison. Crosshair + tooltip on hover; arrow keys scrub when focused.
 */
export function AreaChart({ data, seriesLabel = "Value", previousLabel = "Previous period", format = formatCompact, labelEvery = 1, className }: AreaChartProps) {
  const id = useId();
  const f = makeFrame(640, 240);
  const hasPrev = data.some((d) => d.previous !== undefined);
  const { max, ticks } = niceScale(Math.max(...data.flatMap((d) => [d.value, d.previous ?? 0])));
  const step = f.iw / Math.max(data.length - 1, 1);
  const xOf = (i: number) => f.left + i * step;
  const yOf = (v: number) => f.top + f.ih - (v / max) * f.ih;
  const { active, hitProps } = useScrub(data.length, (vx) => Math.round((vx - f.left) / step));

  const pts = data.map((d, i) => [xOf(i), yOf(d.value)] as [number, number]);
  const line = smoothPath(pts);
  const area = `${line} L ${xOf(data.length - 1)} ${f.top + f.ih} L ${f.left} ${f.top + f.ih} Z`;
  const prev = hasPrev ? smoothPath(data.map((d, i) => [xOf(i), yOf(d.previous ?? 0)])) : "";
  const a = active !== null ? data[active] : undefined;

  return (
    <div className={className}>
      {hasPrev && (
        <Legend
          className="mb-3"
          items={[
            { label: seriesLabel, color: "var(--color-chart-primary)", shape: "line" },
            { label: previousLabel, color: "var(--color-chart-neutral)", shape: "line" },
          ]}
        />
      )}
      <ChartSurface
        f={f}
        label={`Area chart of ${seriesLabel.toLowerCase()} over ${data.length} periods`}
        overlay={
          a && (
            <ChartTooltip f={f} x={xOf(active!)} y={yOf(Math.max(a.value, a.previous ?? 0))} title={a.label}>
              <TooltipRow color="var(--color-chart-primary)" shape="line" label={seriesLabel} value={format(a.value)} />
              {a.previous !== undefined && <TooltipRow color="var(--color-chart-neutral)" shape="line" label={previousLabel} value={format(a.previous)} />}
            </ChartTooltip>
          )
        }
      >
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-primary)" stopOpacity={0.22} />
            <stop offset="100%" stopColor="var(--color-chart-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YGrid f={f} ticks={ticks} max={max} format={format} />
        <XLabels f={f} labels={data.map((d) => d.label)} xOf={xOf} active={active} every={labelEvery} />
        {prev && <path d={prev} fill="none" stroke="var(--color-chart-neutral)" strokeWidth={2} strokeDasharray="4 4" strokeLinecap="round" />}
        <path d={area} fill={`url(#${id}-fill)`} />
        <path d={line} fill="none" stroke="var(--color-chart-primary)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {active !== null && (
          <g pointerEvents="none">
            <line x1={xOf(active)} x2={xOf(active)} y1={f.top} y2={f.top + f.ih} stroke="var(--color-line-strong)" />
            {a?.previous !== undefined && <circle cx={xOf(active)} cy={yOf(a.previous)} r={4} fill="var(--color-chart-neutral)" stroke="var(--color-surface)" strokeWidth={2} />}
            <circle cx={xOf(active)} cy={yOf(a!.value)} r={5} fill="var(--color-chart-primary)" stroke="var(--color-surface)" strokeWidth={2} />
          </g>
        )}
        <rect x={f.left - step / 2} y={f.top} width={f.iw + step} height={f.ih} aria-label="Scrub data points with arrow keys" {...hitProps} />
      </ChartSurface>
      <SrTable
        caption={seriesLabel}
        columns={["Period", seriesLabel, ...(hasPrev ? [previousLabel] : [])]}
        rows={data.map((d) => [d.label, format(d.value), ...(hasPrev ? [format(d.previous ?? 0)] : [])])}
      />
    </div>
  );
}
