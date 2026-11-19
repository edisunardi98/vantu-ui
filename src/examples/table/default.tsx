"use client";

import { useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";
import { Badge } from "@/components/ui/badge";
import { Cell, Column, Row, Table, TableBody, TableContainer, TableHeader } from "@/components/ui/table";

const rows = [
  { id: "1", company: "Ledgerly", owner: "Jordan Blake", stage: "Negotiation", value: 48000 },
  { id: "2", company: "Northpeak", owner: "Leah Moss", stage: "Discovery", value: 22000 },
  { id: "3", company: "Fathom Data", owner: "Priya Raman", stage: "Proposal", value: 36500 },
  { id: "4", company: "Plinth", owner: "Samuel Ortiz", stage: "Discovery", value: 12000 },
];

export default function Example() {
  const [sort, setSort] = useState<SortDescriptor>({ column: "value", direction: "descending" });
  const sorted = useMemo(() => {
    const k = sort.column as keyof (typeof rows)[number];
    const dir = sort.direction === "ascending" ? 1 : -1;
    return [...rows].sort((a, b) => (a[k] > b[k] ? 1 : -1) * dir);
  }, [sort]);
  return (
    <TableContainer className="w-full">
      <Table aria-label="Deals" selectionMode="multiple" sortDescriptor={sort} onSortChange={setSort} className="min-w-[520px]">
        <TableHeader>
          <Column id="company" isRowHeader allowsSorting>Company</Column>
          <Column id="owner" allowsSorting>Owner</Column>
          <Column id="stage">Stage</Column>
          <Column id="value" allowsSorting className="text-right">Value</Column>
        </TableHeader>
        <TableBody items={sorted}>
          {(r) => (
            <Row id={r.id}>
              <Cell className="font-medium">{r.company}</Cell>
              <Cell className="text-fg-secondary">{r.owner}</Cell>
              <Cell>
                <Badge size="sm" tone={r.stage === "Negotiation" ? "success" : r.stage === "Proposal" ? "accent" : "neutral"}>{r.stage}</Badge>
              </Cell>
              <Cell className="text-right tabular">${r.value.toLocaleString("en-US")}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
