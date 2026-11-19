"use client";

import {
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  Building2,
  CalendarCheck,
  ChartPie,
  CircleDollarSign,
  Download,
  FileSignature,
  Handshake,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  Mail,
  Phone,
  Plug,
  Plus,
  Settings,
  SquareKanban,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { AreaChart } from "@/components/charts/area-chart";
import { formatCompact, formatNumber } from "@/components/charts/chart-kit";
import { DonutChart } from "@/components/charts/donut-chart";
import { Sparkline } from "@/components/charts/sparkline";
import { Avatar, CompanyMark } from "@/components/ui/avatar";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterButton } from "@/components/ui/filter";
import { NavItem } from "@/components/ui/nav-item";
import { Delta, Metric } from "@/components/ui/metric";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Cell, Column, Row, Table, TableBody, TableContainer, TableHeader } from "@/components/ui/table";
import { crmDeals, crmMetrics, crmPipeline, crmReps, crmRevenue, crmTasks, type DealStage } from "@/lib/demo-data";
import { ActivityFeed } from "./activity-feed";
import { DataTable, type DataTableColumn, type DataTableView } from "./data-table";
import { MetricsStrip } from "./metrics-strip";
import { PageHeader } from "./page-header";
import { Sidebar, type SidebarSection } from "./sidebar";
import { Topbar } from "./topbar";

const usd = (n: number) => `$${formatCompact(n)}`;
/** Two decimals for headline totals, e.g. $1.61M. */
const usd2 = (n: number) => `$${formatNumber(n, { notation: "compact", maximumFractionDigits: 2 })}`;

const crmNav: SidebarSection[] = [
  {
    items: [
      { label: "Dashboard", icon: <LayoutDashboard /> },
      { label: "Contacts", icon: <Users />, count: "2,418" },
      { label: "Companies", icon: <Building2 />, count: 612 },
      { label: "Deals", icon: <Handshake />, count: 142 },
      { label: "Tasks", icon: <ListChecks />, badge: 3 },
    ],
  },
  {
    label: "Sales",
    items: [
      { label: "Pipeline", icon: <SquareKanban /> },
      { label: "Forecast", icon: <TrendingUp /> },
      { label: "Reports", icon: <BarChart3 /> },
    ],
  },
  {
    label: "Workspace",
    items: [{ label: "Integrations", icon: <Plug /> }],
  },
];

const stageTone: Record<DealStage, BadgeTone> = { Proposal: "info", Negotiation: "warning", "Contract sent": "success" };

const activity = [
  { id: "1", icon: <Handshake />, title: "Ledgerly moved to Contract sent · $84K", meta: "18 min ago · Jordan Blake" },
  { id: "2", icon: <Phone />, title: "Call with Daniel Brooks (Verdant Cloud) — 32 min", meta: "1h ago · Marco Silva" },
  { id: "3", icon: <Mail />, title: "Proposal opened 4 times by Northpeak", meta: "2h ago · Email tracking" },
  { id: "4", icon: <CalendarCheck />, title: "Demo booked with Fathom Data for Thu, Nov 20", meta: "3h ago · Priya Raman" },
  { id: "5", icon: <FileSignature />, title: "Plinth signed the Growth plan · $18K ARR", meta: "Yesterday · Samuel Ortiz" },
];

const teamRevenue = crmReps.reduce((s, r) => s + r.revenue, 0);
/** Team attainment = total won ÷ total quota (each rep's quota derived from their attainment). */
const teamQuota = Math.round((teamRevenue / crmReps.reduce((s, r) => s + r.revenue / (r.quota / 100), 0)) * 100);
const topRep = crmReps[0]!;

const ytd = crmRevenue.reduce((s, m) => s + m.value, 0);
const ytdPrev = crmRevenue.reduce((s, m) => s + (m.previous ?? 0), 0);

type Deal = (typeof crmDeals)[number];

const dealViews: DataTableView<Deal>[] = [
  { id: "all", label: "All deals", filter: () => true },
  { id: "contract", label: "Contract sent", filter: (d) => d.stage === "Contract sent" },
  { id: "negotiation", label: "Negotiation", filter: (d) => d.stage === "Negotiation" },
  { id: "proposal", label: "Proposal", filter: (d) => d.stage === "Proposal" },
];

const dealColumns: DataTableColumn<Deal>[] = [
  {
    id: "deal",
    label: "Deal",
    isRowHeader: true,
    sortValue: (d) => d.company,
    cell: (d) => (
      <span className="flex items-center gap-3">
        <CompanyMark name={d.company} size="lg" color={d.brand} />
        <span className="min-w-0 max-w-32">
          <span className="block truncate font-medium text-fg">{d.company}</span>
          <span className="block truncate text-sm text-fg-muted">{d.name}</span>
        </span>
      </span>
    ),
  },
  {
    id: "stage",
    label: "Stage",
    cell: (d) => (
      <Badge variant="dot" tone={stageTone[d.stage]}>
        {d.stage}
      </Badge>
    ),
  },
  {
    id: "close",
    label: "Close",
    sortValue: (d) => Date.parse(`${d.close} 2026`),
    cell: (d) => (
      <span className="flex items-center gap-2 whitespace-nowrap">
        <Avatar name={d.owner} size="xs" />
        {d.close}
      </span>
    ),
  },
  {
    id: "probability",
    label: "Win prob.",
    sortValue: (d) => d.probability,
    cell: (d) => (
      <ProgressBar
        value={d.probability}
        label={`${d.company} win probability`}
        labelPosition="right"
        tone={d.probability >= 70 ? "success" : d.probability >= 50 ? "warning" : "neutral"}
        className="w-20"
      />
    ),
  },
  { id: "value", label: "Value", align: "right", sortValue: (d) => d.value, cell: (d) => <span className="font-medium tabular-nums">{usd(d.value)}</span> },
];

