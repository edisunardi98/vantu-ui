"use client";

import { BookOpen, Bot, Boxes, ChartColumn, ChevronDown, Download, LayoutGrid, LayoutTemplate, Palette, Ruler, Type, Wand2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { navItemClass, sectionLabelClass } from "@/components/ui/nav-item";
import { blocks, charts, componentGroups, components, templates } from "@/lib/registry";
import { cx } from "@/utils/cx";

export type NavLink = { href: string; label: string; icon?: ReactNode; isNew?: boolean };
export type NavSection = { title: string; links: NavLink[] };

/** Every docs page, grouped the way the sidebar shows them. Also feeds search and breadcrumbs. */
export const navSections: NavSection[] = [
  {
    title: "Getting started",
    links: [
      { href: "/docs", label: "Introduction", icon: <BookOpen /> },
      { href: "/docs/installation", label: "Installation", icon: <Download /> },
      { href: "/docs/ai", label: "Using with AI", icon: <Bot />, isNew: true },
      { href: "/docs/agent-skill", label: "Agent skill", icon: <Wand2 />, isNew: true },
    ],
  },
  {
    title: "Foundations",
    links: [
      { href: "/foundations/colors", label: "Color", icon: <Palette /> },
      { href: "/foundations/typography", label: "Typography", icon: <Type /> },
      { href: "/foundations/spacing", label: "Spacing & radius", icon: <Ruler /> },
      { href: "/components", label: "Components", icon: <LayoutGrid /> },
      { href: "/blocks", label: "Blocks", icon: <Boxes /> },
      { href: "/charts", label: "Charts", icon: <ChartColumn /> },
      { href: "/templates", label: "Templates", icon: <LayoutTemplate /> },
    ],
  },
  ...componentGroups.map((g) => ({
    title: g,
    links: components.filter((c) => c.group === g).map((c) => ({ href: `/components/${c.slug}`, label: c.name, isNew: c.isNew })),
  })),
  { title: "Blocks", links: blocks.map((b) => ({ href: `/blocks/${b.slug}`, label: b.name, isNew: b.isNew })) },
  { title: "Charts", links: charts.map((c) => ({ href: `/charts/${c.slug}`, label: c.name, isNew: c.isNew })) },
  { title: "Templates", links: templates.map((t) => ({ href: `/templates#${t.slug}`, label: t.name })) },
];

/** Find the nav link and section for a pathname. */
export function findNav(pathname: string) {
  for (const s of navSections) {
    const link = s.links.find((l) => l.href === pathname);
    if (link) return { section: s, link };
  }
  return null;
}

const STORAGE_KEY = "vantu-docs-collapsed";

export function NewBadge() {
  return <span className="ml-auto rounded-[5px] bg-accent-soft px-1.5 py-px text-[10px] font-semibold tracking-wide text-accent-text">NEW</span>;
}

/**
 * Collapsible sections whose links use the same look as the <NavItem> component.
 * Every section's links hang off a tree guide on the left.
 * Collapsed sections are remembered per browser.
 */
export function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCollapsed(JSON.parse(saved));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggle = (title: string) =>
    setCollapsed((c) => {
      const next = { ...c, [title]: !c[title] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-1 text-base">
      {navSections.map((s) => {
        const hasActive = s.links.some((l) => l.href === pathname);
        const open = !collapsed[s.title] || hasActive;
        const id = `nav-${s.title.toLowerCase().replace(/\W+/g, "-")}`;
        // Every section's links hang off a tree guide.
        const tree = true;
        return (
          <div key={s.title}>
            {/* Same look as the product sidebar's SectionLabel, plus a chevron to fold the section. */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls={id}
              onClick={() => toggle(s.title)}
              className={cx(
                sectionLabelClass,
                "flex w-full items-center justify-between rounded-sm outline-none transition-colors hover:text-fg-secondary focus-visible:shadow-focus",
              )}
            >
              {s.title}
              <ChevronDown aria-hidden className={cx("size-3.5 transition-transform duration-200", !open && "-rotate-90")} />
            </button>
            {open && (
              <ul id={id} className={cx("flex flex-col gap-0.5", tree && "ml-3.5")}>
                {s.links.map((l, i) => {
                  const active = pathname === l.href;
                  const last = i === s.links.length - 1;
                  return (
                    <li
                      key={l.href}
                      className={cx(
                        tree && "relative pl-3.5",
                        // Tree guide: a vertical rail with a tick to each item; the last item ends in a rounded elbow.
                        tree &&
                          (last
                            ? "before:absolute before:left-0 before:top-0 before:h-1/2 before:w-2.5 before:rounded-bl-[6px] before:border-b before:border-l before:border-line before:content-['']"
                            : "before:absolute before:-bottom-0.5 before:left-0 before:top-0 before:w-px before:bg-line before:content-[''] after:absolute after:left-0 after:top-1/2 after:h-px after:w-2.5 after:bg-line after:content-['']"),
                      )}
                    >
                      {/* Same look as the <NavItem> component; next/link keeps client-side navigation. */}
                      <Link
                        href={l.href}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        data-active={active || undefined}
                        className={navItemClass({ active, size: "sm" })}
                      >
                        {l.icon}
                        <span className="flex-1 truncate">{l.label}</span>
                        {l.isNew && <NewBadge />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
