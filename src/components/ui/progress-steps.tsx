import { CheckCircle2, Loader2 } from "lucide-react";
import { cx } from "@/utils/cx";

export type StepStatus = "done" | "active" | "pending";

export interface ProgressStep {
  label: string;
  status: StepStatus;
  /** Running count, e.g. "1,946 of ~2,400". */
  meta?: string;
}

/** Named AI steps: Done (green check) · Active (accent loader) · Pending (dashed circle). */
export function ProgressSteps({ steps, className }: { steps: ProgressStep[]; className?: string }) {
  return (
    <ol className={cx("flex flex-col gap-3", className)}>
      {steps.map((s) => (
        <li key={s.label} className="flex items-center gap-2.5 text-base" aria-current={s.status === "active" ? "step" : undefined}>
          {s.status === "done" && <CheckCircle2 aria-label="Done" className="size-4 shrink-0 text-success" />}
          {s.status === "active" && <Loader2 aria-label="In progress" className="size-4 shrink-0 animate-spin text-accent" />}
          {s.status === "pending" && <span aria-label="Pending" className="size-4 shrink-0 rounded-full border border-dashed border-fg-disabled" />}
          <span className={cx("flex-1", s.status === "active" ? "font-medium text-fg" : s.status === "done" ? "text-fg-secondary" : "text-fg-muted")}>{s.label}</span>
          {s.meta && <span className="text-sm tabular text-fg-muted">{s.meta}</span>}
        </li>
      ))}
    </ol>
  );
}
