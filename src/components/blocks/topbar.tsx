"use client";

import { Bell, ChevronRight, CircleHelp, Home } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { cx } from "@/utils/cx";

export interface TopbarProps {
  /** Breadcrumb trail. The last item is the current page. */
  crumbs?: string[];
  /** Icon before the first crumb. Defaults to Home. */
  icon?: ReactNode;
  unread?: boolean;
  className?: string;
}

export function Topbar({ crumbs = ["Home"], icon = <Home />, unread = true, className }: TopbarProps) {
  return (
    <header className={cx("flex h-topbar shrink-0 items-center justify-between border-b border-line bg-surface px-6", className)}>
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-base">
        <span aria-hidden className="text-fg-secondary [&_svg]:size-4 [&_svg]:shrink-0">
          {icon}
        </span>
        {crumbs.map((c, i) => (
          <Fragment key={c}>
            {i > 0 && <ChevronRight aria-hidden className="size-3.5 text-fg-disabled" />}
            <span aria-current={i === crumbs.length - 1 ? "page" : undefined} className={cx("truncate", i === crumbs.length - 1 ? "font-medium text-fg" : "text-fg-secondary")}>
              {c}
            </span>
          </Fragment>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <IconButton aria-label="Help">
          <CircleHelp />
        </IconButton>
        <IconButton aria-label="Notifications" className="relative">
          <Bell />
          {unread && <span className="absolute right-2 top-2 size-1.5 rounded-full bg-error ring-2 ring-surface" />}
        </IconButton>
      </div>
    </header>
  );
}
