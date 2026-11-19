"use client";

import { TrendingUp } from "lucide-react";
import { AreaChart } from "@/components/charts/area-chart";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { Delta, Metric } from "@/components/ui/metric";

const data = [
  { label: "Jan", value: 182000, previous: 140000 },
  { label: "Feb", value: 196000, previous: 151000 },
  { label: "Mar", value: 241000, previous: 158000 },
  { label: "Apr", value: 228000, previous: 172000 },
  { label: "May", value: 274000, previous: 181000 },
  { label: "Jun", value: 312000, previous: 196000 },
  { label: "Jul", value: 298000, previous: 204000 },
  { label: "Aug", value: 336000, previous: 215000 },
  { label: "Sep", value: 371000, previous: 232000 },
  { label: "Oct", value: 402000, previous: 248000 },
];

const usd = (n: number) => `$${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n)}`;

export default function Example() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader
        icon={
          <IconTile>
            <TrendingUp />
          </IconTile>
        }
        title="Pipeline created"
        description="Monthly, vs. same month last year"
      />
      <CardBody className="p-4">
        <Metric size="md" label="Year to date" value="$2.84M" delta={<Delta value={52} />} className="mb-4" />
        <AreaChart data={data} seriesLabel="This year" previousLabel="Last year" format={usd} />
      </CardBody>
    </Card>
  );
}
