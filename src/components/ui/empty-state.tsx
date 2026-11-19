import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Secondary + one primary action. */
  actions?: ReactNode;
  className?: string;
}

/** Say what is empty, why, and the next step. One primary action. */
export function EmptyState({ icon, title, description, actions, className }: EmptyStateProps) {
  return (
    <div className={cx("flex flex-col items-center px-6 py-10 text-center", className)}>
      {icon && (
        <span className="mb-4 inline-flex size-10 items-center justify-center rounded-[10px] bg-surface text-fg-secondary shadow-button [&_svg]:size-4.5">
          {icon}
        </span>
      )}
      <h3 className="text-lg font-medium text-fg">{title}</h3>
      {description && <p className="mt-1 max-w-xs text-base text-fg-secondary">{description}</p>}
      {actions && <div className="mt-5 flex items-center gap-2">{actions}</div>}
    </div>
  );
}
