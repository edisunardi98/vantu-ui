"use client";

import { Calendar, CalendarCheck, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Clock, Home, NotebookPen, Plus, Rocket, Search, Target, UsersRound, Video } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadialChart } from "@/components/charts/radial-chart";
import { DescriptionList } from "@/components/ui/description-list";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { Tag } from "@/components/ui/tag";
import { cx } from "@/utils/cx";
import { AppShell } from "./app-shell";
import { WidgetCard } from "./widget-card";

const deals = [
  { date: "Sep 15", company: "Ledgerly", status: "Booked", tone: "success" as const },
  { date: "Sep 17", company: "Northpeak", status: "Pending", tone: "warning" as const },
  { date: "Sep 19", company: "Plinth", status: "Declined", tone: "error" as const },
];

const availability = [
  { group: "In a meeting", people: [{ name: "Marco Silva", note: "Demo · Ledgerly", status: "busy" as const, time: "25m" }] },
  {
    group: "Away",
    people: [
      { name: "Leah Moss", note: "Back after lunch", status: "away" as const, time: "40m" },
      { name: "Priya Raman", note: "Customer visit", status: "away" as const, time: "1h" },
      { name: "Tom Hartley", note: "Focus time", status: "away" as const, time: "12m" },
    ],
  },
];

const notes = [
  { title: "Prep pricing objections for Ledgerly", body: "Collect the three most common objections from last quarter’s calls.", tags: ["Today", "Prep"], date: "Sep 15", done: false },
  { title: "Review Northpeak mutual action plan", body: "Align legal review dates with their procurement calendar.", tags: ["Today", "Deal"], date: "Sep 14", done: true },
  { title: "Share sequence results with the team", body: "Post-event sequence is at 13.8% reply — write up what worked.", tags: ["Yesterday"], date: "Sep 13", done: true },
];

const days = [
  { d: "Fri", n: 12 },
  { d: "Sat", n: 13 },
  { d: "Sun", n: 14 },
  { d: "Mon", n: 15 },
  { d: "Tue", n: 16 },
];

const meetings = [
  { title: "Discovery with Sarah Chen", time: "9:00 – 9:45 AM", where: "Google Meet", people: ["Sarah Chen", "Jordan Blake", "Leah Moss"], tag: "Discovery", tone: "accent" as const },
  { title: "Pipeline review", time: "11:00 – 11:30 AM", where: "Zoom", people: ["Jordan Blake", "Marco Silva", "Priya Raman", "Tom Hartley"], tag: "Internal", tone: "neutral" as const },
  { title: "Negotiation · Northpeak", time: "2:00 – 3:00 PM", where: "Slack huddle", people: ["Marcus Reid", "Jordan Blake"], tag: "Closing", tone: "success" as const },
];

function MeetingCard({ m }: { m: (typeof meetings)[number] }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-md bg-subtle p-3.5 ring-1 ring-inset ring-line-subtle">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-start gap-2 text-left outline-none focus-visible:shadow-focus">
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-medium text-fg">{m.title}</div>
          <div className="mt-0.5 text-sm text-fg-secondary">{m.time}</div>
        </div>
        <span className="flex size-6 items-center justify-center rounded-full bg-surface shadow-button">
          <ChevronDown className={cx("size-3.5 text-fg-muted transition-transform", open && "rotate-180")} />
        </span>
      </button>
      {open && (
        <>
          <div className="mt-3">
            <AvatarGroup names={m.people} size="sm" max={3} />
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 text-sm text-fg-secondary">
            <span className="inline-flex items-center gap-1.5">
              <Video className="size-3.5" /> {m.where}
            </span>
            <Badge tone={m.tone} size="sm">
              {m.tag}
            </Badge>
          </div>
        </>
      )}
    </div>
  );
}

