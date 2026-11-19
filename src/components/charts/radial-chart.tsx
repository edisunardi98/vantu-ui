"use client";

import type { ReactNode } from "react";
import { cx } from "@/utils/cx";
import { formatNumber } from "./chart-kit";

export interface RadialChartProps {
  value: number;
  max: number;
  /** Optional target tick on the arc (e.g. pacing for today). */
  target?: number;
  label?: ReactNode;
  /** Text under the number. Defaults to "of {max}". */
  caption?: ReactNode;
  format?: (n: number) => string;
  className?: string;
}

const START = -120;
const SWEEP = 240;

/**
 * Round SVG coordinates to 3 decimals. Math.sin/cos can differ in the last
 * digits between Node (server render) and the browser, which would make the
 * path attributes mismatch during hydration.
 */
const fix = (n: number) => Math.round(n * 1000) / 1000;

function polar(c: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [fix(c + r * Math.cos(a)), fix(c + r * Math.sin(a))] as const;
}

function arcPath(c: number, r: number, d0: number, d1: number) {
  const [x0, y0] = polar(c, r, d0);
  const [x1, y1] = polar(c, r, d1);
  return `M ${x0} ${y0} A ${r} ${r} 0 ${d1 - d0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
}

/**
 * A single headline value against a goal — a 240° gauge with a rounded
 * progress arc and an optional target tick. Not for comparing categories.
 */
export function RadialChart({ value, max, target, label, caption, format = (n) => formatNumber(n), className }: RadialChartProps) {
  const size = 200;
  const c = size / 2;
  const r = 82;
  const pct = Math.max(0, Math.min(1, value / max));
  const end = START + SWEEP * pct;
  const onPace = target === undefined || value >= target;

  return (
    <div className={cx("relative mx-auto aspect-[200/164] w-full max-w-56", className)}>
      <svg
        viewBox={`0 0 ${size} 164`}
        className="size-full"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={typeof label === "string" ? label : "Progress"}
      >
        <path d={arcPath(c, r, START, START + SWEEP)} fill="none" stroke="var(--color-chart-neutral-soft)" strokeWidth={14} strokeLinecap="round" />
        {pct > 0 && <path d={arcPath(c, r, START, end)} fill="none" stroke="var(--color-chart-primary)" strokeWidth={14} strokeLinecap="round" />}
        {target !== undefined &&
          (() => {
            const deg = START + SWEEP * Math.min(1, target / max);
            const [x0, y0] = polar(c, r - 12, deg);
            const [x1, y1] = polar(c, r + 12, deg);
            return (
              <g>
                <title>{`Target ${format(target)}`}</title>
                <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="var(--color-surface)" strokeWidth={5} strokeLinecap="round" />
                <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="var(--color-fg)" strokeWidth={2} strokeLinecap="round" />
              </g>
            );
          })()}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-[14%] text-center">
        {label && <span className="text-sm text-fg-muted">{label}</span>}
        <span className="text-4xl font-semibold tracking-tight tabular-nums text-fg">{format(value)}</span>
        <span className="text-sm text-fg-muted">{caption ?? `of ${format(max)}`}</span>
        {target !== undefined && (
          <span className={cx("mt-2 rounded-full px-2 py-0.5 text-xs font-medium", onPace ? "bg-success-soft text-success-text" : "bg-warning-soft text-warning-text")}>
            {onPace ? "On pace" : `${format(target - value)} behind pace`}
          </span>
        )}
      </div>
    </div>
  );
}
