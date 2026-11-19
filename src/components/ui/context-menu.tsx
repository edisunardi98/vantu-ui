"use client";

import { type KeyboardEvent, type MouseEvent, type ReactNode, useRef, useState } from "react";
import { Menu, type MenuProps, Popover } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface ContextMenuProps<T extends object> extends Omit<MenuProps<T>, "className" | "children"> {
  /** The area that responds to right-click (or Shift+F10 / the Menu key). */
  target: ReactNode;
  /** <MenuItem>s from ./menu. */
  children: ReactNode;
  className?: string;
}

/** Right-click menu anchored at the pointer. Keyboard users open it with Shift+F10 or the Menu key. */
export function ContextMenu<T extends object>({ target, children, className, onAction, ...props }: ContextMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const anchor = useRef<HTMLSpanElement>(null);
  const area = useRef<HTMLDivElement>(null);

  const openAt = (x: number, y: number) => {
    const box = area.current!.getBoundingClientRect();
    setPos({ x: x - box.left, y: y - box.top });
    setOpen(true);
  };
  const onContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    openAt(e.clientX, e.clientY);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.shiftKey && e.key === "F10") || e.key === "ContextMenu") {
      e.preventDefault();
      const box = area.current!.getBoundingClientRect();
      openAt(box.left + 16, box.top + 16);
    }
  };

  return (
    <div ref={area} onContextMenu={onContextMenu} onKeyDown={onKeyDown} tabIndex={0} aria-haspopup="menu" className={cx("relative outline-none focus-visible:shadow-focus", className)}>
      {target}
      <span ref={anchor} aria-hidden className="pointer-events-none absolute size-0" style={{ left: pos.x, top: pos.y }} />
      <Popover triggerRef={anchor} isOpen={open} onOpenChange={setOpen} placement="bottom start" offset={2} className="min-w-48 rounded-md bg-surface p-1 shadow-popover outline-none">
        <Menu
          {...props}
          aria-label="Context menu"
          autoFocus="first"
          onAction={(...args: Parameters<NonNullable<typeof onAction>>) => {
            setOpen(false);
            onAction?.(...args);
          }}
          className="outline-none"
        >
          {children}
        </Menu>
      </Popover>
    </div>
  );
}
