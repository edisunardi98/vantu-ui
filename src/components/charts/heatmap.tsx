"use client";

import { useState } from "react";
import { ChartSurface, ChartTooltip, formatNumber, makeFrame, sequentialColors, SrTable, TooltipRow } from "./chart-kit";

export interface HeatmapProps {
  /** Row labels, top to bottom. */
  rows: string[];
  /** Column labels, left to right. */
  columns: string[];
  /** values[row][column] */
  values: number[][];
  valueLabel?: string;
  format?: (n: number) => string;
  /** Show every nth column label. */
  columnLabelEvery?: number;
  className?: string;
}

/**
 * Magnitude across two dimensions on the sequential accent ramp (light → dark,
 * one hue). Values are bucketed into 6 steps; the legend shows the bucket edges.
 */
export function Heatmap({ rows, columns, values, valueLabel = "Value", format = (n) => formatNumber(n), columnLabelEvery = 1, className }: HeatmapProps) {
  const [active, setActive] = useState<[number, number] | null>(null);
  const f = makeFrame(640, 34 + rows.length * 26, { left: 44, right: 4, top: 4, bottom: 26 });
  const cw = f.iw / columns.length;
  const ch = f.ih / rows.length;
  const max = Math.max(...values.flat(), 1);
  const steps = sequentialColors.length;
  const bucket = (v: number) => (v <= 0 ? -1 : Math.min(steps - 1, Math.floor((v / max) * steps)));
  const a = active ? { r: active[0], c: active[1], v: values[active[0]]![active[1]]! } : null;

  return (
    <div className={className}>
      <ChartSurface
        f={f}
        label={`Heatmap of ${valueLabel.toLowerCase()} by ${rows.length} rows and ${columns.length} columns`}
        overlay={
          a && (
            <ChartTooltip f={f} x={f.left + cw * (a.c + 0.5)} y={f.top + ch * a.r} title={`${rows[a.r]} · ${columns[a.c]}`}>
              <TooltipRow color={a.v > 0 ? sequentialColors[bucket(a.v)] : "var(--color-muted)"} label={valueLabel} value={format(a.v)} />
            </ChartTooltip>
          )
        }
      >
        {rows.map((r, i) => (
          <text key={r} x={f.left - 8} y={f.top + ch * (i + 0.5)} dy="0.32em" textAnchor="end" fontSize={11} fill={a?.r === i ? "var(--color-fg)" : "var(--color-fg-muted)"}>
            {r}
          </text>
        ))}
        {columns.map((c, j) =>
          j % columnLabelEvery === 0 || a?.c === j ? (
            <text key={c} x={f.left + cw * (j + 0.5)} y={f.h - 8} textAnchor="middle" fontSize={11} fill={a?.c === j ? "var(--color-fg)" : "var(--color-fg-muted)"}>
              {c}
            </text>
          ) : null,
        )}
        {values.map((row, i) =>
          row.map((v, j) => {
            const b = bucket(v);
            const on = a?.r === i && a?.c === j;
            return (
              <rect
                key={`${i}-${j}`}
                x={f.left + cw * j + 1}
                y={f.top + ch * i + 1}
                width={cw - 2}
                height={ch - 2}
                rx={4}
                fill={b < 0 ? "var(--color-muted)" : sequentialColors[b]}
                stroke={on ? "var(--color-fg)" : "none"}
                strokeWidth={on ? 1.5 : 0}
                tabIndex={0}
                className="outline-none"
                aria-label={`${rows[i]} ${columns[j]}: ${format(v)}`}
                onPointerEnter={() => setActive([i, j])}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive([i, j])}
                onBlur={() => setActive(null)}
              />
            );
          }),
        )}
      </ChartSurface>
      <div className="mt-3 flex items-center justify-end gap-2 text-xs text-fg-muted" aria-hidden>
        <span>Less</span>
        <span className="size-3 rounded-[3px] bg-muted" />
        {sequentialColors.map((c) => (
          <span key={c} className="size-3 rounded-[3px]" style={{ background: c }} />
        ))}
        <span>More</span>
        <span className="ml-1 tabular-nums">(max {format(max)})</span>
      </div>
      <SrTable caption={valueLabel} columns={["", ...columns]} rows={rows.map((r, i) => [r, ...values[i]!.map(format)])} />
    </div>
  );
}
