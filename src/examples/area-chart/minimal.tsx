import { Mail } from "lucide-react";
import { AreaChart } from "@/components/charts/area-chart";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";

const data = Array.from({ length: 30 }, (_, i) => ({
  label: `${i + 1}`,
  value: Math.round(120 + i * 6 + Math.sin(i / 2) * 28 + (i % 7 === 5 || i % 7 === 6 ? -60 : 0)),
}));

export default function Example() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader
        icon={
          <IconTile tone="teal">
            <Mail />
          </IconTile>
        }
        title="Emails sent"
        description="Daily, last 30 days"
      />
      <CardBody className="p-4">
        <AreaChart data={data} seriesLabel="Emails sent" labelEvery={5} />
      </CardBody>
    </Card>
  );
}
