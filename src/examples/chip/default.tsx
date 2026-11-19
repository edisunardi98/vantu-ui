"use client";

import { useState } from "react";
import { Chip, RemovableChip } from "@/components/ui/chip";
import { Kbd } from "@/components/ui/kbd";

export default function Example() {
  const [tags, setTags] = useState(["VP Sales", "Head of Revenue", "CRO"]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Chip>VP Sales</Chip>
        <Chip defaultSelected>Head of Revenue</Chip>
        <Chip>Director of Sales</Chip>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <RemovableChip key={t} onRemove={() => setTags((x) => x.filter((y) => y !== t))}>{t}</RemovableChip>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-sm text-fg-muted">
        Press <Kbd>⌘</Kbd><Kbd>K</Kbd> to open quick actions
      </div>
    </div>
  );
}
