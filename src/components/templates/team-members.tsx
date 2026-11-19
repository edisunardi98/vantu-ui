"use client";

import { ArrowDown, ArrowDownUp, ArrowUp, ChevronsUpDown, Download, Filter, MoreHorizontal, Search, UserPlus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Cell, Column, Row, type Selection, type SortDescriptor, Table, TableBody, TableHeader } from "react-aria-components";
import { Avatar, type AvatarStatus, CompanyMark } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Menu, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu";
import { Pagination } from "@/components/ui/pagination";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Select, SelectItem } from "@/components/ui/select";
import { cx } from "@/utils/cx";
import { AppShell } from "./app-shell";

interface Member {
  id: string;
  name: string;
  email: string;
  title: string;
  since: string;
  account: string;
  accountNote: string;
  brand: string;
  file: string;
  fileSize: string;
  status: "Active" | "Away" | "Out of office";
}

const members: Member[] = [
  { id: "1", name: "Jordan Blake", email: "jordan@vantu.dev", title: "Account Executive", since: "Aug 2023", account: "Ledgerly", accountNote: "Series B expansion deal", brand: "#8a5a2b", file: "blake-jordan-plan.pdf", fileSize: "2.4 MB", status: "Active" },
  { id: "2", name: "Leah Moss", email: "leah@vantu.dev", title: "SDR Team Lead", since: "Jan 2024", account: "Northpeak", accountNote: "Procurement review", brand: "#0a84ff", file: "moss-leah-plan.pdf", fileSize: "1.8 MB", status: "Away" },
  { id: "3", name: "Marco Silva", email: "marco@vantu.dev", title: "Sales Engineer", since: "Mar 2022", account: "Verdant Cloud", accountNote: "Security questionnaire", brand: "#f2620f", file: "silva-marco-plan.pdf", fileSize: "3.1 MB", status: "Active" },
  { id: "4", name: "Priya Raman", email: "priya@vantu.dev", title: "Account Executive", since: "Jun 2024", account: "Fathom Data", accountNote: "Pilot to annual", brand: "#6d28d9", file: "raman-priya-plan.pdf", fileSize: "2.0 MB", status: "Out of office" },
  { id: "5", name: "Tom Hartley", email: "tom@vantu.dev", title: "SDR", since: "Feb 2025", account: "Brightlane", accountNote: "Outbound · UK", brand: "#2563eb", file: "hartley-tom-plan.pdf", fileSize: "1.2 MB", status: "Active" },
  { id: "6", name: "Grace Kim", email: "grace@vantu.dev", title: "Revenue Operations", since: "Sep 2021", account: "Relaywork", accountNote: "Territory carve-out", brand: "#f59e0b", file: "kim-grace-plan.pdf", fileSize: "2.9 MB", status: "Away" },
  { id: "7", name: "Wei Chen", email: "wei@vantu.dev", title: "Sales Manager", since: "Jul 2021", account: "Stackwise", accountNote: "Renewal + upsell", brand: "#4f46e5", file: "chen-wei-plan.pdf", fileSize: "2.6 MB", status: "Active" },
  { id: "8", name: "Hannah Liu", email: "hannah@vantu.dev", title: "Account Executive", since: "Nov 2023", account: "Oakline HR", accountNote: "Champion change", brand: "#f97316", file: "liu-hannah-plan.pdf", fileSize: "1.6 MB", status: "Out of office" },
  { id: "9", name: "Samuel Ortiz", email: "samuel@vantu.dev", title: "SDR", since: "Apr 2025", account: "Plinth", accountNote: "New logo · EMEA", brand: "#2563eb", file: "ortiz-samuel-plan.pdf", fileSize: "0.9 MB", status: "Active" },
];

const presence: Record<Member["status"], AvatarStatus> = { Active: "online", Away: "away", "Out of office": "offline" };
const statusBadge: Record<Member["status"], "success" | "warning" | "neutral"> = { Active: "success", Away: "warning", "Out of office": "neutral" };

const th = "h-10 px-3 text-left text-sm font-normal text-fg-muted outline-none first:rounded-l-[10px] last:rounded-r-[10px] data-focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)]";

function Sortable({ label, dir }: { label: string; dir?: "ascending" | "descending" }) {
  const Icon = dir === "ascending" ? ArrowUp : dir === "descending" ? ArrowDown : ChevronsUpDown;
  return (
    <span className="inline-flex items-center gap-1">
      {label} <Icon aria-hidden className={cx("size-3", dir ? "text-fg" : "text-fg-disabled")} />
    </span>
  );
}

