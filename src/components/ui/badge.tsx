import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

export type BadgeTone = "neutral" | "accent" | "info" | "success" | "warning" | "error";
export type BadgeVariant = "soft" | "dot" | "solid" | "outline";

export interface BadgeProps {
  tone?: BadgeTone;
  /**
   * `soft` tinted status/category (default) · `dot` neutral surface with a tone dot ·
   * `solid` filled for high emphasis · `outline` white with a tone border.
   */
  variant?: BadgeVariant;
  /** `md` is 24px, `sm` is 20px. */
  size?: "sm" | "md";
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const soft: Record<BadgeTone, string> = {
  neutral: "bg-neutral-soft text-neutral-text",
  accent: "bg-accent-soft text-accent-text",
  info: "bg-info-soft text-info-text",
  success: "bg-success-soft text-success-text",
  warning: "bg-warning-soft text-warning-text",
  error: "bg-error-soft text-error-text",
};

const solid: Record<BadgeTone, string> = {
  neutral: "bg-inverse text-fg-inverse",
  accent: "bg-accent text-fg-inverse",
  info: "bg-info text-fg-inverse",
  success: "bg-success text-fg-inverse",
  warning: "bg-warning text-fg-inverse",
  error: "bg-error text-fg-inverse",
};

const outline: Record<BadgeTone, string> = {
  neutral: "bg-surface text-neutral-text ring-1 ring-inset ring-line-strong",
  accent: "bg-surface text-accent-text ring-1 ring-inset ring-accent-soft-border",
  info: "bg-surface text-info-text ring-1 ring-inset ring-info-border",
  success: "bg-surface text-success-text ring-1 ring-inset ring-success-border",
  warning: "bg-surface text-warning-text ring-1 ring-inset ring-warning-border",
  error: "bg-surface text-error-text ring-1 ring-inset ring-error-border",
};

const dot: Record<BadgeTone, string> = {
  neutral: "bg-fg-muted",
  accent: "bg-accent",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

export function Badge({ tone = "neutral", variant = "soft", size = "md", icon, className, children }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex shrink-0 items-center whitespace-nowrap font-medium [&_svg]:size-3",
        size === "md" ? "h-6 gap-1.5 rounded-sm px-2 text-sm" : "h-5 gap-1 rounded-[6px] px-1.5 text-xs",
        variant === "soft" && soft[tone],
        variant === "solid" && solid[tone],
        variant === "outline" && outline[tone],
        variant === "dot" && "bg-surface text-fg shadow-button",
        className,
      )}
    >
      {variant === "dot" && <span aria-hidden className={cx("size-1.5 rounded-full", dot[tone])} />}
      {icon}
      {children}
    </span>
  );
}
