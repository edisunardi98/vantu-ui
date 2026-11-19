"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AIInsight } from "@/components/ui/ai-insight";
import { AISearch } from "@/components/ui/ai-search";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { CriterionChip } from "@/components/ui/criterion-chip";
import { type ProgressStep, ProgressSteps } from "@/components/ui/progress-steps";

const initialCriteria = [
  { label: "Role", value: "VP Sales" },
  { label: "Industry", value: "B2B SaaS" },
  { label: "Employees", value: "50–500" },
  { label: "Location", value: "United States" },
  { label: "Signal", value: "Funding · 90 days" },
];

const stepLabels = [
  { label: "Identifying industries", meta: "3 industries" },
  { label: "Finding companies", meta: "412 companies" },
  { label: "Finding matching people", meta: "1,946 of ~2,400" },
  { label: "Ranking prospects", meta: "—" },
];

/**
 * AI search is the one prominent control. Parsed criteria are editable chips,
 * insights use one spark + violet eyebrow on a soft accent surface, and long
 * operations show named steps. Submit the query to replay the steps.
 */
export function AISearchPanel({ className }: { className?: string }) {
  const [criteria, setCriteria] = useState(initialCriteria);
  const [active, setActive] = useState(2);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => () => clearInterval(timer.current), []);

  const run = () => {
    clearInterval(timer.current);
    setActive(0);
    timer.current = setInterval(() => {
      setActive((a) => {
        if (a >= stepLabels.length) {
          clearInterval(timer.current);
          return a;
        }
        return a + 1;
      });
    }, 900);
  };

  const steps: ProgressStep[] = stepLabels.map((s, i) => ({
    label: s.label,
    meta: i < active ? s.meta : i === active ? s.meta : undefined,
    status: i < active ? "done" : i === active ? "active" : "pending",
  }));

  return (
    <Card className={className}>
      <CardHeader
        icon={
          <IconTile>
            <Sparkles />
          </IconTile>
        }
        title="AI prospect search"
        description="Describe who you want to reach — AI parses it into criteria"
      />
      <CardBody className="flex flex-col gap-5 p-4">
      <AISearch defaultValue="Find VP Sales at B2B SaaS companies with 50–500 employees in the US that recently raised funding." onSubmit={run} />
      <div className="flex flex-wrap gap-2">
        {criteria.map((c) => (
          <CriterionChip key={c.label} label={c.label} value={c.value} onRemove={() => setCriteria((x) => x.filter((y) => y.label !== c.label))} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <AIInsight meta="Updated 2h ago" headline="Strong fit — 92% ICP match" reason="Ledgerly raised a $40M Series B 12 days ago and opened 6 SDR roles." />
        <div className="rounded-lg border border-line bg-surface p-4">
          <ProgressSteps steps={steps} />
        </div>
      </div>
      </CardBody>
    </Card>
  );
}
