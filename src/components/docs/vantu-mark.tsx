import { useId } from "react";

/**
 * The Vantu logo mark: a glossy accent tile with a bold geometric "V" whose
 * left shoulder is sliced off on a diagonal — the cut is the signature detail.
 * Tile: vertical accent gradient, light top inner edge, darker bottom edge.
 * Glyph: flat-cut arms of equal thickness with a soft emboss shadow; the slice
 * is a real cutout (mask), so the tile shows through it.
 * Drawn on a 40×40 grid; size it with `className` (e.g. size-10).
 */
const V = "M10.5 12h6l3.5 9 3.5-9h6l-6.4 16.5h-6.2Z";

export function VantuMark({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 40 40" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <linearGradient id={`${id}-tile`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8079FF" />
          <stop offset="1" stopColor="#4F46EC" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#1e1890" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`${id}-glyph`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#EEEDFF" />
        </linearGradient>
        <mask id={`${id}-cut`} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
          <rect width="40" height="40" fill="#fff" />
          <path d="M7.5 23.8 19.2 11.2" stroke="#000" strokeWidth="1.8" />
        </mask>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#${id}-tile)`} />
      <rect x="0.6" y="0.6" width="38.8" height="38.8" rx="10.4" fill="none" stroke={`url(#${id}-edge)`} strokeWidth="1.2" />
      <g transform="translate(0 1.2)" mask={`url(#${id}-cut)`}>
        <path d={V} fill="#1e1890" opacity="0.28" />
      </g>
      <g mask={`url(#${id}-cut)`}>
        <path d={V} fill={`url(#${id}-glyph)`} stroke={`url(#${id}-glyph)`} strokeWidth="1.2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
