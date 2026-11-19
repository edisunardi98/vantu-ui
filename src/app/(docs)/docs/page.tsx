import { ArrowRight, Blocks, ChartColumn, Code2, PenTool, LayoutTemplate, Palette, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { DocHeader, DocSection, Prose } from "@/components/docs/doc-page";
import { blocks, charts, components, templates } from "@/lib/registry";

export const metadata: Metadata = { title: "Introduction" };

const cards = [
  { href: "/docs/installation", icon: Code2, title: "Installation", text: "Set up tokens, the cx helper and your first component." },
  { href: "/foundations/colors", icon: Palette, title: "Foundations", text: "Color, typography, spacing, radius and shadows." },
  { href: "/components", icon: Sparkles, title: `${components.length} components`, text: "Buttons, forms, data display, overlays and AI feedback." },
  { href: "/blocks", icon: Blocks, title: `${blocks.length} blocks`, text: "Sidebars, KPI strips, AI tables and auth." },
  { href: "/charts", icon: ChartColumn, title: `${charts.length} charts`, text: "Area, line, bar, donut, funnel and heatmap in plain SVG." },
  { href: "/templates", icon: LayoutTemplate, title: `${templates.length} templates`, text: "Full pages assembled from blocks." },
];

export default function IntroductionPage() {
  return (
    <>
      <DocHeader
        eyebrow="Getting started"
        title="Introduction"
        description="Vantu UI is a React design system for AI-powered SaaS dashboards. Components are plain React + Tailwind files you copy into your project and own."
      />
      <Prose>
        <p>
          The visual language comes straight from the <strong>Vantu UI</strong> Figma file: its 58 color variables, 43 scale
          variables and 18 typography variables are mirrored one-to-one in <code>styles/theme.css</code>. Button gradients, layered cards, score meters and
          AI insight patterns are built from its component pages.
        </p>
        <p>
          The structure follows the copy-in model: there is no runtime package and no lock-in. Each page shows a live preview, the example code, the files to
          copy and their props.
        </p>
      </Prose>

      <DocSection title="What’s inside">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="group rounded-lg border border-line bg-surface p-5 shadow-card outline-none transition-shadow hover:shadow-popover focus-visible:shadow-focus">
              <c.icon className="size-5 text-accent" />
              <div className="mt-4 flex items-center gap-1 font-medium text-fg">
                {c.title}
                <ArrowRight className="size-3.5 text-fg-muted transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-1 text-base text-fg-secondary">{c.text}</p>
            </Link>
          ))}
        </div>
      </DocSection>

      <DocSection title="Stack">
        <div className="divide-y divide-line rounded-lg border border-line">
          {[
            ["React", "19", "Server and client components"],
            ["Tailwind CSS", "v4", "Tokens defined with @theme"],
            ["React Aria Components", "1.22", "Keyboard, focus and screen-reader behavior"],
            ["lucide-react", "—", "Line icons, 16px default"],
            ["tailwind-merge", "3", "Used by the cx() helper"],
          ].map(([name, v, note]) => (
            <div key={name} className="grid grid-cols-[1fr_auto] gap-2 px-5 py-3 sm:grid-cols-[200px_80px_1fr]">
              <span className="font-medium text-fg">{name}</span>
              <span className="font-mono text-sm text-fg-muted">{v}</span>
              <span className="col-span-2 text-fg-secondary sm:col-span-1">{note}</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Source">
        <div className="flex items-start gap-3 rounded-lg border border-line bg-subtle p-5">
          <PenTool className="mt-0.5 size-5 shrink-0 text-fg-secondary" />
          <p className="text-base text-fg-secondary">
            Styles are extracted from the Vantu Figma file (pages <em>Style Guide</em> and <em>Component</em>). The file defines a light theme only, so
            Vantu UI ships light mode. Add a <code className="rounded-xs bg-muted px-1 font-mono text-[13px] text-fg">.dark</code> override block in{" "}
            <code className="rounded-xs bg-muted px-1 font-mono text-[13px] text-fg">theme.css</code> when you need one.
          </p>
        </div>
      </DocSection>
    </>
  );
}
