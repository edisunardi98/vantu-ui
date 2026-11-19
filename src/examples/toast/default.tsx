"use client";

import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";

export default function Example() {
  return (
    <div className="grid w-full max-w-[816px] gap-3 md:grid-cols-2">
      <Toast tone="success" title="128 prospects added to “Series B — VP Sales”" description="Start a sequence from the list when you are ready." onClose={() => {}} />
      <Toast tone="error" title="Export failed" description="The CSV was larger than 50 MB. Try fewer columns." onClose={() => {}} />
      <Toast tone="info" title="Salesforce sync started" description="We’ll let you know when 2,318 accounts are mapped." onClose={() => {}} />
      <Toast
        tone="ai"
        title="AI found 38 new matches"
        description="For your saved search “Series B — VP Sales”."
        onClose={() => {}}
        action={<Button size="sm">Review</Button>}
      />
    </div>
  );
}
