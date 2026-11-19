"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Input, TextField } from "react-aria-components";
import { cx } from "@/utils/cx";
import { Button } from "./button";

export interface AISearchProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called with the query on Enter or button press. */
  onSubmit?: (query: string) => void;
  placeholder?: string;
  actionLabel?: string;
  isPending?: boolean;
  className?: string;
}

/**
 * The one prominent control on AI screens. 64px tall, natural-language
 * query in 16 Regular, Large (44) primary action. States: empty · filled · focus.
 */
export function AISearch({
  value,
  defaultValue = "",
  onChange,
  onSubmit,
  placeholder = "Describe who you’re looking for — role, company type, size, location, signals…",
  actionLabel = "Find prospects",
  isPending,
  className,
}: AISearchProps) {
  const [inner, setInner] = useState(defaultValue);
  const query = value ?? inner;
  const submit = () => query.trim() && onSubmit?.(query.trim());

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className={cx(
        "group flex h-16 items-center gap-3 rounded-lg border border-line bg-surface pl-5 pr-2.5 shadow-card transition-[border,box-shadow]",
        "focus-within:border-accent focus-within:shadow-[var(--shadow-card),var(--shadow-focus)]",
        className,
      )}
    >
      <Sparkles aria-hidden className="size-4 shrink-0 text-accent" />
      <TextField
        aria-label="Describe who you’re looking for"
        value={query}
        onChange={(v) => {
          setInner(v);
          onChange?.(v);
        }}
        className="min-w-0 flex-1"
      >
        <Input placeholder={placeholder} className="h-10 w-full bg-transparent text-lg text-fg outline-none placeholder:text-fg-muted" />
      </TextField>
      <Button type="submit" variant="primary" size="lg" trailingIcon={<ArrowRight />} isPending={isPending} className="hidden sm:inline-flex">
        {actionLabel}
      </Button>
      <Button type="submit" variant="primary" iconOnly aria-label={actionLabel} isPending={isPending} className="sm:hidden">
        <ArrowRight />
      </Button>
    </form>
  );
}
