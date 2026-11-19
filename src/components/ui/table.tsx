"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type { ReactNode } from "react";
import {
  Cell as AriaCell,
  type CellProps,
  Column as AriaColumn,
  type ColumnProps,
  Row as AriaRow,
  type RowProps,
  Table as AriaTable,
  TableBody as AriaTableBody,
  type TableBodyProps,
  TableHeader as AriaTableHeader,
  type TableHeaderProps,
  type TableProps,
} from "react-aria-components";
import { cx } from "@/utils/cx";

/**
 * Base table, in the same language as every Vantu table: a rounded bg-subtle
 * header pill, 12px row padding and hairline separators between rows.
 * Wrap in <TableContainer> for horizontal scroll (and an optional panel).
 */
export function TableContainer({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx("overflow-hidden", className)}>
      {/* `relative` contains React Aria's absolutely positioned hidden inputs. */}
      <div className="relative overflow-x-auto">{children}</div>
    </div>
  );
}

export function Table({ className, ...props }: Omit<TableProps, "className"> & { className?: string }) {
  return <AriaTable {...props} className={cx("w-full border-separate border-spacing-0 text-base", className)} />;
}

export function TableHeader<T extends object>({ className, ...props }: Omit<TableHeaderProps<T>, "className"> & { className?: string }) {
  return <AriaTableHeader {...props} className={cx("bg-subtle", className)} />;
}

export function Column({ className, children, ...props }: Omit<ColumnProps, "className" | "children"> & { className?: string; children: ReactNode }) {
  return (
    <AriaColumn
      {...props}
      className={cx(
        "h-10 px-3 text-left text-sm font-normal text-fg-muted outline-none first:rounded-l-[10px] last:rounded-r-[10px] data-focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)]",
        props.allowsSorting && "cursor-default data-hovered:text-fg",
        className,
      )}
    >
      {({ allowsSorting, sortDirection }) => (
        <span className="inline-flex items-center gap-1">
          {children}
          {allowsSorting &&
            (sortDirection === "ascending" ? (
              <ArrowUp className="size-3 text-fg" aria-hidden />
            ) : sortDirection === "descending" ? (
              <ArrowDown className="size-3 text-fg" aria-hidden />
            ) : (
              <ChevronsUpDown className="size-3 text-fg-disabled" aria-hidden />
            ))}
        </span>
      )}
    </AriaColumn>
  );
}

export function TableBody<T extends object>({ className, ...props }: Omit<TableBodyProps<T>, "className"> & { className?: string }) {
  return <AriaTableBody {...props} className={className} />;
}

export function Row<T extends object>({ className, ...props }: Omit<RowProps<T>, "className"> & { className?: string }) {
  return (
    <AriaRow
      {...props}
      className={cx(
        "outline-none data-hovered:bg-subtle data-selected:bg-accent-soft/60 data-focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)] [&>td]:border-b [&>td]:border-line-subtle [&:last-child>td]:border-0",
        className,
      )}
    />
  );
}

export function Cell({ className, ...props }: Omit<CellProps, "className"> & { className?: string }) {
  return <AriaCell {...props} className={cx("px-3 py-3 text-fg outline-none data-focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)]", className)} />;
}
