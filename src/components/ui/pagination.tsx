"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Summary shown on the left, e.g. "1–25 of 128 prospects". */
  summary?: string;
  className?: string;
}

function pages(current: number, count: number): (number | "…")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const set = new Set([1, 2, current - 1, current, current + 1, count]);
  const sorted = [...set].filter((p) => p >= 1 && p <= count).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1]! > 1) out.push("…");
    out.push(p);
  });
  return out;
}

const item =
  "inline-flex size-8 cursor-default items-center justify-center rounded-sm text-sm font-medium tabular text-fg-secondary outline-none transition-colors " +
  "data-hovered:bg-muted data-hovered:text-fg data-focus-visible:shadow-focus data-disabled:text-fg-disabled [&_svg]:size-4";

/** Table footer. Summary left, pages right; 32px page items, radius 8. */
export function Pagination({ page, pageCount, onPageChange, summary, className }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={cx("flex items-center justify-between gap-4", className)}>
      <span className="text-sm text-fg-muted">{summary}</span>
      <div className="flex items-center gap-1">
        <AriaButton aria-label="Previous page" className={item} isDisabled={page <= 1} onPress={() => onPageChange(page - 1)}>
          <ChevronLeft />
        </AriaButton>
        {pages(page, pageCount).map((p, i) =>
          p === "…" ? (
            <span key={`gap-${i}`} className="inline-flex size-8 items-center justify-center text-sm text-fg-muted">…</span>
          ) : (
            <AriaButton
              key={p}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              onPress={() => onPageChange(p)}
              className={cx(item, p === page ? "bg-active text-fg" : "shadow-button bg-surface")}
            >
              {p}
            </AriaButton>
          ),
        )}
        <AriaButton aria-label="Next page" className={item} isDisabled={page >= pageCount} onPress={() => onPageChange(page + 1)}>
          <ChevronRight />
        </AriaButton>
      </div>
    </nav>
  );
}
