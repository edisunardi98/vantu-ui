"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepIndicator, StepperDots } from "@/components/ui/step-indicator";

const steps = [{ label: "Personal" }, { label: "Role" }, { label: "Team" }, { label: "Goal" }, { label: "Summary" }];

export default function Example() {
  const [current, setCurrent] = useState(1);
  return (
    <div className="flex flex-col items-center gap-6">
      <StepIndicator steps={steps} current={current} />
      <StepperDots count={steps.length} current={current} onChange={setCurrent} />
      <div className="flex gap-2">
        <Button size="xs" onPress={() => setCurrent((c) => Math.max(0, c - 1))}>Back</Button>
        <Button size="xs" variant="primary" onPress={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}>Next</Button>
      </div>
    </div>
  );
}
