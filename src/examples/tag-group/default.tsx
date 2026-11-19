"use client";

import { useState } from "react";
import { TagGroup, TagGroupItem } from "@/components/ui/tag-group";

export default function Example() {
  const [stages, setStages] = useState(["New", "Contacted", "Replied", "Meeting booked", "Won"]);
  return (
    <div className="flex flex-col gap-6">
      <TagGroup label="Industries" selectionMode="multiple" defaultSelectedKeys={["saas", "fintech"]}>
        <TagGroupItem id="saas">B2B SaaS</TagGroupItem>
        <TagGroupItem id="fintech">Fintech</TagGroupItem>
        <TagGroupItem id="hr">HR tech</TagGroupItem>
        <TagGroupItem id="health">Healthtech</TagGroupItem>
        <TagGroupItem id="dev">Developer tools</TagGroupItem>
      </TagGroup>
      <TagGroup label="Pipeline stages" onRemove={(keys) => setStages((s) => s.filter((x) => !keys.has(x)))}>
        {stages.map((s) => (
          <TagGroupItem key={s} id={s}>
            {s}
          </TagGroupItem>
        ))}
      </TagGroup>
    </div>
  );
}
