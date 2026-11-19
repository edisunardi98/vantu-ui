"use client";

import type { ReactNode } from "react";
import { type Key, ToggleButton, ToggleButtonGroup } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface ButtonGroupItem {
  id: string;
  label?: ReactNode;
  icon?: ReactNode;
  "aria-label"?: string;
}

export interface ButtonGroupProps {
  items: ButtonGroupItem[];
  /** Selected ids. Omit `selectionMode` for plain action buttons. */
  value?: string[];
  defaultValue?: string[];
  onChange?: (ids: string[]) => void;
  selectionMode?: "single" | "multiple";
  size?: "2xs" | "xs" | "sm";
  "aria-label": string;
  className?: string;
}

const sizes = { "2xs": "h-6 px-2 text-sm", xs: "h-8 px-2.5 text-base", sm: "h-9 px-3 text-base" };

/** Joined buttons sharing one border — for view switches, toolbars and formatting. */
export function ButtonGroup({ items, value, defaultValue, onChange, selectionMode = "single", size = "sm", className, ...props }: ButtonGroupProps) {
  return (
    <ToggleButtonGroup
      aria-label={props["aria-label"]}
      selectionMode={selectionMode}
      selectedKeys={value}
      defaultSelectedKeys={defaultValue}
      onSelectionChange={(keys: Set<Key>) => onChange?.([...keys].map(String))}
      className={cx("inline-flex divide-x divide-line overflow-hidden rounded-md bg-surface shadow-button", className)}
    >
      {items.map((it) => (
        <ToggleButton
          key={it.id}
          id={it.id}
          aria-label={it["aria-label"]}
          className={cx(
            "inline-flex cursor-default items-center gap-1.5 font-medium text-fg-secondary outline-none transition-colors [&_svg]:size-4",
            "data-hovered:bg-subtle data-hovered:text-fg data-selected:bg-muted data-selected:text-fg data-focus-visible:relative data-focus-visible:z-10 data-focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)]",
            sizes[size],
          )}
        >
          {it.icon}
          {it.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
