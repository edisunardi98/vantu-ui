"use client";

import { Reply } from "lucide-react";
import { LineChart } from "@/components/charts/line-chart";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { SegmentedControl } from "@/components/ui/segmented-control";

const data = [
  { label: "W1", outbound: 6.2, inbound: 9.8, referral: 14.1 },
  { label: "W2", outbound: 6.8, inbound: 10.4, referral: 13.2 },
  { label: "W3", outbound: 7.4, inbound: 9.6, referral: 15.8 },
  { label: "W4", outbound: 8.1, inbound: 11.2, referral: 16.4 },
  { label: "W5", outbound: 7.9, inbound: 12.6, referral: 15.1 },
  { label: "W6", outbound: 9.2, inbound: 12.1, referral: 17.3 },
  { label: "W7", outbound: 10.4, inbound: 13.4, referral: 18.2 },
  { label: "W8", outbound: 11.1, inbound: 13.9, referral: 17.6 },
];

export default function Example() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader
        icon={
          <IconTile tone="teal">
            <Reply />
          </IconTile>
        }
        title="Reply rate by channel"
        description="Last 8 weeks"
        actions={
          <SegmentedControl
            aria-label="Range"
            size="sm"
            defaultValue="8w"
            options={[
              { id: "4w", label: "4W" },
              { id: "8w", label: "8W" },
              { id: "q", label: "QTD" },
            ]}
          />
        }
      />
      <CardBody className="p-4">
        <LineChart
          data={data}
          series={[
            { key: "referral", label: "Referral" },
            { key: "inbound", label: "Inbound" },
            { key: "outbound", label: "Outbound" },
          ]}
          format={(n) => `${n}%`}
        />
      </CardBody>
    </Card>
  );
}
