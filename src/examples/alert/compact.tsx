"use client";

import { Alert } from "@/components/ui/alert";
import { LinkButton } from "@/components/ui/link-button";

export default function Example() {
  const action = () => (
    <LinkButton tone="black" size="sm" underline>
      Upgrade
    </LinkButton>
  );
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <Alert size="sm" variant="solid" tone="info" title="Salesforce sync runs every 15 minutes." actions={action()} onDismiss={() => {}} />
      <Alert size="sm" variant="soft" tone="success" title="24 prospects enriched · 22 verified emails." onDismiss={() => {}} />
      <Alert size="sm" variant="soft" tone="warning" title="You’re close to your enrichment limit." actions={action()} onDismiss={() => {}} />
      <Alert size="sm" variant="outline" tone="error" title="2 emails bounced in “UK Revenue Leaders”." actions={action()} onDismiss={() => {}} />
      <Alert size="sm" variant="soft" tone="feature" title="New: AI research briefs." actions={action()} onDismiss={() => {}} />
    </div>
  );
}
