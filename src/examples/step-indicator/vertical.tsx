import { StepIndicator } from "@/components/ui/step-indicator";

export default function Example() {
  return (
    <StepIndicator
      orientation="vertical"
      current={2}
      className="w-72"
      steps={[
        { label: "Connect your CRM", description: "Salesforce · connected" },
        { label: "Import prospects", description: "1,284 imported from CSV" },
        { label: "Define your ICP", description: "Roles, company size and signals" },
        { label: "Launch first sequence", description: "Pick a template or start blank" },
      ]}
    />
  );
}
