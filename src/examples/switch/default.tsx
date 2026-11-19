"use client";

import { Switch } from "@/components/ui/switch";

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Switch defaultSelected>Auto-enrich new prospects</Switch>
      <Switch>Pause sequences on reply</Switch>
      <Switch isDisabled>Sync to Salesforce</Switch>
    </div>
  );
}
