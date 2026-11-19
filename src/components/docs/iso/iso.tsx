/**
 * Tiny isometric line-art engine for the docs thumbnails.
 *
 * World axes: x → screen down-right, y → screen down-left, z → up.
 * Anything drawn inside <Top>/<Left>/<Right> uses plain 2D coordinates on that
 * face and is projected by an affine matrix, so ordinary <rect>/<path>/<circle>
 * become isometric. Strokes use `vector-effect: non-scaling-stroke` (see docs.css)
 * so every line stays a crisp 1px regardless of the projection.
 */
import type { ReactNode } from "react";

const C = Math.cos(Math.PI / 6);
const S = 0.5;
const K = Math.SQRT1_2;

export type Vec3 = [number, number, number];

/** Project a world point to screen coordinates. */
export function P(x: number, y: number, z = 0): [number, number] {
  return [(x - y) * C, (x + y) * S - z];
}

const pt = (x: number, y: number, z = 0) => P(x, y, z).join(",");

/** Matrix mapping local (u, v) on a horizontal plane at height z, origin (x, y). */
export function topMatrix(x: number, y: number, z: number) {
  const [e, f] = P(x, y, z);
  return `matrix(${C} ${S} ${-C} ${S} ${e} ${f})`;
}

/** Local (u along x, t up) on the vertical plane y = Y, origin x0, z0. */
export function leftMatrix(x0: number, Y: number, z0: number) {
  const [e, f] = P(x0, Y, z0);
  return `matrix(${C} ${S} 0 -1 ${e} ${f})`;
}

/** Local (v along y, t up) on the vertical plane x = X, origin y0, z0. */
export function rightMatrix(X: number, y0: number, z0: number) {
  const [e, f] = P(X, y0, z0);
  return `matrix(${-C} ${S} 0 -1 ${e} ${f})`;
}

/** Rounded rect path in local face coordinates. */
function roundedRect(w: number, d: number, r: number) {
  r = Math.min(r, w / 2, d / 2);
  return `M ${r} 0 H ${w - r} A ${r} ${r} 0 0 1 ${w} ${r} V ${d - r} A ${r} ${r} 0 0 1 ${w - r} ${d} H ${r} A ${r} ${r} 0 0 1 0 ${d - r} V ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`;
}

/** The camera-facing half of a rounded rect outline (left extreme → front → right extreme). */
function frontEdge(w: number, d: number, r: number) {
  r = Math.min(r, w / 2, d / 2);
  return `M ${r - r * K} ${d - r + r * K} A ${r} ${r} 0 0 0 ${r} ${d} H ${w - r} A ${r} ${r} 0 0 0 ${w} ${d - r} V ${r} A ${r} ${r} 0 0 0 ${w - r + r * K} ${r - r * K}`;
}

export type Tone = "white" | "muted" | "accent" | "soft" | "ink" | "success" | "warning" | "error" | "info";

const tones: Record<Tone, { top: string; side: string }> = {
  white: { top: "var(--iso-face)", side: "var(--iso-side)" },
  muted: { top: "var(--iso-side)", side: "var(--iso-side-dark)" },
  accent: { top: "var(--iso-accent-top)", side: "var(--iso-accent-side)" },
  soft: { top: "var(--iso-accent-soft)", side: "var(--iso-accent-soft-side)" },
  ink: { top: "var(--iso-ink-top)", side: "var(--iso-ink)" },
  success: { top: "var(--color-success-soft)", side: "var(--color-success-border)" },
  warning: { top: "var(--color-warning-soft)", side: "var(--color-warning-border)" },
  error: { top: "var(--color-error-soft)", side: "var(--color-error-border)" },
  info: { top: "var(--color-info-soft)", side: "var(--color-info-border)" },
};

export interface SlabProps {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h?: number;
  r?: number;
  tone?: Tone;
  /** Soft ground shadow on the plane the slab rests on (or `shadowZ` when floating). */
  shadow?: boolean;
  shadowZ?: number;
  /** Dashed guide lines from the slab's bottom corners down to `dropTo`. */
  dropTo?: number;
  /** Lifts on card hover. */
  lift?: boolean;
  /** Drawn on the top face, in local (u, v) with origin at the slab corner. */
  children?: ReactNode;
  /** Drawn on the front-right face (x = x + w), local (v, t). */
  right?: ReactNode;
  /** Drawn on the front-left face (y = y + d), local (u, t). */
  left?: ReactNode;
  className?: string;
}

