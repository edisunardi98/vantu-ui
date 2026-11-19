"use client";

import { AlertTriangle, CheckCircle2, Info, Sparkles, X, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "@/utils/cx";

export type StatusTone = "info" | "success" | "warning" | "error" | "feature";
export type AlertVariant = "soft" | "solid" | "outline";

const tones: Record<StatusTone, { soft: string; solid: string; icon: string; Icon: typeof Info }> = {
  info: { soft: "bg-info-soft border-info-border", solid: "bg-info", icon: "text-info", Icon: Info },
  success: { soft: "bg-success-soft border-success-border", solid: "bg-success", icon: "text-success", Icon: CheckCircle2 },
  warning: { soft: "bg-warning-soft border-warning-border", solid: "bg-warning", icon: "text-warning", Icon: AlertTriangle },
  error: { soft: "bg-error-soft border-error-border", solid: "bg-error", icon: "text-error", Icon: XCircle },
  feature: { soft: "bg-accent-soft border-accent-soft-border", solid: "bg-linear-to-b from-accent-light to-accent", icon: "text-accent", Icon: Sparkles },
};

export interface AlertProps {
  tone?: StatusTone;
  /** `soft` tinted surface (default) · `solid` filled · `outline` white with border and shadow. */
  variant?: AlertVariant;
  /** `md` stacks title + description; `sm` is a single 36px line. */
  size?: "sm" | "md";
  title: ReactNode;
  children?: ReactNode;
  /** Inline actions, typically <LinkButton>s. */
  actions?: ReactNode;
  /** Deprecated alias of `actions` kept for compatibility. */
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

/** Inline alert for sync issues, limits and compliance notes. Four tones + feature, three styles, two sizes. */
export function Alert({ tone = "info", variant = "soft", size = "md", title, children, actions, action, onDismiss, className }: AlertProps) {
  const t = tones[tone];
  const solid = variant === "solid";
  const acts = actions ?? action;
  const dismiss = onDismiss && (
    <AriaButton
      aria-label="Dismiss"
      onPress={onDismiss}
      className={cx(
        "-m-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-xs outline-none data-focus-visible:shadow-focus",
        solid ? "text-white/70 data-hovered:text-white" : "text-fg-muted data-hovered:text-fg",
      )}
    >
      <X className="size-3.5" />
    </AriaButton>
  );

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cx(
        "flex gap-2.5 rounded-md",
        variant === "soft" && ["border", t.soft],
        variant === "outline" && "border border-line bg-surface shadow-card",
        solid && [t.solid, "text-white [&_a]:!text-white [&_[role=link]]:!text-white"],
        size === "sm" ? "min-h-9 items-center px-3 py-2" : "items-start px-3.5 py-3",
        className,
      )}
    >
      <t.Icon aria-hidden className={cx("size-4 shrink-0", size === "md" && "mt-px", solid ? "text-white" : t.icon)} />
      {size === "sm" ? (
        <>
          <div className={cx("min-w-0 flex-1 truncate text-sm font-medium", solid ? "text-white" : "text-fg")}>{title}</div>
          {acts}
          {dismiss}
        </>
      ) : (
        <>
          <div className="min-w-0 flex-1">
            <div className={cx("text-base font-medium", solid ? "text-white" : "text-fg")}>{title}</div>
            {children && <div className={cx("mt-0.5 text-sm", solid ? "text-white/80" : "text-fg-secondary")}>{children}</div>}
            {acts && <div className="mt-2.5 flex flex-wrap items-center gap-3">{acts}</div>}
          </div>
          {dismiss}
        </>
      )}
    </div>
  );
}
