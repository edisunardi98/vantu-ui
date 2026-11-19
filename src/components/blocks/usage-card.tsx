"use client";

import { Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, IconTile } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cx } from "@/utils/cx";

export interface UsageItem {
  label: string;
  value: number;
  max: number;
}

/** Plan usage for the current billing cycle. */
export function UsageCard({ items, compact, className }: { items: UsageItem[]; /** One column for narrow columns and side rails. */ compact?: boolean; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader
        icon={
          <IconTile tone="orange">
            <Gauge />
          </IconTile>
        }
        title="Usage this cycle"
        description="Growth plan · Sep 1 – Sep 30 · resets Oct 1"
        actions={<Button size="sm">Manage plan</Button>}
      />
      <div className={cx("grid gap-px overflow-hidden rounded-[12px] border border-line bg-line", compact ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-4")}>
        {items.map((u) => (
          <ProgressBar
            key={u.label}
            className="bg-surface p-4"
            label={u.label}
            value={u.value}
            max={u.max}
            showValue
            caption={`${Math.round((u.value / u.max) * 100)}% used`}
          />
        ))}
      </div>
    </Card>
  );
}
