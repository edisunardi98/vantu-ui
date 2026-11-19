import { CalendarCheck } from "lucide-react";
import { BarChart } from "@/components/charts/bar-chart";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";

const data = [
  { label: "Mon", booked: 14, held: 11 },
  { label: "Tue", booked: 22, held: 19 },
  { label: "Wed", booked: 26, held: 21 },
  { label: "Thu", booked: 24, held: 22 },
  { label: "Fri", booked: 17, held: 12 },
];

export default function Example() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader
        icon={
          <IconTile>
            <CalendarCheck />
          </IconTile>
        }
        title="Meetings this week" description="Booked vs. held, by weekday" />
      <CardBody className="p-4">
        <BarChart
          data={data}
          series={[
            { key: "booked", label: "Booked" },
            { key: "held", label: "Held" },
          ]}
        />
      </CardBody>
    </Card>
  );
}
