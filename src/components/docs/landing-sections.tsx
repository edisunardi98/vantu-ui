import { ArrowRight, Bot, Code2, ExternalLink, FileText, LayoutTemplate, MessageCircleQuestion, Package, Wand2, Workflow } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { registryUrl, siteUrl } from "@/lib/ai";
import { blocks, charts, components, templates } from "@/lib/registry";
import { AgentLogos } from "./agent-logos";
import { CodeBlock } from "./code-block";
import { IsoScene } from "./iso/iso-scene";
import { ScaledFrame } from "./scaled-frame";

/** Centered section header: icon pill, title, one-line description — same pattern as "Components & Blocks". */
function SectionHeader({ icon, eyebrow, title, description, action }: { icon: ReactNode; eyebrow: string; title: ReactNode; description: ReactNode; action?: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface py-1 pl-2.5 pr-3 text-sm font-medium text-fg shadow-button [&_svg]:size-3.5 [&_svg]:text-fg-muted">
        {icon}
        {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl font-semibold tracking-tight text-fg">{title}</h2>
      <p className="mt-3 text-lg text-fg-secondary">{description}</p>
      {action}
    </div>
  );
}

const sectionClass = "mx-auto mt-28 max-w-[1200px] px-4 sm:px-6";

/* ---------------- How it works ---------------- */

const steps = [
  {
    scene: "file-upload",
    title: "Add the tokens",
    text: "One command adds the theme tokens, type styles and the cx helper. Import globals.css once.",
    code: `npx shadcn@latest add \\\n  ${registryUrl("vantu-base")}`,
    lang: "bash" as const,
  },
  {
    scene: "command-palette",
    title: "Copy what you need",
    text: "Install any component, block, chart or template by address — or copy its source from the docs.",
    code: `npx shadcn@latest add \\\n  ${registryUrl("data-table")}`,
    lang: "bash" as const,
  },
  {
    scene: "color-picker",
    title: "Make it yours",
    text: "It’s plain React + Tailwind in your repo. Change tokens for your brand or edit the file directly.",
    code: `@theme {\n  --color-accent: #635bff;\n}`,
    lang: "css" as const,
  },
];

export function HowItWorks() {
  return (
    <section className={sectionClass}>
      <SectionHeader icon={<Workflow />} eyebrow="How it works" title="From install to shipped screen in three steps" description="No runtime package and no lock-in — the code lands in your project and stays yours." />
      <ol className="mt-12 grid gap-4 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="group flex flex-col rounded-lg border border-line bg-subtle p-1 shadow-card">
            {/* Isometric illustration — the same line art as the docs thumbnails */}
            <IsoScene slug={s.scene} label={`${s.title} illustration`} className="h-44 overflow-hidden rounded-[12px] border border-line bg-subtle px-2 pt-2" />
            <div className="flex items-baseline gap-2 px-3 pb-3 pt-3.5">
              <span className="text-sm font-medium tabular-nums text-accent-text">0{i + 1}</span>
              <h3 className="text-lg font-medium text-fg">{s.title}</h3>
            </div>
            <div className="flex flex-1 flex-col gap-4 rounded-[12px] border border-line bg-surface p-4">
              <p className="text-base text-fg-secondary">{s.text}</p>
              <CodeBlock variant="shell" title={s.lang === "bash" ? "Terminal" : "styles/theme.css"} code={s.code} lang={s.lang} className="mt-auto" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- Templates ---------------- */

const featured = ["home-dashboard", "team-dashboard", "calendar"];

export function TemplatesShowcase() {
  const items = featured.map((slug) => templates.find((t) => t.slug === slug)!).filter(Boolean);
  return (
    <section className={sectionClass}>
      <SectionHeader
        icon={<LayoutTemplate />}
        eyebrow="Templates"
        title="Full screens, ready to adapt"
        description={`${templates.length} dashboard screens assembled from the same blocks — CRM, team, calendar, members, settings, auth and onboarding.`}
        action={
          <Link href="/templates" className="group mt-6 inline-flex items-center gap-1.5 text-base font-medium text-fg hover:text-accent-text">
            Browse all templates
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        }
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {items.map((t) => (
          <article key={t.slug} className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-subtle p-1 shadow-card transition-shadow hover:shadow-popover has-[a:focus-visible]:shadow-focus">
            <div className="overflow-hidden rounded-[12px] border border-line bg-surface">
              <ScaledFrame src={`/preview/${t.slug}`} title={`${t.name} preview`} />
            </div>
            <div className="px-3 pb-3 pt-3">
              <h3 className="flex items-center justify-between gap-2 font-medium text-fg">
                <Link href={`/templates#${t.slug}`} className="outline-none after:absolute after:inset-0 after:rounded-lg after:content-['']">
                  {t.name}
                </Link>
                <ExternalLink aria-hidden className="size-3.5 text-fg-muted transition-colors group-hover:text-fg" />
              </h3>
              <p className="mt-0.5 line-clamp-2 text-sm text-fg-muted">{t.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Built for AI agents ---------------- */

const aiPoints = [
  { icon: <FileText />, title: "llms.txt", text: "An index and the full docs of every item, so assistants pick the right one." },
  { icon: <Package />, title: "Registry addresses", text: `${components.length + blocks.length + charts.length + templates.length} items installable by URL — source, dependencies and tokens included.` },
  { icon: <Wand2 />, title: "Agent skill", text: "A Claude Code skill and always-on rules that keep generated UI on-system." },
];

export function AISection() {
  return (
    <section className={sectionClass}>
      <div className="grid items-center gap-10 rounded-[20px] border border-line bg-subtle p-6 shadow-card sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface py-1 pl-2.5 pr-3 text-sm font-medium text-fg shadow-button">
            <Bot className="size-3.5 text-fg-muted" />
            Built for AI agents
          </span>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-fg">Let your coding assistant build with Vantu</h2>
          <p className="mt-3 text-lg text-fg-secondary">Claude Code, Cursor and Copilot can find the right item, read its props and install it — without guessing.</p>
          <AgentLogos className="mt-5" />
          <ul className="mt-8 flex flex-col gap-5">
            {aiPoints.map((p) => (
              <li key={p.title} className="flex gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-line bg-surface text-fg-secondary shadow-button [&_svg]:size-4">{p.icon}</span>
                <div>
                  <div className="font-medium text-fg">{p.title}</div>
                  <p className="text-base text-fg-secondary">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs/ai"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-linear-to-b from-accent-light to-accent px-4 text-base font-medium text-white shadow-button-primary outline-none hover:to-accent-hover focus-visible:ring-3 focus-visible:ring-accent/25"
            >
              Using with AI <ArrowRight className="size-4" />
            </Link>
            <Link href="/docs/agent-skill" className="inline-flex h-10 items-center rounded-md bg-surface px-4 text-base font-medium text-fg shadow-button outline-none hover:bg-subtle focus-visible:shadow-focus">
              Agent skill
            </Link>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <CodeBlock variant="shell" title="Point your assistant at the docs" lang="bash" code={`${siteUrl}/llms.txt`} />
          <CodeBlock variant="shell" title="Install the agent skill" lang="bash" code={`npx shadcn@latest add ${registryUrl("vantu-skill")}`} />
          <CodeBlock
            variant="shell"
            title="Prompt"
            lang="markdown"
            code={`Read ${siteUrl}/llms.txt, then build our\nCRM overview with Vantu: a Metrics Strip,\nan Area Chart vs. last year and a Data Table\nof deals.`}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What stack does Vantu UI need?",
    a: "React 19 and Tailwind CSS v4. Interactive components are built on React Aria, icons come from lucide-react, and everything is written in TypeScript. The docs use Next.js, but any React setup with Tailwind v4 works.",
  },
  {
    q: "Do I install a package?",
    a: (
      <>
        No. Vantu is copy-in: each component, block, chart or template is source you add to your project — with the shadcn CLI from its registry address, or by copying it from its docs
        page. There is no runtime package to update or lock you in.
      </>
    ),
  },
  {
    q: "Can I use my own brand colors?",
    a: (
      <>
        Yes. Every color, radius, shadow and type style is a token in <code className="rounded-xs bg-muted px-1 font-mono text-[13px] text-fg">styles/theme.css</code>. Change the
        accent and surfaces there and every component follows.
      </>
    ),
  },
  {
    q: "Is there a dark mode?",
    a: (
      <>
        The design ships light mode today. Because colors are tokens, a dark theme is one override block in <code className="rounded-xs bg-muted px-1 font-mono text-[13px] text-fg">theme.css</code> —
        see <Link href="/docs/installation" className="font-medium text-accent-text hover:underline">Installation</Link>.
      </>
    ),
  },
  {
    q: "How accessible are the components?",
    a: "Interactive components use React Aria for keyboard support, focus management and screen-reader semantics. Charts include hover and keyboard tooltips plus a screen-reader table, and colors were checked for contrast and color-vision deficiency.",
  },
  {
    q: "How do AI assistants use Vantu?",
    a: (
      <>
        Point them at <code className="rounded-xs bg-muted px-1 font-mono text-[13px] text-fg">/llms.txt</code>, let them install items from their registry addresses, or add the Claude Code
        skill. See <Link href="/docs/ai" className="font-medium text-accent-text hover:underline">Using with AI</Link>.
      </>
    ),
  },
];

export function FAQ() {
  return (
    <section className={sectionClass}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface py-1 pl-2.5 pr-3 text-sm font-medium text-fg shadow-button">
            <MessageCircleQuestion className="size-3.5 text-fg-muted" />
            FAQ
          </span>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-fg">Questions, answered</h2>
          <p className="mt-3 text-lg text-fg-secondary">Everything about the stack, installing, theming and using Vantu with AI.</p>
          <Link href="/docs" className="group mt-6 inline-flex items-center gap-1.5 text-base font-medium text-fg hover:text-accent-text">
            <Code2 className="size-4" /> Read the docs
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <Accordion defaultExpandedKeys={["faq-0"]}>
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} id={`faq-${i}`} title={f.q}>
              {f.a}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
