import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Vantu cards are layered: a subtle outer shell (radius 16, 4px padding)
 * holding a header and an inner white panel.
 */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={cx("flex flex-col rounded-lg border border-line bg-subtle p-1 shadow-card", className)}>
      {children}
    </section>
  );
}

export interface CardHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** An <IconTile> or similar mark. */
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function CardHeader({ title, description, icon, actions, className }: CardHeaderProps) {
  return (
    <header className={cx("flex items-center gap-3 px-3 py-3", className)}>
      {icon}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-medium text-fg">{title}</h3>
        {description && <p className="truncate text-sm text-fg-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}

/** The inner white panel. */
export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("relative flex-1 overflow-hidden rounded-[12px] border border-line bg-surface", className)}>{children}</div>;
}

export function CardFooter({ className, children }: { className?: string; children: ReactNode }) {
  return <footer className={cx("px-3 pb-2 pt-3 text-sm text-fg-muted", className)}>{children}</footer>;
}

const tileTones = {
  accent: "bg-linear-to-b from-accent-light to-accent text-fg-inverse",
  teal: "bg-linear-to-b from-[#2fd1b4] to-[#14a88f] text-fg-inverse",
  rose: "bg-linear-to-b from-[#ff7a9a] to-[#f04f75] text-fg-inverse",
  orange: "bg-linear-to-b from-[#ff9a5a] to-[#f2702e] text-fg-inverse",
  neutral: "bg-surface text-fg-secondary shadow-button",
  dashed: "border border-dashed border-line-strong bg-surface text-fg-muted",
};

/** 32px rounded icon tile that marks card headers. */
export function IconTile({ tone = "accent", className, children }: { tone?: keyof typeof tileTones; className?: string; children: ReactNode }) {
  return (
    <span className={cx("inline-flex size-8 shrink-0 items-center justify-center rounded-[10px] [&_svg]:size-4", tileTones[tone], className)}>
      {children}
    </span>
  );
}
