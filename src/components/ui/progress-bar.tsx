import { cx } from "@/utils/cx";

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  /** Shows `value / max` on the right of the label. */
  showValue?: boolean;
  tone?: "accent" | "neutral" | "success" | "warning" | "error";
  caption?: string;
  /** `top` puts label and value above the bar; `right` puts the percentage beside it. */
  labelPosition?: "top" | "right";
  className?: string;
}

const tones = { accent: "bg-accent", neutral: "bg-chart-neutral", success: "bg-success", warning: "bg-warning", error: "bg-error" };

/** 4px track used for usage, quotas and sequence rates. */
export function ProgressBar({ value, max = 100, label, showValue, tone = "accent", caption, labelPosition = "top", className }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  if (labelPosition === "right") {
    return (
      <div className={cx("flex items-center gap-3", className)}>
        <div role="progressbar" aria-valuenow={value} aria-valuemax={max} aria-label={label ?? "Progress"} className="h-1.5 flex-1 overflow-hidden rounded-full bg-active">
          <div className={cx("h-full rounded-full transition-[width]", tones[tone])} style={{ width: `${pct}%` }} />
        </div>
        <span className="w-10 text-right text-sm font-medium tabular text-fg">{Math.round(pct)}%</span>
      </div>
    );
  }
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-3 text-sm">
          {label && <span className="text-fg-secondary">{label}</span>}
          {showValue && (
            <span className="tabular">
              <span className="font-medium text-fg">{value.toLocaleString("en-US")}</span>
              <span className="text-fg-muted"> / {max.toLocaleString("en-US")}</span>
            </span>
          )}
        </div>
      )}
      <div role="progressbar" aria-valuenow={value} aria-valuemax={max} aria-label={label} className="h-1 overflow-hidden rounded-full bg-active">
        <div className={cx("h-full rounded-full transition-[width]", tones[tone])} style={{ width: `${pct}%` }} />
      </div>
      {caption && <span className="text-sm text-fg-muted">{caption}</span>}
    </div>
  );
}
