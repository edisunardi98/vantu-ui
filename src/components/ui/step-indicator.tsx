import { Check, ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { cx } from "@/utils/cx";

export interface Step {
  label: string;
  description?: string;
}

function Marker({ index, state }: { index: number; state: "done" | "current" | "upcoming" }) {
  return (
    <span
      className={cx(
        "flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular",
        state === "done" && "bg-success text-white",
        state === "current" && "bg-linear-to-b from-accent-light to-accent text-white shadow-button-primary",
        state === "upcoming" && "bg-surface text-fg-muted ring-1 ring-inset ring-line-strong",
      )}
    >
      {state === "done" ? <Check className="size-3" strokeWidth={3} aria-hidden /> : index + 1}
    </span>
  );
}

export interface StepIndicatorProps {
  steps: Step[];
  /** Zero-based index of the current step. */
  current: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/** Numbered steps. Horizontal for headers (chevron separators), vertical for side panels. */
export function StepIndicator({ steps, current, orientation = "horizontal", className }: StepIndicatorProps) {
  const state = (i: number) => (i < current ? "done" : i === current ? "current" : "upcoming");
  if (orientation === "vertical") {
    return (
      <ol className={cx("flex flex-col", className)}>
        {steps.map((s, i) => (
          <li key={s.label} aria-current={i === current ? "step" : undefined} className="relative flex gap-3 pb-6 last:pb-0">
            {i < steps.length - 1 && (
              <span aria-hidden className={cx("absolute bottom-1 left-[9.5px] top-6 w-px", i < current ? "bg-success" : "bg-line")} />
            )}
            <Marker index={i} state={state(i)} />
            <div className="-mt-px">
              <div className={cx("text-base font-medium", i <= current ? "text-fg" : "text-fg-muted")}>{s.label}</div>
              {s.description && <div className="mt-0.5 text-sm text-fg-muted">{s.description}</div>}
            </div>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className={cx("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {steps.map((s, i) => (
        <Fragment key={s.label}>
          {i > 0 && (
            <li aria-hidden>
              <ChevronRight className="size-4 text-fg-disabled" />
            </li>
          )}
          <li aria-current={i === current ? "step" : undefined} className="flex items-center gap-2">
            <Marker index={i} state={state(i)} />
            <span className={cx("text-base", i === current ? "font-medium text-fg" : i < current ? "text-fg" : "text-fg-muted")}>{s.label}</span>
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

/** Dot stepper for carousels and short flows. */
export function StepperDots({ count, current, onChange, className }: { count: number; current: number; onChange?: (i: number) => void; className?: string }) {
  return (
    <div role="tablist" aria-label="Slides" className={cx("flex items-center gap-1.5", className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === current}
          aria-label={`Slide ${i + 1}`}
          onClick={() => onChange?.(i)}
          className={cx(
            "h-1.5 rounded-full outline-none transition-all focus-visible:shadow-focus",
            i === current ? "w-5 bg-accent" : "w-1.5 bg-line-strong hover:bg-fg-disabled",
          )}
        />
      ))}
    </div>
  );
}
