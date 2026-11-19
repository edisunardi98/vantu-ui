"use client";

import { Check, X } from "lucide-react";
import type { ReactNode } from "react";
import { Button as AriaButton, ToggleButton, type ToggleButtonProps } from "react-aria-components";
import { cx } from "@/utils/cx";

const chipBase =
  "inline-flex h-8 cursor-default items-center gap-1.5 rounded-sm px-3 text-base font-medium outline-none transition-colors " +
  "data-focus-visible:shadow-focus [&_svg]:size-3.5";

/** Selectable token used in criteria builders and persona pickers. */
export function Chip({ children, className, ...props }: Omit<ToggleButtonProps, "children" | "className"> & { children: ReactNode; className?: string }) {
  return (
    <ToggleButton
      {...props}
      className={cx(
        chipBase,
        "bg-surface text-fg shadow-button data-hovered:bg-subtle",
        "data-selected:bg-accent-soft data-selected:text-accent-text data-selected:shadow-[inset_0_0_0_1px_var(--color-accent-soft-border)]",
        className,
      )}
    >
      {({ isSelected }) => (
        <>
          {isSelected && <Check aria-hidden />}
          {children}
        </>
      )}
    </ToggleButton>
  );
}

/** Removable token used in tag editors. */
export function RemovableChip({ children, onRemove, className }: { children: ReactNode; onRemove?: () => void; className?: string }) {
  return (
    <span className={cx(chipBase, "bg-surface pr-1.5 text-fg shadow-button", className)}>
      {children}
      <AriaButton
        aria-label={`Remove ${typeof children === "string" ? children : "item"}`}
        onPress={onRemove}
        className="inline-flex size-5 items-center justify-center rounded-xs text-fg-muted outline-none data-hovered:bg-muted data-hovered:text-fg data-focus-visible:shadow-focus"
      >
        <X />
      </AriaButton>
    </span>
  );
}
