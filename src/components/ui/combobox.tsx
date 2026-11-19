"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Button as AriaButton, ComboBox as AriaComboBox, type ComboBoxProps as AriaComboBoxProps, Group, Input, ListBox, Popover } from "react-aria-components";
import { cx } from "@/utils/cx";
import { Description, ErrorMessage, Label, fieldBase } from "./field";
import { SelectItem } from "./select";

export interface ComboboxProps<T extends object> extends Omit<AriaComboBoxProps<T>, "children" | "className"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode | ((item: T) => ReactNode);
}

/** Text input with a filtered list of suggestions. Type to filter, arrows to move, Enter to pick. */
export function Combobox<T extends object>({ label, description, errorMessage, placeholder, icon, className, children, ...props }: ComboboxProps<T>) {
  return (
    <AriaComboBox {...props} isInvalid={props.isInvalid ?? Boolean(errorMessage)} className={cx("group flex flex-col gap-2", className)}>
      {label && <Label>{label}</Label>}
      <Group className={cx(fieldBase, "flex h-10 items-center gap-2 pl-3 pr-1 group-data-open:border-accent group-data-open:shadow-focus [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-fg-muted")}>
        {icon}
        <Input placeholder={placeholder} className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-fg-muted" />
        <AriaButton className="inline-flex size-8 items-center justify-center rounded-sm text-fg-muted outline-none data-hovered:bg-muted data-hovered:text-fg">
          <ChevronDown className="size-4 transition-transform group-data-open:rotate-180" aria-hidden />
        </AriaButton>
      </Group>
      {description && !errorMessage && <Description>{description}</Description>}
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Popover offset={6} className="w-(--trigger-width) rounded-md bg-surface p-1 shadow-popover outline-none">
        <ListBox
          renderEmptyState={() => <div className="px-3 py-6 text-center text-base text-fg-muted">No matches</div>}
          className="max-h-72 overflow-auto outline-none"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
}

/** Option row — same look as SelectItem. */
export const ComboboxItem = SelectItem;
