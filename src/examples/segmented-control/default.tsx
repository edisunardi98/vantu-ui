"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/ui/segmented-control";

export default function Example() {
  const [range, setRange] = useState("30d");
  return (
    <div className="flex flex-col items-start gap-3">
      <SegmentedControl
        aria-label="Date range"
        value={range}
        onChange={setRange}
        options={[
          { id: "7d", label: "7D" },
          { id: "30d", label: "30D" },
          { id: "90d", label: "90D" },
          { id: "12m", label: "12M" },
        ]}
      />
      <span className="text-sm text-fg-muted">Selected: {range}</span>
    </div>
  );
}
