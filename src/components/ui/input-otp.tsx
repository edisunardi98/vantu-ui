"use client";

import { type ClipboardEvent, type KeyboardEvent, useId, useRef, useState } from "react";
import { cx } from "@/utils/cx";

export interface InputOTPProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called once every slot is filled. */
  onComplete?: (value: string) => void;
  /** Visually split the slots in two groups (e.g. 3–3). */
  groupSize?: number;
  /** Digits only (default) or any character. */
  pattern?: "digits" | "alphanumeric";
  label?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  className?: string;
}

/** One-time code input: one box per character, auto-advance, backspace, arrow keys and paste. */
export function InputOTP({ length = 6, value, defaultValue = "", onChange, onComplete, groupSize, pattern = "digits", label = "Verification code", isInvalid, isDisabled, className }: InputOTPProps) {
  const [inner, setInner] = useState(defaultValue.slice(0, length));
  const code = (value ?? inner).padEnd(length, " ").slice(0, length);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const id = useId();
  const valid = (ch: string) => (pattern === "digits" ? /^\d$/.test(ch) : /^[a-z0-9]$/i.test(ch));

  const commit = (next: string) => {
    const trimmed = next.replace(/\s+$/, "");
    setInner(trimmed);
    onChange?.(trimmed);
    if (trimmed.length === length && !trimmed.includes(" ")) onComplete?.(trimmed);
  };
  const setAt = (i: number, ch: string) => commit(code.slice(0, i) + ch + code.slice(i + 1));
  const focus = (i: number) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus();

  const onKeyDown = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (code[i] !== " ") setAt(i, " ");
      else if (i > 0) {
        setAt(i - 1, " ");
        focus(i - 1);
      }
    } else if (e.key === "ArrowLeft") focus(i - 1);
    else if (e.key === "ArrowRight") focus(i + 1);
    else if (e.key.length === 1) {
      e.preventDefault();
      if (!valid(e.key)) return;
      setAt(i, pattern === "alphanumeric" ? e.key.toUpperCase() : e.key);
      focus(i + 1);
    }
  };

  const onPaste = (i: number) => (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const chars = [...e.clipboardData.getData("text")].filter(valid).map((c) => c.toUpperCase());
    if (!chars.length) return;
    let next = code;
    chars.slice(0, length - i).forEach((c, k) => (next = next.slice(0, i + k) + c + next.slice(i + k + 1)));
    commit(next);
    focus(i + chars.length);
  };

  return (
    <div role="group" aria-labelledby={`${id}-label`} className={cx("flex flex-col gap-2", className)}>
      <span id={`${id}-label`} className="sr-only">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {Array.from({ length }, (_, i) => (
          <span key={i} className="contents">
            {groupSize && i > 0 && i % groupSize === 0 && <span aria-hidden className="h-0.5 w-3 rounded-full bg-line-strong" />}
            <input
              ref={(el) => {
                refs.current[i] = el;
              }}
              inputMode={pattern === "digits" ? "numeric" : "text"}
              autoComplete={i === 0 ? "one-time-code" : "off"}
              aria-label={`${label}, character ${i + 1} of ${length}`}
              aria-invalid={isInvalid || undefined}
              disabled={isDisabled}
              value={code[i] === " " ? "" : code[i]}
              onChange={() => {}}
              onKeyDown={onKeyDown(i)}
              onPaste={onPaste(i)}
              onFocus={(e) => e.currentTarget.select()}
              className={cx(
                "size-11 rounded-md border bg-surface text-center text-xl font-medium tabular text-fg caret-accent outline-none transition-[border,box-shadow]",
                "focus:border-accent focus:shadow-focus disabled:bg-subtle disabled:text-fg-disabled",
                isInvalid ? "border-error focus:shadow-focus-error" : code[i] !== " " ? "border-fg-disabled" : "border-line-strong",
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
