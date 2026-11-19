import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { blocks, charts, components, templates } from "@/lib/registry";
import { Logo } from "./logo";

/** Author credit in the bottom row; the name links to this LinkedIn profile (empty = plain text). */
const AUTHOR = { name: "Edi Sunardi", linkedin: "https://www.linkedin.com/in/edi-sunardi/" };

type FooterLink = { label: string; href: string; count?: number; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Library",
    links: [
      { label: "Components", href: "/components", count: components.length },
      { label: "Blocks", href: "/blocks", count: blocks.length },
      { label: "Charts", href: "/charts", count: charts.length },
      { label: "Templates", href: "/templates", count: templates.length },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Using with AI", href: "/docs/ai" },
      { label: "Agent skill", href: "/docs/agent-skill" },
    ],
  },
  {
    title: "Foundations",
    links: [
      { label: "Color", href: "/foundations/colors" },
      { label: "Typography", href: "/foundations/typography" },
      { label: "Spacing & radius", href: "/foundations/spacing" },
    ],
  },
  {
    title: "For AI",
    links: [
      { label: "llms.txt", href: "/llms.txt", external: true },
      { label: "llms-full.txt", href: "/llms-full.txt", external: true },
      { label: "Registry", href: "/r/registry.json", external: true },
    ],
  },
];

const linkClass = "inline-flex items-center gap-1.5 rounded-xs text-base text-fg-secondary outline-none transition-colors hover:text-fg focus-visible:shadow-focus";

/** Landing-page footer: brand, four link columns and a small credit row. */
export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 max-w-[1200px] border-t border-line px-4 pb-10 pt-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,1fr))]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-base text-fg-secondary">Copy-in React components, blocks, charts and templates for AI-powered SaaS dashboards.</p>
          <ul className="mt-4 flex flex-wrap gap-1.5 text-sm text-fg-muted">
            {["React 19", "Tailwind CSS v4", "React Aria"].map((t) => (
              <li key={t} className="rounded-full border border-line bg-surface px-2 py-0.5">
                {t}
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-base font-medium text-fg">{col.title}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.external ? (
                    // Plain text files and JSON served by route handlers — a full page load, opened in a new tab.
                    <a href={l.href} target="_blank" rel="noopener" data-track="cta_click" data-track-cta="ai_file" data-track-location="footer" data-track-file={l.label} className={linkClass}>
                      <span className="font-mono text-[13px]">{l.label}</span>
                      <ArrowUpRight aria-hidden className="size-3.5 text-fg-muted" />
                    </a>
                  ) : (
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                      {l.count !== undefined && <span className="text-sm tabular-nums text-fg-muted">{l.count}</span>}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Vantu UI. Designed in Figma and built by Vantu.</p>
        <p>
          Created by{" "}
          {AUTHOR.linkedin ? (
            <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 font-medium text-fg hover:text-accent-text hover:underline">
              {AUTHOR.name}
              <ArrowUpRight aria-hidden className="size-3" />
              <span className="sr-only">(LinkedIn, opens in a new tab)</span>
            </a>
          ) : (
            <span className="font-medium text-fg">{AUTHOR.name}</span>
          )}
        </p>
      </div>
    </footer>
  );
}
