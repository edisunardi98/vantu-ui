"use client";

import { X } from "lucide-react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface CloseButtonProps extends Omit<AriaButtonProps, "className" | "children"> {
  size?: "sm" | "md" | "lg";
  /** `ghost` is transparent until hovered; `filled` sits on a muted circle. */
  variant?: "ghost" | "filled";
  "aria-label"?: string;
  className?: string;
}

const sizes = { sm: "size-5 [&_svg]:size-3", md: "size-7 [&_svg]:size-3.5", lg: "size-8 [&_svg]:size-4" };

/** Dismiss control for dialogs, toasts, tags and banners. */
export function CloseButton({ size = "md", variant = "ghost", className, ...props }: CloseButtonProps) {
  return (
    <AriaButton
      aria-label="Close"
      {...props}
      className={cx(
        "inline-flex shrink-0 cursor-default items-center justify-center text-fg-muted outline-none transition-colors data-focus-visible:shadow-focus data-disabled:text-fg-disabled",
        variant === "ghost" ? "rounded-sm data-hovered:bg-muted data-hovered:text-fg" : "rounded-full bg-muted data-hovered:bg-active data-hovered:text-fg",
        sizes[size],
        className,
      )}
    >
      <X strokeWidth={2} />
    </AriaButton>
  );
}
