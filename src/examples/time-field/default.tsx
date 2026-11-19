"use client";

import { Time } from "@internationalized/date";
import { TimeField } from "@/components/ui/time-field";

export default function Example() {
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      <TimeField label="Send window starts" defaultValue={new Time(9, 0)} />
      <TimeField label="Send window ends" defaultValue={new Time(17, 30)} hourCycle={24} />
    </div>
  );
}
