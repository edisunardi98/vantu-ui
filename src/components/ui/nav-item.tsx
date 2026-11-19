"use client";

import { createContext, type ReactNode, useContext } from "react";
import { cx } from "@/utils/cx";
import { Counter } from "./counter";

/** True inside a collapsed (icon-only) sidebar. NavItem and SectionLabel adapt to it. */
export const NavCollapsedContext = createContext(false);

export interface NavItemProps {
  icon?: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  /** Trailing muted count. */
  count?: number | string;
  /** Unread count rendered as a red counter. */
  badge?: number;
  className?: string;
}

/**
 * The nav item look, shared by <NavItem> and any router link that must match it
 * (e.g. the docs sidebar): 40px, radius 10, 16px icon · hover tint · active =
 * white raised surface.
 */
export function navItemClass({ active, collapsed, size = "md", className }: { active?: boolean; collapsed?: boolean; size?: "sm" | "md"; className?: string } = {}) {
  return cx(
    "relative flex items-center text-base text-fg outline-none transition-colors",
    // md: 40px product sidebar · sm: 32px compact lists (docs sidebar)
    size === "sm" ? "h-8 gap-2.5 rounded-sm" : "h-10 gap-3 rounded-md",
    "hover:bg-active focus-visible:shadow-focus [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-fg-secondary",
    collapsed ? "justify-center px-0" : size === "sm" ? "px-2.5" : "px-3",
    active && "bg-surface font-medium shadow-button hover:bg-surface [&_svg]:text-fg",
    className,
  );
}

/** Sidebar link. Default · Hover · Active (white raised surface). Icon-only inside a collapsed sidebar. */
export function NavItem({ icon, label, href = "#", active, count, badge, className }: NavItemProps) {
  const collapsed = useContext(NavCollapsedContext);
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      // Collapsed: the label is visually hidden, so expose it as the accessible name and a hover tooltip.
      aria-label={collapsed ? (badge ? `${label}, ${badge} unread` : label) : undefined}
      title={collapsed ? label : undefined}
      className={navItemClass({ active, collapsed, className })}
    >
      {icon}
      {collapsed ? (
        badge !== undefined && <span aria-hidden className="absolute right-2.5 top-2 size-2 rounded-full bg-error ring-2 ring-app" />
      ) : (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge !== undefined ? (
            <Counter tone="alert">{badge}</Counter>
          ) : count !== undefined ? (
            <span className="text-sm tabular text-fg-muted">{typeof count === "number" ? count.toLocaleString("en-US") : count}</span>
          ) : null}
        </>
      )}
    </a>
  );
}

/** The section label look (uppercase 12 Medium +0.6 tracking), shared with the docs sidebar headings. */
export const sectionLabelClass = "px-3 pb-1.5 pt-3 text-label text-fg-muted";

/** Uppercase 12 Medium +0.6 tracking section label. A short divider inside a collapsed sidebar. */
export function SectionLabel({ className, children }: { className?: string; children: ReactNode }) {
  const collapsed = useContext(NavCollapsedContext);
  if (collapsed) return <div role="separator" className={cx("mx-3 my-3 border-t border-line", className)} />;
  return <div className={cx(sectionLabelClass, className)}>{children}</div>;
}
