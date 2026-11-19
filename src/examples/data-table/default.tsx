import { Users } from "lucide-react";
import { ProspectsDataTable } from "@/components/blocks/prospects-data-table";
import { IconTile } from "@/components/ui/card";
import { prospectRecords } from "@/lib/demo-data";

export default function Example() {
  return (
    <ProspectsDataTable
      rows={prospectRecords}
      className="w-full"
      icon={
        <IconTile>
          <Users />
        </IconTile>
      }
      title="All prospects"
      description="AI-scored and synced from your CRM"
    />
  );
}
