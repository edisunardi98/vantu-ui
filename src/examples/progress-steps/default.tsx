import { ProgressSteps } from "@/components/ui/progress-steps";

export default function Example() {
  return (
    <ProgressSteps
      className="w-full max-w-sm"
      steps={[
        { label: "Understanding your query", status: "done" },
        { label: "Finding matching people", status: "active", meta: "1,946 of ~2,400" },
        { label: "Scoring against your ICP", status: "pending" },
      ]}
    />
  );
}
