import { cx } from "@/utils/cx";

export interface CounterProps {
  /** `muted` for counts, `accent` for selection, `alert` for unread. */
  tone?: "muted" | "accent" | "alert";
  className?: string;
  children: number | string;
}

/** Navigation and tab counts. 20px pill, 12 Medium. */
export function Counter({ tone = "muted", className, children }: CounterProps) {
  return (
    <span
      className={cx(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-sm font-medium tabular",
        tone === "muted" && "bg-muted text-fg-secondary",
        tone === "accent" && "bg-accent text-fg-inverse",
        tone === "alert" && "bg-error text-fg-inverse",
        className,
      )}
    >
      {children}
    </span>
  );
}
