"use client";

import { ArrowRight, Megaphone } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-aria-components";
import { cx } from "@/utils/cx";
import { CloseButton } from "./close-button";

export interface AnnouncementProps {
  title: ReactNode;
  description?: ReactNode;
  /** Card CTA, typically a secondary <Button>. */
  action?: ReactNode;
  icon?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

/** Dismissible product-news card for sidebars and dashboards. */
export function Announcement({ title, description, action, icon = <Megaphone />, onDismiss, className }: AnnouncementProps) {
  return (
    <aside className={cx("relative flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 shadow-card", className)}>
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-accent-soft text-accent [&_svg]:size-4">{icon}</span>
        <div className="min-w-0 flex-1 pr-6">
          <h3 className="text-base font-medium text-fg">{title}</h3>
          {description && <p className="mt-0.5 text-sm text-fg-secondary">{description}</p>}
        </div>
      </div>
      {action}
      {onDismiss && <CloseButton size="sm" variant="filled" aria-label="Dismiss announcement" onPress={onDismiss} className="absolute right-3 top-3" />}
    </aside>
  );
}

export interface AnnouncementPillProps {
  /** Short label in the leading badge, e.g. "New". */
  badge?: string;
  children: ReactNode;
  href?: string;
  className?: string;
}

/** Inline pill linking to news — the “New · 23 components → ” pattern above hero titles. */
export function AnnouncementPill({ badge = "New", children, href, className }: AnnouncementPillProps) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 text-sm text-fg-secondary shadow-button outline-none transition-colors data-hovered:text-fg data-focus-visible:shadow-focus",
        className,
      )}
    >
      <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent-text">{badge}</span>
      {children}
      <ArrowRight className="size-3.5 transition-transform group-data-hovered:translate-x-0.5" aria-hidden />
    </Link>
  );
}
