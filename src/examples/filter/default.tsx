"use client";

import { AddFilterButton, FilterButton } from "@/components/ui/filter";

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterButton label="Owner" value="All owners" />
      <FilterButton label="Stage" value="Qualified" />
      <FilterButton label="Score" value="≥ 80" />
      <AddFilterButton />
    </div>
  );
}
