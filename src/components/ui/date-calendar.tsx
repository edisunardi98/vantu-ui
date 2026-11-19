"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Button as AriaButton,
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  type CalendarProps,
  type DateValue,
  Heading,
  RangeCalendar as AriaRangeCalendar,
  type RangeCalendarProps,
} from "react-aria-components";
import { cx } from "@/utils/cx";

const nav = "inline-flex size-8 cursor-default items-center justify-center rounded-sm text-fg-secondary outline-none data-hovered:bg-muted data-hovered:text-fg data-focus-visible:shadow-focus data-disabled:text-fg-disabled [&_svg]:size-4";

function Header() {
  return (
    <header className="mb-3 flex items-center justify-between">
      <AriaButton slot="previous" className={nav}>
        <ChevronLeft />
      </AriaButton>
      <Heading className="text-base font-medium text-fg" />
      <AriaButton slot="next" className={nav}>
        <ChevronRight />
      </AriaButton>
    </header>
  );
}

function Grid({ range }: { range?: boolean }) {
  return (
    <CalendarGrid className="w-full border-separate border-spacing-y-0.5" weekdayStyle="short">
      <CalendarGridHeader>{(day) => <CalendarHeaderCell className="pb-1.5 text-xs font-medium uppercase text-fg-muted">{day.slice(0, 2)}</CalendarHeaderCell>}</CalendarGridHeader>
      <CalendarGridBody>
        {(date) => (
          <CalendarCell
            date={date}
            className={cx(
              "relative flex size-9 cursor-default items-center justify-center rounded-sm text-base tabular text-fg outline-none",
              "data-hovered:bg-muted data-outside-month:text-fg-disabled data-unavailable:text-fg-disabled data-unavailable:line-through data-disabled:text-fg-disabled",
              "data-focus-visible:shadow-focus",
              "[&[data-today]:not([data-selected])]:after:absolute [&[data-today]:not([data-selected])]:after:bottom-1 [&[data-today]:not([data-selected])]:after:size-1 [&[data-today]:not([data-selected])]:after:rounded-full [&[data-today]:not([data-selected])]:after:bg-accent",
              range
                ? "data-selected:rounded-none data-selected:bg-accent-soft data-selected:text-accent-text data-selection-start:rounded-l-sm data-selection-start:bg-accent data-selection-start:text-white data-selection-end:rounded-r-sm data-selection-end:bg-accent data-selection-end:text-white"
                : "data-selected:bg-linear-to-b data-selected:from-accent-light data-selected:to-accent data-selected:font-medium data-selected:text-white data-selected:shadow-button-primary",
            )}
          />
        )}
      </CalendarGridBody>
    </CalendarGrid>
  );
}

/** Month grid for picking one date. Today has an accent dot. */
export function DateCalendar<T extends DateValue>({ className, ...props }: Omit<CalendarProps<T>, "className"> & { className?: string }) {
  return (
    <AriaCalendar {...props} className={cx("w-fit", className)}>
      <Header />
      <Grid />
    </AriaCalendar>
  );
}

/** Month grid for picking a start and end date. */
export function DateRangeCalendar<T extends DateValue>({ className, ...props }: Omit<RangeCalendarProps<T>, "className"> & { className?: string }) {
  return (
    <AriaRangeCalendar {...props} className={cx("w-fit", className)}>
      <Header />
      <Grid range />
    </AriaRangeCalendar>
  );
}
