"use client";

import { type ReactNode, useState } from "react";
import { cx } from "@/utils/cx";
import { formatCompact, formatNumber, seriesColors, SrTable, Swatch } from "./chart-kit";

export interface Slice {
  label: string;
  value: number;
  color?: string;
}

export interface DonutChartProps {
  data: Slice[];
  /** Big number in the hole. Defaults to the total. */
  centerValue?: ReactNode;
  centerLabel?: ReactNode;
  format?: (n: number) => string;
  /** Legend beside (default) or below the ring. */
  legend?: "side" | "bottom";
  className?: string;
}

const TAU = Math.PI * 2;

/**
 * Round SVG coordinates to 3 decimals. Math.sin/cos can differ in the last
 * digits between Node (server render) and the browser, which would make the
 * `d` attribute mismatch during hydration.
 */
const fix = (n: number) => Math.round(n * 1000) / 1000;

function arc(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const p = (r: number, a: number) => `${fix(cx + r * Math.sin(a))} ${fix(cy - r * Math.cos(a))}`;
  return `M ${p(r1, a0)} A ${r1} ${r1} 0 ${large} 1 ${p(r1, a1)} L ${p(r0, a1)} A ${r0} ${r0} 0 ${large} 0 ${p(r0, a0)} Z`;
}

/**
 * Part-to-whole for ≤ 6 parts (fold the rest into "Other"). Slices keep a 2px
 * surface gap; the legend carries label, value and share so identity is never
 * color-alone. Hovering a slice or legend row highlights both.
 */
export function DonutChart({ data, centerValue, centerLabel = "Total", format = formatCompact, legend = "side", className }: DonutChartProps) {
  const [active, setActive] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const size = 200;
  const c = size / 2;
  const r1 = 92;
  const r0 = 64;
  const gap = data.length > 1 ? 2 / r1 : 0; // ~2px at the outer edge

  let acc = 0;
  const slices = data.map((d, i) => {
    const a0 = (acc / total) * TAU;
    acc += d.value;
    const a1 = (acc / total) * TAU;
    return { ...d, i, a0, a1, color: d.color ?? seriesColors[i % seriesColors.length]!, share: d.value / total };
  });
  const a = active !== null ? slices[active] : undefined;

  return (
    <div className={cx("flex items-center gap-6", legend === "bottom" ? "flex-col" : "flex-col sm:flex-row", className)}>
      <div className="relative size-48 shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="size-full" role="img" aria-label={`Donut chart: ${slices.map((s) => `${s.label} ${Math.round(s.share * 100)}%`).join(", ")}`}>
          {slices.map((s) =>
            s.value > 0 ? (
              <path
                key={s.label}
                d={arc(c, c, active === s.i ? r0 - 2 : r0, active === s.i ? r1 + 4 : r1, s.a0 + gap / 2, Math.max(s.a1 - gap / 2, s.a0 + gap / 2 + 0.001))}
                fill={s.color}
                opacity={active === null || active === s.i ? 1 : 0.35}
                onPointerEnter={() => setActive(s.i)}
                onPointerLeave={() => setActive(null)}
                style={{ transition: "opacity 120ms" }}
              />
            ) : null,
          )}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center" aria-live="polite">
          <span className="text-2xl font-semibold tabular-nums text-fg">{a ? `${Math.round(a.share * 100)}%` : (centerValue ?? format(total))}</span>
          <span className="max-w-24 truncate text-xs text-fg-muted">{a ? a.label : centerLabel}</span>
        </div>
      </div>
      <ul className={cx("flex w-full min-w-0 flex-col gap-0.5", legend === "side" && "sm:flex-1")}>
        {slices.map((s) => (
          <li
            key={s.label}
            tabIndex={0}
            onPointerEnter={() => setActive(s.i)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(s.i)}
            onBlur={() => setActive(null)}
            className={cx("flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus-visible:shadow-focus", active === s.i && "bg-subtle")}
          >
            <Swatch color={s.color} />
            <span className="min-w-0 flex-1 truncate text-fg-secondary">{s.label}</span>
            <span className="font-medium tabular-nums text-fg">{format(s.value)}</span>
            <span className="w-10 text-right tabular-nums text-fg-muted">{formatNumber(s.share, { style: "percent" })}</span>
          </li>
        ))}
      </ul>
      <SrTable caption="Share by category" columns={["Category", "Value", "Share"]} rows={slices.map((s) => [s.label, format(s.value), formatNumber(s.share, { style: "percent" })])} />
    </div>
  );
}
