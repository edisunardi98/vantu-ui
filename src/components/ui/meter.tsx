"use client";

import { Label, Meter as AriaMeter, type MeterProps as AriaMeterProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface MeterProps extends Omit<AriaMeterProps, "className" | "children"> {
  label?: string;
  /** `bar` continuous track, `segments` discrete blocks (e.g. password strength). */
  variant?: "bar" | "segments";
  segments?: number;
  /** Thresholds as fractions of the range: below `warn` is ok, above `danger` is red. */
  thresholds?: { warn: number; danger: number };
  /** Invert colors when higher is better (e.g. strength). */
  higherIsBetter?: boolean;
  showValue?: boolean;
  className?: string;
}

/** A known quantity within a range — storage, quota, strength. Color follows the thresholds. */
export function Meter({ label, variant = "bar", segments = 5, thresholds = { warn: 0.7, danger: 0.9 }, higherIsBetter, showValue = true, className, ...props }: MeterProps) {
  return (
    <AriaMeter {...props} className={cx("flex w-full flex-col gap-2", className)}>
      {({ percentage, valueText }) => {
        const f = percentage / 100;
        const level = higherIsBetter ? (f >= 0.75 ? "ok" : f >= 0.4 ? "warn" : "danger") : f >= thresholds.danger ? "danger" : f >= thresholds.warn ? "warn" : "ok";
        const color = level === "danger" ? "bg-error" : level === "warn" ? "bg-warning" : higherIsBetter ? "bg-success" : "bg-accent";
        return (
          <>
            {(label || showValue) && (
              <div className="flex items-center justify-between text-sm">
                {label && <Label className="font-medium text-fg">{label}</Label>}
                {showValue && <span className="tabular text-fg-secondary">{valueText}</span>}
              </div>
            )}
            {variant === "bar" ? (
              <div className="h-2 overflow-hidden rounded-full bg-active">
                <div className={cx("h-full rounded-full transition-[width]", color)} style={{ width: `${percentage}%` }} />
              </div>
            ) : (
              <div className="flex gap-1">
                {Array.from({ length: segments }, (_, i) => (
                  <div key={i} className={cx("h-1.5 flex-1 rounded-full transition-colors", i < Math.round(f * segments) ? color : "bg-active")} />
                ))}
              </div>
            )}
          </>
        );
      }}
    </AriaMeter>
  );
}
