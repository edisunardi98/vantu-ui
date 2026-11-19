"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { DatePicker } from "@/components/ui/date-picker";

export default function Example() {
  const now = today(getLocalTimeZone());
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      <DatePicker label="Follow-up date" defaultValue={now.add({ days: 3 })} minValue={now} />
      <DatePicker label="Close date" description="Expected signing date." />
    </div>
  );
}
