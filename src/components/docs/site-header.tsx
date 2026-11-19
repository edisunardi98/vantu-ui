"use client";

import { Bot, Boxes, ChartColumn, Check, ChevronDown, Download, LayoutGrid, LayoutTemplate, Menu as MenuIcon, Palette, Ruler, Search, Type, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { Kbd } from "@/components/ui/kbd";
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/menu";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { blocks, charts, components, templates } from "@/lib/registry";
import { cx } from "@/utils/cx";
import { DocsNav } from "./docs-nav";
import { DocsSearchProvider, useDocsSearch } from "./docs-search";
import { GitHubStars } from "./github-stars";
import { VantuMark } from "./vantu-mark";

interface NavEntry {
  href: string;
  label: string;
  text: string;
  icon: ReactNode;
}

const library: NavEntry[] = [
  { href: "/components", label: "Components", text: `${components.length} accessible building blocks`, icon: <LayoutGrid /> },
  { href: "/blocks", label: "Blocks", text: `${blocks.length} page sections, ready to drop in`, icon: <Boxes /> },
  { href: "/charts", label: "Charts", text: `${charts.length} plain-SVG charts with tooltips`, icon: <ChartColumn /> },
  { href: "/templates", label: "Templates", text: `${templates.length} full dashboard screens`, icon: <LayoutTemplate /> },
];

const resources: NavEntry[] = [
  { href: "/docs/installation", label: "Installation", text: "Tokens, the cx helper and setup", icon: <Download /> },
  { href: "/docs/ai", label: "Using with AI", text: "llms.txt, registry and agent skill", icon: <Bot /> },
  { href: "/foundations/colors", label: "Color", text: "Surfaces, accents and chart palette", icon: <Palette /> },
  { href: "/foundations/typography", label: "Typography", text: "Type scale and weights", icon: <Type /> },
  { href: "/foundations/spacing", label: "Spacing & radius", text: "Scale, radii and shadows", icon: <Ruler /> },
];

const VERSION = "v0.1";

const navText = "inline-flex h-9 items-center gap-1 rounded-sm px-3 text-base outline-none transition-colors focus-visible:shadow-focus";

/** Dropdown panel of icon + title + one-liner links. */
function NavDropdown({ label, items, active }: { label: string; items: NavEntry[]; active: boolean }) {
  return (
    <PopoverTrigger>
      <AriaButton className={cx(navText, "group", active ? "font-medium text-fg" : "text-fg-secondary hover:text-fg data-[pressed]:text-fg")}>
        {label}
        <ChevronDown aria-hidden className="size-3.5 text-fg-muted transition-transform group-aria-expanded:rotate-180" />
      </AriaButton>
      <Popover placement="bottom start" offset={14} className="w-[460px] rounded-[16px] border border-line">
        <ul className="-m-2 grid grid-cols-2 gap-1">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="group/item flex gap-3 rounded-md p-2.5 outline-none hover:bg-subtle focus-visible:shadow-focus">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-line bg-surface text-fg-secondary shadow-button group-hover/item:text-accent [&_svg]:size-4">
                  {it.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-base font-medium text-fg">{it.label}</span>
                  <span className="block text-sm text-fg-muted">{it.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Popover>
    </PopoverTrigger>
  );
}

function HeaderBar() {
  const pathname = usePathname();
  const search = useDocsSearch();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  const isIn = (items: NavEntry[]) => items.some((i) => pathname.startsWith(i.href));

  return (
    <header className="sticky top-3 z-40 px-3">
      <div className="mx-auto max-w-[1200px] rounded-[20px] border border-line bg-surface/90 shadow-popover backdrop-blur-md">
        <div className="flex h-16 items-center gap-2 pl-3 pr-2.5">
          {/* Mark + version */}
          <Link href="/" aria-label="Vantu UI home" className="rounded-[12px] outline-none focus-visible:shadow-focus">
            <VantuMark className="size-10 rounded-[11px] shadow-button-primary" />
          </Link>
          <MenuTrigger>
            <AriaButton
              aria-label={`Version ${VERSION}`}
              className="inline-flex h-7 items-center gap-1 rounded-sm border border-line bg-subtle px-2 text-sm font-medium text-fg-secondary outline-none hover:text-fg focus-visible:shadow-focus"
            >
              {VERSION}
              <ChevronDown aria-hidden className="size-3.5" />
            </AriaButton>
            <Menu aria-label="Version">
              <MenuItem icon={<Check />} textValue={`${VERSION} latest`}>
                {VERSION} · Latest
              </MenuItem>
            </Menu>
          </MenuTrigger>

          {/* Primary nav */}
          <nav aria-label="Main" className="ml-4 hidden items-center lg:flex">
            <NavDropdown label="Library" items={library} active={isIn(library)} />
            <Link href="/docs" className={cx(navText, pathname === "/docs" ? "font-medium text-fg" : "text-fg-secondary hover:text-fg")}>
              Docs
            </Link>
            <NavDropdown label="Resources" items={resources} active={isIn(resources)} />
          </nav>

          {/* Search, pushed right with its separator dot */}
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <span aria-hidden className="hidden size-1 rounded-full bg-line-strong lg:block" />
            <button
              type="button"
              onClick={search.open}
              className="flex h-10 w-72 items-center gap-2 rounded-[12px] border border-line bg-subtle pl-3 pr-1.5 text-base text-fg-muted outline-none transition-colors hover:border-line-strong focus-visible:shadow-focus"
            >
              <Search aria-hidden className="size-4" />
              <span className="flex-1 text-left">Quick search…</span>
              <Kbd>⌘K</Kbd>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-2">
            <button
              type="button"
              aria-label="Search"
              onClick={search.open}
              className="inline-flex size-10 items-center justify-center rounded-[12px] text-fg-secondary shadow-button outline-none focus-visible:shadow-focus md:hidden"
            >
              <Search className="size-4" />
            </button>
            <GitHubStars className="hidden sm:inline-flex" />
            <Link
              href="/docs/installation"
              className="hidden h-10 items-center rounded-[12px] bg-linear-to-b from-accent-light to-accent px-4 text-base font-medium text-white shadow-button-primary outline-none hover:to-accent-hover focus-visible:ring-3 focus-visible:ring-accent/25 sm:inline-flex"
            >
              Get started
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex size-10 items-center justify-center rounded-[12px] text-fg-secondary shadow-button outline-none focus-visible:shadow-focus lg:hidden"
            >
              {open ? <X className="size-4" /> : <MenuIcon className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile panel, inside the same floating card */}
        {open && (
          <div className="max-h-[calc(100dvh-104px)] overflow-y-auto border-t border-line px-3 py-4 lg:hidden">
            <div className="mb-4 grid grid-cols-2 gap-2">
              {[...library, { href: "/docs", label: "Docs", text: "", icon: null }].map((l) => (
                <Link key={l.href} href={l.href} className="rounded-md border border-line px-3 py-2 text-base font-medium">
                  {l.label}
                </Link>
              ))}
            </div>
            <DocsNav />
          </div>
        )}
      </div>
    </header>
  );
}

/** Floating, pill-shaped site navigation for the landing page; ⌘K opens the docs search. */
export function SiteHeader() {
  return (
    <DocsSearchProvider>
      <HeaderBar />
    </DocsSearchProvider>
  );
}
