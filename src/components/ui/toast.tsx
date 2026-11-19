"use client";

import { CheckCircle2, Info, Sparkles, X, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "@/utils/cx";

export type ToastTone = "success" | "error" | "info" | "ai";

const icons: Record<ToastTone, { Icon: typeof Info; className: string }> = {
  success: { Icon: CheckCircle2, className: "text-success" },
  error: { Icon: XCircle, className: "text-error" },
  info: { Icon: Info, className: "text-info" },
  ai: { Icon: Sparkles, className: "text-accent" },
};

export interface ToastProps {
  tone?: ToastTone;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  onClose?: () => void;
  className?: string;
}

/** Bottom-right confirmation, 400px. Tone icon + title + description + optional action. */
export function Toast({ tone = "success", title, description, action, onClose, className }: ToastProps) {
  const { Icon, className: iconClass } = icons[tone];
  return (
    <div role="status" className={cx("flex w-full max-w-[400px] items-start gap-3 rounded-md bg-surface p-3.5 shadow-popover", className)}>
      <Icon aria-hidden className={cx("mt-px size-4 shrink-0", iconClass)} />
      <div className="min-w-0 flex-1">
        <div className="text-base font-medium text-fg">{title}</div>
        {description && <div className="mt-0.5 text-sm text-fg-muted">{description}</div>}
        {action && <div className="mt-2.5 flex gap-2">{action}</div>}
      </div>
      {onClose && (
        <AriaButton aria-label="Dismiss" onPress={onClose} className="-m-1 inline-flex size-6 items-center justify-center rounded-xs text-fg-muted outline-none data-hovered:bg-muted data-hovered:text-fg data-focus-visible:shadow-focus">
          <X className="size-3.5" />
        </AriaButton>
      )}
    </div>
  );
}

/** Fixed bottom-right stack for toasts. */
export function ToastRegion({ children }: { children: ReactNode }) {
  return <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[400px] max-w-[calc(100vw-2rem)] flex-col gap-2 [&>*]:pointer-events-auto">{children}</div>;
}
