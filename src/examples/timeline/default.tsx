import { Eye, MailOpen, Send } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";

export default function Example() {
  return (
    <Timeline
      className="w-full max-w-md"
      items={[
        { id: "1", icon: <Eye />, title: "Sarah Chen opened “Scaling outbound without adding headcount”", meta: "2h ago · Series B — VP Sales · Step 1" },
        { id: "2", icon: <MailOpen />, title: "Sarah Chen clicked the case study link", meta: "1h ago · Series B — VP Sales · Step 1" },
        { id: "3", icon: <Send />, title: "Step 2 scheduled for Thu, 9:00 AM", meta: "Automated" },
      ]}
    />
  );
}
