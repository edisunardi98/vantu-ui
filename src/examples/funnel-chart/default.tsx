import { Funnel } from "lucide-react";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";

const data = [
  { label: "Discovered", value: 2372 },
  { label: "Qualified", value: 648 },
  { label: "Contacted", value: 512 },
  { label: "Replied", value: 118 },
  { label: "Meeting booked", value: 46 },
];

export default function Example() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader
        icon={
          <IconTile>
            <Funnel />
          </IconTile>
        }
        title="Prospecting funnel" description="Last 30 days" />
      <CardBody className="p-2">
        <FunnelChart data={data} />
      </CardBody>
    </Card>
  );
}
