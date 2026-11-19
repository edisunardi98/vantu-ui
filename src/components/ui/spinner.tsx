import { cx } from "@/utils/cx";

export interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  tone?: "accent" | "neutral" | "white";
  /** Accessible label announced to screen readers. */
  label?: string;
  className?: string;
}

const sizes = { xs: "size-3", sm: "size-4", md: "size-6", lg: "size-9" };
const tones = { accent: "text-accent", neutral: "text-fg-secondary", white: "text-white" };

/** Indeterminate loading indicator: a quarter arc spinning over a faint track. */
export function Spinner({ size = "md", tone = "accent", label = "Loading", className }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cx("inline-flex shrink-0", sizes[size], tones[tone], className)}>
      <svg viewBox="0 0 24 24" fill="none" className="size-full animate-spin" aria-hidden>
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeOpacity="0.18" strokeWidth="3" />
        <path d="M21.5 12a9.5 9.5 0 0 0-9.5-9.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}
