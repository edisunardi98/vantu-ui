"use client";

import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <PopoverTrigger>
        <IconButton aria-label="About AI score">
          <Info />
        </IconButton>
        <Popover title="How the AI score works" showArrow className="w-72">
          <p className="text-sm text-fg-secondary">Scores combine ICP fit (60%) and fresh buying signals (40%). Anything above 80 is considered hot.</p>
        </Popover>
      </PopoverTrigger>
      <PopoverTrigger>
        <Button>Display options</Button>
        <Popover placement="bottom start" className="w-64">
          <div className="flex flex-col gap-3">
            <Switch defaultSelected>Show AI score</Switch>
            <Switch>Compact rows</Switch>
            <Switch defaultSelected>Group by company</Switch>
          </div>
        </Popover>
      </PopoverTrigger>
    </div>
  );
}
