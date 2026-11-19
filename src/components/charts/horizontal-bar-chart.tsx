"use client";

import { useState } from "react";
import { cx } from "@/utils/cx";
import { formatCompact, SrTable } from "./chart-kit";

export interface RankedItem {
  label: string;
  value: number;
  /** Optional secondary text under the label (e.g. owner, segment). */
  meta?: string;
}

export interface HorizontalBarChartProps {
  data: RankedItem[];
  /** Names the measure for screen readers. */
  valueLabel?: string;
  format?: (n: number) => string;
  /** Items past this rank render in neutral gray, keeping the leaders in focus. */
  highlightTop?: number;
  /** Sort descending (default) or keep the given order. */
  sort?: boolean;
  className?: string;
}

/**
 * Ranked horizontal bars in HTML — labels never collide and long names wrap.
 * The bar track is the full row, so the hit target is the whole line.
 */
export function HorizontalBarChart({ data, valueLabel = "Value", format = formatCompact, highlightTop, sort = true, className }: HorizontalBarChartProps) {
  const [active, setActive] = useState<string | null>(null);
  const rows = sort ? [...data].sort((a, b) => b.value - a.value) : data;
  const max = Math.max(...rows.map((r) => r.value), 1);

  return (
    <div className={className}>
      <ul className="flex flex-col gap-1" aria-label={`${valueLabel} by item`}>
        {rows.map((r, i) => {
          const dim = highlightTop !== undefined && i >= highlightTop;
          return (
            <li
              key={r.label}
              tabIndex={0}
              aria-label={`${r.label}: ${format(r.value)}`}
              onPointerEnter={() => setActive(r.label)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(r.label)}
              onBlur={() => setActive(null)}
              className={cx(
                "grid grid-cols-[minmax(7rem,30%)_1fr_auto] items-center gap-3 rounded-sm px-2 py-1.5 outline-none transition-colors focus-visible:shadow-focus",
                active === r.label && "bg-subtle",
              )}
            >
              <span className="min-w-0">
                <span className="block truncate text-sm text-fg">{r.label}</span>
                {r.meta && <span className="block truncate text-xs text-fg-muted">{r.meta}</span>}
              </span>
              <span className="h-2.5 rounded-r-[4px]" aria-hidden>
                <span
                  className="block h-full rounded-r-[4px] transition-[width] duration-300"
                  style={{ width: `${Math.max((r.value / max) * 100, 1)}%`, background: dim ? "var(--color-chart-neutral)" : "var(--color-chart-primary)" }}
                />
              </span>
              <span className="min-w-12 text-right text-sm font-medium tabular-nums text-fg">{format(r.value)}</span>
            </li>
          );
        })}
      </ul>
      <SrTable caption={valueLabel} columns={["Item", valueLabel]} rows={rows.map((r) => [r.label, format(r.value)])} />
    </div>
  );
}
