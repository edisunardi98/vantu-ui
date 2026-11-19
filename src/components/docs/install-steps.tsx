import Link from "next/link";
import type { ReactNode } from "react";
import { highlight } from "@/lib/source";
import { CodeBlock } from "./code-block";
import { PackageManagerTabs } from "./package-manager-tabs";

const inlineCode = "rounded-xs border border-line bg-subtle px-1.5 py-0.5 font-mono text-[13px] text-fg";

/** One numbered step: circle number, a connector line down to the next step, then content. */
function Step({ n, last, title, children }: { n: number; last?: boolean; title: ReactNode; children?: ReactNode }) {
  return (
    <li className="relative pb-8 pl-11 last:pb-0">
      {!last && <span aria-hidden className="absolute bottom-0 left-[13px] top-9 w-px bg-line" />}
      <span aria-hidden className="absolute left-0 top-0 flex size-7 items-center justify-center rounded-full border border-line bg-surface text-sm font-medium text-fg-secondary">
        {n}
      </span>
      <p className="pt-0.5 text-base text-fg">{title}</p>
      {children && <div className="mt-3">{children}</div>}
    </li>
  );
}

/**
 * Installation as numbered steps: install the dependencies (npm / pnpm / yarn),
 * create each file with its code, then wire up tokens and import paths.
 */
export async function InstallSteps({ dependencies, files }: { dependencies: string[]; files: { path: string; code: string }[] }) {
  const pkgs = dependencies.join(" ");
  const commands = dependencies.length
    ? await Promise.all(
        [
          { id: "npm", label: "npm", code: `npm install ${pkgs}` },
          { id: "pnpm", label: "pnpm", code: `pnpm add ${pkgs}` },
          { id: "yarn", label: "yarn", code: `yarn add ${pkgs}` },
        ].map(async (c) => ({ ...c, html: await highlight(c.code, "bash") })),
      )
    : [];

  let n = 0;
  return (
    <ol>
      {commands.length > 0 && (
        <Step n={++n} title="Install the following dependencies:">
          <PackageManagerTabs commands={commands} />
        </Step>
      )}
      {files.map((f) => (
        <Step
          key={f.path}
          n={++n}
          title={
            <>
              Create a <code className={inlineCode}>{f.path.split("/").pop()}</code> file and paste the following code into it.
            </>
          }
        >
          <CodeBlock variant="shell" title={`src/${f.path}`} code={f.code} lineNumbers maxHeight />
        </Step>
      ))}
      <Step
        n={++n}
        last
        title={
          <>
            Add the theme tokens and the <code className={inlineCode}>cx</code> helper from{" "}
            <Link href="/docs/installation" className="font-medium text-accent-text hover:underline">
              Installation
            </Link>{" "}
            if you haven’t yet, then update the import paths to match your project setup.
          </>
        }
      />
    </ol>
  );
}
