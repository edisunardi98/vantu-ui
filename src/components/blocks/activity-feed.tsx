"use client";

import { Activity, CalendarCheck, CornerUpLeft, MoreHorizontal, Send, Sparkles, Zap } from "lucide-react";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";

const defaultItems: TimelineItem[] = [
  { id: "1", icon: <CornerUpLeft />, title: "Priya Raman replied to “Quick question about Fathom’s SDR ramp”", meta: "12 min ago · Series B — VP Sales" },
  { id: "2", icon: <CalendarCheck />, title: "Meeting booked with Elena Vasquez for Thu, Sep 17", meta: "1h ago · Marco Silva" },
  { id: "3", icon: <Zap />, title: "24 prospects enriched · 22 verified emails", meta: "2h ago · Enrichment" },
  { id: "4", icon: <Send />, title: "“UK Revenue Leaders” started for 12 prospects", meta: "3h ago · Leah Moss" },
  { id: "5", icon: <Sparkles />, title: "AI found 38 new matches for “Series B — VP Sales”", meta: "7:00 AM · Saved search" },
];

/** Recent workspace activity on a timeline rail. */
export function ActivityFeed({ items = defaultItems, className }: { items?: TimelineItem[]; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader
        icon={
          <IconTile tone="teal">
            <Activity />
          </IconTile>
        }
        title="Recent activity"
        description="Across your workspace"
        actions={
          <IconButton size="sm" aria-label="Activity options">
            <MoreHorizontal />
          </IconButton>
        }
      />
      <CardBody className="p-4">
        <Timeline items={items} />
      </CardBody>
    </Card>
  );
}
