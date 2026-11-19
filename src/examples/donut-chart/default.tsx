"use client";

import { ChartPie } from "lucide-react";
import { DonutChart } from "@/components/charts/donut-chart";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";

const data = [
  { label: "Outbound", value: 1240000 },
  { label: "Inbound", value: 860000 },
  { label: "Referral", value: 420000 },
  { label: "Events", value: 210000 },
  { label: "Partners", value: 110000 },
];

const usd = (n: number) => `$${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n)}`;

export default function Example() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader
        icon={
          <IconTile tone="teal">
            <ChartPie />
          </IconTile>
        }
        title="Pipeline by source" description="Open opportunities" />
      <CardBody className="p-4">
        <DonutChart data={data} format={usd} centerLabel="Open pipeline" />
      </CardBody>
    </Card>
  );
}
