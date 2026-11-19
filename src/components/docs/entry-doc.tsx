import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { examples } from "@/examples";
import { kindPath, type RegistryEntry } from "@/lib/registry";
import { readSource } from "@/lib/source";
import { CodeBlock } from "./code-block";
import { InstallSteps } from "./install-steps";
import { DocHeader, DocSection } from "./doc-page";
import { PreviewTabs } from "./preview-tabs";
import { PropsTable } from "./props-table";

export async function EntryDoc({ entry, prev, next }: { entry: RegistryEntry; prev?: RegistryEntry; next?: RegistryEntry }) {
  const base = `/${kindPath[entry.kind]}`;
  const exampleSources = await Promise.all(entry.examples.map((ex) => readSource(`examples/${entry.slug}/${ex.id}.tsx`)));
  const fileSources = await Promise.all(entry.files.map((f) => readSource(f)));

  return (
    <article>
      <DocHeader eyebrow={entry.kind === "component" ? entry.group : entry.kind === "chart" ? "Chart" : "Block"} title={entry.name} description={entry.description}>
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          {entry.dependencies.map((d) => (
            <span key={d} className="rounded-sm border border-line bg-subtle px-2 py-1 font-mono text-fg-secondary">
              {d}
            </span>
          ))}
        </div>
      </DocHeader>

      {entry.examples.map((ex, i) => {
        const Example = examples[`${entry.slug}/${ex.id}`];
        return (
          <DocSection key={ex.id} id={ex.id} title={ex.title} description={ex.description}>
            <PreviewTabs
              fullBleed={entry.kind === "block"}
              preview={Example ? <Example /> : <span className="text-fg-muted">Missing example</span>}
              code={<CodeBlock code={exampleSources[i]!} maxHeight hideCopy />}
              copy={exampleSources[i]!}
            />
          </DocSection>
        );
      })}

      <DocSection id="installation" title="Installation" description="Components are copied into your project — no runtime package.">
        <InstallSteps dependencies={entry.dependencies} files={entry.files.map((f, i) => ({ path: f, code: fileSources[i]! }))} />
      </DocSection>

      {entry.props && (
        <DocSection id="props" title="Props">
          <PropsTable props={entry.props} />
        </DocSection>
      )}

      <nav className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`${base}/${prev.slug}`} className="group rounded-md border border-line p-4 hover:bg-subtle">
            <span className="flex items-center gap-1 text-sm text-fg-muted">
              <ArrowLeft className="size-3.5" /> Previous
            </span>
            <span className="mt-1 block font-medium text-fg">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`${base}/${next.slug}`} className="group rounded-md border border-line p-4 text-right hover:bg-subtle">
            <span className="flex items-center justify-end gap-1 text-sm text-fg-muted">
              Next <ArrowRight className="size-3.5" />
            </span>
            <span className="mt-1 block font-medium text-fg">{next.name}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
