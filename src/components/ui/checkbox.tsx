"use client";

import { Check, Minus } from "lucide-react";
import type { ReactNode } from "react";
import { Checkbox as AriaCheckbox, type CheckboxProps as AriaCheckboxProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface CheckboxProps extends Omit<AriaCheckboxProps, "children" | "className"> {
  children?: ReactNode;
  className?: string;
}

/** 16px checkbox, radius 4. Checked and indeterminate fill with accent. */
export function Checkbox({ children, className, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox {...props} className={cx("group flex cursor-default items-center gap-2 text-base text-fg data-disabled:text-fg-disabled", className)}>
      {({ isSelected, isIndeterminate }) => (
        <>
          <span
            className={cx(
              "flex size-4 shrink-0 items-center justify-center rounded-xs border border-line-strong bg-surface text-fg-inverse transition-colors",
              "group-data-hovered:border-fg-disabled group-data-focus-visible:shadow-focus",
              (isSelected || isIndeterminate) && "border-accent bg-accent group-data-hovered:border-accent-hover group-data-hovered:bg-accent-hover",
              "group-data-disabled:border-line group-data-disabled:bg-muted group-data-disabled:text-fg-disabled",
            )}
          >
            {isIndeterminate ? <Minus className="size-3" strokeWidth={3} /> : isSelected ? <Check className="size-3" strokeWidth={3} /> : null}
          </span>
          {children}
        </>
      )}
    </AriaCheckbox>
  );
}
