import { Users } from "lucide-react";
import { HorizontalBarChart } from "@/components/charts/horizontal-bar-chart";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";

const data = [
  { label: "Sarah Chen", meta: "Enterprise", value: 48 },
  { label: "Daniel Brooks", meta: "Mid-market", value: 41 },
  { label: "Aisha Bello", meta: "Enterprise", value: 37 },
  { label: "Oliver Grant", meta: "SMB", value: 29 },
  { label: "Samuel Ortiz", meta: "Mid-market", value: 22 },
  { label: "Ryan Walsh", meta: "SMB", value: 18 },
];

export default function Example() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader
        icon={
          <IconTile>
            <Users />
          </IconTile>
        }
        title="Meetings booked by rep" description="Quarter to date · top 3 highlighted" />
      <CardBody className="p-2">
        <HorizontalBarChart data={data} valueLabel="Meetings booked" highlightTop={3} />
      </CardBody>
    </Card>
  );
}
