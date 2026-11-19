import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

export interface AIInsightProps {
  headline: ReactNode;
  reason?: ReactNode;
  eyebrow?: string;
  meta?: ReactNode;
  /** One line inside tables, drawers and composer toolbars. */
  compact?: boolean;
  className?: string;
}

/** Default: eyebrow + concise headline + reason. Compact: one line. */
export function AIInsight({ headline, reason, eyebrow = "AI insight", meta, compact, className }: AIInsightProps) {
  if (compact) {
    return (
      <div className={cx("flex h-8 min-w-0 items-center gap-2 rounded-sm border border-accent-soft-border bg-accent-soft px-2.5 text-sm", className)}>
        <Sparkles aria-hidden className="size-3.5 shrink-0 text-accent" />
        <span className="shrink-0 font-medium text-fg">{headline}</span>
        {reason && <span className="truncate text-fg-secondary">{reason}</span>}
      </div>
    );
  }
  return (
    <div className={cx("rounded-md border border-accent-soft-border bg-accent-soft p-3.5", className)}>
      <div className="flex items-center gap-1.5 text-sm">
        <Sparkles aria-hidden className="size-3.5 text-accent" />
        <span className="font-medium text-accent-text">{eyebrow}</span>
        {meta && <span className="ml-auto text-fg-muted">{meta}</span>}
      </div>
      <div className="mt-2 text-base font-medium text-fg">{headline}</div>
      {reason && <p className="mt-1 text-sm text-fg-secondary">{reason}</p>}
    </div>
  );
}
