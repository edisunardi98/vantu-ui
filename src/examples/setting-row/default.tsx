"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { SettingRow, SettingSection } from "@/components/ui/setting-row";
import { Switch } from "@/components/ui/switch";

export default function Example() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-10">
      <SettingSection title="Sending" description="Control how sequences send email.">
        <SettingRow title="Pause on reply" description="Stop the sequence when a prospect replies." control={<Switch aria-label="Pause on reply" defaultSelected />} />
        <SettingRow
          title="Sending window"
          description="Emails go out in the prospect’s local time."
          control={
            <Select aria-label="Sending window" defaultSelectedKey="business" className="w-44">
              <SelectItem id="business">9 AM – 5 PM</SelectItem>
              <SelectItem id="morning">8 AM – 12 PM</SelectItem>
            </Select>
          }
        />
        <SettingRow title="Export data" description="Download every sequence as CSV." control={<Button size="sm">Export</Button>} />
      </SettingSection>
      <SettingSection title="Notifications">
        <SettingRow layout="leading" title="Replies and meetings" description="When a prospect replies or books a meeting." control={<Switch aria-label="Replies and meetings" defaultSelected />} />
        <SettingRow layout="leading" title="Product updates" description="New features and tips." control={<Switch aria-label="Product updates" />} />
      </SettingSection>
    </div>
  );
}
