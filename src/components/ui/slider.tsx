"use client";

import {
  Label,
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";
import { cx } from "@/utils/cx";

export interface SliderProps<T extends number | number[]> extends Omit<AriaSliderProps<T>, "className" | "children"> {
  label?: string;
  /** Format the output; receives each thumb value. */
  format?: (v: number) => string;
  /** Show the value in a tooltip above each thumb instead of beside the label. */
  valueTooltip?: boolean;
  className?: string;
}

/** Single value or range (pass an array). 6px track, 16px thumb with accent ring. */
export function Slider<T extends number | number[]>({ label, format = String, valueTooltip, className, ...props }: SliderProps<T>) {
  return (
    <AriaSlider {...props} className={cx("flex w-full flex-col gap-3", className)}>
      {(label || !valueTooltip) && (
        <div className="flex items-center justify-between text-sm">
          {label && <Label className="font-medium text-fg">{label}</Label>}
          {!valueTooltip && (
            <SliderOutput className="tabular text-fg-secondary">
              {({ state }) => state.values.map((v) => format(v)).join(" – ")}
            </SliderOutput>
          )}
        </div>
      )}
      <SliderTrack className={cx("relative h-4 w-full", valueTooltip && "mt-7")}>
        {({ state }) => {
          const multi = state.values.length > 1;
          const start = multi ? state.getThumbPercent(0) : 0;
          const end = state.getThumbPercent(multi ? state.values.length - 1 : 0);
          return (
            <>
              <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-active" />
              <div className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent" style={{ left: `${start * 100}%`, width: `${(end - start) * 100}%` }} />
              {state.values.map((v, i) => (
                <SliderThumb
                  key={i}
                  index={i}
                  className={cx(
                    "top-1/2 size-4 rounded-full bg-white shadow-[0_0_0_1.5px_var(--color-accent),0_1px_3px_rgb(0_0_0/0.18)] outline-none transition-shadow",
                    "data-dragging:shadow-[0_0_0_1.5px_var(--color-accent),var(--shadow-focus)] data-focus-visible:shadow-[0_0_0_1.5px_var(--color-accent),var(--shadow-focus)]",
                  )}
                >
                  {valueTooltip && (
                    <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-inverse px-1.5 py-0.5 text-xs font-medium tabular text-white">
                      {format(v)}
                    </span>
                  )}
                </SliderThumb>
              ))}
            </>
          );
        }}
      </SliderTrack>
    </AriaSlider>
  );
}
