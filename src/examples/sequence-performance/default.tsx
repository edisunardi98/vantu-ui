import { SequencePerformance } from "@/components/blocks/sequence-performance";
import { sequences } from "@/lib/demo-data";

export default function Example() {
  return <SequencePerformance rows={sequences} className="w-full max-w-2xl" />;
}
