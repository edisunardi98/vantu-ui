"use client";

import { ChevronDown, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface FilterButtonProps extends Omit<ButtonProps, "children" | "className" | "value"> {
  label: string;
  value: ReactNode;
  className?: string;
}

/** Toolbar filter: muted label + value + chevron. */
export function FilterButton({ label, value, className, ...props }: FilterButtonProps) {
  return (
    <AriaButton
      {...props}
      className={cx(
        "group inline-flex h-9 cursor-default items-center gap-1.5 rounded-md bg-surface px-3 text-base shadow-button outline-none transition-colors",
        "data-hovered:bg-subtle data-pressed:bg-active data-focus-visible:shadow-focus aria-expanded:shadow-[inset_0_0_0_1px_var(--color-accent),var(--shadow-focus)]",
        className,
      )}
    >
      <span className="text-fg-muted">{label}</span>
      <span className="font-medium text-fg">{value}</span>
      <ChevronDown aria-hidden className="size-3.5 text-fg-muted transition-transform group-aria-expanded:rotate-180" />
    </AriaButton>
  );
}

/** Add style is a dashed ghost trigger. */
export function AddFilterButton({ className, children = "Add filter", ...props }: Omit<ButtonProps, "className" | "children"> & { className?: string; children?: ReactNode }) {
  return (
    <AriaButton
      {...props}
      className={cx(
        "inline-flex h-9 cursor-default items-center gap-1.5 rounded-md border border-dashed border-line-strong px-3 text-base text-fg-secondary outline-none transition-colors",
        "data-hovered:border-fg-disabled data-hovered:bg-subtle data-hovered:text-fg data-focus-visible:shadow-focus",
        className,
      )}
    >
      <Plus aria-hidden className="size-3.5" />
      {children}
    </AriaButton>
  );
}
