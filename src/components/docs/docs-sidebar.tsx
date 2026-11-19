"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/utils/cx";
import { DocsNav } from "./docs-nav";
import { SearchTrigger } from "./docs-search";
import { Logo } from "./logo";

/** Floating sidebar panel: logo, quick search and the collapsible tree navigation. */
export function DocsSidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const scroller = useRef<HTMLDivElement>(null);

  // Bring the active page into view when the sidebar mounts.
  useEffect(() => {
    scroller.current?.querySelector("[data-active]")?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div className={cx("flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-subtle shadow-card", className)}>
      <div className="flex flex-col gap-3 px-3 pb-3 pt-4">
        <div className="px-1.5">
          <Logo />
        </div>
        <SearchTrigger />
      </div>
      <div ref={scroller} className="relative flex-1 overflow-y-auto px-2 pb-6 [mask-image:linear-gradient(to_bottom,transparent,black_12px,black_calc(100%-24px),transparent)] pt-2">
        <DocsNav onNavigate={onNavigate} />
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-3 text-sm text-fg-muted">
        <span>v0.1 · Light</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-success" /> Vantu tokens
        </span>
      </div>
    </div>
  );
}
