"use client";

import { ArrowDown, ArrowRight, Globe, MoreHorizontal, MousePointerClick, Plus, Rocket, Sparkles, TrendingUp, Banknote, UserCheck } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardFooter, CardHeader, IconTile } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Menu, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu";
import { ScoreMeter } from "@/components/ui/score-meter";
import { cx } from "@/utils/cx";

export interface ProspectRow {
  name: string;
  title: string;
  company: string;
  signal: string;
  signalKind: string;
  score: number;
}

const signalIcon: Record<string, { Icon: typeof Globe; className: string }> = {
  funding: { Icon: Banknote, className: "text-error" },
  role: { Icon: UserCheck, className: "text-warning" },
  launch: { Icon: Rocket, className: "text-info" },
  expansion: { Icon: Globe, className: "text-success" },
  intent: { Icon: MousePointerClick, className: "text-accent" },
  growth: { Icon: TrendingUp, className: "text-avatar-rose-fg" },
};

/** AI-ranked prospect table with buying signal, score meter and row actions. */
export function ProspectsTable({ rows, className }: { rows: readonly ProspectRow[]; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader
        icon={
          <IconTile>
            <Sparkles />
          </IconTile>
        }
        title="AI recommended prospects"
        description="Ranked by ICP fit and fresh buying signals · refreshed 7:00 AM"
        actions={
          <Button size="sm" trailingIcon={<ArrowRight />}>
            View all
          </Button>
        }
      />
      <CardBody className="overflow-x-auto p-3">
        {/* Same table language as Team Members: rounded bg-subtle header pill, 12px rows, hairline separators. */}
        <table className="w-full min-w-[600px] border-separate border-spacing-0 text-left text-base">
          <thead>
            <tr className="text-sm text-fg-muted [&>th]:h-10 [&>th]:bg-subtle [&>th]:px-3 [&>th]:font-normal [&>th:first-child]:rounded-l-[10px] [&>th:last-child]:rounded-r-[10px]">
              <th scope="col">Prospect</th>
              <th scope="col">Why now</th>
              <th scope="col" aria-sort="descending">
                <span className="inline-flex items-center gap-1">
                  AI score <ArrowDown aria-hidden className="size-3 text-fg" />
                </span>
              </th>
              <th scope="col" className="w-20">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const sig = signalIcon[p.signalKind] ?? signalIcon.intent!;
              return (
                <tr key={p.name} className="hover:bg-subtle [&>td]:border-b [&>td]:border-line-subtle [&>td]:px-3 [&>td]:py-3 [&:last-child>td]:border-0">
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar name={p.name} size="lg" />
                      <div className="min-w-0 max-w-44">
                        <div className="truncate font-medium text-fg">{p.name}</div>
                        <div className="truncate text-sm text-fg-muted">
                          {p.title} · {p.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="inline-flex items-center gap-2 whitespace-nowrap text-fg">
                      <sig.Icon aria-hidden className={cx("size-4", sig.className)} />
                      {p.signal}
                    </span>
                  </td>
                  <td>
                    <ScoreMeter score={p.score} />
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-0.5">
                      <IconButton variant="ghost" size="sm" aria-label={`Add ${p.name} to list`}>
                        <Plus />
                      </IconButton>
                      <MenuTrigger>
                        <IconButton variant="ghost" size="sm" aria-label={`More actions for ${p.name}`}>
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
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter>38 new matches since yesterday · {rows.length} shown</CardFooter>
    </Card>
  );
}
