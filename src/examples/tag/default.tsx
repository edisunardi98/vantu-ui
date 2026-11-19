"use client";

import { MapPin, Tag as TagIcon } from "lucide-react";
import { useState } from "react";
import { Avatar, CompanyMark } from "@/components/ui/avatar";
import { Tag } from "@/components/ui/tag";

export default function Example() {
  const [tags, setTags] = useState(["Enterprise", "Q4", "Inbound"]);
  return (
    <div className="flex max-w-lg flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-2">
        <Tag>Basic</Tag>
        <Tag leading={<TagIcon />}>With icon</Tag>
        <Tag leading={<Avatar name="Sarah Chen" size="xs" />}>Sarah Chen</Tag>
        <Tag leading={<CompanyMark name="Ledgerly" size="xs" color="#8a5a2b" className="!size-4 !rounded-[4px] !text-[8px]" />}>Ledgerly</Tag>
        <Tag leading={<span aria-hidden>🇬🇧</span>}>United Kingdom</Tag>
        <Tag leading={<MapPin />} sublabel="(12)">Austin</Tag>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map((t) => (
          <Tag key={t} variant="gray" onRemove={() => setTags((x) => x.filter((y) => y !== t))}>{t}</Tag>
        ))}
        <Tag isDisabled>Disabled</Tag>
      </div>
    </div>
  );
}
