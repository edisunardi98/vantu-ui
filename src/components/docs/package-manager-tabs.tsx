"use client";

import { useId, useState } from "react";
import { cx } from "@/utils/cx";
import { CopyButton } from "./copy-button";

export interface PackageCommand {
  id: string;
  label: string;
  code: string;
  /** Pre-highlighted HTML (shiki, rendered on the server). */
  html: string;
}

/** npm / pnpm / yarn switch over one install command, on the same shell as the code steps. */
export function PackageManagerTabs({ commands }: { commands: PackageCommand[] }) {
  const [active, setActive] = useState(commands[0]!.id);
  const id = useId();
  const cmd = commands.find((c) => c.id === active) ?? commands[0]!;

  return (
    <div className="rounded-[16px] border border-line bg-subtle p-1">
      <div role="tablist" aria-label="Package manager" className="flex gap-5 border-b border-line px-3">
        {commands.map((c) => (
          <button
            key={c.id}
            id={`${id}-${c.id}`}
            type="button"
            role="tab"
            aria-selected={active === c.id}
            aria-controls={`${id}-panel`}
            onClick={() => setActive(c.id)}
            className={cx(
              "-mb-px border-b-2 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:shadow-focus",
              active === c.id ? "border-accent text-fg" : "border-transparent text-fg-muted hover:text-fg",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="flex h-10 items-center justify-between pl-3 pr-1.5">
        <span className="font-mono text-sm text-fg-muted">terminal</span>
        <CopyButton value={cmd.code} className="bg-transparent shadow-none hover:bg-active" />
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${active}`}
        className="code overflow-x-auto rounded-[12px] border border-line bg-surface px-4 py-3.5 font-mono text-[13px] leading-[1.7] shadow-card"
        dangerouslySetInnerHTML={{ __html: cmd.html }}
      />
    </div>
  );
}
