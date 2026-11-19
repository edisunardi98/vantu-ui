import { Trophy } from "lucide-react";
import { BarChart } from "@/components/charts/bar-chart";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";

const data = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((label, i) => ({
  label,
  deals: [12, 15, 14, 19, 22, 18, 24, 27, 25, 31, 29, 34][i]!,
}));

export default function Example() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader
        icon={
          <IconTile tone="orange">
            <Trophy />
          </IconTile>
        }
        title="Deals won"
        description="Per month, this year"
      />
      <CardBody className="p-4">
        <BarChart data={data} series={[{ key: "deals", label: "Deals won" }]} />
      </CardBody>
    </Card>
  );
}
