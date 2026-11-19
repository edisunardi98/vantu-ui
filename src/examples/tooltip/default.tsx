"use client";

import { RefreshCw } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export default function Example() {
  return (
    <TooltipTrigger delay={300}>
      <IconButton aria-label="Refresh score"><RefreshCw /></IconButton>
      <Tooltip>Score updated 2h ago</Tooltip>
    </TooltipTrigger>
  );
}