/** Extruded rounded rectangle — the single building block of every scene. */
export function Slab({ x, y, z = 0, w, d, h = 8, r = 6, tone = "white", shadow, shadowZ, dropTo, lift, children, right, left, className }: SlabProps) {
  const t = tones[tone];
  const rr = Math.min(r, w / 2, d / 2);
  const L = [x + rr - rr * K, y + d - rr + rr * K] as const;
  const R = [x + w - rr + rr * K, y + rr - rr * K] as const;
  const F = [x + w - rr + rr * K, y + d - rr + rr * K] as const;
  const zt = z + h;
  const sz = shadowZ ?? (dropTo ?? z);

  return (
    <g className={[lift ? "iso-lift" : "", className ?? ""].join(" ")}>
      {shadow && <path d={roundedRect(w + 10, d + 10, rr + 4)} transform={topMatrix(x + 2, y + 4, sz)} fill="var(--iso-shadow)" stroke="none" className="iso-shadow" />}
      {dropTo !== undefined &&
        (
          [
            [x + rr, y + rr],
            [x + w - rr, y + rr],
            [x + rr, y + d - rr],
            [x + w - rr, y + d - rr],
          ] as const
        ).map(([cx, cy], i) => <line key={i} x1={P(cx, cy, z)[0]} y1={P(cx, cy, z)[1]} x2={P(cx, cy, dropTo)[0]} y2={P(cx, cy, dropTo)[1]} className="iso-guide" />)}
      {h > 0 && (
        <>
          <path d={roundedRect(w, d, rr)} transform={topMatrix(x, y, z)} fill={t.side} stroke="none" />
          <polygon points={[pt(L[0], L[1], z), pt(L[0], L[1], zt), pt(R[0], R[1], zt), pt(R[0], R[1], z)].join(" ")} fill={t.side} stroke="none" />
          <path d={frontEdge(w, d, rr)} transform={topMatrix(x, y, z)} fill="none" />
          <line x1={P(L[0], L[1], z)[0]} y1={P(L[0], L[1], z)[1]} x2={P(L[0], L[1], zt)[0]} y2={P(L[0], L[1], zt)[1]} />
          <line x1={P(R[0], R[1], z)[0]} y1={P(R[0], R[1], z)[1]} x2={P(R[0], R[1], zt)[0]} y2={P(R[0], R[1], zt)[1]} />
          <line x1={P(F[0], F[1], z)[0]} y1={P(F[0], F[1], z)[1]} x2={P(F[0], F[1], zt)[0]} y2={P(F[0], F[1], zt)[1]} />
          {left && <g transform={leftMatrix(x, y + d, z)}>{left}</g>}
          {right && <g transform={rightMatrix(x + w, y, z)}>{right}</g>}
        </>
      )}
      <path d={roundedRect(w, d, rr)} transform={topMatrix(x, y, zt)} fill={t.top} />
      {children && <g transform={topMatrix(x, y, zt)}>{children}</g>}
    </g>
  );
}

/** Flat shape lying on a plane (no thickness): dashed drop zones, highlights, outlines. */
export function Flat({ x, y, z = 0, w, d, r = 6, fill = "none", dashed, accent, children }: { x: number; y: number; z?: number; w: number; d: number; r?: number; fill?: string; dashed?: boolean; accent?: boolean; children?: ReactNode }) {
  return (
    <g transform={topMatrix(x, y, z)}>
      <path d={roundedRect(w, d, r)} fill={fill} className={[dashed ? "iso-dashed" : "", accent ? "iso-accent-stroke" : ""].join(" ")} />
      {children}
    </g>
  );
}

/** Dashed vertical guide between two heights at a world point. */
export function Guide({ x, y, z1, z2 }: { x: number; y: number; z1: number; z2: number }) {
  const [a, b] = P(x, y, z1);
  const [c, e] = P(x, y, z2);
  return <line x1={a} y1={b} x2={c} y2={e} className="iso-guide" />;
}

