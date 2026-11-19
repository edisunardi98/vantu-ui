"use client";

import { ChartPie, Reply, Target } from "lucide-react";
import type { ReactNode } from "react";
import { DonutChart } from "@/components/charts/donut-chart";
import { RadialChart } from "@/components/charts/radial-chart";
import { Sparkline } from "@/components/charts/sparkline";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { Delta } from "@/components/ui/metric";
import { SegmentedControl } from "@/components/ui/segmented-control";
import EmailsSent from "@/examples/area-chart/minimal";
import BarChart from "@/examples/bar-chart/default";
import ColorPicker from "@/examples/color-picker/default";
import Heatmap from "@/examples/heatmap/default";
import HorizontalBarChart from "@/examples/horizontal-bar-chart/default";
import LineChart from "@/examples/line-chart/default";
import Notification from "@/examples/notification/default";
import StepIndicator from "@/examples/step-indicator/vertical";
import { cx } from "@/utils/cx";

/** White card for pieces that don't bring their own surface. */
const Frame = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cx("flex justify-center rounded-lg border border-line bg-surface p-6 shadow-card", className)}>{children}</div>
);

/** Renders `children` at a natural `width`, shrunk by `zoom` (layout shrinks too, unlike transform). */
const Zoom = ({ width, zoom, children }: { width: number; zoom: number; children: ReactNode }) => <div style={{ width, zoom }}>{children}</div>;

const Slide = ({ width, children }: { width: number; children: ReactNode }) => (
  <div className="flex shrink-0 flex-col gap-6" style={{ width }}>
    {children}
  </div>
);

const usd = (n: number) => `$${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n)}`;

/* ---------- Row 1 (drifts left) ---------- */
const rowOne = (
  <>
    <Slide width={300}>
      <Card>
        <CardHeader
          icon={
            <IconTile>
              <Target />
            </IconTile>
          }
          title="Meetings goal"
          description="November · day 19 of 30"
        />
        <CardBody className="p-4">
          <RadialChart value={42} max={60} target={38} label="Booked" caption="of 60 meetings" />
        </CardBody>
      </Card>
    </Slide>
    <Slide width={560}>
      <EmailsSent />
    </Slide>
    <Slide width={340}>
      <Zoom width={420} zoom={340 / 420}>
        <Notification />
      </Zoom>
    </Slide>
    <Slide width={560}>
      <Heatmap />
    </Slide>
    <Slide width={300}>
      <Card>
        <CardHeader
          icon={
            <IconTile tone="rose">
              <Reply />
            </IconTile>
          }
          title="Reply rate"
          description="Last 10 days"
        />
        <CardBody className="flex items-end justify-between gap-3 p-4">
          <div>
            <div className="text-2xl font-semibold tabular-nums text-fg">8.6%</div>
            <Delta value={1.4} className="whitespace-nowrap">
              +1.4 pts
            </Delta>
          </div>
          <Sparkline values={[6.1, 6.4, 6.2, 7.0, 7.3, 7.1, 7.8, 8.2, 8.0, 8.6]} label="Reply rate, last 10 days, trending up" className="w-24" />
        </CardBody>
      </Card>
      <Frame>
        <SegmentedControl
          aria-label="Range"
          defaultValue="month"
          options={[
            { id: "week", label: "Week" },
            { id: "month", label: "Month" },
            { id: "year", label: "Year" },
          ]}
        />
      </Frame>
    </Slide>
  </>
);

/* ---------- Row 2 (drifts right) ---------- */
const rowTwo = (
  <>
    <Slide width={560}>
      <LineChart />
    </Slide>
    <Slide width={420}>
      <HorizontalBarChart />
    </Slide>
    <Slide width={300}>
      <Frame>
        <StepIndicator />
      </Frame>
    </Slide>
    <Slide width={460}>
      <Card>
        <CardHeader
          icon={
            <IconTile tone="teal">
              <ChartPie />
            </IconTile>
          }
          title="Pipeline by source"
          description="Open opportunities"
        />
        <CardBody className="p-4">
          <DonutChart
            data={[
              { label: "Outbound", value: 1240000 },
              { label: "Inbound", value: 860000 },
              { label: "Referral", value: 420000 },
              { label: "Events", value: 210000 },
            ]}
            centerLabel="Open pipeline"
            format={usd}
          />
        </CardBody>
      </Card>
    </Slide>
    <Slide width={560}>
      <BarChart />
    </Slide>
    <Slide width={300}>
      <Frame>
        <ColorPicker />
      </Frame>
    </Slide>
  </>
);

/**
 * One endless row. The slides render twice so the loop is seamless; the copy is
 * hidden from assistive tech and can't take focus. Pauses on hover/focus.
 */
function MarqueeRow({ children, reverse }: { children: ReactNode; reverse?: boolean }) {
  const track = (hidden?: boolean) => (
    // Phones: top-align so short cards don't leave tall gaps between rows; larger screens center them.
    <div className="flex shrink-0 items-start gap-6 pr-6 sm:items-center" aria-hidden={hidden || undefined} inert={hidden || undefined}>
      {children}
    </div>
  );
  return (
    <div className="group/row overflow-hidden py-1">
      <div
        className={cx(
          "flex w-max group-hover/row:[animation-play-state:paused] group-focus-within/row:[animation-play-state:paused] motion-reduce:animate-none",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {track()}
        {track(true)}
      </div>
    </div>
  );
}

/**
 * Landing-page showcase: two endless rows of live components, blocks and charts
 * drifting in opposite directions — top to the left, bottom to the right.
 */
export function ShowcaseWall({ className }: { className?: string }) {
  return (
    <div className={cx("relative [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]", className)}>
      {/* 0.72 on phones keeps card text legible (~1.5 cards in view); it grows toward 0.92 on wide screens. */}
      <div className="flex flex-col gap-5 text-left [zoom:0.72] sm:[zoom:0.72] lg:[zoom:0.8] 2xl:[zoom:0.92]">
        <MarqueeRow>{rowOne}</MarqueeRow>
        <MarqueeRow reverse>{rowTwo}</MarqueeRow>
      </div>
    </div>
  );
}
