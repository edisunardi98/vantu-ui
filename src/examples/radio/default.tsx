"use client";

import { Radio, RadioGroup } from "@/components/ui/radio";

export default function Example() {
  return (
    <RadioGroup label="Send emails from" defaultValue="owner">
      <Radio value="owner">Prospect owner</Radio>
      <Radio value="me">Me</Radio>
      <Radio value="round">Round-robin across team</Radio>
      <Radio value="shared" isDisabled>Shared inbox</Radio>
    </RadioGroup>
  );
}
