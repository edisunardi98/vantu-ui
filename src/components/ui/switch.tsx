"use client";

import type { ReactNode } from "react";
import { Switch as AriaSwitch, type SwitchProps as AriaSwitchProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface SwitchProps extends Omit<AriaSwitchProps, "children" | "className"> {
  children?: ReactNode;
  className?: string;
}

/** Track 40 × 24 with a 16px knob and 4px inset. */
export function Switch({ children, className, ...props }: SwitchProps) {
  return (
    <AriaSwitch {...props} className={cx("group flex cursor-default items-center gap-2.5 text-base text-fg data-disabled:text-fg-disabled", className)}>
      <span
        className={cx(
          "flex h-6 w-10 shrink-0 items-center rounded-full bg-chart-neutral p-1 transition-colors",
          "group-data-hovered:bg-fg-disabled group-data-focus-visible:shadow-focus",
          "group-data-selected:bg-accent group-data-selected:group-data-hovered:bg-accent-hover",
          "group-data-disabled:bg-muted",
        )}
      >
        <span className="size-4 rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.12)] transition-transform duration-200 group-data-selected:translate-x-4 group-data-disabled:shadow-none" />
      </span>
      {children}
    </AriaSwitch>
  );
}
