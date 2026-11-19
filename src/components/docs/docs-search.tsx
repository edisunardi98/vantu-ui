"use client";

import { CornerDownLeft, FileText, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { Autocomplete, Dialog, Header, Input, Menu, MenuItem, MenuSection, Modal, ModalOverlay, SearchField, useFilter } from "react-aria-components";
import { Kbd } from "@/components/ui/kbd";
import { navSections } from "./docs-nav";

const SearchContext = createContext<{ open: () => void }>({ open: () => {} });

/** Opens the docs search palette; also bound to ⌘K / Ctrl+K anywhere in the docs. */
export const useDocsSearch = () => useContext(SearchContext);

export function DocsSearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const { contains } = useFilter({ sensitivity: "base" });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SearchContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <ModalOverlay isOpen={isOpen} onOpenChange={setOpen} isDismissable className="fixed inset-0 z-50 flex items-start justify-center bg-inverse/30 p-4 pt-[12vh] backdrop-blur-[1px]">
        <Modal className="w-full max-w-[560px] outline-none">
          <Dialog aria-label="Search documentation" className="overflow-hidden rounded-lg bg-surface shadow-popover outline-none">
            <Autocomplete filter={contains}>
              <SearchField aria-label="Search documentation" autoFocus className="flex h-12 items-center gap-2.5 border-b border-line px-4">
                <Search aria-hidden className="size-4 text-fg-muted" />
                <Input placeholder="Search components, blocks, charts, docs…" className="h-full flex-1 bg-transparent text-base outline-none placeholder:text-fg-muted [&::-webkit-search-cancel-button]:hidden" />
                <Kbd>esc</Kbd>
              </SearchField>
              <Menu
                aria-label="Pages"
                onAction={(key) => {
                  setOpen(false);
                  router.push(String(key));
                }}
                renderEmptyState={() => <div className="px-4 py-10 text-center text-base text-fg-muted">No pages found.</div>}
                className="max-h-[min(60vh,420px)] overflow-auto p-1.5 outline-none"
              >
                {navSections.map((s) => (
                  <MenuSection key={s.title} className="mb-1 last:mb-0">
                    <Header className="px-2.5 pb-1 pt-2 text-label text-[10px] text-fg-muted">{s.title}</Header>
                    {s.links.map((l) => (
                      <MenuItem
                        key={l.href}
                        id={l.href}
                        textValue={`${l.label} ${s.title}`}
                        className="group flex h-9 cursor-default items-center gap-2.5 rounded-sm px-2.5 text-base text-fg outline-none data-focused:bg-muted [&_svg]:size-4 [&_svg]:text-fg-muted"
                      >
                        {l.icon ?? <FileText />}
                        <span className="flex-1 truncate">{l.label}</span>
                        <CornerDownLeft className="!size-3.5 opacity-0 group-data-focused:opacity-100" />
                      </MenuItem>
                    ))}
                  </MenuSection>
                ))}
              </Menu>
            </Autocomplete>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </SearchContext.Provider>
  );
}

/** The sidebar's "Quick search ⌘K" field. */
export function SearchTrigger() {
  const { open } = useDocsSearch();
  return (
    <button
      type="button"
      onClick={open}
      className="flex h-9 w-full items-center gap-2 rounded-md bg-surface px-3 text-base text-fg-muted shadow-button outline-none transition-colors hover:text-fg-secondary focus-visible:shadow-focus"
    >
      <Search className="size-4" aria-hidden />
      <span className="flex-1 text-left">Quick search</span>
      <Kbd>⌘K</Kbd>
    </button>
  );
}
