import Link from "next/link";
import type { ComponentType } from "react";
import { entryHref, type RegistryEntry } from "@/lib/registry";
import { IsoCanvas } from "./iso/iso";
import { blockScenes } from "./iso/block-scenes";
import { chartScenes } from "./iso/chart-scenes";
import { moreScenes } from "./iso/more-scenes";
import { scenes } from "./iso/scenes";

/**
 * Card grid with an isometric line-art illustration per entry (falls back to a
 * live, non-interactive preview when no scene exists).
 *
 * The card is not wrapped in a <Link>: thumbnails can contain their own links
 * (Nav Item, Sidebar, Sign In), and nested <a> elements are invalid HTML that
 * breaks hydration. Instead the title link stretches over the whole card.
 */
export function EntryGrid({ entries, examples, wide }: { entries: RegistryEntry[]; examples: Record<string, ComponentType>; wide?: boolean }) {
  return (
    <div className={wide ? "grid gap-4 md:grid-cols-2" : "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"}>
      {entries.map((e) => {
        const Example = examples[`${e.slug}/${e.examples[0]!.id}`];
        const scene =
          e.kind === "component" ? (scenes[e.slug] ?? moreScenes[e.slug]) : e.kind === "chart" ? chartScenes[e.slug] : blockScenes[e.slug];
        return (
          <article
            key={e.slug}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-subtle p-1 shadow-card transition-shadow hover:shadow-popover has-[a:focus-visible]:shadow-focus"
          >
            {scene ? (
              <div className={`relative overflow-hidden rounded-[12px] border border-line bg-subtle px-2 pt-2 ${wide ? "h-64" : "h-48"}`}>
                <IsoCanvas label={`${e.name} illustration`} viewBox={wide ? "-196 -104 392 186" : undefined}>
                  {scene()}
                </IsoCanvas>
              </div>
            ) : (
              <div className={`relative flex items-center justify-center overflow-hidden rounded-[12px] border border-line bg-surface ${wide ? "h-64" : "h-44"}`}>
                <div aria-hidden inert className={`pointer-events-none origin-center ${wide ? "w-[860px] scale-[0.55]" : "w-max scale-[0.8]"}`}>
                  {Example && <Example />}
                </div>
              </div>
            )}
            <div className="px-3 pb-2.5 pt-3">
              <h3 className="flex items-center gap-2 font-medium text-fg">
                <Link
                  href={entryHref(e)}
                  className="outline-none after:absolute after:inset-0 after:rounded-lg after:content-['']"
                >
                  {e.name}
                </Link>
                {e.isNew && <span className="rounded-xs bg-accent-soft px-1.5 py-px text-[10px] font-medium text-accent-text">New</span>}
              </h3>
              <p className="mt-0.5 line-clamp-2 text-sm text-fg-muted">{e.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
