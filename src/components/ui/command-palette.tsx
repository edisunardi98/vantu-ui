"use client";

import { CornerDownLeft, Search } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { Autocomplete, Dialog, Header, Input, Menu, MenuItem, MenuSection, Modal, ModalOverlay, SearchField, useFilter } from "react-aria-components";
import { Kbd } from "./kbd";

export interface CommandItem {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Right-aligned hint: a shortcut or a type label. */
  meta?: ReactNode;
  /** Extra words to match while filtering. */
  keywords?: string;
}

export interface CommandGroup {
  title: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommandGroup[];
  onAction: (id: string) => void;
  placeholder?: string;
  /** Bind ⌘K / Ctrl+K to toggle. Default true. */
  shortcut?: boolean;
}

/** ⌘K palette: modal search over grouped commands with keyboard navigation. */
export function CommandPalette({ isOpen, onOpenChange, groups, onAction, placeholder = "Type a command or search…", shortcut = true }: CommandPaletteProps) {
  const { contains } = useFilter({ sensitivity: "base" });

  useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!isOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onOpenChange, shortcut]);

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable className="fixed inset-0 z-50 flex items-start justify-center bg-inverse/30 p-4 pt-[12vh] backdrop-blur-[1px]">
      <Modal className="w-full max-w-[560px] outline-none">
        <Dialog aria-label="Command palette" className="overflow-hidden rounded-lg bg-surface shadow-popover outline-none">
          <Autocomplete filter={contains}>
            <SearchField aria-label="Search commands" autoFocus className="flex h-12 items-center gap-2.5 border-b border-line px-4">
              <Search aria-hidden className="size-4 text-fg-muted" />
              <Input placeholder={placeholder} className="h-full flex-1 bg-transparent text-base outline-none placeholder:text-fg-muted [&::-webkit-search-cancel-button]:hidden" />
              <Kbd>esc</Kbd>
            </SearchField>
            <Menu
              aria-label="Commands"
              onAction={(key) => {
                onOpenChange(false);
                onAction(String(key));
              }}
              renderEmptyState={() => <div className="px-4 py-10 text-center text-base text-fg-muted">No results.</div>}
              className="max-h-[min(60vh,400px)] overflow-auto p-1.5 outline-none"
            >
              {groups.map((g) => (
                <MenuSection key={g.title} className="mb-1 last:mb-0">
                  <Header className="px-2.5 pb-1 pt-2 text-label text-[10px] text-fg-muted">{g.title}</Header>
                  {g.items.map((it) => (
                    <MenuItem
                      key={it.id}
                      id={it.id}
                      textValue={`${it.label} ${it.keywords ?? ""}`}
                      className="group flex h-9 cursor-default items-center gap-2.5 rounded-sm px-2.5 text-base text-fg outline-none data-focused:bg-muted [&_svg]:size-4 [&_svg]:text-fg-secondary"
                    >
                      {it.icon}
                      <span className="flex-1 truncate">{it.label}</span>
                      {it.meta && <span className="text-sm text-fg-muted group-data-focused:hidden">{it.meta}</span>}
                      <CornerDownLeft className="hidden !size-3.5 group-data-focused:block" aria-hidden />
                    </MenuItem>
                  ))}
                </MenuSection>
              ))}
            </Menu>
          </Autocomplete>
          <footer className="flex items-center gap-4 border-t border-line bg-subtle px-4 py-2.5 text-sm text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <Kbd>↑↓</Kbd> Navigate
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>↵</Kbd> Run
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>esc</Kbd> Close
            </span>
          </footer>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
