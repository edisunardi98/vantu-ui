import { cx } from "@/utils/cx";

/** Marks keyboard shortcuts. */
export function Kbd({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <kbd
      className={cx(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-[6px] border border-line bg-surface px-1.5 font-sans text-xs font-medium text-fg-muted",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
