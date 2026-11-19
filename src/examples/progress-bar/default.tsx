import { ProgressBar } from "@/components/ui/progress-bar";

export default function Example() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <ProgressBar label="AI credits" value={6240} max={10000} showValue caption="Resets Oct 1 · Growth plan" />
      <ProgressBar label="Enrichments" value={2780} max={3000} showValue tone="warning" />
      <ProgressBar label="Reply rate" value={8.6} max={15} tone="neutral" />
    </div>
  );
}
