"use client";

import { Building2, CornerDownLeft, List, Search, Send, Sparkles, Upload, User } from "lucide-react";
import type { ReactNode } from "react";
import { Autocomplete, Header, Input, Menu, MenuItem, MenuSection, SearchField, useFilter } from "react-aria-components";
import { Kbd } from "@/components/ui/kbd";

interface CommandItem {
  id: string;
  label: string;
  type: string;
  icon: ReactNode;
}

const sections: { title: string; items: CommandItem[] }[] = [
  {
    title: "Suggested",
    items: [
      { id: "ai", label: "Find prospects with AI", type: "Action", icon: <Sparkles /> },
      { id: "seq", label: "Create sequence", type: "Action", icon: <Send /> },
      { id: "csv", label: "Import CSV", type: "Action", icon: <Upload /> },
    ],
  },
  {
    title: "Recent",
    items: [
      { id: "sarah", label: "Sarah Chen — VP Sales, Ledgerly", type: "Prospect", icon: <User /> },
      { id: "ledgerly", label: "Ledgerly", type: "Company", icon: <Building2 /> },
      { id: "list", label: "Series B — VP Sales", type: "List · 128", icon: <List /> },
    ],
  },
];

/** ⌘K palette: search, grouped results with type meta, keyboard hints. */
export function CommandMenu({ onAction, autoFocus, className }: { onAction?: (id: string) => void; autoFocus?: boolean; className?: string }) {
  const { contains } = useFilter({ sensitivity: "base" });
  return (
    // Layered card shell: subtle frame (4px) → white panel → hints on the frame, like a card footer.
    <div className={`w-full max-w-[560px] rounded-lg border border-line bg-subtle p-1 shadow-popover ${className ?? ""}`}>
      <div className="overflow-hidden rounded-[12px] border border-line bg-surface">
      <Autocomplete filter={contains}>
        <SearchField aria-label="Search" autoFocus={autoFocus} className="flex h-12 items-center gap-2.5 border-b border-line px-4">
          <Search aria-hidden className="size-4 text-fg-muted" />
          <Input placeholder="Search prospects, companies, lists…" className="h-full flex-1 bg-transparent text-base outline-none placeholder:text-fg-muted [&::-webkit-search-cancel-button]:hidden" />
          <Kbd>esc</Kbd>
        </SearchField>
        <Menu
          aria-label="Commands"
          onAction={(key) => onAction?.(String(key))}
          renderEmptyState={() => <div className="px-4 py-8 text-center text-base text-fg-muted">No results</div>}
          className="max-h-80 overflow-auto p-1.5 outline-none"
        >
          {sections.map((s) => (
            <MenuSection key={s.title} className="mb-1 last:mb-0">
              <Header className="px-2.5 pb-1 pt-2 text-label text-[10px] text-fg-muted">{s.title}</Header>
              {s.items.map((it) => (
                <MenuItem
                  key={it.id}
                  id={it.id}
                  textValue={it.label}
                  className="flex h-9 cursor-default items-center gap-2.5 rounded-sm px-2.5 text-base text-fg outline-none data-focused:bg-muted [&_svg]:size-4 [&_svg]:text-fg-secondary"
                >
                  {it.icon}
                  <span className="flex-1 truncate">{it.label}</span>
                  <span className="text-sm text-fg-muted">{it.type}</span>
                </MenuItem>
              ))}
            </MenuSection>
          ))}
        </Menu>
      </Autocomplete>
      </div>
      <footer className="flex items-center gap-4 px-3 pb-1.5 pt-2.5 text-sm text-fg-muted">
        <span className="inline-flex items-center gap-1.5">
          <Kbd>↑↓</Kbd> Navigate
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Kbd>
            <CornerDownLeft className="size-3" />
          </Kbd>{" "}
          Open
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Kbd>⌘↵</Kbd> Open in new tab
        </span>
      </footer>
    </div>
  );
}
