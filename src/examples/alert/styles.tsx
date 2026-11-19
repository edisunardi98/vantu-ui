"use client";

import { Alert } from "@/components/ui/alert";
import { LinkButton } from "@/components/ui/link-button";

export default function Example() {
  return (
    <div className="grid w-full max-w-3xl gap-3 md:grid-cols-2">
      <Alert variant="solid" tone="error" title="HubSpot disconnected" onDismiss={() => {}} actions={<><LinkButton tone="black" size="sm" underline>Reconnect</LinkButton><LinkButton tone="black" size="sm">Learn more</LinkButton></>}>
        Contacts stopped syncing 2h ago.
      </Alert>
      <Alert variant="outline" tone="feature" title="AI research is here" onDismiss={() => {}} actions={<LinkButton size="sm" underline>Try it</LinkButton>}>
        Generate an account brief from 20+ sources in one click.
      </Alert>
      <Alert variant="soft" tone="warning" title="80% of AI credits used" onDismiss={() => {}}>
        Credits reset Oct 1.
      </Alert>
      <Alert variant="solid" tone="success" title="Domain verified" onDismiss={() => {}}>
        Emails now send from vantu.dev.
      </Alert>
    </div>
  );
}
