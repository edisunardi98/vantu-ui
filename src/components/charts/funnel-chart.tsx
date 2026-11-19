"use client";

import { ArrowDownRight } from "lucide-react";
import { Fragment, useState } from "react";
import { cx } from "@/utils/cx";
import { formatNumber, SrTable } from "./chart-kit";

export interface FunnelStage {
  label: string;
  value: number;
}

export interface FunnelChartProps {
  data: FunnelStage[];
  format?: (n: number) => string;
  /** Flag the step with the biggest drop-off. */
  highlightLeak?: boolean;
  className?: string;
}

const pct = (n: number) => formatNumber(n, { style: "percent", maximumFractionDigits: 1 });

/**
 * Stage-to-stage conversion. Each stage is a centered bar sized to its share of
 * the first stage; the step between stages shows the conversion rate, and the
 * worst step is called out.
 */
export function FunnelChart({ data, format = (n) => formatNumber(n), highlightLeak = true, className }: FunnelChartProps) {
  const [active, setActive] = useState<number | null>(null);
  const top = data[0]?.value || 1;
  const steps = data.slice(1).map((d, i) => d.value / (data[i]!.value || 1));
  const leak = highlightLeak && steps.length ? steps.indexOf(Math.min(...steps)) : -1;

  return (
    <div className={className}>
      <ol className="flex flex-col">
        {data.map((d, i) => {
          const share = d.value / top;
          return (
            <Fragment key={d.label}>
              {i > 0 && (
                <li aria-hidden className="flex items-center justify-center gap-1.5 py-1 text-xs">
                  <ArrowDownRight className={cx("size-3.5", i - 1 === leak ? "text-warning" : "text-fg-muted")} />
                  <span className={cx("tabular-nums", i - 1 === leak ? "font-medium text-warning-text" : "text-fg-muted")}>
                    {pct(steps[i - 1]!)} converted{i - 1 === leak && " · biggest drop-off"}
                  </span>
                </li>
              )}
              <li
                tabIndex={0}
                aria-label={`${d.label}: ${format(d.value)}, ${pct(share)} of ${data[0]!.label}`}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={cx("grid grid-cols-[8rem_1fr_6rem] items-center gap-3 rounded-sm px-2 py-1 outline-none focus-visible:shadow-focus", active === i && "bg-subtle")}
              >
                <span className="truncate text-sm text-fg-secondary">{d.label}</span>
                <span className="flex h-9 justify-center" aria-hidden>
                  <span
                    className="h-full rounded-[6px] transition-[width] duration-300"
                    style={{
                      width: `${Math.max(share * 100, 2)}%`,
                      background: "var(--color-chart-primary)",
                      opacity: 1 - i * (0.55 / Math.max(data.length - 1, 1)),
                    }}
                  />
                </span>
                <span className="text-right">
                  <span className="block text-sm font-medium tabular-nums text-fg">{format(d.value)}</span>
                  <span className="block text-xs tabular-nums text-fg-muted">{i === 0 ? "100%" : pct(share)}</span>
                </span>
              </li>
            </Fragment>
          );
        })}
      </ol>
      <SrTable
        caption="Funnel stages"
        columns={["Stage", "Count", "Share of first stage", "Step conversion"]}
        rows={data.map((d, i) => [d.label, format(d.value), pct(d.value / top), i === 0 ? "—" : pct(steps[i - 1]!)])}
      />
    </div>
  );
}
