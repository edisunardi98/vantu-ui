"use client";

import { Minus, Plus } from "lucide-react";
import { Button as AriaButton, Group, Input, NumberField as AriaNumberField, type NumberFieldProps as AriaNumberFieldProps } from "react-aria-components";
import { cx } from "@/utils/cx";
import { Description, ErrorMessage, Label, fieldBase } from "./field";

export interface NumberFieldProps extends Omit<AriaNumberFieldProps, "className" | "children"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  className?: string;
}

const stepper =
  "inline-flex h-full w-10 shrink-0 cursor-default items-center justify-center text-fg-secondary outline-none transition-colors data-hovered:bg-subtle data-hovered:text-fg data-pressed:bg-active data-disabled:text-fg-disabled data-focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)] [&_svg]:size-3.5";

/** Numeric input with −/+ steppers, keyboard arrows, min/max and locale formatting. */
export function NumberField({ label, description, errorMessage, className, ...props }: NumberFieldProps) {
  return (
    <AriaNumberField {...props} isInvalid={props.isInvalid ?? Boolean(errorMessage)} className={cx("flex flex-col gap-2", className)}>
      {label && <Label>{label}</Label>}
      <Group className={cx(fieldBase, "flex h-10 items-center overflow-hidden")}>
        <AriaButton slot="decrement" className={cx(stepper, "border-r border-line")}>
          <Minus />
        </AriaButton>
        <Input className="h-full min-w-0 flex-1 bg-transparent text-center tabular outline-none" />
        <AriaButton slot="increment" className={cx(stepper, "border-l border-line")}>
          <Plus />
        </AriaButton>
      </Group>
      {description && !errorMessage && <Description>{description}</Description>}
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </AriaNumberField>
  );
}
