/**
 * Isometric scenes for the Charts section, keyed by registry slug.
 * Flat charts are drawn on a panel's top face; bars rise as real columns.
 */
import type { ReactNode } from "react";
import { Bar, Slab } from "./iso";
import { BZ, Board, Float, On, W } from "./scenes";

const INK = "var(--iso-ink)";
const ACC = "var(--iso-accent-top)";
const SOFT = "var(--iso-accent-soft)";

/** Panel resting on the board with a title bar; chart content goes on its face. */
const Panel = ({ children, h = 6 }: { children?: ReactNode; h?: number }) => (
  <On x={-92} y={-58} w={184} d={116} h={h} r={12}>
    <Bar x={10} y={10} w={54} fill={INK} />
    <Bar x={10} y={20} w={34} />
    {children}
  </On>
);

/** Dashed gridlines across a face, rows at the given v positions. */
const Grid = ({ rows, u0 = 10, u1 = 174 }: { rows: number[]; u0?: number; u1?: number }) => (
  <>
    {rows.map((v) => (
      <line key={v} x1={u0} y1={v} x2={u1} y2={v} stroke="var(--iso-text)" strokeDasharray="2 3" />
    ))}
  </>
);

/** Thin column standing on a surface at height z. */
const Column = ({ x, y, z, h, tone = "white", w = 8 }: { x: number; y: number; z: number; h: number; tone?: "white" | "accent" | "soft"; w?: number }) => (
  <Slab x={x} y={y} z={z} w={w} d={w} h={h} r={1.5} tone={tone} />
);

const PZ = BZ + 6; // top of a Panel

/** Points on a face: u from 14 to 170, v mapped from value (0..1) into [v0, v1]. */
const curve = (vals: number[], v0 = 100, v1 = 40) => vals.map((t, i) => [14 + (i * 156) / (vals.length - 1), v0 - t * (v0 - v1)] as const);
const poly = (pts: readonly (readonly [number, number])[]) => pts.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ");

