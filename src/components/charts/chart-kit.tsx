"use client";

/**
 * Shared plumbing for the Vantu charts: scales, grid, tooltip, legend,
 * keyboard/pointer scrubbing and a screen-reader table. Plain SVG + HTML —
 * no chart library. Every chart draws in a fixed viewBox and scales to its
 * container width.
 */
import { type KeyboardEvent, type PointerEvent, type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "@/utils/cx";

/* ---------------- Color ---------------- */

/**
 * Categorical series colors, in fixed order. Assign by entity, never by rank,
 * and never cycle: a 7th series folds into "Other".
 */
export const seriesColors = [
  "var(--color-chart-primary)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
] as const;

/** Sequential ramp (one hue, light → dark) for magnitude: heatmaps, density. */
export const sequentialColors = [
  "var(--color-chart-seq-1)",
  "var(--color-chart-seq-2)",
  "var(--color-chart-seq-3)",
  "var(--color-chart-seq-4)",
  "var(--color-chart-seq-5)",
  "var(--color-chart-seq-6)",
] as const;

export interface Series<K extends string = string> {
  key: K;
  label: string;
  /** Defaults to the series' position in `seriesColors`. */
  color?: string;
}

export const colorOf = (s: Series, i: number) => s.color ?? seriesColors[i % seriesColors.length]!;

/* ---------------- Numbers ---------------- */

export const formatNumber = (n: number, opts?: Intl.NumberFormatOptions) => new Intl.NumberFormat("en-US", opts).format(n);
export const formatCompact = (n: number) => formatNumber(n, { notation: "compact", maximumFractionDigits: 1 });

/**
 * Readable axis for 0…value: picks a round step (1, 2, 2.5, 5 × 10ⁿ) for about
 * `target` intervals, then uses only as many steps as the data needs.
 */
export function niceScale(value: number, target = 5) {
  const v = Math.max(value, 1e-9);
  const raw = v / target;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw)!;
  const count = Math.max(1, Math.ceil(v / step - 1e-9));
  return { max: step * count, ticks: Array.from({ length: count + 1 }, (_, i) => +(i * step).toPrecision(12)) };
}

/* ---------------- Frame ---------------- */

export interface Frame {
  w: number;
  h: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  /** Inner plot width / height. */
  iw: number;
  ih: number;
}

export function makeFrame(w = 640, h = 240, m: Partial<Pick<Frame, "top" | "right" | "bottom" | "left">> = {}): Frame {
  const top = m.top ?? 12;
  const right = m.right ?? 12;
  const bottom = m.bottom ?? 28;
  const left = m.left ?? 40;
  return { w, h, top, right, bottom, left, iw: w - left - right, ih: h - top - bottom };
}

