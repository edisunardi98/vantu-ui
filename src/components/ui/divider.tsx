import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  /** Text or element shown in the line, e.g. "OR". */
  label?: ReactNode;
  align?: "start" | "center" | "end";
  dashed?: boolean;
  className?: string;
}

/** Separates content. Optional label sits in the line. */
export function Divider({ orientation = "horizontal", label, align = "center", dashed, className }: DividerProps) {
  const line = cx("border-line", dashed && "border-dashed");
  if (orientation === "vertical") {
    return <div role="separator" aria-orientation="vertical" className={cx("w-0 self-stretch border-l", line, className)} />;
  }
  if (!label) return <div role="separator" className={cx("h-0 w-full border-t", line, className)} />;
  return (
    <div role="separator" className={cx("flex w-full items-center gap-3 text-label text-[11px] text-fg-muted", className)}>
      {align !== "start" && <span className={cx("flex-1 border-t", line)} />}
      <span className="shrink-0">{label}</span>
      {align !== "end" && <span className={cx("flex-1 border-t", line)} />}
    </div>
  );
}
