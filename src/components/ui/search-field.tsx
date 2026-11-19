"use client";

import { Search, X } from "lucide-react";
import type { ReactNode } from "react";
import { Button as AriaButton, Input, SearchField as AriaSearchField, type SearchFieldProps as AriaSearchFieldProps } from "react-aria-components";
import { cx } from "@/utils/cx";
import { Label, fieldBase } from "./field";

export interface SearchFieldProps extends Omit<AriaSearchFieldProps, "className" | "children"> {
  label?: string;
  placeholder?: string;
  /** Right-side hint shown while empty, e.g. <Kbd>⌘K</Kbd>. */
  shortcut?: ReactNode;
  size?: "sm" | "md";
  className?: string;
}

/** Search input with a leading icon, a clear button when filled and Escape-to-clear. */
export function SearchField({ label, placeholder = "Search…", shortcut, size = "md", className, ...props }: SearchFieldProps) {
  return (
    <AriaSearchField {...props} className={cx("group flex flex-col gap-2", className)}>
      {label && <Label>{label}</Label>}
      <div className={cx(fieldBase, "flex items-center gap-2 px-3 group-data-focus-within:border-accent group-data-focus-within:shadow-focus", size === "md" ? "h-10" : "h-9")}>
        <Search aria-hidden className="size-4 shrink-0 text-fg-muted" />
        <Input placeholder={placeholder} className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-fg-muted [&::-webkit-search-cancel-button]:hidden" />
        <span className="group-data-empty:hidden">
          <AriaButton aria-label="Clear search" className="inline-flex size-5 items-center justify-center rounded-full bg-muted text-fg-muted outline-none data-hovered:bg-active data-hovered:text-fg data-focus-visible:shadow-focus">
            <X className="size-3" strokeWidth={2.4} />
          </AriaButton>
        </span>
        {shortcut && <span className="hidden group-data-empty:inline-flex">{shortcut}</span>}
      </div>
    </AriaSearchField>
  );
}
