import { Coins, Target } from "lucide-react";
import { RadialChart } from "@/components/charts/radial-chart";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";

export default function Example() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader icon={<IconTile><Target /></IconTile>} title="Meetings goal" description="November · day 19 of 30" />
        <CardBody className="p-4">
          <RadialChart value={42} max={60} target={38} label="Booked" caption="of 60 meetings" />
        </CardBody>
      </Card>
      <Card>
        <CardHeader icon={<IconTile tone="orange"><Coins /></IconTile>} title="Credits" description="Billing cycle" />
        <CardBody className="p-4">
          <RadialChart value={6400} max={10000} label="Used" caption="of 10,000 credits" />
        </CardBody>
      </Card>
    </div>
  );
}