/** Horizontal grid lines with y-axis labels. Solid baseline, dashed above it. */
export function YGrid({ f, ticks, max, format = formatCompact }: { f: Frame; ticks: number[]; max: number; format?: (n: number) => string }) {
  return (
    <g aria-hidden>
      {ticks.map((t) => {
        const y = f.top + f.ih - (t / max) * f.ih;
        return (
          <g key={t}>
            <line x1={f.left} x2={f.w - f.right} y1={y} y2={y} stroke="var(--color-chart-grid)" strokeDasharray={t === 0 ? undefined : "3 3"} />
            <text x={f.left - 8} y={y} dy="0.32em" textAnchor="end" fontSize={11} fill="var(--color-fg-muted)">
              {format(t)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** Category labels under the plot. `every` thins dense axes; the active label is emphasized. */
export function XLabels({ f, labels, xOf, active, every = 1 }: { f: Frame; labels: string[]; xOf: (i: number) => number; active?: number | null; every?: number }) {
  return (
    <g aria-hidden>
      {labels.map((l, i) =>
        i % every === 0 || i === active ? (
          <text
            key={i}
            x={xOf(i)}
            y={f.h - 8}
            textAnchor="middle"
            fontSize={11}
            fill={i === active ? "var(--color-fg)" : "var(--color-fg-muted)"}
            fontWeight={i === active ? 600 : 400}
          >
            {l}
          </text>
        ) : null,
      )}
    </g>
  );
}

/* ---------------- Interaction ---------------- */

/**
 * Index scrubbing over evenly spaced x positions: pointer move snaps to the
 * nearest index; arrow keys step when the plot has focus.
 */
export function useScrub(count: number, indexAt: (viewX: number) => number) {
  const [active, setActive] = useState<number | null>(null);
  const clamp = (i: number) => Math.max(0, Math.min(count - 1, i));

  const onPointerMove = (e: PointerEvent<SVGElement>) => {
    const svg = e.currentTarget.ownerSVGElement ?? (e.currentTarget as SVGSVGElement);
    const box = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    setActive(clamp(indexAt(((e.clientX - box.left) / box.width) * vb.width)));
  };
  const onKeyDown = (e: KeyboardEvent<SVGElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => clamp((a ?? (e.key === "ArrowRight" ? -1 : count)) + (e.key === "ArrowRight" ? 1 : -1)));
    } else if (e.key === "Escape") setActive(null);
  };

  return {
    active,
    setActive,
    /** Spread on a transparent hit <rect> covering the plot. */
    hitProps: {
      onPointerMove,
      onPointerLeave: () => setActive(null),
      onKeyDown,
      onBlur: () => setActive(null),
      tabIndex: 0,
      fill: "transparent",
      className: "outline-none",
    },
  };
}

/* ---------------- Surface + tooltip ---------------- */

/** Positions children (tooltip) over the SVG using viewBox coordinates. */
export function ChartSurface({ f, label, children, overlay, className }: { f: Frame; label: string; children: ReactNode; overlay?: ReactNode; className?: string }) {
  return (
    <div className={cx("relative", className)}>
      <svg viewBox={`0 0 ${f.w} ${f.h}`} className="block h-auto w-full overflow-visible select-none" role="img" aria-label={label}>
        {children}
      </svg>
      {overlay}
    </div>
  );
}

/**
 * HTML tooltip anchored at a viewBox point. It renders in a portal with fixed
 * positioning, so cards with `overflow-hidden` can never clip it. It sits above
 * the point, flips below when there is no room, and is clamped to the viewport.
 */
export function ChartTooltip({ f, x, y, title, children }: { f: Frame; x: number; y: number; title?: ReactNode; children: ReactNode }) {
  const anchor = useRef<HTMLSpanElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  useLayoutEffect(() => {
    const place = () => {
      const a = anchor.current?.getBoundingClientRect();
      const t = tip.current;
      if (!a || !t) return;
      const gap = 10;
      const margin = 8;
      const w = t.offsetWidth;
      const h = t.offsetHeight;
      const left = Math.max(margin, Math.min(window.innerWidth - w - margin, a.left - w / 2));
      const above = a.top - h - gap;
      const top = above >= margin ? above : Math.min(a.top + gap, window.innerHeight - h - margin);
      setPos((p) => (p && p.left === left && p.top === top ? p : { left, top }));
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [x, y, f, title, children]);

  return (
    <>
      <span ref={anchor} aria-hidden className="pointer-events-none absolute size-0" style={{ left: `${(x / f.w) * 100}%`, top: `${(y / f.h) * 100}%` }} />
      {createPortal(
        <div
          ref={tip}
          role="status"
          className="pointer-events-none fixed z-50 min-w-36 rounded-md border border-line bg-surface px-3 py-2 text-sm shadow-popover"
          style={{ left: pos?.left ?? 0, top: pos?.top ?? 0, visibility: pos ? "visible" : "hidden" }}
        >
          {title && <p className="mb-1 font-medium text-fg">{title}</p>}
          <div className="flex flex-col gap-1">{children}</div>
        </div>,
        document.body,
      )}
    </>
  );
}

export function TooltipRow({ color, label, value, shape }: { color?: string; label: ReactNode; value: ReactNode; shape?: SwatchShape }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      {color && <Swatch color={color} shape={shape} />}
      <span className="flex-1 text-fg-secondary">{label}</span>
      <span className="font-medium tabular-nums text-fg">{value}</span>
    </div>
  );
}

/* ---------------- Legend ---------------- */

export type SwatchShape = "square" | "line" | "dot";

export function Swatch({ color, shape = "square" }: { color: string; shape?: SwatchShape }) {
  return (
    <span
      aria-hidden
      className={cx("inline-block shrink-0", shape === "line" ? "h-0.5 w-3 rounded-full" : shape === "dot" ? "size-2 rounded-full" : "size-2.5 rounded-[3px]")}
      style={{ background: color }}
    />
  );
}

export interface LegendItem {
  label: string;
  color: string;
  value?: ReactNode;
  shape?: SwatchShape;
}

export function Legend({ items, className, align = "start" }: { items: LegendItem[]; className?: string; align?: "start" | "center" }) {
  return (
    <ul className={cx("flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-fg-secondary", align === "center" && "justify-center", className)}>
      {items.map((it) => (
        <li key={it.label} className="inline-flex items-center gap-1.5">
          <Swatch color={it.color} shape={it.shape} />
          {it.label}
          {it.value !== undefined && <b className="font-medium tabular-nums text-fg">{it.value}</b>}
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Accessibility ---------------- */

/** The chart's data as a visually hidden table, so values are never color- or hover-only. */
export function SrTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: (string | number)[][] }) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c} scope="col">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((v, j) => (j === 0 ? <th key={j} scope="row">{v}</th> : <td key={j}>{v}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------------- Paths ---------------- */

/** Monotone-ish smooth path through points (Catmull-Rom → cubic Bézier, tension 0.5, clamped in y). */
export function smoothPath(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0]![0]} ${pts[0]![1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[i + 2] ?? p2;
    const lo = Math.min(p1[1], p2[1]);
    const hi = Math.max(p1[1], p2[1]);
    const c1y = Math.max(lo, Math.min(hi, p1[1] + (p2[1] - p0[1]) / 6));
    const c2y = Math.max(lo, Math.min(hi, p2[1] - (p3[1] - p1[1]) / 6));
    d += ` C ${p1[0] + (p2[0] - p0[0]) / 6} ${c1y} ${p2[0] - (p3[0] - p1[0]) / 6} ${c2y} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/** Bar with 4px rounded data-end and a square baseline end. `dir` is where the data end points. */
export function barPath(x: number, y: number, w: number, h: number, r = 4, dir: "up" | "right" = "up") {
  if (w <= 0 || h <= 0) return "";
  if (dir === "up") {
    r = Math.min(r, w / 2, h);
    return `M ${x} ${y + h} V ${y + r} Q ${x} ${y} ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h} Z`;
  }
  r = Math.min(r, h / 2, w);
  return `M ${x} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x} Z`;
}
