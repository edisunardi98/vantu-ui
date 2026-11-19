"use client";

import { Clock } from "lucide-react";
import { DateInput, TimeField as AriaTimeField, type TimeFieldProps as AriaTimeFieldProps, type TimeValue } from "react-aria-components";
import { cx } from "@/utils/cx";
import { Segment } from "./date-picker";
import { Description, ErrorMessage, Label, fieldBase } from "./field";

export interface TimeFieldProps<T extends TimeValue> extends Omit<AriaTimeFieldProps<T>, "className" | "children"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  className?: string;
}

/** Hour/minute (and AM/PM) segments you type or arrow through. */
export function TimeField<T extends TimeValue>({ label, description, errorMessage, className, ...props }: TimeFieldProps<T>) {
  return (
    <AriaTimeField {...props} isInvalid={props.isInvalid ?? Boolean(errorMessage)} className={cx("flex flex-col gap-2", className)}>
      {label && <Label>{label}</Label>}
      <div className={cx(fieldBase, "flex h-10 items-center gap-2 px-3 focus-within:border-accent focus-within:shadow-focus")}>
        <Clock className="size-4 shrink-0 text-fg-muted" aria-hidden />
        <DateInput className="flex flex-1 text-base">{(seg) => <Segment segment={seg} />}</DateInput>
      </div>
      {description && !errorMessage && <Description>{description}</Description>}
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </AriaTimeField>
  );
}
