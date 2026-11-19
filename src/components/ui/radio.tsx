"use client";

import type { ReactNode } from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  type RadioProps as AriaRadioProps,
} from "react-aria-components";
import { cx } from "@/utils/cx";
import { Label } from "./field";

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, "children" | "className"> {
  label?: string;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({ label, children, className, ...props }: RadioGroupProps) {
  return (
    <AriaRadioGroup {...props} className={cx("flex flex-col gap-2", className)}>
      {label && <Label>{label}</Label>}
      <div className="flex flex-col gap-2.5 group-data-[orientation=horizontal]:flex-row">{children}</div>
    </AriaRadioGroup>
  );
}

/** 16px radio. Selected state shows a 6px white dot on accent. */
export function Radio({ children, className, ...props }: AriaRadioProps & { children?: ReactNode; className?: string }) {
  return (
    <AriaRadio {...props} className={cx("group flex cursor-default items-center gap-2 text-base text-fg data-disabled:text-fg-disabled", className)}>
      <span
        className={cx(
          "flex size-4 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface transition-colors",
          "group-data-hovered:border-fg-disabled group-data-focus-visible:shadow-focus",
          "group-data-selected:border-accent group-data-selected:bg-accent",
          "group-data-disabled:border-line group-data-disabled:bg-muted",
        )}
      >
        <span className="size-1.5 scale-0 rounded-full bg-white transition-transform group-data-selected:scale-100" />
      </span>
      {children}
    </AriaRadio>
  );
}
