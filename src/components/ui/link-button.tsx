"use client";

import type { ReactNode } from "react";
import { Link as AriaLink, type LinkProps as AriaLinkProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface LinkButtonProps extends Omit<AriaLinkProps, "className" | "children"> {
  tone?: "gray" | "black" | "accent" | "error";
  size?: "sm" | "md";
  underline?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const tones = {
  gray: "text-fg-secondary data-hovered:text-fg",
  black: "text-fg data-hovered:text-fg-secondary",
  accent: "text-accent-text data-hovered:text-accent-pressed",
  error: "text-error-text data-hovered:text-error-hover",
};

/** Inline text action. Underline on hover, or always with `underline`. */
export function LinkButton({ tone = "accent", size = "md", underline, leadingIcon, trailingIcon, className, children, ...props }: LinkButtonProps) {
  return (
    <AriaLink
      {...props}
      className={cx(
        "inline-flex cursor-pointer items-center gap-1 rounded-xs font-medium underline-offset-[3px] outline-none transition-colors",
        "data-hovered:underline data-focus-visible:shadow-focus data-disabled:cursor-default data-disabled:text-fg-disabled data-disabled:no-underline",
        size === "md" ? "text-base [&_svg]:size-4" : "text-sm [&_svg]:size-3.5",
        underline && "underline decoration-current/40",
        tones[tone],
        className,
      )}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </AriaLink>
  );
}
