import { ProspectsTable } from "@/components/blocks/prospects-table";
import { prospects } from "@/lib/demo-data";

export default function Example() {
  return <ProspectsTable rows={prospects} className="w-full" />;
}
