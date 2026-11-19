"use client";

import type { ReactNode } from "react";
import { cx } from "@/utils/cx";
import { CloseButton } from "./close-button";

export interface NotificationProps {
  /** An <Avatar>, <IntegrationMark> or icon tile. */
  leading?: ReactNode;
  title: ReactNode;
  /** Secondary line, e.g. the message excerpt. */
  description?: ReactNode;
  time?: string;
  unread?: boolean;
  /** Buttons such as Accept / Decline. */
  actions?: ReactNode;
  /** Attachment or quoted content rendered in a muted box. */
  attachment?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

/** Feed item for the notification center: who did what, when, with optional actions. */
export function Notification({ leading, title, description, time, unread, actions, attachment, onDismiss, className }: NotificationProps) {
  return (
    <article className={cx("group relative flex gap-3 rounded-md p-3 transition-colors hover:bg-subtle", className)}>
      {leading && <div className="shrink-0">{leading}</div>}
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <p className="min-w-0 flex-1 text-base text-fg">{title}</p>
          {unread && <span aria-label="Unread" className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />}
          {onDismiss && <CloseButton size="sm" aria-label="Dismiss notification" onPress={onDismiss} className="opacity-0 transition-opacity group-hover:opacity-100 data-focus-visible:opacity-100" />}
        </div>
        {description && <p className="mt-0.5 text-sm text-fg-secondary">{description}</p>}
        {time && <p className="mt-1 text-sm text-fg-muted">{time}</p>}
        {attachment && <div className="mt-2.5 rounded-sm border border-line bg-subtle px-3 py-2 text-sm text-fg-secondary">{attachment}</div>}
        {actions && <div className="mt-3 flex flex-wrap gap-2">{actions}</div>}
      </div>
    </article>
  );
}
