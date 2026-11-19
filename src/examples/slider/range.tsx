"use client";

import { Slider } from "@/components/ui/slider";

export default function Example() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-10">
      <Slider label="Employees" defaultValue={[50, 500]} minValue={0} maxValue={1000} step={10} format={(v) => v.toLocaleString("en-US")} />
      <Slider aria-label="Deal size" defaultValue={[20, 75]} valueTooltip format={(v) => `$${v}k`} />
    </div>
  );
}
