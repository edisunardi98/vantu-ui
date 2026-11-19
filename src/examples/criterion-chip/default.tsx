"use client";

import { useState } from "react";
import { CriterionChip } from "@/components/ui/criterion-chip";

const initial = [
  { label: "Role", value: "VP Sales" },
  { label: "Industry", value: "B2B SaaS" },
  { label: "Employees", value: "50–500" },
  { label: "Location", value: "United States" },
];

export default function Example() {
  const [items, setItems] = useState(initial);
  return (
    <div className="flex max-w-xl flex-wrap justify-center gap-2">
      {items.map((c) => (
        <CriterionChip key={c.label} {...c} onRemove={() => setItems((x) => x.filter((y) => y.label !== c.label))} />
      ))}
      {items.length === 0 && (
        <button className="text-sm font-medium text-accent-text hover:underline" onClick={() => setItems(initial)}>
          Reset criteria
        </button>
      )}
    </div>
  );
}
