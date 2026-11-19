"use client";

import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import {
  Button as AriaButton,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue,
} from "react-aria-components";
import { cx } from "@/utils/cx";
import { Description, ErrorMessage, Label, fieldBase } from "./field";

export interface SelectProps<T extends object> extends Omit<AriaSelectProps<T>, "children" | "className"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  items?: Iterable<T>;
  className?: string;
  children: ReactNode | ((item: T) => ReactNode);
}

/** Single-value dropdown. Trailing chevron, accent border while open. */
export function Select<T extends object>({
  label,
  description,
  errorMessage,
  items,
  className,
  children,
  placeholder = "Select an option",
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect {...props} placeholder={placeholder} className={cx("group flex flex-col gap-2", className)}>
      {label && <Label>{label}</Label>}
      <AriaButton
        className={cx(
          fieldBase,
          "flex h-10 cursor-default items-center gap-2 pl-3 pr-3 text-left",
          "data-focus-visible:border-accent data-focus-visible:shadow-focus group-data-open:border-accent group-data-open:shadow-focus",
        )}
      >
        <SelectValue className="flex-1 truncate data-placeholder:text-fg-muted" />
        <ChevronDown aria-hidden className="size-4 text-fg-muted transition-transform group-data-open:rotate-180" />
      </AriaButton>
      {description && !errorMessage && <Description>{description}</Description>}
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Popover
        offset={6}
        className="w-(--trigger-width) rounded-md bg-surface p-1 shadow-popover outline-none"
      >
        <ListBox items={items} className="max-h-72 overflow-auto outline-none">
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectItem({ className, children, ...props }: ListBoxItemProps & { children: ReactNode; className?: string }) {
  const textValue = props.textValue ?? (typeof children === "string" ? children : undefined);
  return (
    <ListBoxItem
      {...props}
      textValue={textValue}
      className={cx(
        "group/item flex h-9 cursor-default items-center gap-2 rounded-sm px-2.5 text-base text-fg outline-none",
        "data-focused:bg-muted data-disabled:text-fg-disabled",
        className,
      )}
    >
      <span className="flex-1 truncate">{children}</span>
      <Check aria-hidden className="hidden size-4 text-accent group-data-selected/item:block" />
    </ListBoxItem>
  );
}
