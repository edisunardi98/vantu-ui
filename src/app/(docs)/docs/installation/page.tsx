import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { DocHeader, DocSection, Prose } from "@/components/docs/doc-page";
import { readSource } from "@/lib/source";

export const metadata: Metadata = { title: "Installation" };

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="relative pb-10 pl-12 last:pb-0">
      <span className="absolute left-0 top-0 flex size-8 items-center justify-center rounded-full bg-surface text-sm font-semibold text-fg shadow-button">{n}</span>
      <span aria-hidden className="absolute bottom-0 left-4 top-10 w-px bg-line [li:last-child>&]:hidden" />
      <h3 className="pt-1 text-lg font-medium text-fg">{title}</h3>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </li>
  );
}

export default async function InstallationPage() {
  const [theme, globals, typography, cx] = await Promise.all([
    readSource("styles/theme.css"),
    readSource("styles/globals.css"),
    readSource("styles/typography.css"),
    readSource("utils/cx.ts"),
  ]);

  const layout = `import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${geist.variable} \${geistMono.variable}\`}>
      <body>{children}</body>
    </html>
  );
}`;

  const usage = `import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FindProspects() {
  return (
    <Button variant="primary" leadingIcon={<Sparkles />}>
      Find prospects
    </Button>
  );
}`;

  return (
    <>
      <DocHeader
        eyebrow="Getting started"
        title="Installation"
        description="Works with any React 19 + Tailwind CSS v4 setup. These steps use Next.js; Vite works the same once Tailwind is configured."
      />
      <Prose>
        <p>
          Vantu UI uses a copy-in model. You add the theme files and helpers once, then copy each component you need from its page. Components import each
          other through the <code>@/</code> alias, so keep the same folder layout or adjust the imports.
        </p>
      </Prose>

      <DocSection title="Quick start">
        <ol>
          <Step n={1} title="Create a project">
            <CodeBlock lang="bash" code="npx create-next-app@latest my-app --ts --tailwind --app --src-dir --import-alias '@/*'" />
          </Step>
          <Step n={2} title="Install dependencies">
            <CodeBlock lang="bash" code="npm install react-aria-components tailwind-merge lucide-react" />
          </Step>
          <Step n={3} title="Add the design tokens">
            <p className="text-base text-fg-secondary">
              Colors, type scale, radius and shadows from the Figma variables. Tailwind’s default palette is reset, so only these colors exist.
            </p>
            <CodeBlock title="src/styles/theme.css" lang="css" code={theme} maxHeight />
            <CodeBlock title="src/styles/typography.css" lang="css" code={typography} />
            <CodeBlock title="src/styles/globals.css" lang="css" code={globals} />
          </Step>
          <Step n={4} title="Add the cx helper">
            <p className="text-base text-fg-secondary">Merges class names and resolves Tailwind conflicts, including the custom shadow tokens.</p>
            <CodeBlock title="src/utils/cx.ts" code={cx} />
          </Step>
          <Step n={5} title="Load Geist and the styles">
            <p className="text-base text-fg-secondary">Replace the default globals import in your root layout.</p>
            <CodeBlock title="src/app/layout.tsx" code={layout} />
          </Step>
          <Step n={6} title="Add a component">
            <p className="text-base text-fg-secondary">
              Copy <code className="rounded-xs bg-muted px-1 font-mono text-[13px] text-fg">button.tsx</code> from the Button page into{" "}
              <code className="rounded-xs bg-muted px-1 font-mono text-[13px] text-fg">src/components/ui/</code>, then use it:
            </p>
            <CodeBlock code={usage} />
          </Step>
        </ol>
      </DocSection>

      <DocSection title="Folder layout">
        <CodeBlock
          lang="bash"
          code={`src/
├─ components/
│  ├─ ui/        # components (button.tsx, input.tsx, …)
│  └─ blocks/    # page patterns (sidebar.tsx, prospects-table.tsx, …)
├─ styles/
│  ├─ theme.css
│  ├─ typography.css
│  └─ globals.css
└─ utils/
   └─ cx.ts`}
        />
      </DocSection>

      <DocSection title="Conventions">
        <Prose>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Use semantic tokens — <code>bg-surface</code>, <code>text-fg-secondary</code>, <code>border-line</code> — never raw hex.
            </li>
            <li>
              Body text is <code>text-base</code> (14px). Card titles are <code>text-lg font-medium</code>. Metrics use <code>text-metric</code>.
            </li>
            <li>
              Interactive components style their states with React Aria data attributes: <code>data-hovered:</code>, <code>data-pressed:</code>,{" "}
              <code>data-focus-visible:</code>, <code>data-selected:</code>.
            </li>
            <li>
              Focus is always a 3px <code>shadow-focus</code> ring or an accent border — never remove it.
            </li>
          </ul>
        </Prose>
      </DocSection>
    </>
  );
}
