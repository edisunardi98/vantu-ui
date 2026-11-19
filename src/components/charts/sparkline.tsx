"use client";

import { useId } from "react";
import { cx } from "@/utils/cx";
import { smoothPath } from "./chart-kit";

export interface SparklineProps {
  values: number[];
  /** Accessible summary, e.g. "Replies, last 14 days, trending up". */
  label: string;
  /** "accent" (default), or a status tone when the trend itself is the message. */
  tone?: "accent" | "success" | "error" | "neutral";
  /** Fill under the line. */
  area?: boolean;
  /** Dot on the last value. */
  endDot?: boolean;
  className?: string;
}

const toneColor = {
  accent: "var(--color-chart-primary)",
  success: "var(--color-success)",
  error: "var(--color-error)",
  neutral: "var(--color-chart-neutral)",
};

/**
 * Word-sized trend for KPI tiles and table cells. No axes and no tooltip: it
 * shows shape only, so always pair it with the number it summarizes.
 */
export function Sparkline({ values, label, tone = "accent", area = true, endDot = true, className }: SparklineProps) {
  const id = useId();
  const w = 120;
  const h = 32;
  const pad = 3;
  const min = Math.min(...values);
  const span = Math.max(...values) - min || 1;
  const pts = values.map((v, i) => [pad + (i / Math.max(values.length - 1, 1)) * (w - pad * 2), pad + (1 - (v - min) / span) * (h - pad * 2)] as [number, number]);
  const line = smoothPath(pts);
  const color = toneColor[tone];
  const last = pts[pts.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cx("h-8 w-[120px] overflow-visible", className)} role="img" aria-label={label}>
      {area && (
        <>
          <defs>
            <linearGradient id={`${id}-g`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={`${line} L ${last?.[0]} ${h} L ${pts[0]?.[0]} ${h} Z`} fill={`url(#${id}-g)`} />
        </>
      )}
      <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      {endDot && last && <circle cx={last[0]} cy={last[1]} r={3} fill={color} stroke="var(--color-surface)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />}
    </svg>
  );
}
