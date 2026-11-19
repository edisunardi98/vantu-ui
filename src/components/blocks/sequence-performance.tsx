"use client";

import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { Delta, Metric } from "@/components/ui/metric";
import { cx } from "@/utils/cx";

export interface SequenceRow {
  name: string;
  rate: number;
  meetings: number;
}

/** Reply rate per sequence. Rows below the workspace average are shown in gray. */
export function SequencePerformance({ rows, average = 8.6, className }: { rows: SequenceRow[]; average?: number; className?: string }) {
  const max = Math.max(...rows.map((r) => r.rate), 1);
  return (
    <Card className={className}>
      <CardHeader
        icon={
          <IconTile tone="rose">
            <Send />
          </IconTile>
        }
        title="Sequence performance"
        description="Reply rate by active sequence · last 30 days"
        actions={
          <Button size="sm" trailingIcon={<ArrowRight />}>
            Sequences
          </Button>
        }
      />
      <CardBody>
        <div className="grid grid-cols-3 gap-px border-b border-line bg-line">
          <Metric size="md" className="bg-surface p-4" label="Avg. reply rate" value={`${average}%`} delta={<Delta value={0.7}>+0.7 pts</Delta>} />
          <Metric size="md" className="bg-surface p-4" label="Meetings" value="20" delta={<Delta value={5}>+5</Delta>} />
          <Metric size="md" className="bg-surface p-4" label="Emails sent" value="3,960" delta={<Delta value={11} />} />
        </div>
        <ul className="flex flex-col gap-4 p-4">
          {rows.map((r) => {
            const above = r.rate >= average;
            return (
              <li key={r.name} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_3rem_4rem] items-center gap-3 text-base">
                <span className="truncate text-fg">{r.name}</span>
                <span className="h-1.5 overflow-hidden rounded-full bg-active">
                  <span className={cx("block h-full rounded-full", above ? "bg-accent" : "bg-chart-neutral")} style={{ width: `${(r.rate / max) * 100}%` }} />
                </span>
                <span className="text-right tabular text-fg">{r.rate}%</span>
                <span className="text-right text-sm tabular text-fg-muted">{r.meetings} mtgs</span>
              </li>
            );
          })}
        </ul>
        <p className="px-4 pb-4 text-sm text-fg-muted">Sequences below the {average}% workspace average are shown in gray.</p>
      </CardBody>
    </Card>
  );
}
