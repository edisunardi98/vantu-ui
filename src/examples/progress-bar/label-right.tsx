import { ProgressBar } from "@/components/ui/progress-bar";

export default function Example() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <ProgressBar label="Profile" value={40} labelPosition="right" />
      <ProgressBar label="Onboarding" value={75} labelPosition="right" tone="success" />
      <ProgressBar label="Storage" value={92} labelPosition="right" tone="error" />
    </div>
  );
}
