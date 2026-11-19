"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "@/utils/cx";
import type { StatusTone } from "./alert";

const solid: Record<StatusTone, string> = {
  info: "bg-info text-white",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
  error: "bg-error text-white",
  feature: "bg-linear-to-r from-accent-light to-accent text-white",
};
const soft: Record<StatusTone, string> = {
  info: "bg-info-soft text-fg border-info-border",
  success: "bg-success-soft text-fg border-success-border",
  warning: "bg-warning-soft text-fg border-warning-border",
  error: "bg-error-soft text-fg border-error-border",
  feature: "bg-accent-soft text-fg border-accent-soft-border",
};

export interface BannerProps {
  tone?: StatusTone;
  variant?: "solid" | "soft";
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

/** Full-width, edge-to-edge announcement above the app shell (trial ending, outage, new feature). */
export function Banner({ tone = "feature", variant = "solid", icon, title, description, action, onDismiss, className }: BannerProps) {
  const isSolid = variant === "solid";
  return (
    <div role="status" className={cx("relative flex min-h-10 items-center justify-center gap-2.5 px-12 py-2 text-center text-base", isSolid ? [solid[tone], "[&_a]:!text-white [&_[role=link]]:!text-white"] : ["border-b", soft[tone]], className)}>
      {icon && <span className={cx("shrink-0 [&_svg]:size-4", !isSolid && "text-accent")}>{icon}</span>}
      <span className="font-medium">{title}</span>
      {description && <span className={cx("hidden sm:inline", isSolid ? "text-white/80" : "text-fg-secondary")}>{description}</span>}
      {action}
      {onDismiss && (
        <AriaButton
          aria-label="Dismiss banner"
          onPress={onDismiss}
          className={cx(
            "absolute right-3 inline-flex size-6 items-center justify-center rounded-xs outline-none data-focus-visible:shadow-focus",
            isSolid ? "text-white/70 data-hovered:text-white" : "text-fg-muted data-hovered:text-fg",
          )}
        >
          <X className="size-4" />
        </AriaButton>
      )}
    </div>
  );
}
