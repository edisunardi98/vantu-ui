import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

export interface DeltaProps {
  /** Positive, negative or zero. The sign picks the tone and glyph. */
  value: number;
  /** Formatted label. Defaults to `+12%`. */
  children?: ReactNode;
  /** Flip colors when lower is better (e.g. bounce rate). */
  invert?: boolean;
  className?: string;
}

/** Trend glyph + 12 Medium value in the semantic tone. */
export function Delta({ value, children, invert, className }: DeltaProps) {
  const up = value > 0;
  const flat = value === 0;
  const good = invert ? !up : up;
  const Icon = flat ? Minus : up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cx(
        "inline-flex items-center gap-0.5 text-sm font-medium tabular",
        flat ? "text-fg-muted" : good ? "text-success-text" : "text-error-text",
        className,
      )}
    >
      <Icon aria-hidden className="size-3.5" strokeWidth={2.25} />
      {children ?? `${up ? "+" : ""}${value}%`}
    </span>
  );
}

export interface MetricProps {
  label: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  caption?: ReactNode;
  /** Visual on the right, e.g. a <Sparkbars>. */
  aside?: ReactNode;
  size?: "md" | "lg";
  className?: string;
}

/** Label, 32 SemiBold value, delta, caption. */
export function Metric({ label, value, delta, caption, aside, size = "lg", className }: MetricProps) {
  return (
    <div className={cx("flex items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <div className="text-base text-fg-secondary">{label}</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className={cx(size === "lg" ? "text-metric" : "text-2xl font-semibold tabular tracking-tight", "text-fg")}>{value}</span>
          {delta}
        </div>
        {caption && <div className="mt-1.5 text-sm text-fg-muted">{caption}</div>}
      </div>
      {aside}
    </div>
  );
}

/** Tiny bar sparkline used beside metrics. The last bar is highlighted. */
export function Sparkbars({ values, className }: { values: number[]; className?: string }) {
  const max = Math.max(...values, 1);
  return (
    <div aria-hidden className={cx("flex h-8 items-end gap-[3px]", className)}>
      {values.map((v, i) => (
        <span
          key={i}
          style={{ height: `${Math.max(12, (v / max) * 100)}%` }}
          className={cx("w-1 rounded-[1px]", i === values.length - 1 ? "bg-chart-primary" : "bg-chart-neutral")}
        />
      ))}
    </div>
  );
}
