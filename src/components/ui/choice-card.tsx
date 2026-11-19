"use client";

import type { ReactNode } from "react";
import { Radio, RadioGroup, type RadioGroupProps } from "react-aria-components";
import { cx } from "@/utils/cx";
import { Label } from "./field";

export interface ChoiceCardGroupProps extends Omit<RadioGroupProps, "className" | "children"> {
  label?: string;
  columns?: 1 | 2 | 3;
  className?: string;
  children: ReactNode;
}

/** Radio group rendered as selectable cards — for plans, roles and onboarding choices. */
export function ChoiceCardGroup({ label, columns = 1, className, children, ...props }: ChoiceCardGroupProps) {
  return (
    <RadioGroup {...props} className={cx("flex flex-col gap-2", className)}>
      {label && <Label>{label}</Label>}
      <div className={cx("grid gap-3", columns === 2 && "sm:grid-cols-2", columns === 3 && "sm:grid-cols-3")}>{children}</div>
    </RadioGroup>
  );
}

export interface ChoiceCardProps {
  value: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  /** Right-aligned extra, e.g. a price or badge. */
  meta?: ReactNode;
  isDisabled?: boolean;
}

export function ChoiceCard({ value, title, description, icon, meta, isDisabled }: ChoiceCardProps) {
  return (
    <Radio
      value={value}
      isDisabled={isDisabled}
      className={cx(
        "group flex cursor-default items-start gap-3 rounded-md bg-surface p-4 outline-none ring-1 ring-inset ring-line transition-[box-shadow,background]",
        "data-hovered:bg-subtle data-selected:bg-surface data-selected:shadow-[inset_0_0_0_1.5px_var(--color-accent),var(--shadow-card)] data-focus-visible:shadow-[inset_0_0_0_1.5px_var(--color-accent),var(--shadow-focus)]",
        "data-disabled:opacity-50",
      )}
    >
      {icon && (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-surface text-fg-secondary shadow-button group-data-selected:bg-accent-soft group-data-selected:text-accent group-data-selected:shadow-none [&_svg]:size-4">
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-base font-medium text-fg">{title}</span>
        {description && <span className="mt-0.5 block text-sm text-fg-secondary">{description}</span>}
      </span>
      {meta}
      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface group-data-selected:border-accent group-data-selected:bg-accent">
        <span className="size-1.5 scale-0 rounded-full bg-white transition-transform group-data-selected:scale-100" />
      </span>
    </Radio>
  );
}
