"use client";

import type { ReactNode } from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface IconButtonProps extends Omit<AriaButtonProps, "className" | "children"> {
  /** Accessible name — icon buttons have no visible text. */
  "aria-label": string;
  variant?: "secondary" | "ghost";
  size?: "xs" | "sm" | "md";
  className?: string;
  children: ReactNode;
}

const sizes = { xs: "size-7 rounded-sm", sm: "size-8 rounded-sm", md: "size-9 rounded-[10px]" };

/** Compact square action used in toolbars, topbars and table rows. */
export function IconButton({ variant = "secondary", size = "md", className, children, ...props }: IconButtonProps) {
  return (
    <AriaButton
      {...props}
      className={cx(
        "inline-flex shrink-0 cursor-default items-center justify-center text-fg-secondary outline-none transition-colors",
        "data-focus-visible:ring-3 data-focus-visible:ring-accent/25 data-disabled:text-fg-disabled [&_svg]:size-4",
        variant === "secondary"
          ? "bg-surface shadow-button data-hovered:bg-subtle data-hovered:text-fg data-pressed:bg-active"
          : "data-hovered:bg-muted data-hovered:text-fg data-pressed:bg-active",
        sizes[size],
        className,
      )}
    >
      {children}
    </AriaButton>
  );
}
