import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { blocks, charts, components, kindPath, templates, type RegistryEntry } from "./registry";
import { readSource } from "./source";

/**
 * Everything the "Using with AI" and "Agent skill" docs serve, generated from
 * the registry and the real source files so it can never drift:
 * shadcn registry items (/r/<slug>.json), llms.txt, llms-full.txt and the
 * Claude Code skill.
 */

/** Public origin of the docs. Set NEXT_PUBLIC_SITE_URL when you deploy. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantu-ui.vercel.app").replace(/\/$/, "");

export const registryUrl = (name: string) => `${siteUrl}/r/${name}.json`;

/** Files every item builds on; shipped once as the `vantu-base` item. */
const BASE_FILES = ["utils/cx.ts", "styles/theme.css", "styles/typography.css", "styles/globals.css"];

export interface CatalogItem {
  slug: string;
  name: string;
  description: string;
  kind: RegistryEntry["kind"] | "template";
  group: string;
  docs: string;
  files: string[];
}

/** Every installable item: components, blocks, charts and templates. */
export function catalog(): CatalogItem[] {
  const entry = (e: RegistryEntry): CatalogItem => ({
    slug: e.slug,
    name: e.name,
    description: e.description,
    kind: e.kind,
    group: e.group,
    docs: `${siteUrl}/${kindPath[e.kind]}/${e.slug}`,
    files: e.files,
  });
  return [
    ...components.map(entry),
    ...blocks.map(entry),
    ...charts.map(entry),
    ...templates.map((t) => ({
      slug: t.slug,
      name: t.name,
      description: t.description,
      kind: "template" as const,
      group: "Templates",
      docs: `${siteUrl}/templates#${t.slug}`,
      files: [t.file],
    })),
  ];
}

export function findItem(slug: string) {
  return catalog().find((i) => i.slug === slug);
}

const LOCAL_IMPORT = /from\s+["']@\/([^"']+)["']|from\s+["'](\.\.?\/[^"']+)["']/g;
const BARE_IMPORT = /from\s+["']([^"'./@][^"']*|@[^/"']+\/[^"']+)["']/g;
const BUILT_IN = new Set(["react", "react-dom", "next", "server-only"]);

/** Resolve "components/ui/button" (relative to src/) to an existing file. */
function resolve(rel: string) {
  for (const ext of ["", ".tsx", ".ts", "/index.ts", "/index.tsx"]) {
    const candidate = rel + ext;
    if (/\.(tsx?|css)$/.test(candidate) && existsSync(path.join(process.cwd(), "src", candidate))) return candidate;
  }
  return null;
}

/**
 * Follow local imports from the item's files so the registry item is
 * self-contained (base files excluded — they come from `vantu-base`).
 * Also collects the npm packages the files really import.
 */
async function closure(entryFiles: string[]) {
  const files = new Map<string, string>();
  const packages = new Set<string>();
  const queue = [...entryFiles];
  while (queue.length) {
    const rel = queue.shift()!;
    if (files.has(rel) || BASE_FILES.includes(rel)) continue;
    const code = await readSource(rel);
    files.set(rel, code);
    for (const m of code.matchAll(LOCAL_IMPORT)) {
      const target = m[1] ?? path.posix.join(path.posix.dirname(rel), m[2]!);
      const file = resolve(target.replace(/^src\//, ""));
      if (file && !files.has(file)) queue.push(file);
    }
    for (const m of code.matchAll(BARE_IMPORT)) {
      const pkg = m[1]!.startsWith("@") ? m[1]!.split("/").slice(0, 2).join("/") : m[1]!.split("/")[0]!;
      if (!BUILT_IN.has(pkg) && !pkg.startsWith("node:")) packages.add(pkg);
    }
  }
  return { files, packages: [...packages].sort() };
}

const fileType = (rel: string, kind: CatalogItem["kind"]) =>
  rel.startsWith("components/ui/")
    ? "registry:ui"
    : rel.startsWith("components/")
      ? kind === "component"
        ? "registry:component"
        : "registry:block"
      : rel.startsWith("lib/") || rel.startsWith("utils/")
        ? "registry:lib"
        : "registry:file";

/** shadcn registry item (https://ui.shadcn.com/schema/registry-item.json) for one catalog item. */
export async function registryItem(item: CatalogItem) {
  const { files, packages } = await closure(item.files);
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.slug,
    type: item.kind === "component" ? "registry:ui" : "registry:block",
    title: item.name,
    description: item.description,
    dependencies: packages,
    registryDependencies: [registryUrl("vantu-base")],
    files: [...files].map(([rel, content]) => ({ path: rel, type: fileType(rel, item.kind), target: rel, content })),
    meta: { docs: item.docs, kind: item.kind, group: item.group },
  };
}

/** Theme tokens, type styles and the cx helper — the base every item needs. */
export async function baseItem() {
  const files = await Promise.all(BASE_FILES.map(async (rel) => ({ rel, content: await readSource(rel) })));
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "vantu-base",
    type: "registry:style",
    title: "Vantu base",
    description: "Vantu design tokens (Tailwind v4 @theme), typography styles, global styles and the cx class helper.",
    dependencies: ["tailwind-merge"],
    files: files.map(({ rel, content }) => ({ path: rel, type: fileType(rel, "component"), target: rel, content })),
  };
}

