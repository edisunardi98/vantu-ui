import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-page";
import { EntryGrid } from "@/components/docs/entry-grid";
import { examples } from "@/examples";
import { blocks } from "@/lib/registry";

export const metadata: Metadata = { title: "Blocks" };

export default function BlocksPage() {
  return (
    <>
      <DocHeader
        eyebrow="Blocks"
        title={`${blocks.length} blocks`}
        description="Page-level patterns assembled from components: navigation shells, KPI strips, AI tables, charts and auth."
      />
      <EntryGrid entries={blocks} examples={examples} wide />
    </>
  );
}
