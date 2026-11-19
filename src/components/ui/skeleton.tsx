import { cx } from "@/utils/cx";

/** Realistic placeholder that mirrors the loaded layout. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx("animate-shimmer rounded-xs bg-muted", className)} />;
}
