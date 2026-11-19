"use client";

import { Slider } from "@/components/ui/slider";

export default function Example() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Slider label="Minimum AI score" defaultValue={80} />
      <Slider label="Daily email limit" defaultValue={120} minValue={20} maxValue={300} step={10} format={(v) => `${v} / day`} />
    </div>
  );
}
