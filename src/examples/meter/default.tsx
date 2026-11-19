"use client";

import { Meter } from "@/components/ui/meter";

export default function Example() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Meter label="Storage" value={42} />
      <Meter label="Enrichment quota" value={2780} maxValue={3000} formatOptions={{ style: "decimal" }} valueLabel="2,780 of 3,000" />
      <Meter label="AI credits" value={96} />
      <Meter label="Password strength" variant="segments" segments={4} value={75} higherIsBetter valueLabel="Strong" />
    </div>
  );
}
