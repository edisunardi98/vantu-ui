import { CircularProgress, Gauge } from "@/components/ui/circular-progress";

export default function Example() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-5">
        <CircularProgress value={25} size={48} />
        <CircularProgress value={50} size={56} tone="success" />
        <CircularProgress value={75} size={64} tone="warning" />
        <CircularProgress value={100} size={72} label="Done" />
        <CircularProgress value={60} size={48} label={false} aria-label="Profile completion" />
      </div>
      <Gauge value={14} max={20} caption="out of 20" />
    </div>
  );
}
