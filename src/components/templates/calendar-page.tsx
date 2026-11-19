"use client";

import { AlertTriangle, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, CircleSlash, Clock, Filter, LayoutGrid, MapPin, Plus, Search, Settings2, Users, Video } from "lucide-react";
import { useState } from "react";
import { AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { LinkButton } from "@/components/ui/link-button";
import { Select, SelectItem } from "@/components/ui/select";
import { Tab, TabList, Tabs } from "@/components/ui/tabs";
import { cx } from "@/utils/cx";
import { AppShell } from "./app-shell";

type Kind = "meeting" | "event" | "internal";
interface CalEvent {
  title: string;
  day: number; // 0–4 (Mon–Fri)
  start: number; // hours, e.g. 9.5
  end: number;
  kind: Kind;
  status?: "conflict" | "cancelled";
  people?: string[];
  where?: string;
}

const events: CalEvent[] = [
  { title: "Pipeline standup", day: 0, start: 9, end: 9.5, kind: "internal" },
  { title: "Forecast review", day: 0, start: 9.5, end: 10, kind: "internal" },
  { title: "Workshop: Objection handling", day: 0, start: 11.5, end: 13, kind: "event", where: "Room 4B" },
  { title: "Discovery · Ledgerly", day: 1, start: 9, end: 9.5, kind: "meeting", people: ["Sarah Chen", "Jordan Blake"], where: "Meet" },
  { title: "SDR training: AI prospecting", day: 1, start: 10, end: 11, kind: "meeting", people: ["Leah Moss", "Grace Kim", "Tom Hartley", "Marco Silva"], where: "Zoom" },
  { title: "Quarterly business review", day: 1, start: 12, end: 12.5, kind: "meeting", status: "conflict" },
  { title: "Demo · Verdant Cloud", day: 1, start: 12.5, end: 13.25, kind: "meeting", people: ["Daniel Brooks", "Jordan Blake"], where: "Meet" },
  { title: "Sequence strategy", day: 2, start: 9.5, end: 10, kind: "internal" },
  { title: "Territory planning", day: 2, start: 11, end: 11.5, kind: "internal", status: "cancelled" },
  { title: "Negotiation · Northpeak", day: 2, start: 11.5, end: 13, kind: "meeting", people: ["Marcus Reid", "Priya Raman", "Jordan Blake"], where: "Zoom" },
  { title: "Customer feedback session", day: 3, start: 9, end: 10, kind: "meeting", people: ["Elena Vasquez", "Leah Moss", "Grace Kim"], where: "Meet" },
  { title: "Webinar: Outbound in 2027", day: 3, start: 11.5, end: 13, kind: "event", where: "vantu.dev/live" },
];

const kindStyle: Record<Kind, string> = {
  meeting: "bg-accent-soft ring-accent-soft-border",
  event: "bg-warning-soft ring-warning-border",
  internal: "bg-muted ring-line",
};

const summary = [
  { title: "Weekly pipeline review", time: "3:00 PM – 4:30 PM", tone: "success", label: "Today", action: "Join meeting", Icon: Clock },
  { title: "Partner launch event", time: "9:00 AM – 12:00 PM", tone: "warning", label: "2 conflicts", action: "See conflict", Icon: AlertTriangle },
  { title: "Team offsite planning", time: "9:00 AM – 12:00 PM", tone: "error", label: "Cancelled", action: "Sep 16", Icon: CircleSlash },
  { title: "EMEA campaign kickoff", time: "2:30 PM – 4:00 PM", tone: "neutral", label: "3 days later", action: "Sep 21", Icon: Clock },
] as const;

const toneStrip = {
  success: "bg-success-soft text-success-text",
  warning: "bg-warning-soft text-warning-text",
  error: "bg-error-soft text-error-text",
  neutral: "bg-muted text-fg-secondary",
};

const START = 9;
const END = 14;
const HOUR = 72; // px per hour
const dayNames = ["14 Mon", "15 Tue", "16 Wed", "17 Thu", "18 Fri"];

function fmt(h: number) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const ap = hh >= 12 ? "PM" : "AM";
  return `${((hh + 11) % 12) + 1}:${String(mm).padStart(2, "0")} ${ap}`;
}

