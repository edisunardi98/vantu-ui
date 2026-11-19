import { SequenceFlow } from "@/components/blocks/sequence-flow";

export default function Example() {
  return (
    <SequenceFlow
      className="w-full max-w-2xl"
      steps={[
        {
          channel: "email",
          name: "Intro",
          timing: "Day 1 · Automatic",
          subject: "Quick question about {{company}}’s SDR ramp",
          preview: "Hi {{first_name}}, congrats on the {{recent_signal}}…",
          stats: [
            { label: "Sent", value: 128 },
            { label: "Opened", value: "64%" },
            { label: "Replied", value: "7.8%" },
          ],
        },
        {
          waitBefore: "Wait 2 days",
          channel: "linkedin",
          name: "Connection request",
          timing: "Day 3 · Manual task",
          subject: "Connection note",
          preview: "Hi {{first_name}} — saw {{company}} is hiring SDRs…",
        },
        {
          waitBefore: "Wait 3 days",
          channel: "call",
          name: "Follow-up call",
          timing: "Day 6 · Manual task",
          preview: "Reference the case study and ask about ramp time.",
        },
      ]}
    />
  );
}
