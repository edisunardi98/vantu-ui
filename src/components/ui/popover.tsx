"use client";

import type { ReactNode } from "react";
import { Dialog, DialogTrigger, Heading, OverlayArrow, Popover as AriaPopover, type PopoverProps as AriaPopoverProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export { DialogTrigger as PopoverTrigger };

export interface PopoverProps extends Omit<AriaPopoverProps, "className" | "children"> {
  title?: string;
  /** Small arrow pointing at the trigger. */
  showArrow?: boolean;
  className?: string;
  children: ReactNode;
}

/** Non-modal floating panel anchored to a trigger. Closes on outside click or Escape. */
export function Popover({ title, showArrow, className, children, offset = 8, ...props }: PopoverProps) {
  return (
    <AriaPopover {...props} offset={offset} className={cx("group rounded-md bg-surface shadow-popover outline-none", className)}>
      {showArrow && (
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12" className="block fill-surface stroke-line group-data-[placement=bottom]:rotate-180 group-data-[placement=left]:-rotate-90 group-data-[placement=right]:rotate-90">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      <Dialog className="p-4 outline-none">
        {title && (
          <Heading slot="title" className="mb-2 text-base font-medium text-fg">
            {title}
          </Heading>
        )}
        {children}
      </Dialog>
    </AriaPopover>
  );
}
