import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-page";
import { EntryGrid } from "@/components/docs/entry-grid";
import { examples } from "@/examples";
import { charts } from "@/lib/registry";

export const metadata: Metadata = { title: "Charts" };

export default function ChartsPage() {
  return (
    <>
      <DocHeader
        eyebrow="Charts"
        title={`${charts.length} charts`}
        description="Plain-SVG charts with no chart library: one validated palette, hover tooltips, keyboard scrubbing and a screen-reader table on every chart."
      />
      <EntryGrid entries={charts} examples={examples} wide />
    </>
  );
}
