"use client";

import type { ReactNode } from "react";
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
  type TabsProps,
} from "react-aria-components";
import { cx } from "@/utils/cx";

export function Tabs({ className, ...props }: Omit<TabsProps, "className"> & { className?: string }) {
  return <AriaTabs {...props} className={cx("flex flex-col", className)} />;
}

export function TabList<T extends object>({ className, ...props }: Omit<TabListProps<T>, "className"> & { className?: string }) {
  return <AriaTabList {...props} className={cx("flex gap-6 border-b border-line", className)} />;
}

/** Underline tab — 2px text-primary indicator on the selected tab. */
export function Tab({ className, children, ...props }: Omit<TabProps, "className" | "children"> & { className?: string; children: ReactNode }) {
  return (
    <AriaTab
      {...props}
      className={cx(
        "relative -mb-px flex h-10 cursor-default items-center gap-2 border-b-2 border-transparent text-base font-medium text-fg-secondary outline-none transition-colors",
        "data-hovered:text-fg data-selected:border-fg data-selected:text-fg data-focus-visible:rounded-xs data-focus-visible:shadow-focus",
        className,
      )}
    >
      {children}
    </AriaTab>
  );
}

export function TabPanel({ className, ...props }: Omit<TabPanelProps, "className"> & { className?: string }) {
  return <AriaTabPanel {...props} className={cx("pt-4 outline-none", className)} />;
}
