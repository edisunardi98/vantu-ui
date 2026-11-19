import { AIInsight } from "@/components/ui/ai-insight";

export default function Example() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <AIInsight
        meta="Updated 2h ago"
        headline="Strong fit — 92% ICP match"
        reason="Recently raised a Series B and opened 6 SDR roles — outbound capacity is a stated priority."
      />
      <AIInsight compact headline="Strong fit — 92% ICP match" reason="Recently raised a Series B and opened 6 SDR roles" />
    </div>
  );
}
