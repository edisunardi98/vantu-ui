"use client";

import type { ReactNode } from "react";
import { FieldError, Label as AriaLabel, Text } from "react-aria-components";
import { cx } from "@/utils/cx";

/** Shared field chrome: 40px tall, radius 12, 1px border-strong, accent border + 3px ring on focus. */
export const fieldBase =
  "w-full rounded-md border border-line-strong bg-surface text-base text-fg outline-none transition-[border,box-shadow] " +
  "placeholder:text-fg-muted data-hovered:border-fg-disabled " +
  "data-focused:border-accent data-focused:shadow-focus data-focus-within:border-accent data-focus-within:shadow-focus " +
  "data-invalid:border-error data-invalid:data-focused:shadow-focus-error " +
  "data-disabled:border-line data-disabled:bg-subtle data-disabled:text-fg-disabled data-disabled:placeholder:text-fg-disabled";

export function Label({ className, children }: { className?: string; children: ReactNode }) {
  return <AriaLabel className={cx("text-sm font-medium text-fg", className)}>{children}</AriaLabel>;
}

export function Description({ children }: { children: ReactNode }) {
  return (
    <Text slot="description" className="text-sm text-fg-muted">
      {children}
    </Text>
  );
}

export function ErrorMessage({ children }: { children?: ReactNode }) {
  return <FieldError className="text-sm text-error-text">{children}</FieldError>;
}
