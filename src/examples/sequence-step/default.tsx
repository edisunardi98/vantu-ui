"use client";

import { SequenceStep, SequenceWait } from "@/components/ui/sequence-step";

export default function Example() {
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-3">
      <SequenceStep
        className="w-full"
        step={1}
        channel="email"
        name="Intro"
        timing="Day 1 · Automatic"
        subject="Quick question about {{company}}’s SDR ramp"
        preview="Hi {{first_name}}, congrats on the {{recent_signal}}…"
        stats={[
          { label: "Sent", value: 128 },
          { label: "Opened", value: "64%" },
          { label: "Replied", value: "7.8%" },
        ]}
      />
      <SequenceWait>Wait 2 days</SequenceWait>
    </div>
  );
}
