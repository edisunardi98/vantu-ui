"use client";

import type { ReactNode } from "react";
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps as AriaMenuProps,
  MenuTrigger,
  Popover,
  Separator,
} from "react-aria-components";
import { cx } from "@/utils/cx";
import { Kbd } from "./kbd";

export { MenuTrigger };

export function Menu<T extends object>({ className, ...props }: Omit<AriaMenuProps<T>, "className"> & { className?: string }) {
  return (
    <Popover placement="bottom end" offset={6} className="min-w-48 rounded-md bg-surface p-1 shadow-popover outline-none">
      <AriaMenu {...props} className={cx("outline-none", className)} />
    </Popover>
  );
}

export interface MenuItemProps extends Omit<AriaMenuItemProps, "children" | "className"> {
  icon?: ReactNode;
  shortcut?: string;
  danger?: boolean;
  children: ReactNode;
  className?: string;
}

/** 36px items, radius 8, 16px icon, optional shortcut. */
export function MenuItem({ icon, shortcut, danger, children, className, ...props }: MenuItemProps) {
  const textValue = props.textValue ?? (typeof children === "string" ? children : undefined);
  return (
    <AriaMenuItem
      {...props}
      textValue={textValue}
      className={cx(
        "flex h-9 cursor-default items-center gap-2.5 rounded-sm px-2.5 text-base outline-none [&_svg]:size-4 [&_svg]:shrink-0",
        danger ? "text-error-text data-focused:bg-error-soft [&_svg]:text-error" : "text-fg data-focused:bg-muted [&_svg]:text-fg-secondary",
        "data-disabled:text-fg-disabled",
        className,
      )}
    >
      {icon}
      <span className="flex-1">{children}</span>
      {shortcut && <Kbd className="border-0 bg-transparent">{shortcut}</Kbd>}
    </AriaMenuItem>
  );
}

export function MenuSeparator() {
  return <Separator className="mx-1 my-1 border-t border-line" />;
}
