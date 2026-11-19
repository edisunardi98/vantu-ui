import { Bot, FileCode2, FileText, Package } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { DocHeader, DocSection, Prose } from "@/components/docs/doc-page";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { catalog, instructionsMd, registryUrl, siteUrl } from "@/lib/ai";

export const metadata: Metadata = {
  title: "Using with AI",
  description: "llms.txt, registry addresses and prompts — let your coding assistant find and add Vantu components.",
};

const prompts = [
  `Read ${siteUrl}/llms.txt, then build a CRM overview page with Vantu:
a Metrics Strip with sparklines, an Area Chart comparing this year to last year,
and a Data Table of deals with stage views and bulk actions.
Install each item with the shadcn CLI from its /r/<slug>.json address.`,
  `Use Vantu's Data Table block for our customers list. Read its docs at
${siteUrl}/blocks/data-table first, keep its structure and styles,
and only configure columns, views, search and bulk actions.`,
  `Review src/app/dashboard against Vantu's rules (${siteUrl}/llms.txt):
replace hand-built cards, tables and charts with Vantu items and list what you changed.`,
];

export default function UsingWithAIPage() {
  const count = catalog().length;
  return (
    <>
      <DocHeader
        eyebrow="Getting started"
        title="Using with AI"
        description="llms.txt, registry addresses and ready-made prompts — let Claude Code, Cursor, Copilot or any coding assistant find the right Vantu item and add it for you."
      />

      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        {[
          { icon: <FileText />, tone: "accent" as const, title: "llms.txt", text: "An index and the full docs of every item, in plain text." },
          { icon: <Package />, tone: "teal" as const, title: `${count} registry items`, text: "Each item has a shadcn address with its source and dependencies." },
          { icon: <Bot />, tone: "rose" as const, title: "Agent rules", text: "Always-on rules and a Claude Code skill keep output on-system." },
        ].map((c) => (
          <Card key={c.title}>
            <CardHeader icon={<IconTile tone={c.tone}>{c.icon}</IconTile>} title={c.title} />
            <CardBody className="p-4 text-base text-fg-secondary">{c.text}</CardBody>
          </Card>
        ))}
      </div>

      <DocSection id="llms-txt" title="llms.txt" description="No setup: point your assistant at the index, or at the full docs — descriptions, props and source of every item — in one file.">
        <CodeBlock variant="shell" title="Addresses" lang="bash" code={`${siteUrl}/llms.txt\n${siteUrl}/llms-full.txt`} />
      </DocSection>

      <DocSection
        id="registry"
        title="Install by address"
        description="Every component, block, chart and template has a shadcn registry address. Assistants can read it and run the install command for you; the theme tokens and the cx helper come along automatically."
      >
        <div className="flex flex-col gap-4">
          <CodeBlock variant="shell" title="Terminal" lang="bash" code={`npx shadcn@latest add ${registryUrl("data-table")}`} />
          <Prose>
            <p>
              Prefer short names? Add Vantu to <code>registries</code> in your <code>components.json</code>, then install with <code>@vantu/&lt;slug&gt;</code>:
            </p>
          </Prose>
          <CodeBlock
            variant="shell"
            title="components.json"
            lang="json"
            code={`{\n  "registries": {\n    "@vantu": "${siteUrl}/r/{name}.json"\n  }\n}`}
          />
          <CodeBlock variant="shell" title="Terminal" lang="bash" code={`npx shadcn@latest add @vantu/area-chart @vantu/metrics-strip`} />
          <Prose>
            <p>
              The full list lives at <a href={registryUrl("registry")}>{registryUrl("registry").replace(/^https?:\/\//, "")}</a>. Each item&rsquo;s JSON also works on its
              own — for example <a href={registryUrl("button")}>{`/r/button.json`}</a> — with the source, npm dependencies and a link to its docs.
            </p>
          </Prose>
        </div>
      </DocSection>

      <DocSection
        id="rules"
        title="Give your agent the rules"
        description="Paste these into AGENTS.md, CLAUDE.md or .cursor/rules/vantu.mdc so every change stays on-system. Claude Code users can install the full skill instead."
      >
        <div className="flex flex-col gap-4">
          <CodeBlock variant="shell" title="INSTRUCTIONS.md" lang="markdown" code={instructionsMd()} maxHeight />
          <Prose>
            <p>
              <Link href="/docs/agent-skill">Agent skill →</Link> adds a workflow, decision rules, the full catalog and a review checklist to Claude Code.
            </p>
          </Prose>
        </div>
      </DocSection>

      <DocSection id="prompts" title="Example prompts" description="Starting points that send your assistant to the right docs before it writes any code.">
        <div className="flex flex-col gap-4">
          {prompts.map((p, i) => (
            <CodeBlock key={i} variant="shell" title={`Prompt ${i + 1}`} lang="markdown" code={p} />
          ))}
        </div>
      </DocSection>

      <DocSection id="files" title="What each address returns">
        <ul className="flex flex-col divide-y divide-line-subtle rounded-lg border border-line">
          {[
            { path: "/llms.txt", text: "Docs pages and every item with its one-line purpose and install command." },
            { path: "/llms-full.txt", text: "Everything in llms.txt plus props and the full source of every component, block and chart." },
            { path: "/r/registry.json", text: "The shadcn registry index: every item with its address." },
            { path: "/r/<slug>.json", text: "One item: source files (with their local imports), npm dependencies and the vantu-base dependency." },
            { path: "/r/vantu-base.json", text: "Theme tokens, typography and global styles, and the cx helper." },
          ].map((r) => (
            <li key={r.path} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="flex w-44 shrink-0 items-center gap-2 font-mono text-[13px] text-fg">
                <FileCode2 className="size-3.5 text-fg-muted" />
                {r.path}
              </span>
              <span className="text-base text-fg-secondary">{r.text}</span>
            </li>
          ))}
        </ul>
      </DocSection>
    </>
  );
}