/** Week calendar: status summary cards, filter tabs and a time grid with positioned events. */
export function CalendarPage() {
  const [filter, setFilter] = useState<string>("all");
  const shown = events.filter((e) =>
    filter === "all" ? true : filter === "meetings" ? e.kind === "meeting" : filter === "events" ? e.kind === "event" : filter === "conflict" ? e.status === "conflict" : e.status === "cancelled",
  );
  const count = (f: string) =>
    events.filter((e) => (f === "meetings" ? e.kind === "meeting" : f === "events" ? e.kind === "event" : f === "conflict" ? e.status === "conflict" : e.status === "cancelled")).length;

  return (
    <AppShell
      active="Calendar"
      crumbs={["Calendar"]}
      icon={<CalendarDays />}
      title="September 14, 2026"
      description="You have 4 meetings and 1 event today."
      actions={
        <>
          <Button leadingIcon={<CalendarDays />} className="hidden sm:inline-flex">
            Schedule
          </Button>
          <Button variant="primary" leadingIcon={<Plus />}>
            New event
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5 px-4 pb-8 pt-6 sm:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Today</Button>
          <Select aria-label="Range" defaultSelectedKey="7" className="w-36">
            <SelectItem id="7">Last 7 days</SelectItem>
            <SelectItem id="30">Last 30 days</SelectItem>
          </Select>
          <Button size="sm" leadingIcon={<CalendarDays />}>
            Sep 14 – Sep 18, 2026
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <Input aria-label="Search events" placeholder="Search…" icon={<Search />} trailing={<Kbd>⌘1</Kbd>} className="w-56" />
            <Button size="sm" leadingIcon={<Filter />}>
              Filter
            </Button>
            <IconButton aria-label="Calendar settings">
              <Settings2 />
            </IconButton>
          </div>
        </div>

        <Tabs selectedKey={filter} onSelectionChange={(k) => setFilter(String(k))}>
          <TabList aria-label="Event filter" className="overflow-x-auto">
            <Tab id="all">
              <LayoutGrid className="size-4" /> All scheduled
            </Tab>
            <Tab id="meetings">
              <Video className="size-4" /> Meetings <Counter>{count("meetings")}</Counter>
            </Tab>
            <Tab id="events">
              <CalendarDays className="size-4" /> Events <Counter>{count("events")}</Counter>
            </Tab>
            <Tab id="conflict">
              <AlertTriangle className="size-4" /> Conflicted <Counter>{count("conflict")}</Counter>
            </Tab>
            <Tab id="cancelled">
              <CircleSlash className="size-4" /> Cancelled <Counter>{count("cancelled")}</Counter>
            </Tab>
          </TabList>
        </Tabs>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map((s) => (
            <div key={s.title} className="rounded-lg border border-line bg-subtle p-1 shadow-card">
              <div className="flex items-start gap-2 rounded-[12px] border border-line bg-surface p-3.5">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-medium text-fg">{s.title}</div>
                  <div className="mt-0.5 text-sm text-fg-muted">{s.time}</div>
                </div>
                <span className="flex size-6 items-center justify-center rounded-full shadow-button">
                  <ChevronDown className="size-3.5 text-fg-muted" />
                </span>
              </div>
              <div className={cx("mt-1 flex items-center gap-1.5 rounded-[10px] px-2.5 py-2 text-sm font-medium", toneStrip[s.tone])}>
                <s.Icon className="size-3.5" /> {s.label}
                {s.tone === "success" || s.tone === "warning" ? (
                  <LinkButton tone="black" size="sm" underline className="ml-auto">
                    {s.action}
                  </LinkButton>
                ) : (
                  <span className="ml-auto font-normal">{s.action}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-line bg-subtle p-1 shadow-card">
          <div className="relative overflow-x-auto rounded-[12px] border border-line bg-surface">
            <div className="min-w-[880px]">
              <div className="grid grid-cols-[72px_repeat(5,minmax(0,1fr))] border-b border-line bg-subtle text-sm">
                <div className="flex items-center justify-center gap-1 border-r border-line py-2">
                  <IconButton variant="ghost" size="xs" aria-label="Previous week">
                    <ChevronLeft />
                  </IconButton>
                  <IconButton variant="ghost" size="xs" aria-label="Next week">
                    <ChevronRight />
                  </IconButton>
                </div>
                {dayNames.map((d, i) => (
                  <div key={d} className={cx("flex items-center justify-center border-r border-line py-2 font-medium last:border-0", i === 0 ? "text-accent-text" : "text-fg-muted")}>
                    {d.toUpperCase()}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-[72px_repeat(5,minmax(0,1fr))]" style={{ height: (END - START) * HOUR }}>
                <div className="relative border-r border-line">
                  {Array.from({ length: END - START }, (_, i) => (
                    <span key={i} className="absolute right-3 text-sm text-fg-muted" style={{ top: i * HOUR + 6 }}>
                      {fmt(START + i).replace(":00", "")}
                    </span>
                  ))}
                </div>
                {dayNames.map((d, di) => (
                  <div
                    key={d}
                    className={cx("relative border-r border-line last:border-0", di === 4 && "bg-[repeating-linear-gradient(135deg,var(--color-subtle)_0_6px,var(--color-surface)_6px_12px)]")}
                    style={{ backgroundImage: di === 4 ? undefined : `repeating-linear-gradient(to bottom, transparent 0 ${HOUR - 1}px, var(--color-line-subtle) ${HOUR - 1}px ${HOUR}px)` }}
                  >
                    {shown
                      .filter((e) => e.day === di)
                      .map((e) => {
                        // 30-minute slots are too short for two lines: title and start time share one.
                        const short = e.end - e.start <= 0.5;
                        return (
                        <article
                          key={e.title}
                          title={`${e.title} · ${fmt(e.start)} – ${fmt(e.end)}`}
                          className={cx(
                            "absolute inset-x-1.5 flex overflow-hidden rounded-[10px] px-2.5 ring-1 ring-inset",
                            short ? "items-center gap-1.5" : "flex-col py-1.5",
                            e.status === "cancelled" ? "bg-error-soft ring-error-border" : e.status === "conflict" ? "bg-warning-soft ring-warning-border" : kindStyle[e.kind],
                          )}
                          style={{ top: (e.start - START) * HOUR + 3, height: (e.end - e.start) * HOUR - 6 }}
                        >
                          <h3 className={cx("min-w-0 truncate text-sm font-medium text-fg", e.status === "cancelled" && "line-through decoration-fg-muted")}>{e.title}</h3>
                          <p className={cx("truncate text-xs text-fg-secondary", short && "shrink-0")}>
                            {short ? fmt(e.start) : `${fmt(e.start)} – ${fmt(e.end)}`}
                          </p>
                          {e.end - e.start >= 1 && (e.people || e.where) && (
                            <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                              {e.people ? <AvatarGroup names={e.people} size="xs" max={3} /> : <span />}
                              {e.where && (
                                <span className="inline-flex min-w-0 items-center gap-1 truncate text-xs text-fg-secondary">
                                  {e.kind === "event" ? <MapPin className="size-3 shrink-0" /> : <Users className="size-3 shrink-0" />}
                                  {e.where}
                                </span>
                              )}
                            </div>
                          )}
                        </article>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
