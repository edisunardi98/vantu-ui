"use client";

import { ListFilter } from "lucide-react";
import { TreeView, TreeViewItem } from "@/components/ui/tree-view";

export default function Example() {
  return (
    <TreeView aria-label="Lists" selectionMode="single" defaultExpandedKeys={["q4", "emea"]} defaultSelectedKeys={["series-b"]} className="w-72 rounded-lg border border-line bg-surface p-2">
      <TreeViewItem id="q4" label="Q4 Enterprise push" meta={3}>
        <TreeViewItem id="series-b" label="Series B — VP Sales" meta={128} />
        <TreeViewItem id="cro" label="New CROs" meta={42} />
        <TreeViewItem id="smart" label="High intent (smart)" icon={<ListFilter />} meta={86} />
      </TreeViewItem>
      <TreeViewItem id="emea" label="EMEA expansion" meta={2}>
        <TreeViewItem id="uk" label="UK Revenue Leaders" meta={74} />
        <TreeViewItem id="dach" label="DACH" meta={0}>
          <TreeViewItem id="berlin" label="Berlin fintech" meta={19} />
        </TreeViewItem>
      </TreeViewItem>
      <TreeViewItem id="archive" label="Archive" />
    </TreeView>
  );
}