/**
 * CRM Home Dashboard template, assembled only from Vantu blocks, components and
 * charts. Same frame as the other workspace templates: full-width content, a
 * main column and a 360px side rail.
 */
export function HomeDashboard() {
  return (
    <div className="flex h-dvh bg-app">
      <Sidebar
        active="Dashboard"
        sections={crmNav}
        footer={
          <>
            <NavItem label="Settings" icon={<Settings />} />
            <NavItem label="Help & support" icon={<LifeBuoy />} />
          </>
        }
        className="hidden lg:flex"
      />
      <div className="flex min-w-0 flex-1 flex-col bg-surface">
        <Topbar crumbs={["Dashboard"]} icon={<LayoutDashboard />} />
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-5 px-4 pb-8 pt-6 sm:px-8">
            <PageHeader
              title="Good morning, Edi"
              description="Here’s how your pipeline is tracking this quarter."
              actions={
                <>
                  <FilterButton label="Period" value="This quarter" />
                  <Button leadingIcon={<Download />}>Export</Button>
                  <Button variant="primary" leadingIcon={<Plus />}>
                    New deal
                  </Button>
                </>
              }
            />
            <MetricsStrip items={crmMetrics} trend="line" />

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] [&>*]:min-w-0">
              {/* Main column */}
              <div className="flex flex-col gap-5">
                <Card>
                  <CardHeader
                    icon={
                      <IconTile>
                        <CircleDollarSign />
                      </IconTile>
                    }
                    title="Revenue won"
                    description="Monthly, vs. the same month last year"
                    actions={
                      <SegmentedControl
                        aria-label="Range"
                        size="sm"
                        defaultValue="ytd"
                        options={[
                          { id: "q", label: "QTD" },
                          { id: "ytd", label: "YTD" },
                          { id: "12m", label: "12M" },
                        ]}
                      />
                    }
                  />
                  <CardBody className="p-4">
                    <Metric
                      size="md"
                      label="Year to date"
                      value={usd2(ytd)}
                      delta={<Delta value={Math.round(((ytd - ytdPrev) / ytdPrev) * 100)} />}
                      caption={`vs. ${usd2(ytdPrev)} last year`}
                      className="mb-4"
                    />
                    <AreaChart data={crmRevenue} seriesLabel="This year" previousLabel="Last year" format={usd} />
                  </CardBody>
                </Card>

                <DataTable
                  rows={crmDeals}
                  columns={dealColumns}
                  views={dealViews}
                  searchText={(d) => `${d.company} ${d.name} ${d.owner}`}
                  searchPlaceholder="Search deals"
                  filters={<FilterButton label="Owner" value="All owners" />}
                  bulkActions={
                    <>
                      <Button size="sm" leadingIcon={<UserPlus />}>
                        Assign owner
                      </Button>
                      <Button size="sm" leadingIcon={<ArrowRightLeft />}>
                        Move stage
                      </Button>
                      <Button size="sm" leadingIcon={<Download />}>
                        Export
                      </Button>
                    </>
                  }
                  defaultSort={{ column: "close", direction: "ascending" }}
                  pageSize={6}
                  itemLabel="deals"
                  minWidth={600}
                  icon={
                    <IconTile tone="rose">
                      <Handshake />
                    </IconTile>
                  }
                  title="Deals closing soon"
                  description={`Next 30 days · ${usd(crmDeals.reduce((s, d) => s + d.value, 0))} in play`}
                  actions={
                    <Button size="sm" trailingIcon={<ArrowRight />}>
                      Pipeline
                    </Button>
                  }
                />
              </div>

              {/* Side rail */}
              <div className="flex flex-col gap-5">
                <Card>
                  <CardHeader
                    icon={
                      <IconTile tone="teal">
                        <ChartPie />
                      </IconTile>
                    }
                    title="Pipeline by stage"
                    description="Open deal value"
                  />
                  <CardBody className="p-4">
                    <DonutChart data={crmPipeline} format={usd} legend="bottom" centerValue="$1.86M" centerLabel="Open pipeline" />
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader
                    icon={
                      <IconTile tone="orange">
                        <ListChecks />
                      </IconTile>
                    }
                    title="My tasks"
                    description={`${crmTasks.filter((t) => !t.done).length} open · 1 overdue`}
                    actions={
                      <Button size="sm" leadingIcon={<Plus />}>
                        Add
                      </Button>
                    }
                  />
                  <CardBody>
                    <ul className="divide-y divide-line-subtle">
                      {crmTasks.map((t) => (
                        <li key={t.id} className="flex items-start gap-3 px-4 py-3">
                          <Checkbox defaultSelected={t.done} aria-label={t.title} className="mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <div className={t.done ? "text-fg-muted line-through" : "text-fg"}>{t.title}</div>
                            <div className="mt-1">
                              <Badge size="sm" tone={t.overdue ? "error" : t.due === "Today" ? "warning" : "neutral"}>
                                {t.overdue ? `Overdue · ${t.due}` : t.due}
                              </Badge>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>

                <ActivityFeed items={activity} />
              </div>
            </div>

            {/* Rep leaderboard */}
            <Card>
              <CardHeader
                icon={
                  <IconTile>
                    <Trophy />
                  </IconTile>
                }
                title="Revenue by rep"
                description="Won this quarter · ranked by revenue"
                actions={
                  <SegmentedControl
                    aria-label="Team"
                    size="sm"
                    defaultValue="all"
                    options={[
                      { id: "all", label: "All teams" },
                      { id: "ent", label: "Enterprise" },
                      { id: "mm", label: "Mid-market" },
                    ]}
                  />
                }
              />
              <CardBody>
                {/* Summary tiles, divided by 1px rules like the Metrics Strip. */}
                <div className="grid gap-px border-b border-line bg-line sm:grid-cols-3">
                  <Metric size="md" className="bg-surface p-4" label="Team revenue" value={usd2(teamRevenue)} delta={<Delta value={14} />} caption="vs. $423K last quarter" />
                  <Metric
                    size="md"
                    className="bg-surface p-4"
                    label="Team quota attainment"
                    value={`${teamQuota}%`}
                    delta={<Delta value={6}>+6 pts</Delta>}
                    caption={`${crmReps.filter((r) => r.quota >= 100).length} of ${crmReps.length} reps at or above quota`}
                  />
                  <div className="flex items-center gap-3 bg-surface p-4">
                    <Avatar name={topRep.name} size="xl" status="online" />
                    <div className="min-w-0">
                      <div className="text-base text-fg-secondary">Top performer</div>
                      <div className="mt-1 truncate text-lg font-semibold text-fg">{topRep.name}</div>
                      <div className="mt-0.5 text-sm text-fg-muted">
                        {topRep.quota}% of quota · {usd(topRep.revenue)} won
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <TableContainer>
                    <Table aria-label="Revenue by rep" className="min-w-[760px]">
                      <TableHeader>
                        <Column className="w-12">#</Column>
                        <Column isRowHeader>Rep</Column>
                        <Column className="text-right">Deals won</Column>
                        <Column>Revenue won</Column>
                        <Column>Quota attainment</Column>
                        <Column>Trend</Column>
                      </TableHeader>
                      <TableBody items={crmReps}>
                        {(r) => {
                          const rank = crmReps.indexOf(r) + 1;
                          return (
                            <Row id={r.id}>
                              <Cell>
                                {rank <= 3 ? (
                                  <Badge tone={rank === 1 ? "accent" : "neutral"} variant={rank === 1 ? "solid" : "soft"}>
                                    {rank}
                                  </Badge>
                                ) : (
                                  <span className="pl-2 text-fg-muted">{rank}</span>
                                )}
                              </Cell>
                              <Cell>
                                <span className="flex items-center gap-3">
                                  <Avatar name={r.name} size="lg" />
                                  <span className="min-w-0">
                                    <span className="block truncate font-medium text-fg">{r.name}</span>
                                    <span className="block truncate text-sm text-fg-muted">{r.team}</span>
                                  </span>
                                </span>
                              </Cell>
                              <Cell className="text-right tabular-nums">{r.deals}</Cell>
                              <Cell>
                                <span className="flex items-center gap-3">
                                  <span className="w-16 shrink-0 font-medium tabular-nums text-fg">{usd(r.revenue)}</span>
                                  {/* Decorative: the figure is the text beside it. */}
                                  <span aria-hidden className="w-40">
                                    <ProgressBar value={r.revenue} max={topRep.revenue} tone={rank <= 3 ? "accent" : "neutral"} />
                                  </span>
                                </span>
                              </Cell>
                              <Cell>
                                <span className="flex items-center gap-3">
                                  <span aria-hidden className="w-28">
                                    <ProgressBar value={Math.min(r.quota, 100)} tone={r.quota >= 100 ? "success" : r.quota >= 80 ? "warning" : "neutral"} />
                                  </span>
                                  <span className="w-11 text-right text-sm font-medium tabular-nums text-fg">{r.quota}%</span>
                                </span>
                              </Cell>
                              <Cell>
                                <Sparkline values={r.spark} label={`${r.name}, weekly revenue trend`} tone={r.spark.at(-1)! >= r.spark[0]! ? "accent" : "error"} area={false} className="w-20" />
                              </Cell>
                            </Row>
                          );
                        }}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
