"use client";

import { CalendarDays } from "lucide-react";
import {
  Button as AriaButton,
  DateInput,
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  DateSegment,
  type DateSegmentProps,
  type DateValue,
  Dialog,
  Group,
  Popover,
} from "react-aria-components";
import { cx } from "@/utils/cx";
import { DateCalendar } from "./date-calendar";
import { Description, ErrorMessage, Label, fieldBase } from "./field";

export const segment =
  "rounded-[4px] px-0.5 tabular text-fg outline-none data-placeholder:text-fg-muted data-focused:bg-accent data-focused:text-white data-[type=literal]:px-0 data-[type=literal]:text-fg-muted data-disabled:text-fg-disabled";

/**
 * Date/time segment. Node and browsers ship different ICU data: Node formats "9:00 AM"
 * with a narrow no-break space (U+202F), Chrome with a plain space, which breaks hydration.
 * Normalising literal separators keeps server and client output identical.
 */
export function Segment({ segment: seg }: { segment: DateSegmentProps["segment"] }) {
  return (
    <DateSegment segment={seg} className={segment}>
      {seg.type === "literal" ? seg.text.replace(/[\u202f\u00a0]/g, " ") : undefined}
    </DateSegment>
  );
}

export interface DatePickerProps<T extends DateValue> extends Omit<AriaDatePickerProps<T>, "className" | "children"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  className?: string;
}

/** Typed date segments plus a calendar popover. Fully keyboard accessible. */
export function DatePicker<T extends DateValue>({ label, description, errorMessage, className, ...props }: DatePickerProps<T>) {
  return (
    <AriaDatePicker {...props} isInvalid={props.isInvalid ?? Boolean(errorMessage)} className={cx("group flex flex-col gap-2", className)}>
      {label && <Label>{label}</Label>}
      <Group className={cx(fieldBase, "flex h-10 items-center gap-2 pl-3 pr-1 group-data-open:border-accent group-data-open:shadow-focus")}>
        <DateInput className="flex flex-1 text-base">{(seg) => <Segment segment={seg} />}</DateInput>
        <AriaButton className="inline-flex size-8 items-center justify-center rounded-sm text-fg-muted outline-none data-hovered:bg-muted data-hovered:text-fg data-focus-visible:shadow-focus">
          <CalendarDays className="size-4" aria-hidden />
        </AriaButton>
      </Group>
      {description && !errorMessage && <Description>{description}</Description>}
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Popover offset={8} placement="bottom start" className="rounded-md bg-surface p-3 shadow-popover outline-none">
        <Dialog className="outline-none">
          <DateCalendar />
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
}
