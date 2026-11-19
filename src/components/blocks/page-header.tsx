"use client";

import { Download, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterButton } from "@/components/ui/filter";

export interface PageHeaderProps {
  title: string;
  description?: string;
  /** Optional status badge next to the title, e.g. "Active". */
  badge?: ReactNode;
  actions?: ReactNode;
}

const defaultActions = (
  <>
    <FilterButton label="Period" value="Last 7 days" />
    <Button leadingIcon={<Download />}>Export</Button>
    <Button variant="primary" leadingIcon={<Sparkles />}>
      Find prospects
    </Button>
  </>
);

/** Title (24 SemiBold, optional badge), description (16) and actions — secondary before primary, one primary per view. */
export function PageHeader({ title, description, badge, actions = defaultActions }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-semibold tracking-tight text-fg">{title}</h1>
          {typeof badge === "string" ? (
            <Badge variant="dot" tone="success">
              {badge}
            </Badge>
          ) : (
            badge
          )}
        </div>
        {description && <p className="mt-1.5 text-lg text-fg-secondary">{description}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-3">{actions}</div>
    </div>
  );
}
