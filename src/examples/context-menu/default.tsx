"use client";

import { Copy, Download, List, Send, Trash2 } from "lucide-react";
import { useState } from "react";
import { ContextMenu } from "@/components/ui/context-menu";
import { MenuItem } from "@/components/ui/menu";

export default function Example() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ContextMenu
        onAction={(key) => setLast(String(key))}
        target={
          <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-line-strong bg-surface text-base text-fg-muted">
            Right-click here (or focus and press Shift+F10)
          </div>
        }
      >
        <MenuItem id="list" icon={<List />} shortcut="L">Add to list</MenuItem>
        <MenuItem id="sequence" icon={<Send />} shortcut="S">Start sequence</MenuItem>
        <MenuItem id="copy" icon={<Copy />} shortcut="⌘C">Copy email</MenuItem>
        <MenuItem id="export" icon={<Download />}>Export</MenuItem>
        <MenuItem id="delete" icon={<Trash2 />} danger>Delete</MenuItem>
      </ContextMenu>
      <p className="text-sm text-fg-muted">{last ? `Last action: ${last}` : "No action yet."}</p>
    </div>
  );
}
