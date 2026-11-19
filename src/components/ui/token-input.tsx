"use client";

import { type KeyboardEvent, useId, useRef, useState } from "react";
import { cx } from "@/utils/cx";
import { Tag } from "./tag";

export interface TokenInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tokens: string[]) => void;
  label?: string;
  placeholder?: string;
  /** Return false to reject a token (e.g. invalid email). */
  validate?: (token: string) => boolean;
  max?: number;
  className?: string;
}

/** Free-form multi-value input: Enter, comma or paste creates tokens; Backspace removes the last one. */
export function TokenInput({ value, defaultValue = [], onChange, label, placeholder = "Add…", validate, max, className }: TokenInputProps) {
  const [inner, setInner] = useState(defaultValue);
  const tokens = value ?? inner;
  const [draft, setDraft] = useState("");
  const [invalid, setInvalid] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();

  const update = (next: string[]) => {
    setInner(next);
    onChange?.(next);
  };
  const add = (raw: string) => {
    const parts = raw
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
    const ok = parts.filter((p) => !tokens.includes(p) && (!validate || validate(p)));
    setInvalid(parts.length > ok.length && parts.some((p) => validate && !validate(p)));
    if (!ok.length) return false;
    update([...tokens, ...ok].slice(0, max ?? Infinity));
    return true;
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && draft.trim()) {
      e.preventDefault();
      if (add(draft)) setDraft("");
    } else if (e.key === "Backspace" && !draft && tokens.length) {
      update(tokens.slice(0, -1));
    }
  };
  const full = max !== undefined && tokens.length >= max;

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
      )}
      <div
        onClick={() => input.current?.focus()}
        className={cx(
          "flex min-h-10 cursor-text flex-wrap items-center gap-1.5 rounded-md border bg-surface px-2 py-1.5 transition-[border,box-shadow]",
          invalid ? "border-error focus-within:shadow-focus-error" : "border-line-strong focus-within:border-accent focus-within:shadow-focus",
        )}
      >
        {tokens.map((t) => (
          <Tag key={t} variant="gray" onRemove={() => update(tokens.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
        {!full && (
          <input
            ref={input}
            id={id}
            value={draft}
            placeholder={tokens.length ? "" : placeholder}
            aria-invalid={invalid || undefined}
            onChange={(e) => {
              setDraft(e.target.value);
              setInvalid(false);
            }}
            onKeyDown={onKeyDown}
            onPaste={(e) => {
              const text = e.clipboardData.getData("text");
              if (/[,\n]/.test(text)) {
                e.preventDefault();
                add(text);
              }
            }}
            onBlur={() => draft.trim() && add(draft) && setDraft("")}
            className="h-7 min-w-24 flex-1 bg-transparent px-1 text-base outline-none placeholder:text-fg-muted"
          />
        )}
      </div>
      {invalid && <p className="text-sm text-error-text">That doesn’t look valid.</p>}
    </div>
  );
}
