"use client";

import { getLocalTimeZone, isWeekend, today } from "@internationalized/date";
import { useLocale } from "react-aria-components";
import { DateCalendar, DateRangeCalendar } from "@/components/ui/date-calendar";

export default function Example() {
  const { locale } = useLocale();
  const now = today(getLocalTimeZone());
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <div className="rounded-lg border border-line bg-surface p-4 shadow-card">
        <DateCalendar aria-label="Meeting date" defaultValue={now.add({ days: 2 })} minValue={now} isDateUnavailable={(d) => isWeekend(d, locale)} />
      </div>
      <div className="rounded-lg border border-line bg-surface p-4 shadow-card">
        <DateRangeCalendar aria-label="Campaign window" defaultValue={{ start: now.add({ days: 3 }), end: now.add({ days: 10 }) }} />
      </div>
    </div>
  );
}
