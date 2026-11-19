"use client";

import { Columns3, Download, List, MoreHorizontal, Send, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar, CompanyMark } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddFilterButton, FilterButton } from "@/components/ui/filter";
import { IconButton } from "@/components/ui/icon-button";
import { Menu, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu";
import { ScoreMeter } from "@/components/ui/score-meter";
import type { ProspectRecord, ProspectStatus } from "@/lib/demo-data";
import { DataTable, type DataTableColumn, type DataTableView } from "./data-table";

const statusTone: Record<ProspectStatus, "neutral" | "info" | "success"> = {
  New: "neutral",
  Contacted: "info",
  Replied: "success",
  "Meeting booked": "success",
};

const views: DataTableView<ProspectRecord>[] = [
  { id: "all", label: "All prospects", filter: () => true },
  { id: "high", label: "High intent", filter: (p) => p.intent === "High" },
  { id: "sequence", label: "In sequence", filter: (p) => p.inSequence },
  { id: "new", label: "Not contacted", filter: (p) => p.status === "New" },
];

const columns: DataTableColumn<ProspectRecord>[] = [
  {
    id: "name",
    label: "Name",
    isRowHeader: true,
    sortValue: (r) => r.name,
    cell: (r) => (
      <span className="flex items-center gap-2.5">
        <Avatar name={r.name} size="lg" />
        <span className="truncate font-medium text-fg">{r.name}</span>
      </span>
    ),
  },
  { id: "title", label: "Title", cell: (r) => <span className="block max-w-44 truncate text-fg-secondary">{r.title}</span> },
  {
    id: "company",
    label: "Company",
    sortValue: (r) => r.company,
    cell: (r) => (
      <span className="flex items-center gap-2.5">
        <CompanyMark name={r.company} size="lg" color={r.brand} />
        <span className="min-w-0">
          <span className="block truncate text-fg">{r.company}</span>
          <span className="block truncate text-sm text-fg-muted">{r.domain}</span>
        </span>
      </span>
    ),
  },
  { id: "score", label: "AI score", sortValue: (r) => r.score, cell: (r) => <ScoreMeter score={r.score} /> },
  {
    id: "intent",
    label: "Intent",
    cell: (r) => <Badge tone={r.intent === "High" ? "success" : r.intent === "Medium" ? "warning" : "neutral"}>{r.intent}</Badge>,
  },
  {
    id: "status",
    label: "Status",
    cell: (r) =>
      r.status === "Meeting booked" ? (
        <Badge tone="success">{r.status}</Badge>
      ) : (
        <Badge variant="dot" tone={statusTone[r.status]}>
          {r.status}
        </Badge>
      ),
  },
  { id: "location", label: "Location", cell: (r) => <span className="whitespace-nowrap text-fg-secondary">{r.location}</span> },
  {
    id: "actions",
    label: "Actions",
    hideLabel: true,
    className: "w-12",
    cell: (r) => (
      <MenuTrigger>
        <IconButton variant="ghost" size="sm" aria-label={`Actions for ${r.name}`}>
          <MoreHorizontal />
        </IconButton>
        <Menu>
          <MenuItem shortcut="L">Add to list</MenuItem>
          <MenuItem shortcut="S">Start sequence</MenuItem>
          <MenuItem shortcut="E">Enrich</MenuItem>
          <MenuSeparator />
          <MenuItem danger>Remove</MenuItem>
        </Menu>
      </MenuTrigger>
    ),
  },
];

/** The prospects configuration of <DataTable>: views, columns, filters and bulk actions. */
export function ProspectsDataTable({
  rows,
  title,
  description,
  icon,
  actions,
  className,
}: {
  rows: ProspectRecord[];
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <DataTable
      rows={rows}
      columns={columns}
      views={views}
      searchText={(r) => `${r.name} ${r.company} ${r.title}`}
      searchPlaceholder="Search prospects"
      filters={
        <>
          <FilterButton label="Owner" value="All owners" />
          <FilterButton label="AI score" value="80+" />
          <AddFilterButton />
        </>
      }
      toolbarActions={
        <>
          <Button size="sm" leadingIcon={<Columns3 />}>
            Columns
          </Button>
          <Button size="sm" leadingIcon={<Download />}>
            Export
          </Button>
        </>
      }
      bulkActions={
        <>
          <Button size="sm" leadingIcon={<List />}>
            Add to list
          </Button>
          <Button size="sm" leadingIcon={<Zap />}>
            Enrich
          </Button>
          <Button size="sm" leadingIcon={<Send />}>
            Start sequence
          </Button>
        </>
      }
      defaultSort={{ column: "score", direction: "descending" }}
      pageSize={6}
      itemLabel="prospects"
      minWidth={880}
      title={title}
      description={description}
      icon={icon}
      actions={actions}
      className={className}
    />
  );
}
