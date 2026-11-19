import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tones = ["neutral", "accent", "info", "success", "warning", "error"] as const;

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {tones.map((t) => (
          <Badge key={t} tone={t} variant="solid">Solid</Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {tones.map((t) => (
          <Badge key={t} tone={t} variant="outline">Outline</Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge size="sm" tone="success" icon={<Check />}>Small</Badge>
        <Badge size="sm" tone="accent" variant="solid">New</Badge>
        <Badge size="sm" variant="dot" tone="warning">Pending</Badge>
      </div>
    </div>
  );
}