/** shadcn registry index (https://ui.shadcn.com/schema/registry.json). */
export function registryIndex() {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "vantu",
    homepage: siteUrl,
    items: [
      { name: "vantu-base", type: "registry:style", title: "Vantu base", url: registryUrl("vantu-base") },
      ...catalog().map((i) => ({ name: i.slug, type: i.kind === "component" ? "registry:ui" : "registry:block", title: i.name, description: i.description, url: registryUrl(i.slug) })),
    ],
  };
}

const kindTitle: Record<CatalogItem["kind"], string> = { component: "Components", block: "Blocks", chart: "Charts", template: "Templates" };

/** /llms.txt — the short index an assistant reads first (https://llmstxt.org). */
export function llmsTxt() {
  const items = catalog();
  const section = (kind: CatalogItem["kind"]) =>
    items
      .filter((i) => i.kind === kind)
      .map((i) => `- [${i.name}](${i.docs}): ${i.description} Install: \`npx shadcn@latest add ${registryUrl(i.slug)}\``)
      .join("\n");
  return `# Vantu UI

> React design system for AI-powered SaaS dashboards: ${components.length} components, ${blocks.length} blocks, ${charts.length} charts and ${templates.length} templates. React 19, Tailwind CSS v4, React Aria. Every item is copy-in source you own; install any of them with the shadcn CLI from its registry address.

Full docs for every item in one file: ${siteUrl}/llms-full.txt
Registry index: ${registryUrl("registry")}
Base (tokens + cx helper, installed automatically as a dependency): ${registryUrl("vantu-base")}

## Docs

- [Introduction](${siteUrl}/docs): What Vantu UI is and how it is organised.
- [Installation](${siteUrl}/docs/installation): Theme tokens, the cx helper and your first component.
- [Using with AI](${siteUrl}/docs/ai): llms.txt, registry addresses and prompts for coding assistants.
- [Agent skill](${siteUrl}/docs/agent-skill): A Claude Code skill and always-on rules for other agents.
- [Color](${siteUrl}/foundations/colors), [Typography](${siteUrl}/foundations/typography), [Spacing & radius](${siteUrl}/foundations/spacing): Design tokens.

## ${kindTitle.component}

${section("component")}

## ${kindTitle.block}

${section("block")}

## ${kindTitle.chart}

${section("chart")}

## ${kindTitle.template}

${section("template")}
`;
}

/** /llms-full.txt — docs, props and full source of every item in one file. */
export async function llmsFullTxt() {
  const all = [...components, ...blocks, ...charts];
  const parts: string[] = [llmsTxt(), "\n---\n"];
  for (const e of all) {
    const item = findItem(e.slug)!;
    const { files, packages } = await closure(item.files);
    parts.push(`\n## ${e.name} (${e.kind}: ${e.group})\n\n${e.description}\n\nDocs: ${item.docs}\nInstall: npx shadcn@latest add ${registryUrl(e.slug)}`);
    if (packages.length) parts.push(`npm: ${packages.join(", ")}`);
    if (e.props?.length) parts.push(`\nProps:\n${e.props.map((p) => `- \`${p.name}\`: ${p.type}${p.default ? ` = ${p.default}` : ""} — ${p.description}`).join("\n")}`);
    for (const [rel, code] of files) parts.push(`\n\`\`\`tsx title="src/${rel}"\n${code}\n\`\`\``);
  }
  return parts.join("\n");
}

