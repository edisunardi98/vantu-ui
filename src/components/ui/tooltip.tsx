"use client";

import type { ReactNode } from "react";
import { Tooltip as AriaTooltip, TooltipTrigger, type TooltipProps as AriaTooltipProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export { TooltipTrigger };

/** Dark 12 Medium bubble, radius 8, raised shadow. One line, no arrow. */
export function Tooltip({ className, children, ...props }: Omit<AriaTooltipProps, "className" | "children"> & { className?: string; children: ReactNode }) {
  return (
    <AriaTooltip
      offset={6}
      {...props}
      className={cx(
        "rounded-sm bg-inverse px-2 py-1.5 text-sm font-medium text-fg-inverse shadow-[0_4px_12px_rgb(0_0_0/0.16)]",
        className,
      )}
    >
      {children}
    </AriaTooltip>
  );
}
