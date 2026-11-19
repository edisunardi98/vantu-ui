import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { DocHeader, DocSection } from "@/components/docs/doc-page";
import { PreviewTabs } from "@/components/docs/preview-tabs";
import { ScaledFrame } from "@/components/docs/scaled-frame";
import { templates } from "@/lib/registry";
import { readSource } from "@/lib/source";

export const metadata: Metadata = { title: "Templates" };

export default async function TemplatesPage() {
  const sources = await Promise.all(templates.map((t) => readSource(t.file)));
  return (
    <>
      <DocHeader eyebrow="Templates" title="Templates" description="Full pages assembled from blocks. Open one full screen, then copy the composition and the blocks it uses." />
      {templates.map((t, i) => (
        <DocSection key={t.slug} id={t.slug} title={t.name} description={t.description}>
          <PreviewTabs
            flush
            preview={<ScaledFrame src={`/preview/${t.slug}`} title={`${t.name} preview`} />}
            code={<CodeBlock code={sources[i]!} maxHeight hideCopy />}
            copy={sources[i]!}
            actions={
              <Link
                href={`/preview/${t.slug}`}
                target="_blank"
                data-track="cta_click"
                data-track-cta="open_full_screen"
                data-track-location="templates_page"
                data-track-template={t.slug}
                className="inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-sm font-medium text-fg-muted outline-none transition-colors hover:text-fg focus-visible:shadow-focus"
              >
                <ExternalLink className="size-3.5" /> Open full screen
              </Link>
            }
          />
        </DocSection>
      ))}
    </>
  );
}
