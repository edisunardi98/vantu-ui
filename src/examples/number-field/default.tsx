"use client";

import { NumberField } from "@/components/ui/number-field";

export default function Example() {
  return (
    <div className="grid w-full max-w-md gap-4 sm:grid-cols-2">
      <NumberField label="Daily email limit" defaultValue={120} minValue={0} maxValue={500} step={10} />
      <NumberField label="Deal size" defaultValue={24000} formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} step={1000} />
      <NumberField label="Reply rate target" defaultValue={0.12} formatOptions={{ style: "percent" }} step={0.01} />
      <NumberField label="Seats" defaultValue={3} minValue={1} errorMessage="Your plan includes up to 2 seats." />
    </div>
  );
}
