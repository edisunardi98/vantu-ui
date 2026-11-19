import { Send } from "lucide-react";
import { BarChart } from "@/components/charts/bar-chart";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";

const data = [
  { label: "Jun", email: 412, linkedin: 186, calls: 94 },
  { label: "Jul", email: 468, linkedin: 214, calls: 102 },
  { label: "Aug", email: 501, linkedin: 248, calls: 88 },
  { label: "Sep", email: 556, linkedin: 290, calls: 121 },
  { label: "Oct", email: 610, linkedin: 322, calls: 134 },
  { label: "Nov", email: 584, linkedin: 351, calls: 142 },
];

export default function Example() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader
        icon={
          <IconTile tone="rose">
            <Send />
          </IconTile>
        }
        title="Touches by channel" description="Total outreach per month" />
      <CardBody className="p-4">
        <BarChart
          layout="stacked"
          data={data}
          series={[
            { key: "email", label: "Email" },
            { key: "linkedin", label: "LinkedIn" },
            { key: "calls", label: "Calls" },
          ]}
        />
      </CardBody>
    </Card>
  );
}
