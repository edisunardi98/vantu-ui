import { ScoreMeter } from "@/components/ui/score-meter";

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      <ScoreMeter score={92} />
      <ScoreMeter score={71} />
      <ScoreMeter score={43} />
    </div>
  );
}