export const chartScenes: Record<string, () => ReactNode> = {
  "area-chart": () => {
    const pts = curve([0.15, 0.3, 0.25, 0.48, 0.42, 0.62, 0.7, 0.9]);
    const prev = curve([0.1, 0.18, 0.2, 0.26, 0.3, 0.36, 0.4, 0.46]);
    return (
      <Board>
        <Panel>
          <Grid rows={[46, 64, 82, 100]} />
          <path d={`${poly(pts)} L 170 100 L 14 100 Z`} fill={SOFT} stroke="none" />
          <path d={poly(prev)} stroke="var(--iso-side-dark)" strokeDasharray="3 3" />
          <path d={poly(pts)} stroke={ACC} strokeWidth={2} />
        </Panel>
        <Float x={18} y={-34} w={56} d={26} h={5} r={6} rise={24}>
          <Bar x={8} y={8} w={26} fill={INK} />
          <Bar x={8} y={16} w={38} />
        </Float>
      </Board>
    );
  },
  "line-chart": () => (
    <Board>
      <Panel>
        <Grid rows={[46, 64, 82, 100]} />
        <path d={poly(curve([0.2, 0.28, 0.24, 0.4, 0.36, 0.5, 0.58, 0.66]))} stroke="var(--iso-side-dark)" strokeWidth={1.5} />
        <path d={poly(curve([0.42, 0.5, 0.44, 0.6, 0.66, 0.62, 0.74, 0.78]))} stroke={INK} strokeWidth={1.5} />
        <path d={poly(curve([0.3, 0.4, 0.56, 0.62, 0.8, 0.76, 0.88, 0.96]))} stroke={ACC} strokeWidth={2} />
      </Panel>
      {[0.66, 0.78, 0.96].map((t, i) => {
        const v = 100 - t * 60;
        return <Slab key={i} x={-92 + 166} y={-58 + v - 3} z={PZ} w={6} d={6} h={i === 2 ? 14 : 4} r={3} tone={i === 2 ? "accent" : "white"} lift={i === 2} />;
      })}
    </Board>
  ),
  "bar-chart": () => (
    <Board>
      <Panel>
        <Grid rows={[60, 80]} />
      </Panel>
      {[
        [16, 12],
        [26, 22],
        [34, 26],
        [30, 28],
        [20, 14],
      ].map(([a, b], i) => (
        <g key={i}>
          <Column x={-76 + i * 32} y={18} z={PZ} h={a!} tone="accent" />
          <Column x={-66 + i * 32} y={18} z={PZ} h={b!} tone="soft" />
        </g>
      ))}
    </Board>
  ),
  "stacked-bar-chart": () => (
    <Board>
      <Panel>
        <Grid rows={[60, 80]} />
      </Panel>
      {[
        [10, 6, 4],
        [12, 8, 4],
        [13, 9, 3],
        [15, 11, 5],
        [17, 12, 5],
        [16, 14, 6],
      ].map(([a, b, c], i) => (
        <g key={i}>
          <Column x={-78 + i * 26} y={18} z={PZ} h={a!} tone="accent" w={10} />
          <Column x={-78 + i * 26} y={18} z={PZ + a!} h={b!} tone="soft" w={10} />
          <Column x={-78 + i * 26} y={18} z={PZ + a! + b!} h={c!} w={10} />
        </g>
      ))}
    </Board>
  ),
  "horizontal-bar-chart": () => (
    <Board>
      <Panel>
        {[120, 102, 92, 72, 56, 44].map((w, i) => (
          <g key={i}>
            <Bar x={10} y={36 + i * 13} w={22} fill={i < 3 ? INK : "var(--iso-text)"} />
            <rect x={38} y={34 + i * 13} width={w} height={7} rx={2} fill={i < 3 ? ACC : "var(--iso-side-dark)"} stroke="none" />
          </g>
        ))}
      </Panel>
      <Float x={36} y={-24} w={48} d={18} h={5} r={5} rise={20} tone="accent">
        <Bar x={8} y={7} w={30} fill={W} />
      </Float>
    </Board>
  ),
  "donut-chart": () => {
    const segs = [
      [0, 0.42, ACC],
      [0.42, 0.7, "var(--iso-ink)"],
      [0.7, 0.86, SOFT],
      [0.86, 1, "var(--iso-side-dark)"],
    ] as const;
    const cx = 58;
    const cy = 64;
    const r = 34;
    return (
      <Board>
        <Panel>
          {segs.map(([a0, a1, col], i) => {
            const p = (t: number) => [cx + r * Math.sin(t * 2 * Math.PI), cy - r * Math.cos(t * 2 * Math.PI)];
            const [x0, y0] = p(a0 + 0.008);
            const [x1, y1] = p(a1 - 0.008);
            return <path key={i} d={`M ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 0.5 ? 1 : 0} 1 ${x1} ${y1}`} stroke={col} strokeWidth={12} fill="none" />;
          })}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={110} y={40 + i * 14} width={6} height={6} rx={1.5} fill={segs[i]![2]} stroke="none" />
              <Bar x={120} y={41 + i * 14} w={30} />
            </g>
          ))}
        </Panel>
      </Board>
    );
  },
  "radial-chart": () => {
    const cx = 92;
    const cy = 66;
    const r = 36;
    const p = (deg: number) => {
      const a = ((deg - 90) * Math.PI) / 180;
      return `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
    };
    return (
      <Board>
        <Panel>
          <path d={`M ${p(-120)} A ${r} ${r} 0 1 1 ${p(120)}`} stroke="var(--iso-side-dark)" strokeWidth={9} strokeLinecap="round" />
          <path d={`M ${p(-120)} A ${r} ${r} 0 0 1 ${p(40)}`} stroke={ACC} strokeWidth={9} strokeLinecap="round" />
          <Bar x={80} y={62} w={24} h={6} fill={INK} />
        </Panel>
        <Float x={-16} y={-10} w={30} d={16} h={5} r={6} rise={26} tone="success">
          <Bar x={7} y={6} w={16} fill={INK} />
        </Float>
      </Board>
    );
  },
  "funnel-chart": () => (
    <Board>
      {[150, 110, 84, 46, 24].map((w, i) => (
        <Slab key={i} x={-w / 2} y={-50 + i * 21} z={BZ} w={w} d={14} h={6 - i} r={4} tone={i === 0 ? "accent" : i < 3 ? "soft" : "white"} lift={i === 3} />
      ))}
    </Board>
  ),
  heatmap: () => (
    <Board>
      <Panel>
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 10 }, (_, c) => {
            const t = Math.exp(-((c - 3) ** 2) / 6) * (r === 1 || r === 2 ? 1 : 0.6) + Math.exp(-((c - 7) ** 2) / 4) * 0.4;
            const fill = t > 0.7 ? ACC : t > 0.4 ? SOFT : t > 0.2 ? "var(--iso-side)" : W;
            return <rect key={`${r}-${c}`} x={14 + c * 16} y={34 + r * 15} width={13} height={12} rx={2} fill={fill} />;
          }),
        )}
      </Panel>
      <Slab x={-92 + 14 + 3 * 16} y={-58 + 34 + 15} z={PZ} w={13} d={12} h={10} r={2} tone="accent" lift />
    </Board>
  ),
  sparkline: () => (
    <Board>
      {[-56, -6, 44].map((y, i) => (
        <On key={y} x={-92} y={y} w={184} d={40} h={6 + (i === 1 ? 4 : 0)} r={10} lift={i === 1}>
          <Bar x={10} y={10} w={40} />
          <Bar x={10} y={22} w={26} h={6} fill={INK} />
          <path
            d={poly(
              [0.2, 0.4, 0.3, 0.6, 0.5, 0.8, 0.9].map((t, k) => [100 + k * 12, 32 - (i === 2 ? 1 - t : t) * 22] as const),
            )}
            stroke={i === 1 ? ACC : INK}
            strokeWidth={i === 1 ? 2 : 1.5}
          />
        </On>
      ))}
    </Board>
  ),
};
