"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IntegrationMark } from "@/components/ui/integration-mark";
import { Notification } from "@/components/ui/notification";

export default function Example() {
  const [items, setItems] = useState(["reply", "share", "sync"]);
  const remove = (id: string) => setItems((x) => x.filter((y) => y !== id));
  return (
    <div className="w-full max-w-md divide-y divide-line-subtle rounded-lg border border-line bg-surface p-1 shadow-card">
      {items.includes("reply") && (
        <Notification
          unread
          leading={<Avatar name="Priya Raman" size="lg" status="online" />}
          title={<><b className="font-medium">Priya Raman</b> replied to “Quick question about Fathom’s SDR ramp”</>}
          time="12 min ago · Series B — VP Sales"
          attachment="“Happy to chat — does Thursday at 10 work?”"
          onDismiss={() => remove("reply")}
        />
      )}
      {items.includes("share") && (
        <Notification
          unread
          leading={<Avatar name="Leah Moss" size="lg" />}
          title={<><b className="font-medium">Leah Moss</b> shared the list <b className="font-medium">UK Revenue Leaders</b> with you</>}
          time="1h ago"
          actions={
            <>
              <Button size="xs" onPress={() => remove("share")}>Decline</Button>
              <Button size="xs" variant="primary" onPress={() => remove("share")}>Accept</Button>
            </>
          }
          onDismiss={() => remove("share")}
        />
      )}
      {items.includes("sync") && (
        <Notification leading={<IntegrationMark id="salesforce" size="lg" />} title="Salesforce sync finished" description="2,318 accounts mapped · 14 skipped" time="Yesterday" onDismiss={() => remove("sync")} />
      )}
      {items.length === 0 && <p className="py-8 text-center text-base text-fg-muted">You’re all caught up.</p>}
    </div>
  );
}