/** Team workspace dashboard: goal gauge, availability, campaign details, notes and schedule. */
export function TeamDashboard() {
  const [day, setDay] = useState(14);
  const [done, setDone] = useState(notes.map((n) => n.done));
  return (
    <AppShell
      active="Dashboard"
      crumbs={["Dashboard"]}
      icon={<Home />}
      title="Welcome back, Edi"
      description="Here’s your team’s day at a glance."
      actions={
        <>
          <Button leadingIcon={<CalendarDays />} className="hidden sm:inline-flex">
            Schedule
          </Button>
          <Button variant="primary" leadingIcon={<Plus />}>
            New deal
          </Button>
        </>
      }
    >
      <div className="grid gap-5 px-4 pb-8 pt-6 sm:px-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_360px] [&>*]:min-w-0">
        <div className="flex flex-col gap-5">
          <WidgetCard icon={<Target />} title="Meetings goal" action={<Button size="xs">See all</Button>}>
            {/* Radial Chart from the charts library; target = pacing for Sep 14 (14/30 days × 20 ≈ 9). */}
            <div className="pb-4 pt-1">
              <RadialChart value={14} max={20} target={9} label="Booked" caption="of 20 meetings" className="max-w-52" />
            </div>
            <ul className="divide-y divide-line-subtle border-t border-line-subtle">
              {deals.map((d) => (
                <li key={d.company} className="flex items-center gap-2.5 py-3 text-base">
                  <CalendarCheck className="size-4 text-fg-muted" />
                  <span className="text-fg">{d.date}</span>
                  <span className="flex-1 truncate text-sm text-fg-muted">({d.company})</span>
                  <Badge tone={d.tone} size="sm">
                    {d.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </WidgetCard>
          <WidgetCard icon={<UsersRound />} tone="teal" title="Team availability" action={<Button size="xs">See all</Button>} bodyClassName="p-0">
            {availability.map((g) => (
              <div key={g.group} className="border-b border-line-subtle px-4 py-3 last:border-0">
                <div className="mb-2.5 text-sm text-fg-muted">{g.group}</div>
                <ul className="flex flex-col gap-3">
                  {g.people.map((p) => (
                    <li key={p.name} className="flex items-center gap-3">
                      <Avatar name={p.name} size="lg" status={p.status} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-base font-medium text-fg">{p.name}</div>
                        <div className="truncate text-sm text-fg-muted">{p.note}</div>
                      </div>
                      <Badge tone={p.status === "busy" ? "error" : "warning"} variant="outline" size="sm" icon={<Clock />}>
                        {p.time}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </WidgetCard>
        </div>

        <div className="flex flex-col gap-5">
          <WidgetCard icon={<Rocket />} tone="rose" title="Current campaign" action={<Button size="xs">See all</Button>}>
            <div className="text-sm text-fg-muted">Campaign</div>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-[6px] bg-linear-to-b from-accent-light to-accent text-[10px] font-bold text-white">Q4</span>
              <span className="text-base font-medium text-fg">Q4 Enterprise push</span>
              <Badge tone="warning" size="sm" variant="soft">
                In progress
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-fg-muted">Owner</div>
                <div className="mt-1.5 flex items-center gap-2 text-base text-fg">
                  <Avatar name="Leah Moss" size="sm" /> Leah M.
                </div>
              </div>
              <div>
                <div className="text-sm text-fg-muted">AI lead</div>
                <div className="mt-1.5 flex items-center gap-2 text-base text-fg">
                  <Avatar name="Vantu AI" size="sm" color="violet" /> Vantu AI
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-fg-muted">Team</div>
            <div className="mt-1.5 flex items-center gap-2">
              <AvatarGroup names={["Jordan Blake", "Marco Silva", "Priya Raman", "Tom Hartley", "Leah Moss", "Grace Kim"]} size="sm" max={4} />
              <span className="text-sm text-fg-secondary">+2 people</span>
            </div>
            <DescriptionList
              className="mt-4 border-t border-line-subtle pt-4"
              items={[
                { label: "Timeline", value: <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5 text-fg-muted" /> Oct 1 – Dec 20</span> },
                { label: "Target", value: "40 meetings · $1.2M pipeline" },
                { label: "Brief", value: "Series B SaaS, 200–1,000 employees, US + UK." },
              ]}
            />
          </WidgetCard>
          <WidgetCard icon={<NotebookPen />} tone="orange" title="Notes" action={<Button size="xs" leadingIcon={<Plus />}>Add note</Button>} bodyClassName="p-0">
            <ul className="divide-y divide-line-subtle">
              {notes.map((n, i) => (
                <li key={n.title} className="flex gap-3 px-4 py-3.5">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={done[i]}
                    aria-label={`Mark “${n.title}” done`}
                    onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                    className={cx(
                      "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full outline-none focus-visible:shadow-focus",
                      done[i] ? "bg-success text-white" : "border border-line-strong",
                    )}
                  >
                    {done[i] && <Check className="size-2.5" strokeWidth={3.5} />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className={cx("truncate text-base font-medium", done[i] ? "text-fg-muted line-through decoration-fg-disabled" : "text-fg")}>{n.title}</div>
                    <p className="mt-0.5 truncate text-sm text-fg-muted">{n.body}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      {n.tags.map((t) => (
                        <Tag key={t} variant={done[i] ? "stroke" : "gray"}>
                          {t}
                        </Tag>
                      ))}
                      <span className="ml-auto inline-flex items-center gap-1 text-sm text-fg-muted">
                        <Calendar className="size-3.5" /> {n.date}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </WidgetCard>
        </div>

        <WidgetCard icon={<CalendarDays />} tone="teal" title="Schedule" action={<Button size="xs">See all</Button>} className="xl:row-span-2">
          <div className="flex items-center justify-between rounded-md bg-subtle px-2 py-1.5">
            <IconButton variant="ghost" size="xs" aria-label="Previous month">
              <ChevronLeft />
            </IconButton>
            <span className="text-base font-medium text-fg">September 2026</span>
            <IconButton variant="ghost" size="xs" aria-label="Next month">
              <ChevronRight />
            </IconButton>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Day">
            {days.map((x) => (
              <button
                key={x.n}
                type="button"
                role="radio"
                aria-checked={day === x.n}
                onClick={() => setDay(x.n)}
                className={cx(
                  "flex flex-col items-center rounded-md py-2 outline-none transition-colors focus-visible:shadow-focus",
                  day === x.n ? "bg-linear-to-b from-accent-light to-accent text-white shadow-button-primary" : "text-fg hover:bg-muted",
                )}
              >
                <span className={cx("text-sm", day === x.n ? "text-white/80" : "text-fg-muted")}>{x.d}</span>
                <span className="text-xl font-medium tabular">{String(x.n).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <Input aria-label="Search schedule" placeholder="Search…" icon={<Search />} trailing={<Kbd>⌘1</Kbd>} className="mt-4" />
          <Tabs className="mt-2">
            <TabList aria-label="Schedule type" className="gap-4">
              <Tab id="meetings">Meetings</Tab>
              <Tab id="events">Events</Tab>
              <Tab id="holidays">Holidays</Tab>
            </TabList>
            <TabPanel id="meetings" className="flex flex-col gap-3">
              {meetings.map((m) => (
                <MeetingCard key={m.title} m={m} />
              ))}
            </TabPanel>
            <TabPanel id="events" className="py-6 text-center text-base text-fg-muted">
              SaaStr Europa · Sep 18
            </TabPanel>
            <TabPanel id="holidays" className="py-6 text-center text-base text-fg-muted">
              No holidays this week.
            </TabPanel>
          </Tabs>
        </WidgetCard>
      </div>
    </AppShell>
  );
}
