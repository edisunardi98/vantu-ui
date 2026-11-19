import { IsoCanvas } from "./iso";
import { moreScenes } from "./more-scenes";
import { scenes } from "./scenes";

/**
 * Render one of the component scenes (the same isometric line art as the docs
 * thumbnails) by registry slug. Used to illustrate landing-page sections.
 */
export function IsoScene({ slug, label, className }: { slug: string; label: string; className?: string }) {
  const scene = scenes[slug] ?? moreScenes[slug];
  if (!scene) return null;
  return (
    <div className={className}>
      <IsoCanvas label={label}>{scene()}</IsoCanvas>
    </div>
  );
}
