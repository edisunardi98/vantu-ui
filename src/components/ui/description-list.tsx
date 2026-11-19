import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

export interface DescriptionListProps {
  items: { label: string; value: ReactNode }[];
  className?: string;
}

/** Key/value rows for detail panels: muted label column, primary value. */
export function DescriptionList({ items, className }: DescriptionListProps) {
  return (
    <dl className={cx("grid grid-cols-[minmax(96px,auto)_1fr] gap-x-6 gap-y-3 text-base", className)}>
      {items.map((it) => (
        <div key={it.label} className="contents">
          <dt className="text-fg-muted">{it.label}</dt>
          <dd className="min-w-0 truncate text-fg">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Plain card (white, 1px border, radius 16, padding 20) for details and settings. */
export function PlainCard({ title, actions, className, children }: { title?: ReactNode; actions?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <section className={cx("rounded-lg border border-line bg-surface p-5", className)}>
      {(title || actions) && (
        <header className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-base font-medium text-fg">{title}</h3>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
