import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { DocHeader, DocSection, Prose } from "@/components/docs/doc-page";
import { Badge } from "@/components/ui/badge";
import { checklistMd, registryUrl, skillMd } from "@/lib/ai";

export const metadata: Metadata = {
  title: "Agent skill",
  description: "A Claude Code skill for Vantu UI: which item fits where, design rules, the full catalog and a review checklist.",
};

const files = [
  { name: "SKILL.md", text: "Entry point: workflow, decision rules (which item for which region), design rules and setup." },
  { name: "INSTRUCTIONS.md", text: "Short always-on rules — also for AGENTS.md, CLAUDE.md or Cursor rules." },
  { name: "checklist.md", text: "The review loop before finishing: what to check and grep for." },
  { name: "references/catalog.md", text: "Every component, block, chart and template with what it is for — generated from the registry, so it never goes stale." },
];

export default function AgentSkillPage() {
  return (
    <>
      <DocHeader
        eyebrow="Getting started"
        title="Agent skill"
        description="A skill for Claude Code — which Vantu item fits where, how to wire it, the design rules and a review checklist. Other agents get the same rules as a short instructions file."
      />

      <DocSection id="install" title="Install" description="One command. The skill lands in .claude/skills/vantu — Claude Code picks it up on its own, and you can commit the folder so the whole team has it.">
        <div className="flex flex-col gap-4">
          <CodeBlock variant="shell" title="Terminal" lang="bash" code={`npx shadcn@latest add ${registryUrl("vantu-skill")}`} />
          <Prose>
            <p>
              Then ask for it by name, for example <code>/vantu build the deals page</code>, or just describe the screen — the skill triggers whenever you build or review a
              dashboard. Run the command again to update it.
            </p>
            <p>
              <strong>Cursor, Copilot and other agents without skills:</strong> paste <code>.claude/skills/vantu/INSTRUCTIONS.md</code> into <code>AGENTS.md</code> or{" "}
              <code>CLAUDE.md</code>, or save it as <code>.cursor/rules/vantu.mdc</code>. The same rules are on <Link href="/docs/ai#rules">Using with AI</Link>.
            </p>
          </Prose>
        </div>
      </DocSection>

      <DocSection id="inside" title="What’s inside">
        <ul className="flex flex-col divide-y divide-line-subtle rounded-lg border border-line">
          {files.map((f) => (
            <li key={f.name} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="w-48 shrink-0">
                <Badge variant="outline" className="font-mono">
                  {f.name}
                </Badge>
              </span>
              <span className="text-base text-fg-secondary">{f.text}</span>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection id="skill-md" title="SKILL.md" description="The entry point Claude Code loads when the task matches its description.">
        <CodeBlock variant="shell" title=".claude/skills/vantu/SKILL.md" lang="markdown" code={skillMd()} lineNumbers maxHeight />
      </DocSection>

      <DocSection id="checklist" title="checklist.md" description="The agent runs this before it says it’s done, and fixes until every line passes.">
        <CodeBlock variant="shell" title=".claude/skills/vantu/checklist.md" lang="markdown" code={checklistMd()} maxHeight />
      </DocSection>
    </>
  );
}
