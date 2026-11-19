import { Badge } from "@/components/ui/badge";

const tones = ["neutral", "accent", "info", "success", "warning", "error"] as const;

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {tones.map((t) => (
          <Badge key={t} tone={t}>Enterprise</Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {tones.map((t) => (
          <Badge key={t} tone={t} variant="dot">Enterprise</Badge>
        ))}
      </div>
    </div>
  );
}
