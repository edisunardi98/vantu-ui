"use client";

import { Pencil } from "lucide-react";
import { DescriptionList, PlainCard } from "@/components/ui/description-list";
import { IconButton } from "@/components/ui/icon-button";

export default function Example() {
  return (
    <PlainCard
      title="Details"
      className="w-full max-w-md"
      actions={
        <IconButton variant="ghost" size="xs" aria-label="Edit details">
          <Pencil />
        </IconButton>
      }
    >
      <DescriptionList
        items={[
          { label: "Email", value: "sarah.chen@ledgerly.com" },
          { label: "Phone", value: "+1 (415) 555-0142" },
          { label: "Location", value: "San Francisco, CA" },
          { label: "Owner", value: "Jordan Blake" },
        ]}
      />
    </PlainCard>
  );
}
