"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface TagProps {
  /** `stroke` white with border (default) · `gray` muted fill. */
  variant?: "stroke" | "gray";
  /** Leading visual: an icon, <Avatar size="xs">, <CompanyMark size="sm">, a flag… */
  leading?: ReactNode;
  /** Muted secondary text after the label, e.g. a count. */
  sublabel?: ReactNode;
  onRemove?: () => void;
  isDisabled?: boolean;
  className?: string;
  children: ReactNode;
}

/** Compact 24px label for people, companies, filters and categories. */
export function Tag({ variant = "stroke", leading, sublabel, onRemove, isDisabled, className, children }: TagProps) {
  return (
    <span
      className={cx(
        "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-[6px] text-sm font-medium [&>svg]:size-3.5",
        onRemove ? "pl-1.5 pr-1" : "px-1.5",
        !leading && "pl-2",
        variant === "stroke" ? "bg-surface text-fg ring-1 ring-inset ring-line" : "bg-muted text-fg",
        isDisabled && "text-fg-disabled ring-line-subtle [&_*]:opacity-60",
        className,
      )}
    >
      {leading}
      <span>{children}</span>
      {sublabel && <span className="font-normal text-fg-muted">{sublabel}</span>}
      {onRemove && (
        <AriaButton
          aria-label={`Remove ${typeof children === "string" ? children : "tag"}`}
          onPress={onRemove}
          isDisabled={isDisabled}
          className="inline-flex size-4 items-center justify-center rounded-[4px] text-fg-muted outline-none data-hovered:bg-active data-hovered:text-fg data-focus-visible:shadow-focus"
        >
          <X className="size-3" />
        </AriaButton>
      )}
    </span>
  );
}
