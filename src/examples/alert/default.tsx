import { Alert } from "@/components/ui/alert";

export default function Example() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Alert tone="info" title="Salesforce sync runs every 15 minutes">Last sync 4 min ago · 2,318 accounts mapped.</Alert>
      <Alert tone="success" title="Domain verified">Emails will now send from vantu.dev.</Alert>
      <Alert tone="warning" title="80% of AI credits used">Credits reset Oct 1. Upgrade to keep enriching.</Alert>
      <Alert tone="error" title="HubSpot disconnected">Reconnect to resume syncing contacts.</Alert>
    </div>
  );
}
