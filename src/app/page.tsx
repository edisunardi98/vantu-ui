import { Accessibility, ArrowRight, Bot, Boxes, ChartColumn, FolderInput, LayoutGrid, LayoutTemplate, Palette, PenTool } from "lucide-react";
import Link from "next/link";
import { ComponentShowcase } from "@/components/docs/component-showcase";
import { AgentLogos } from "@/components/docs/agent-logos";
import { CtaSection } from "@/components/docs/cta-section";
import { IsoScene } from "@/components/docs/iso/iso-scene";
import { AISection, FAQ, HowItWorks, TemplatesShowcase } from "@/components/docs/landing-sections";
import { ShowcaseWall } from "@/components/docs/showcase-wall";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { TypedHeading } from "@/components/docs/typed-heading";
import { IconTile } from "@/components/ui/card";
import { blocks, charts, components, templates } from "@/lib/registry";
import { ReactAriaLogo, ReactLogo, TailwindLogo, TypeScriptLogo } from "@/components/docs/tech-logos";

/** Each feature is illustrated with one of the isometric component scenes. */
const features = [
  { scene: "slider", icon: <PenTool />, tone: "accent", title: "Tokens from Figma", text: "119 variables from the Vantu Figma file — color, scale and type — mirrored one-to-one as Tailwind v4 theme tokens." },
  { scene: "tree-view", icon: <FolderInput />, tone: "teal", title: "Copy in, own the code", text: "No runtime package and no lock-in. Each component is a plain React + Tailwind file you paste and edit." },
  { scene: "switch", icon: <Accessibility />, tone: "rose", title: "Accessible by default", text: "Every interactive component is built on React Aria: keyboard, focus management and screen readers handled." },
  { scene: "ai-insight", icon: <Bot />, tone: "orange", title: "AI-native patterns", text: "Score meters, AI insights, progress steps, command menus — the patterns AI SaaS products actually need." },
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-clip">
        {/* Hero */}
        <section className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_60%_at_50%_0%,var(--color-accent-soft)_0%,transparent_70%)]" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[linear-gradient(to_right,var(--color-line-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line-subtle)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
          <div className="relative mx-auto max-w-[1200px] px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
            <Link href="/components" data-track="cta_click" data-track-cta="hero_badge" data-track-location="hero" className="mx-auto inline-flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 text-sm text-fg-secondary shadow-button hover:text-fg">
              <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent-text">New</span>
              {components.length} components · {blocks.length} blocks · {charts.length} charts · designed in Figma by Vantu
              <ArrowRight className="size-3.5" />
            </Link>
            <TypedHeading
              words={["Dashboards", "Copilots", "Analytics", "Workflows"]}
              rest="built for AI SaaS"
              className="mx-auto mt-7 text-[42px] leading-[1] sm:text-[80px] lg:text-[112px]"
            />
            <p className="mx-auto mt-6 max-w-xl text-lg text-fg-secondary">
              Accessible React components, blocks, charts and templates — styled from Figma, built on React Aria and Tailwind CSS v4. Copy them in and own the code.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs/installation"
                data-track="cta_click" data-track-cta="get_started" data-track-location="hero"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-linear-to-b from-accent-light to-accent px-5 text-base font-medium text-white shadow-button-primary outline-none hover:to-accent-hover focus-visible:ring-3 focus-visible:ring-accent/25"
              >
                Get started <ArrowRight className="size-4" />
              </Link>
              <Link href="/components" data-track="cta_click" data-track-cta="browse_components" data-track-location="hero" className="inline-flex h-11 items-center rounded-md bg-surface px-5 text-base font-medium text-fg shadow-button outline-none hover:bg-subtle focus-visible:shadow-focus">
                Browse components
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-fg-muted">
              {(
                [
                  ["React 19", ReactLogo],
                  ["Tailwind CSS v4", TailwindLogo],
                  ["React Aria 1.22", ReactAriaLogo],
                  ["TypeScript", TypeScriptLogo],
                ] as const
              ).map(([t, Mark]) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface py-1 pl-2 pr-2.5">
                  <Mark className="size-3.5 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
            {/* Coding assistants Vantu works with (llms.txt, registry, agent skill) */}
            <AgentLogos className="mt-6 justify-center" ringClassName="ring-surface" />
          </div>
        </section>

        {/* Showcase wall — bleeds past the viewport like a canvas of live parts */}
        <section aria-label="Live components, blocks and charts">
          <ShowcaseWall />
        </section>

        {/* Stats */}
        <section className="mx-auto mt-16 max-w-[1200px] px-4 sm:px-6">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-5 [&>div:last-child]:col-span-2 md:[&>div:last-child]:col-span-1">
            {(
              [
                { n: components.length, label: "Components", icon: <LayoutGrid />, tone: "accent" },
                { n: blocks.length, label: "Blocks", icon: <Boxes />, tone: "teal" },
                { n: charts.length, label: "Charts", icon: <ChartColumn />, tone: "rose" },
                { n: templates.length, label: templates.length === 1 ? "Template" : "Templates", icon: <LayoutTemplate />, tone: "orange" },
                { n: 119, label: "Design tokens", icon: <Palette />, tone: "accent" },
              ] as const
            ).map((s) => (
              <div key={s.label} className="bg-surface px-6 py-6">
                <dt className="flex items-center gap-3 text-base text-fg-secondary">
                  {/* Decorative: the label beside it names the stat. */}
                  <span aria-hidden>
                    <IconTile tone={s.tone}>{s.icon}</IconTile>
                  </span>
                  {s.label}
                </dt>
                <dd className="mt-4 text-metric text-fg">{s.n}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Components & Blocks */}
        <ComponentShowcase />

        {/* How it works · Templates · Built for AI agents */}
        <HowItWorks />
        <TemplatesShowcase />
        <AISection />

        {/* Features */}
        <section className="mx-auto mt-28 max-w-[1200px] px-4 sm:px-6">
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="group bg-surface p-3 pb-6">
                <IsoScene slug={f.scene} label={`${f.title} illustration`} className="h-40 overflow-hidden rounded-[12px] border border-line bg-subtle px-2 pt-2" />
                <h3 className="mt-5 flex items-center gap-3 px-3 text-lg font-medium text-fg">
                  <span aria-hidden>
                    <IconTile tone={f.tone}>{f.icon}</IconTile>
                  </span>
                  {f.title}
                </h3>
                <p className="mt-1.5 px-3 text-base text-fg-secondary">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <FAQ />

        {/* CTA — isometric "dashboard being assembled" */}
        <CtaSection />

        <SiteFooter />
      </main>
    </>
  );
}
