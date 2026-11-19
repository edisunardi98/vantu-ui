import { ArrowRight, ChevronRight, LayoutPanelLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { blocks, components, entryHref, findEntry, type RegistryEntry } from "@/lib/registry";
import { blockScenes } from "./iso/block-scenes";
import { IsoCanvas } from "./iso/iso";
import { moreScenes } from "./iso/more-scenes";
import { scenes } from "./iso/scenes";

/** Curated mix for the landing page; the last row fades out under the CTA. */
const picks: [RegistryEntry["kind"], string][] = [
  ["block", "sign-in"],
  ["component", "checkbox"],
  ["block", "command-menu"],
  ["component", "select"],
  ["component", "file-upload"],
  ["component", "modal"],
  ["component", "ai-search"],
  ["component", "date-calendar"],
  ["component", "score-meter"],
];

const sceneFor = (e: RegistryEntry): (() => ReactNode) | undefined =>
  e.kind === "block" ? blockScenes[e.slug] : (scenes[e.slug] ?? moreScenes[e.slug]);

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/**
 * "Components & Blocks" landing section: centered header, a grid of the same
 * isometric cards used on /components, and a floating browse-all button over a
 * fade on the last row.
 */
export function ComponentShowcase() {
  const entries = picks.map(([kind, slug]) => findEntry(kind, slug)).filter((e): e is RegistryEntry => !!e);

  return (
    <section className="mx-auto mt-28 max-w-[1200px] px-4 sm:px-6">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface py-1 pl-2.5 pr-1.5 text-sm font-medium text-fg shadow-button">
          <LayoutPanelLeft className="size-3.5 text-fg-muted" />
          Components &amp; Blocks
          <span className="rounded-full bg-accent-soft px-1.5 py-px text-[11px] font-medium text-accent-text">{components.length + blocks.length}</span>
        </span>
        <h2 className="mt-5 text-4xl font-semibold tracking-tight text-fg">
          Build faster with ready-made
          <br className="hidden sm:block" /> components &amp; blocks
        </h2>
        <p className="mt-3 text-lg text-fg-secondary">
          <span className="font-medium text-fg">Accessible</span> pieces styled from Figma that <span className="font-medium text-fg">adapt</span> to your product
        </p>
        <Link href="/components" className="group mt-6 inline-flex items-center gap-1.5 text-base font-medium text-fg hover:text-accent-text">
          Browse all components
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="relative mt-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [mask-image:linear-gradient(to_bottom,black_calc(100%-260px),transparent_calc(100%-40px))]">
          {entries.map((e, i) => {
            const scene = sceneFor(e);
            const faded = i >= entries.length - 3;
            return (
              <article
                key={e.slug}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-subtle p-1 shadow-card transition-shadow hover:shadow-popover has-[a:focus-visible]:shadow-focus"
              >
                <div className="relative h-52 overflow-hidden rounded-[12px] border border-line bg-subtle px-2 pt-2">
                  {scene && <IsoCanvas label={`${e.name} illustration`}>{scene()}</IsoCanvas>}
                </div>
                <div className="px-3 pb-3 pt-3 text-center">
                  <h3 className="font-medium text-fg">
                    <Link
                      href={entryHref(e)}
                      tabIndex={faded ? -1 : undefined}
                      className="outline-none after:absolute after:inset-0 after:rounded-lg after:content-['']"
                    >
                      {e.name}
                    </Link>
                  </h3>
                  <p className="mt-0.5 text-sm text-fg-muted">
                    {plural(e.examples.length, "example")} · {e.kind === "block" ? "Block" : e.group}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <Link
            href="/components"
            className="group inline-flex h-11 items-center gap-1.5 rounded-[12px] bg-inverse pl-5 pr-3.5 text-base font-medium text-fg-inverse shadow-popover outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-accent/40"
          >
            Browse all
            <span className="font-normal text-fg-inverse/60">
              · {components.length} components &amp; {blocks.length} blocks
            </span>
            <ChevronRight className="size-4 text-fg-inverse/60 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
