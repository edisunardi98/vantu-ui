"use client";

import type { Key } from "react-aria-components";
import { ToggleButton, ToggleButtonGroup } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface SegmentedControlProps {
  options: { id: string; label: string }[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  "aria-label": string;
  size?: "sm" | "md";
  className?: string;
}

/** Segmented control for ranges (7D · 14D · 30D). */
export function SegmentedControl({ options, value, defaultValue, onChange, size = "md", className, ...props }: SegmentedControlProps) {
  return (
    <ToggleButtonGroup
      aria-label={props["aria-label"]}
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={value !== undefined ? [value] : undefined}
      defaultSelectedKeys={defaultValue !== undefined ? [defaultValue] : value === undefined ? [options[0]!.id] : undefined}
      onSelectionChange={(keys: Set<Key>) => {
        const [first] = keys;
        if (first !== undefined) onChange?.(String(first));
      }}
      className={cx("inline-flex items-center gap-0.5 rounded-[10px] bg-muted p-0.5", className)}
    >
      {options.map((o) => (
        <ToggleButton
          key={o.id}
          id={o.id}
          className={cx(
            "inline-flex cursor-default items-center justify-center rounded-sm font-medium text-fg-secondary outline-none transition-colors",
            size === "sm" ? "h-7 px-2.5 text-sm" : "h-8 px-3 text-base",
            "data-hovered:text-fg data-selected:bg-surface data-selected:text-fg data-selected:shadow-button data-focus-visible:shadow-focus",
          )}
        >
          {o.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
