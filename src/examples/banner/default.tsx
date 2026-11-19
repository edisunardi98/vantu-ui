"use client";

import { AlertTriangle, Sparkles } from "lucide-react";
import { Banner } from "@/components/ui/banner";
import { LinkButton } from "@/components/ui/link-button";

export default function Example() {
  return (
    <div className="flex w-full flex-col gap-3 overflow-hidden rounded-lg">
      <Banner
        tone="feature"
        icon={<Sparkles />}
        title="AI research briefs are live."
        description="Generate an account brief in one click."
        action={<LinkButton size="sm" underline>Try it</LinkButton>}
        onDismiss={() => {}}
      />
      <Banner variant="soft" tone="warning" icon={<AlertTriangle />} title="Your trial ends in 3 days." action={<LinkButton size="sm" underline>Upgrade</LinkButton>} onDismiss={() => {}} />
      <Banner variant="solid" tone="error" title="Email sending is paused." description="We’re investigating a provider outage." />
    </div>
  );
}
