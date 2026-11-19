"use client";

import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "neutral" | "soft" | "outline" | "danger-soft";
export type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg";

export interface ButtonProps extends Omit<AriaButtonProps, "className" | "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon rendered before the label. */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: ReactNode;
  /** Square button with only an icon. Requires `aria-label`. */
  iconOnly?: boolean;
  className?: string;
  children?: ReactNode;
}

const base =
  "group relative inline-flex shrink-0 cursor-default select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium outline-none transition-[background,box-shadow,color] duration-150 " +
  "data-focus-visible:ring-3 data-focus-visible:ring-accent/25 " +
  "data-disabled:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-b from-accent-light to-accent text-fg-inverse shadow-button-primary " +
    "data-hovered:from-accent data-hovered:to-accent-hover data-pressed:from-accent-pressed data-pressed:to-accent-pressed " +
    "data-disabled:bg-none data-disabled:bg-muted data-disabled:text-fg-disabled data-disabled:shadow-none",
  secondary:
    "bg-surface text-fg shadow-button data-hovered:bg-subtle data-pressed:bg-active " +
    "data-disabled:bg-muted data-disabled:text-fg-disabled data-disabled:shadow-none [&_svg]:text-fg-secondary",
  ghost:
    "text-fg data-hovered:bg-muted data-pressed:bg-active data-disabled:text-fg-disabled [&_svg]:text-fg-secondary",
  danger:
    "bg-error text-fg-inverse data-hovered:bg-error-hover data-pressed:bg-error-text " +
    "data-disabled:bg-muted data-disabled:text-fg-disabled",
  // Dark filled — for high-emphasis actions on light surfaces when accent would compete.
  neutral:
    "bg-inverse text-fg-inverse shadow-[0_1px_2px_rgb(0_0_0/0.12),inset_0_1px_0_rgb(255_255_255/0.08)] data-hovered:bg-fg/90 data-pressed:bg-fg/80 " +
    "data-disabled:bg-muted data-disabled:text-fg-disabled data-disabled:shadow-none",
  // Accent "lighter" — tinted, no shadow.
  soft:
    "bg-accent-soft text-accent-text data-hovered:bg-accent-soft-border data-pressed:bg-accent-soft-border " +
    "data-disabled:bg-muted data-disabled:text-fg-disabled",
  // Accent stroke on white.
  outline:
    "bg-surface text-accent-text shadow-[inset_0_0_0_1px_var(--color-accent-soft-border)] data-hovered:bg-accent-soft data-pressed:bg-accent-soft-border " +
    "data-disabled:bg-muted data-disabled:text-fg-disabled data-disabled:shadow-none",
  "danger-soft":
    "bg-error-soft text-error-text data-hovered:bg-error-border data-pressed:bg-error-border " +
    "data-disabled:bg-muted data-disabled:text-fg-disabled",
};

// Heights: 28 / 32 / 36 / 40 / 44 (size/button-sm|md|lg plus compact sizes). Padding tightens on the icon side.
const sizes: Record<ButtonSize, { base: string; lead: string; trail: string; icon: string }> = {
  "2xs": { base: "h-7 gap-1 rounded-sm px-2 text-sm [&_svg]:size-3.5", lead: "pl-1.5", trail: "pr-1.5", icon: "size-7 px-0" },
  xs: { base: "h-8 gap-1.5 rounded-[10px] px-2.5", lead: "pl-2", trail: "pr-2", icon: "size-8 px-0" },
  sm: { base: "h-9 px-3", lead: "pl-2", trail: "pr-2.5", icon: "size-9 px-0" },
  md: { base: "h-10 px-4", lead: "pl-3", trail: "pr-3", icon: "size-10 px-0" },
  lg: { base: "h-11 px-5", lead: "pl-4", trail: "pr-4", icon: "size-11 px-0" },
};

export function Button({
  variant = "secondary",
  size = "md",
  leadingIcon,
  trailingIcon,
  iconOnly,
  isPending,
  className,
  children,
  ...props
}: ButtonProps) {
  const s = sizes[size];
  return (
    <AriaButton
      {...props}
      isPending={isPending}
      className={cx(
        base,
        variants[variant],
        s.base,
        Boolean(leadingIcon) && !iconOnly && s.lead,
        Boolean(trailingIcon) && !iconOnly && s.trail,
        iconOnly && s.icon,
        className,
      )}
    >
      {isPending ? <Loader2 className="animate-spin" aria-hidden /> : leadingIcon}
      {iconOnly ? (isPending ? null : children) : children}
      {!iconOnly && trailingIcon}
    </AriaButton>
  );
}
