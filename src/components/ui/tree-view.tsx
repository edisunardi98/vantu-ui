"use client";

import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import type { ReactNode } from "react";
import { Button as AriaButton, Tree as AriaTree, TreeItem as AriaTreeItem, TreeItemContent, type TreeProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export function TreeView<T extends object>({ className, ...props }: Omit<TreeProps<T>, "className"> & { className?: string }) {
  return <AriaTree {...props} className={cx("flex flex-col gap-px outline-none", className)} />;
}

export interface TreeViewItemProps {
  id: string;
  label: string;
  /** Overrides the default folder/file icon. */
  icon?: ReactNode;
  /** Right-aligned meta, e.g. a count. */
  meta?: ReactNode;
  children?: ReactNode;
}

/** Nested item with an expand chevron. Folders get open/closed icons automatically. */
export function TreeViewItem({ id, label, icon, meta, children }: TreeViewItemProps) {
  return (
    <AriaTreeItem
      id={id}
      textValue={label}
      className="group cursor-default rounded-sm text-base text-fg-secondary outline-none data-hovered:bg-muted data-hovered:text-fg data-selected:bg-accent-soft data-selected:text-accent-text data-focus-visible:shadow-focus"
    >
      <TreeItemContent>
        {({ hasChildItems, isExpanded, level }) => (
          <div className="flex h-8 items-center gap-1.5 pr-2" style={{ paddingLeft: (level - 1) * 18 + 6 }}>
            {hasChildItems ? (
              <AriaButton slot="chevron" className="inline-flex size-5 shrink-0 items-center justify-center rounded-[4px] text-fg-muted outline-none data-hovered:bg-active">
                <ChevronRight className={cx("size-3.5 transition-transform", isExpanded && "rotate-90")} aria-hidden />
              </AriaButton>
            ) : (
              <span className="size-5 shrink-0" />
            )}
            <span className="shrink-0 text-fg-muted group-data-selected:text-accent [&_svg]:size-4">
              {icon ?? (hasChildItems ? isExpanded ? <FolderOpen /> : <Folder /> : <File />)}
            </span>
            <span className="flex-1 truncate">{label}</span>
            {meta && <span className="text-sm tabular text-fg-muted">{meta}</span>}
          </div>
        )}
      </TreeItemContent>
      {children}
    </AriaTreeItem>
  );
}
