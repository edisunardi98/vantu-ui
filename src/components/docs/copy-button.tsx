"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { EVENTS, track } from "@/lib/analytics";
import { cx } from "@/utils/cx";

/**
 * Copies `value` to the clipboard. Icon-only by default; with `label` it is a
 * soft pill reading "Copy" / "Copied" (used in the preview toolbar).
 */
export function CopyButton({ value, label, className }: { value: string; label?: boolean; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={label ? undefined : copied ? "Copied" : "Copy to clipboard"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          const firstLine = value.trimStart().split("\n")[0] ?? "";
          track(EVENTS.copyCode, {
            copy_kind: /^(npx|npm|pnpm|yarn)\b/.test(firstLine) ? "command" : /^https?:\/\//.test(firstLine) ? "url" : "code",
            snippet: firstLine.slice(0, 100),
          });
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className={cx(
        "inline-flex items-center justify-center outline-none transition-colors focus-visible:shadow-focus",
        label
          ? "h-8 gap-1.5 rounded-sm bg-muted px-2.5 text-sm font-medium text-fg-secondary hover:bg-active hover:text-fg"
          : "size-7 rounded-sm bg-surface text-fg-muted shadow-button hover:text-fg",
        className,
      )}
    >
      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
      {label && <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>}
    </button>
  );
}