/** Team members directory: segmented status filter, search, sortable table, per-page pagination. */
export function TeamMembers() {
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortDescriptor>({ column: "name", direction: "ascending" });
  const [selected, setSelected] = useState<Selection>(new Set());
  const [perPage, setPerPage] = useState(7);
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    const list = members.filter(
      (m) => (status === "all" || (status === "active" ? m.status === "Active" : m.status !== "Active")) && (!q || `${m.name} ${m.email} ${m.title}`.toLowerCase().includes(q)),
    );
    const dir = sort.direction === "ascending" ? 1 : -1;
    const key = (sort.column as keyof Member) ?? "name";
    return [...list].sort((a, b) => String(a[key]).localeCompare(String(b[key])) * dir);
  }, [status, query, sort]);

  const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
  const current = Math.min(page, pageCount);
  const visible = rows.slice((current - 1) * perPage, current * perPage);

  return (
    <AppShell
      active="Team"
      crumbs={["Team", "Members"]}
      icon={<Users />}
      title="Team members"
      description="Everyone on the team, their focus account and status."
      actions={
        <>
          <Button leadingIcon={<Download />}>Export</Button>
          <Button variant="primary" leadingIcon={<UserPlus />}>
            Invite member
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5 px-4 pb-8 pt-6 sm:px-8">
        {/* Toolbar, table and pagination share one layered card, like the Data Table block. */}
        <div className="rounded-lg border border-line bg-subtle p-1 shadow-card">
        <div className="flex flex-col gap-4 rounded-[12px] border border-line bg-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          <SegmentedControl
            aria-label="Status"
            value={status}
            onChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
            options={[
              { id: "all", label: "All" },
              { id: "active", label: "Active" },
              { id: "away", label: "Away" },
            ]}
            className="w-full sm:w-72 [&>*]:flex-1"
          />
          <div className="ml-auto flex flex-wrap gap-2">
            <Input
              aria-label="Search members"
              placeholder="Search…"
              icon={<Search />}
              trailing={<Kbd>⌘1</Kbd>}
              value={query}
              onChange={(v) => {
                setQuery(v);
                setPage(1);
              }}
              className="w-56"
            />
            <Button size="sm" leadingIcon={<Filter />}>
              Filter
            </Button>
            <Button size="sm" leadingIcon={<ArrowDownUp />}>
              Sort by
            </Button>
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <Table
            aria-label="Team members"
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
            sortDescriptor={sort}
            onSortChange={setSort}
            className="w-full min-w-[920px] border-separate border-spacing-0 text-base"
          >
            <TableHeader className="bg-subtle">
              <Column className={cx(th, "w-10 pl-3")}>
                <Checkbox slot="selection" />
              </Column>
              <Column id="name" isRowHeader allowsSorting className={th}>
                {({ sortDirection }) => <Sortable label="Member" dir={sortDirection} />}
              </Column>
              <Column id="title" allowsSorting className={th}>
                {({ sortDirection }) => <Sortable label="Title" dir={sortDirection} />}
              </Column>
              <Column id="account" allowsSorting className={th}>
                {({ sortDirection }) => <Sortable label="Focus account" dir={sortDirection} />}
              </Column>
              <Column className={th}>Account plan</Column>
              <Column id="status" allowsSorting className={th}>
                {({ sortDirection }) => <Sortable label="Status" dir={sortDirection} />}
              </Column>
              <Column className={cx(th, "w-12")}>
                <span className="sr-only">Actions</span>
              </Column>
            </TableHeader>
            <TableBody items={visible} renderEmptyState={() => <div className="py-12 text-center text-fg-muted">No members match.</div>}>
              {(m) => (
                <Row id={m.id} className="outline-none data-hovered:bg-subtle data-selected:bg-accent-soft/60 data-focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)] [&>td]:border-b [&>td]:border-line-subtle">
                  <Cell className="py-3 pl-3 pr-3">
                    <Checkbox slot="selection" />
                  </Cell>
                  <Cell className="px-3 py-3">
                    <span className="flex items-center gap-3">
                      <Avatar name={m.name} size="lg" status={presence[m.status]} />
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-fg">{m.name}</span>
                        <span className="block truncate text-sm text-fg-muted">{m.email}</span>
                      </span>
                    </span>
                  </Cell>
                  <Cell className="px-3 py-3">
                    <span className="block text-fg">{m.title}</span>
                    <span className="block text-sm text-fg-muted">Since {m.since}</span>
                  </Cell>
                  <Cell className="px-3 py-3">
                    <span className="flex items-center gap-2.5">
                      <CompanyMark name={m.account} size="lg" color={m.brand} />
                      <span className="min-w-0">
                        <span className="block truncate text-fg">{m.account}</span>
                        <span className="block max-w-44 truncate text-sm text-fg-muted">{m.accountNote}</span>
                      </span>
                    </span>
                  </Cell>
                  <Cell className="px-3 py-3">
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-9 w-7 items-end justify-center rounded-[4px] border border-line bg-subtle pb-1">
                        <span className="rounded-[2px] bg-error px-0.5 text-[7px] font-bold leading-[10px] text-white">PDF</span>
                      </span>
                      <span className="min-w-0">
                        <span className="block max-w-40 truncate text-fg">{m.file}</span>
                        <span className="block text-sm text-fg-muted">{m.fileSize}</span>
                      </span>
                    </span>
                  </Cell>
                  <Cell className="px-3 py-3">
                    <Badge variant="dot" tone={statusBadge[m.status]}>
                      {m.status}
                    </Badge>
                  </Cell>
                  <Cell className="py-3 pr-3">
                    <MenuTrigger>
                      <IconButton variant="ghost" size="sm" aria-label={`Actions for ${m.name}`}>
                        <MoreHorizontal />
                      </IconButton>
                      <Menu>
                        <MenuItem>View profile</MenuItem>
                        <MenuItem>Reassign accounts</MenuItem>
                        <MenuSeparator />
                        <MenuItem danger>Remove from team</MenuItem>
                      </Menu>
                    </MenuTrigger>
                  </Cell>
                </Row>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-fg-secondary">
            Page {current} of {pageCount}
          </span>
          <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />
          <Select
            aria-label="Rows per page"
            selectedKey={String(perPage)}
            onSelectionChange={(k) => {
              setPerPage(Number(k));
              setPage(1);
            }}
            className="w-32"
          >
            <SelectItem id="5">5 / page</SelectItem>
            <SelectItem id="7">7 / page</SelectItem>
            <SelectItem id="10">10 / page</SelectItem>
          </Select>
        </div>
        </div>
        </div>
      </div>
    </AppShell>
  );
}