/** Short radial "spark" strokes around a world point, like a highlight burst. */
export function Rays({ x, y, z, radius = 26, count = 5, spread = 140 }: { x: number; y: number; z: number; radius?: number; count?: number; spread?: number }) {
  const [cx, cy] = P(x, y, z);
  const start = -90 - spread / 2;
  return (
    <g className="iso-rays">
      {Array.from({ length: count }, (_, i) => {
        const a = ((start + (spread / (count - 1)) * i) * Math.PI) / 180;
        return <line key={i} x1={cx + Math.cos(a) * radius} y1={cy + Math.sin(a) * radius} x2={cx + Math.cos(a) * (radius + 9)} y2={cy + Math.sin(a) * (radius + 9)} />;
      })}
    </g>
  );
}

/** Isometric ground grid (dashed), like a drafting table. */
function Grid() {
  const lines = [];
  for (let k = -12; k <= 12; k++) {
    const a = P(k * 24, -320);
    const b = P(k * 24, 320);
    const c = P(-320, k * 24);
    const e = P(320, k * 24);
    lines.push(<line key={`a${k}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />, <line key={`b${k}`} x1={c[0]} y1={c[1]} x2={e[0]} y2={e[1]} />);
  }
  return <g className="iso-grid">{lines}</g>;
}

/** SVG canvas with the grid. Children are drawn back-to-front. */
export function IsoCanvas({ children, viewBox = "-152 -104 304 184", label }: { children: ReactNode; viewBox?: string; label: string }) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className="iso h-full w-full" preserveAspectRatio="xMidYMid meet">
      <Grid />
      <g stroke="var(--iso-ink)" strokeWidth={1} fill="none">
        {children}
      </g>
    </svg>
  );
}

/* ---------- 2D glyphs for face content (local coordinates) ---------- */

export const Bar = ({ x, y, w, h = 4, fill = "var(--iso-text)" }: { x: number; y: number; w: number; h?: number; fill?: string }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} stroke="none" />
);

export const Check = ({ x, y, s = 10, stroke = "var(--iso-ink)" }: { x: number; y: number; s?: number; stroke?: string }) => (
  <path d={`M ${x - s * 0.45} ${y} L ${x - s * 0.1} ${y + s * 0.35} L ${x + s * 0.5} ${y - s * 0.35}`} stroke={stroke} strokeWidth={1.6} />
);

// On a top face, local diagonals project to screen vertical/horizontal and local axes
// project to screen diagonals. So a "+" that *reads* as a plus is drawn diagonally in
// local space, and an "×" that reads as a cross is drawn along the local axes.
export const Plus = ({ x, y, s = 8 }: { x: number; y: number; s?: number }) => {
  const k = s * 0.36;
  return <path d={`M ${x - k} ${y - k} L ${x + k} ${y + k} M ${x + k} ${y - k} L ${x - k} ${y + k}`} />;
};

export const Cross = ({ x, y, s = 7 }: { x: number; y: number; s?: number }) => <path d={`M ${x - s / 2} ${y} H ${x + s / 2} M ${x} ${y - s / 2} V ${y + s / 2}`} />;

export const Chevron = ({ x, y, s = 7, dir = "down" }: { x: number; y: number; s?: number; dir?: "down" | "right" | "left" }) =>
  dir === "down" ? (
    <path d={`M ${x - s / 2} ${y - s / 4} L ${x} ${y + s / 4} L ${x + s / 2} ${y - s / 4}`} />
  ) : dir === "right" ? (
    <path d={`M ${x - s / 4} ${y - s / 2} L ${x + s / 4} ${y} L ${x - s / 4} ${y + s / 2}`} />
  ) : (
    <path d={`M ${x + s / 4} ${y - s / 2} L ${x - s / 4} ${y} L ${x + s / 4} ${y + s / 2}`} />
  );

export const Sparkle = ({ x, y, s = 7, fill = "var(--iso-accent-top)" }: { x: number; y: number; s?: number; fill?: string }) => (
  <path d={`M ${x} ${y - s} Q ${x} ${y} ${x + s} ${y} Q ${x} ${y} ${x} ${y + s} Q ${x} ${y} ${x - s} ${y} Q ${x} ${y} ${x} ${y - s} Z`} fill={fill} />
);

export const Person = ({ x, y, s = 10 }: { x: number; y: number; s?: number }) => (
  <>
    <circle cx={x} cy={y - s * 0.25} r={s * 0.28} />
    <path d={`M ${x - s * 0.5} ${y + s * 0.55} Q ${x} ${y - s * 0.05} ${x + s * 0.5} ${y + s * 0.55}`} />
  </>
);
