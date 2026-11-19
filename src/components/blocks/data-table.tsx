"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
import {
  Cell,
  Column,
  type Key,
  Row,
  type Selection,
  type SortDescriptor,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Counter } from "@/components/ui/counter";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Tab, TabList, Tabs } from "@/components/ui/tabs";
import { cx } from "@/utils/cx";

export interface DataTableColumn<T> {
  id: string;
  label: string;
  /** Renders the cell for a row. */
  cell: (row: T) => ReactNode;
  /** Makes the column sortable by this value. */
  sortValue?: (row: T) => string | number;
  /** The column that names the row (one per table). */
  isRowHeader?: boolean;
  /** Keep the header for screen readers only (e.g. a row-actions column). */
  hideLabel?: boolean;
  align?: "left" | "right";
  className?: string;
}

export interface DataTableView<T> {
  id: string;
  label: string;
  filter: (row: T) => boolean;
}

export interface DataTableProps<T extends { id: string }> {
  rows: T[];
  columns: DataTableColumn<T>[];
  /** Saved-view tabs with live counts. Omit for no tabs. */
  views?: DataTableView<T>[];
  /** Text the search box matches against. Omit to hide search. */
  searchText?: (row: T) => string;
  searchPlaceholder?: string;
  /** Filter buttons next to search (e.g. <FilterButton>, <AddFilterButton>). */
  filters?: ReactNode;
  /** Buttons on the right of the toolbar (e.g. Columns, Export). */
  toolbarActions?: ReactNode;
  /** Shown in the selection bar when rows are selected. Omit to disable selection. */
  bulkActions?: ReactNode;
  defaultSort?: SortDescriptor;
  pageSize?: number;
  /** Plural noun for the pagination summary, e.g. "prospects". */
  itemLabel?: string;
  /** Minimum table width before it scrolls horizontally. */
  minWidth?: number;
  /** Optional card header. Leave it out under a page header that already names the view. */
  title?: ReactNode;
  description?: ReactNode;
  /** An <IconTile>. */
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

function SortIcon({ direction }: { direction?: "ascending" | "descending" }) {
  if (!direction) return <ChevronsUpDown aria-hidden className="size-3 text-fg-disabled" />;
  return direction === "ascending" ? <ArrowUp aria-hidden className="size-3 text-fg" /> : <ArrowDown aria-hidden className="size-3 text-fg" />;
}

// Same table language as every Vantu table: rounded bg-subtle header pill, 12px rows, hairline separators.
const th = "h-10 px-3 text-left text-sm font-normal text-fg-muted outline-none first:rounded-l-[10px] last:rounded-r-[10px] data-focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)]";

/**
 * Generic data table: saved-view tabs → toolbar (search, filters · actions) →
 * selection bar with bulk actions → sortable, selectable table → pagination.
 * Columns, views and actions come in as props, so the same block serves
 * prospects, deals, members or any list.
 */
export function DataTable<T extends { id: string }>({
  rows,
  columns,
  views,
  searchText,
  searchPlaceholder = "Search",
  filters,
  toolbarActions,
  bulkActions,
  defaultSort,
  pageSize = 6,
  itemLabel = "rows",
  minWidth = 640,
  title,
  description,
  icon,
  actions,
  className,
}: DataTableProps<T>) {
  const [view, setView] = useState<Key>(views?.[0]?.id ?? "all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Selection>(new Set());
  const [sort, setSort] = useState<SortDescriptor | undefined>(defaultSort);
  const [page, setPage] = useState(1);
  const selectable = bulkActions !== undefined;

  const filtered = useMemo(() => {
    const v = views?.find((x) => x.id === view);
    const q = query.trim().toLowerCase();
    const list = rows.filter((r) => (!v || v.filter(r)) && (!q || !searchText || searchText(r).toLowerCase().includes(q)));
    const col = columns.find((c) => c.id === sort?.column);
    if (!col?.sortValue) return list;
    const dir = sort?.direction === "ascending" ? 1 : -1;
    return [...list].sort((a, b) => {
      const x = col.sortValue!(a);
      const y = col.sortValue!(b);
      return (typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y))) * dir;
    });
  }, [rows, views, view, query, searchText, columns, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize);
  const selectedCount = selected === "all" ? filtered.length : selected.size;
  const from = filtered.length ? (current - 1) * pageSize + 1 : 0;

  const resetPaging = () => {
    setPage(1);
    setSelected(new Set());
  };

  return (
    <Card className={cx("min-w-0", className)}>
      {title && <CardHeader icon={icon} title={title} description={description} actions={actions} />}
      <CardBody className="flex min-w-0 flex-col gap-4 p-4">
        {views && (
          <Tabs
            className="min-w-0"
            selectedKey={view}
            onSelectionChange={(k) => {
              setView(k);
              resetPaging();
            }}
          >
            <TabList aria-label="Saved views" className="overflow-x-auto">
              {views.map((v) => (
                <Tab key={v.id} id={v.id}>
                  {v.label} <Counter>{rows.filter(v.filter).length}</Counter>
                </Tab>
              ))}
            </TabList>
          </Tabs>
        )}

        {(searchText || filters || toolbarActions) && (
          <div className="flex flex-wrap items-center gap-2">
            {searchText && (
              <Input
                aria-label={searchPlaceholder}
                placeholder={searchPlaceholder}
                icon={<Search />}
                value={query}
                onChange={(v) => {
                  setQuery(v);
                  resetPaging();
                }}
                className="w-full sm:w-60"
              />
            )}
            {filters}
            {toolbarActions && <div className="ml-auto flex gap-2">{toolbarActions}</div>}
          </div>
        )}

        {selectable && selectedCount > 0 && (
          <div role="region" aria-label="Bulk actions" className="flex flex-wrap items-center gap-2 rounded-md border border-accent-soft-border bg-accent-soft py-1.5 pl-4 pr-1.5">
            <span className="flex-1 text-base font-medium text-fg">{selectedCount} selected</span>
            {bulkActions}
          </div>
        )}

        {/* `relative` contains React Aria's visually-hidden checkbox inputs, which are absolutely positioned. */}
        <div className="relative overflow-x-auto">
          <Table
            aria-label={typeof title === "string" ? title : itemLabel}
            selectionMode={selectable ? "multiple" : "none"}
            selectedKeys={selected}
            onSelectionChange={setSelected}
            sortDescriptor={sort}
            onSortChange={setSort}
            className="w-full border-separate border-spacing-0 text-base"
            style={{ minWidth }}
          >
            <TableHeader className="bg-subtle">
              {[
                ...(selectable
                  ? [
                      <Column key="__select" className={cx(th, "w-10 pl-3")}>
                        <Checkbox slot="selection" />
                      </Column>,
                    ]
                  : []),
                ...columns.map((c) => (
                  <Column
                    key={c.id}
                    id={c.id}
                    isRowHeader={c.isRowHeader}
                    allowsSorting={!!c.sortValue}
                    className={cx(th, c.sortValue && "cursor-default", c.align === "right" && "text-right", c.className)}
                  >
                    {({ sortDirection }) =>
                      c.hideLabel ? (
                        <span className="sr-only">{c.label}</span>
                      ) : (
                        <span className={cx("inline-flex items-center gap-1", c.align === "right" && "flex-row-reverse")}>
                          {c.label} {c.sortValue && <SortIcon direction={sortDirection} />}
                        </span>
                      )
                    }
                  </Column>
                )),
              ]}
            </TableHeader>
            <TableBody items={visible} renderEmptyState={() => <div className="py-12 text-center text-fg-muted">No {itemLabel} match{query ? ` “${query}”` : ""}.</div>}>
              {(r) => (
                <Row
                  id={r.id}
                  className="outline-none data-hovered:bg-subtle data-selected:bg-accent-soft/60 data-focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)] [&>td]:border-b [&>td]:border-line-subtle [&>td]:py-3"
                >
                  {[
                    ...(selectable
                      ? [
                          <Cell key="__select" className="pl-3 pr-3">
                            <Checkbox slot="selection" />
                          </Cell>,
                        ]
                      : []),
                    ...columns.map((c) => (
                      <Cell key={c.id} className={cx("px-3", c.align === "right" && "text-right")}>
                        {c.cell(r)}
                      </Cell>
                    )),
                  ]}
                </Row>
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination
          className="pt-1"
          page={current}
          pageCount={pageCount}
          onPageChange={setPage}
          summary={`${from}–${Math.min(current * pageSize, filtered.length)} of ${filtered.length} ${itemLabel}`}
        />
      </CardBody>
    </Card>
  );
}
