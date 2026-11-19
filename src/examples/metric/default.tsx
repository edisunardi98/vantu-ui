import { Delta, Metric, Sparkbars } from "@/components/ui/metric";

export default function Example() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex gap-4">
        <Delta value={18} />
        <Delta value={-4} />
        <Delta value={0}>0%</Delta>
      </div>
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        <Metric className="bg-surface p-5" label="Prospects discovered" value="1,284" delta={<Delta value={18} />} caption="vs. prior 7 days" aside={<Sparkbars values={[3, 5, 4, 6, 5, 7, 8]} />} />
        <Metric className="bg-surface p-5" label="Bounce rate" value="2.1%" delta={<Delta value={-4} invert />} caption="vs. prior 7 days" />
        <Metric className="bg-surface p-5" label="Meetings booked" value="20" delta={<Delta value={0}>0%</Delta>} caption="vs. prior 7 days" />
      </div>
    </div>
  );
}
