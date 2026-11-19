"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox>Verified emails only</Checkbox>
      <Checkbox defaultSelected>Exclude existing customers</Checkbox>
      <Checkbox isIndeterminate>Select all prospects</Checkbox>
      <Checkbox isDisabled>Include personal emails</Checkbox>
    </div>
  );
}
