import { UsageCard } from "@/components/blocks/usage-card";
import { usage } from "@/lib/demo-data";

export default function Example() {
  return <UsageCard items={usage} className="w-full" />;
}
