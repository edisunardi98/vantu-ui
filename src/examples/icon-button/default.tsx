"use client";

import { Bell, CircleHelp, MoreHorizontal, Plus } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

export default function Example() {
  return (
    <div className="flex items-center gap-2">
      <IconButton aria-label="Help"><CircleHelp /></IconButton>
      <IconButton aria-label="Notifications"><Bell /></IconButton>
      <IconButton variant="ghost" size="sm" aria-label="Add"><Plus /></IconButton>
      <IconButton variant="ghost" size="sm" aria-label="More"><MoreHorizontal /></IconButton>
    </div>
  );
}
