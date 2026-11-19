import { cx } from "@/utils/cx";

export interface ScoreMeterProps {
  /** 0–100. Level = round(score / 10). */
  score: number;
  showValue?: boolean;
  className?: string;
}

/** Temperature tier: ≥ 80 hot (green), 60–79 warm (amber), < 60 cold (gray). */
export function scoreTier(score: number): "hot" | "warm" | "cold" {
  if (score >= 80) return "hot";
  if (score >= 60) return "warm";
  return "cold";
}

const tierColor = { hot: "bg-success", warm: "bg-warning", cold: "bg-fg-muted" };

/** AI score as 10 ticks (4 × 16, 4px gap) + value. */
export function ScoreMeter({ score, showValue = true, className }: ScoreMeterProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const level = Math.round(clamped / 10);
  const tier = scoreTier(clamped);
  return (
    <div className={cx("inline-flex items-center gap-2", className)} role="meter" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} aria-label="AI score">
      <div className="flex gap-1" aria-hidden>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={cx("h-4 w-1 rounded-[1px]", i < level ? tierColor[tier] : "bg-chart-neutral-soft")} />
        ))}
      </div>
      {showValue && <span className="w-6 text-base font-medium tabular text-fg">{clamped}</span>}
    </div>
  );
}