/** references/catalog.md — every item by section, with what it is for. */
export function catalogMd() {
  const items = catalog();
  return `# Vantu catalog

Every installable item, generated from the registry. Install with \`npx shadcn@latest add ${siteUrl}/r/<slug>.json\`.

${(["component", "block", "chart", "template"] as const)
  .map(
    (kind) =>
      `## ${kindTitle[kind]}\n\n| Slug | Name | Group | What it is for |\n| --- | --- | --- | --- |\n${items
        .filter((i) => i.kind === kind)
        .map((i) => `| \`${i.slug}\` | ${i.name} | ${i.group} | ${i.description.replace(/\|/g, "\\|")} |`)
        .join("\n")}`,
  )
  .join("\n\n")}
`;
}

/** INSTRUCTIONS.md — short always-on rules for AGENTS.md, CLAUDE.md or Cursor rules. */
export function instructionsMd() {
  return `# Vantu UI — rules for coding agents

- This project uses **Vantu UI** (React 19 + Tailwind CSS v4 + React Aria). Before building any UI, check whether a Vantu item already does it: ${siteUrl}/llms.txt
- Install items with \`npx shadcn@latest add ${siteUrl}/r/<slug>.json\` — never re-create a Vantu component by hand. Read the item's docs page before using its props; never guess a prop.
- Style only with Vantu tokens (\`bg-surface\`, \`bg-subtle\`, \`text-fg\`, \`text-fg-secondary\`, \`text-fg-muted\`, \`border-line\`, \`bg-accent\`, \`shadow-card\`…). No raw hex colors, no new shadows or radii.
- Cards use the layered shell: \`<Card>\` → \`<CardHeader icon={<IconTile>…</IconTile>}>\` → \`<CardBody>\`. Tables use the shared table language (rounded \`bg-subtle\` header pill, 12px rows, hairline separators) via \`ui/table\` or the Data Table block.
- One primary button per view; secondary actions before the primary one.
- Charts: series colors come from \`seriesColors\` in fixed order (never cycled); a single series needs no legend; every chart keeps its tooltip and screen-reader table.
- Interactive pieces are React Aria components — keep labels (\`aria-label\` on icon-only buttons) and keyboard support intact.
- Merge classes with \`cx()\` from \`@/utils/cx\`.
`;
}

