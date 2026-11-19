import { Clock } from "lucide-react";
import { Heatmap } from "@/components/charts/heatmap";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p"];

// Replies received per hour slot — peaks mid-morning, Tue–Thu.
const values = days.map((_, d) =>
  hours.map((_, h) => {
    if (d >= 5) return Math.max(0, Math.round(2 - Math.abs(h - 4) * 0.4));
    const morning = 14 * Math.exp(-((h - 3) ** 2) / 4);
    const afternoon = 8 * Math.exp(-((h - 8) ** 2) / 5);
    const weekday = [0.8, 1.1, 1.2, 1.05, 0.6][d]!;
    return Math.round((morning + afternoon + 1) * weekday);
  }),
);

export default function Example() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader
        icon={
          <IconTile tone="rose">
            <Clock />
          </IconTile>
        }
        title="When prospects reply" description="Replies by weekday and hour, last 90 days" />
      <CardBody className="p-4">
        <Heatmap rows={days} columns={hours} values={values} valueLabel="Replies" />
      </CardBody>
    </Card>
  );
}
