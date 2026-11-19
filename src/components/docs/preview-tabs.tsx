"use client";

import { Code2, Eye } from "lucide-react";
import { type ReactNode, useId, useState } from "react";
import { EVENTS, track } from "@/lib/analytics";
import { cx } from "@/utils/cx";
import { CopyButton } from "./copy-button";

export interface PreviewTabsProps {
  preview: ReactNode;
  /** Rendered code (a <CodeBlock hideCopy />). */
  code: ReactNode;
  /** Source text the Copy button puts on the clipboard. */
  copy: string;
  /** Wide blocks and templates: less padding, horizontal scroll. */
  fullBleed?: boolean;
  /** No padding at all (e.g. a scaled template frame). */
  flush?: boolean;
  /** Extra toolbar items, shown before Copy (e.g. "Open full screen"). */
  actions?: ReactNode;
}

/**
 * Preview / Code switch on a bare toolbar with a Copy button on the right,
 * above one clean rounded panel. Used on every component, block, chart and
 * template page.
 */
export function PreviewTabs({ preview, code, copy, fullBleed, flush, actions }: PreviewTabsProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const id = useId();

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <div role="tablist" aria-label="View" className="flex items-center gap-1">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              id={`${id}-${t}-tab`}
              type="button"
              role="tab"
              aria-selected={tab === t}
              aria-controls={`${id}-${t}`}
              onClick={() => {
                if (t !== tab) track(EVENTS.previewTab, { tab: t });
                setTab(t);
              }}
              className={cx(
                "inline-flex h-8 items-center gap-1.5 rounded-sm border px-2.5 text-sm font-medium capitalize outline-none transition-colors focus-visible:shadow-focus",
                tab === t ? "border-line bg-surface text-fg shadow-button" : "border-transparent text-fg-muted hover:text-fg",
              )}
            >
              {t === "preview" ? <Eye className="size-3.5" /> : <Code2 className="size-3.5" />}
              {t}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {actions}
          <CopyButton value={copy} label />
        </div>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-line bg-surface">
        <div id={`${id}-preview`} role="tabpanel" aria-labelledby={`${id}-preview-tab`} hidden={tab !== "preview"}>
          {flush ? (
            preview
          ) : (
            <div className={cx("flex min-h-64 items-center justify-center", fullBleed ? "overflow-x-auto p-4 sm:p-6" : "p-6 sm:p-10")}>{preview}</div>
          )}
        </div>
        <div
          id={`${id}-code`}
          role="tabpanel"
          aria-labelledby={`${id}-code-tab`}
          hidden={tab !== "code"}
          className="[&>div]:rounded-none [&>div]:border-0"
        >
          {code}
        </div>
      </div>
    </div>
  );
}