/** SKILL.md — the Claude Code skill entry point. */
export function skillMd() {
  return `---
name: vantu
description: Use Vantu UI's React components, blocks, charts and templates for AI-powered SaaS dashboards (CRM, prospecting, analytics, team and settings screens). Covers layered cards, KPI strips, data tables, charts (area, line, bar, donut, funnel, heatmap, sparkline), AI search and insights, sequences, command menus, forms and full app shells. Use when building or reviewing a dashboard screen, when the user mentions Vantu or @vantu, or asks "where could I use Vantu", "review my UI against Vantu", or "make this match Vantu".
---

# Vantu UI

Copy-in React 19 + Tailwind CSS v4 + React Aria components for AI SaaS
dashboards: ${components.length} components, ${blocks.length} blocks, ${charts.length} charts and ${templates.length} templates.
Every item is plain source the project owns. **Read an item's docs before
writing code with it; never guess a prop.**

## Workflow

\`\`\`
Vantu task:
- [ ] 1. Find: pick an item per screen region (Decision rules, then references/catalog.md)
- [ ] 2. Read: the item's docs page — usage, props, examples
- [ ] 3. Install: npx shadcn@latest add ${siteUrl}/r/<slug>.json (pulls vantu-base once)
- [ ] 4. Wire: real data and state only; keep the item's structure and styles
- [ ] 5. Review: run checklist.md and fix until every line passes
\`\`\`

## Files

| File | Read it when |
| --- | --- |
| [references/catalog.md](references/catalog.md) | Choosing an item the decision rules don't name |
| [INSTRUCTIONS.md](INSTRUCTIONS.md) | You need the short always-on rules (also for AGENTS.md / CLAUDE.md) |
| [checklist.md](checklist.md) | Before you finish. Always |

Full docs and source of every item: ${siteUrl}/llms-full.txt

## Decision rules

- **Screen frame** → \`home-dashboard\` / \`team-dashboard\` templates (sidebar + topbar + page header + main column + 360px rail).
- **KPIs at the top** → \`metrics-strip\` (\`trend="line"\` for sparklines).
- **Any list of records** → \`data-table\` (views, search, filters, bulk actions, pagination) — configure \`columns\`, don't fork it.
- **Small static table** → \`table\`.
- **Trend over time** → \`area-chart\` (with \`previous\` for comparison) or \`line-chart\` (2–6 series).
- **Part-to-whole** → \`donut-chart\` (≤ 6 parts). **Ranking** → \`horizontal-bar-chart\`. **Stage conversion** → \`funnel-chart\`. **Goal vs. target** → \`radial-chart\`. **Inline trend** → \`sparkline\`.
- **AI search / criteria** → \`ai-search-panel\`; **AI explanation** → \`ai-insight\`; **long AI work** → \`progress-steps\`.
- **Activity / timeline** → \`activity-feed\`. **Plan usage** → \`usage-card\`. **⌘K** → \`command-menu\`.

## Design rules

- Cards: \`Card\` shell (bg-subtle, 4px padding) → \`CardHeader\` with an \`IconTile\` → white \`CardBody\` panel.
- Colors, radii and shadows only from tokens; text never uses a chart series color.
- One primary action per view. Icon-only buttons need an \`aria-label\`.

## Setup

\`\`\`bash
npx shadcn@latest add ${registryUrl("vantu-base")}
npx shadcn@latest add ${siteUrl}/r/button.json
\`\`\`

Files land at the paths they have in Vantu (\`components/ui\`, \`components/blocks\`, \`components/charts\`, \`utils/cx.ts\`, \`styles/*\`). Import \`styles/globals.css\` once in the root layout and keep the \`@/\` alias pointing at the folder that holds them.
`;
}

/** checklist.md — the review loop before finishing. */
export function checklistMd() {
  return `# Vantu review checklist

Run before you finish. Fix, then run again until every line passes.

- [ ] Every region uses a Vantu item where one exists (check references/catalog.md).
- [ ] No raw hex colors, ad-hoc shadows or radii: \`grep -rnE "#[0-9a-fA-F]{6}|shadow-\\[|rounded-\\[" src/app src/features\` only hits intentional cases.
- [ ] Cards follow Card → CardHeader (IconTile) → CardBody; tables use ui/table or data-table.
- [ ] One primary button per view.
- [ ] Icon-only buttons have \`aria-label\`; form fields have labels.
- [ ] Charts keep their tooltip and screen-reader table; series colors are not reused for text.
- [ ] Numbers line up: totals shown in KPIs match the data in tables and charts.
- [ ] Layout checked at 1440px and 390px wide: no horizontal page scroll, tables scroll inside their card.
- [ ] \`tsc --noEmit\` and the production build pass.
`;
}

/** The skill as a shadcn item that installs into .claude/skills/vantu. */
export function skillItem() {
  const file = (rel: string, content: string) => ({ path: `skills/vantu/${rel}`, type: "registry:file", target: `.claude/skills/vantu/${rel}`, content });
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "vantu-skill",
    type: "registry:file",
    title: "Vantu agent skill",
    description: "Claude Code skill for Vantu UI: workflow, decision and design rules, the full catalog and a review checklist. Installs into .claude/skills/vantu.",
    files: [
      file("SKILL.md", skillMd()),
      file("INSTRUCTIONS.md", instructionsMd()),
      file("checklist.md", checklistMd()),
      file("references/catalog.md", catalogMd()),
    ],
  };
}
