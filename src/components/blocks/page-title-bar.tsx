"use client";

import { Bell, Search } from "lucide-react";
import type { ReactNode } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { cx } from "@/utils/cx";

export interface PageTitleBarProps {
  title: ReactNode;
  description?: ReactNode;
  /** A 40px leading visual: an icon (rendered in a ringed circle) or an <Avatar size="lg">. */
  leading?: ReactNode;
  /** Render `leading` as-is instead of inside the ring. */
  bareLeading?: boolean;
  actions?: ReactNode;
  /** Show search and notification icon buttons. */
  utilities?: boolean;
  className?: string;
}

/** 88px page header: leading mark, title + description, utilities and actions. */
export function PageTitleBar({ title, description, leading, bareLeading, actions, utilities = true, className }: PageTitleBarProps) {
  return (
    <header className={cx("flex min-h-[88px] shrink-0 flex-wrap items-center gap-4 border-b border-line px-4 py-4 sm:px-8", className)}>
      {leading &&
        (bareLeading ? (
          leading
        ) : (
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface text-fg-secondary shadow-[0_0_0_1px_var(--color-line),0_0_0_5px_var(--color-subtle)] [&_svg]:size-5">
            {leading}
          </span>
        ))}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-medium text-fg">{title}</h1>
        {description && <p className="mt-0.5 truncate text-base text-fg-secondary">{description}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {utilities && (
          <>
            <IconButton variant="ghost" aria-label="Search">
              <Search />
            </IconButton>
            <IconButton variant="ghost" aria-label="Notifications" className="relative">
              <Bell />
              <span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-error ring-2 ring-surface" />
            </IconButton>
          </>
        )}
        {actions}
      </div>
    </header>
  );
}
