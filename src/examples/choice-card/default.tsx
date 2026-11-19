"use client";

import { Briefcase, Target, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChoiceCard, ChoiceCardGroup } from "@/components/ui/choice-card";

export default function Example() {
  return (
    <ChoiceCardGroup label="Your role" defaultValue="ae" className="w-full max-w-md">
      <ChoiceCard value="ae" icon={<Briefcase />} title="Account Executive" description="Work deals and book meetings." />
      <ChoiceCard value="sdr" icon={<Target />} title="SDR / BDR" description="Prospect and qualify leads." meta={<Badge size="sm" tone="accent">Popular</Badge>} />
      <ChoiceCard value="leader" icon={<Users />} title="Sales leader" description="Set goals and coach the team." />
    </ChoiceCardGroup>
  );
}
