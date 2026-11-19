"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Button as AriaButton, Label, Tag as AriaTag, TagGroup as AriaTagGroup, type TagGroupProps as AriaTagGroupProps, TagList, type TagProps as AriaTagProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface TagGroupProps extends Omit<AriaTagGroupProps, "className" | "children"> {
  label?: string;
  className?: string;
  children: ReactNode;
}

/** Keyboard-navigable set of tags. Supports single/multiple selection and removal. */
export function TagGroup({ label, className, children, ...props }: TagGroupProps) {
  return (
    <AriaTagGroup {...props} className={cx("flex flex-col gap-2", className)}>
      {label && <Label className="text-sm font-medium text-fg">{label}</Label>}
      <TagList className="flex flex-wrap gap-2">{children}</TagList>
    </AriaTagGroup>
  );
}

export function TagGroupItem({ children, className, ...props }: Omit<AriaTagProps, "className" | "children"> & { children: ReactNode; className?: string }) {
  const textValue = props.textValue ?? (typeof children === "string" ? children : undefined);
  return (
    <AriaTag
      {...props}
      textValue={textValue}
      className={cx(
        "inline-flex h-7 cursor-default items-center gap-1 rounded-sm bg-surface px-2.5 text-sm font-medium text-fg shadow-button outline-none transition-colors",
        "data-hovered:bg-subtle data-focus-visible:shadow-focus data-disabled:text-fg-disabled",
        "data-selected:bg-accent-soft data-selected:text-accent-text data-selected:shadow-[inset_0_0_0_1px_var(--color-accent-soft-border)]",
        className,
      )}
    >
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <AriaButton slot="remove" className="-mr-1 inline-flex size-4 items-center justify-center rounded-[4px] text-fg-muted outline-none data-hovered:bg-active data-hovered:text-fg">
              <X className="size-3" />
            </AriaButton>
          )}
        </>
      )}
    </AriaTag>
  );
}
