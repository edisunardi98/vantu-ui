"use client";

import { X } from "lucide-react";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface CriterionChipProps {
  /** Muted key, e.g. "Role". */
  label: string;
  value: string;
  onRemove?: () => void;
  className?: string;
}

/** Structured criterion produced by AI search: muted key + value, removable. 32px, radius 12. */
export function CriterionChip({ label, value, onRemove, className }: CriterionChipProps) {
  return (
    <span className={cx("inline-flex h-8 items-center gap-2 rounded-md border border-line bg-surface pl-3 text-base font-medium", onRemove ? "pr-1.5" : "pr-3", className)}>
      <span className="text-fg-muted">{label}</span>
      <span className="text-fg">{value}</span>
      {onRemove && (
        <AriaButton
          aria-label={`Remove ${label}: ${value}`}
          onPress={onRemove}
          className="inline-flex size-5 items-center justify-center rounded-xs text-fg-muted outline-none data-hovered:bg-muted data-hovered:text-fg data-focus-visible:shadow-focus"
        >
          <X className="size-3.5" />
        </AriaButton>
      )}
    </span>
  );
}
