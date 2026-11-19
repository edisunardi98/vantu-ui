/**
 * Isometric scenes for page-level blocks, keyed by registry slug.
 * The board stands in for an app screen; blocks are drawn as the regions they occupy.
 */
import type { ReactNode } from "react";
import { Bar, Check, Chevron, Cross, Flat, Person, Plus, Rays, Slab, Sparkle } from "./iso";
import { ACC, BZ, Board, Float, On, SOFT, W } from "./scenes";

const INK = "var(--iso-ink)";
const TEXT = "var(--iso-text)";

/** Small isometric bar of a chart (a thin box) standing on a surface. */
const Column = ({ x, y, z, h, accent }: { x: number; y: number; z: number; h: number; accent?: boolean }) => (
  <Slab x={x} y={y} z={z} w={7} d={7} h={h} r={1.5} tone={accent ? "accent" : "white"} />
);

export const blockScenes: Record<string, () => ReactNode> = {
  sidebar: () => (
    <Board>
      <Flat x={-36} y={-50} z={BZ} w={124} d={100} r={10}>
        <Bar x={12} y={12} w={60} fill={INK} />
        <Bar x={12} y={26} w={90} />
        <Bar x={12} y={38} w={74} />
      </Flat>
      <On x={-96} y={-58} w={52} d={116} h={8} r={10} tone="muted">
        <rect x={8} y={8} width={10} height={10} rx={3} fill="var(--iso-accent-top)" />
        <Bar x={22} y={11} w={20} fill={INK} />
        {[40, 52, 76, 88].map((v) => (
          <g key={v}>
            <rect x={8} y={v} width={6} height={6} rx={1.5} />
            <Bar x={18} y={v + 1} w={24} />
          </g>
        ))}
        <Bar x={8} y={66} w={16} fill="var(--iso-side-dark)" />
        <circle cx={13} cy={104} r={5} />
        <Bar x={22} y={102} w={22} />
      </On>
      <Slab x={-93} y={-34} z={BZ + 8} w={46} d={14} h={5} r={5} lift>
        <rect x={5} y={4} width={6} height={6} rx={1.5} />
        <Bar x={15} y={5} w={22} fill={INK} />
      </Slab>
    </Board>
  ),
  topbar: () => (
    <Board>
      <On x={-100} y={-62} w={200} d={24} h={8} r={12}>
        <path d="M 12 10 L 16 7 L 20 10 V 16 H 12 Z" />
        <Bar x={26} y={10} w={24} fill={INK} />
        <Chevron x={58} y={12} dir="right" s={6} />
        <Bar x={66} y={10} w={30} />
      </On>
      {[148, 172].map((x, i) => (
        <Slab key={x} x={-100 + x} y={-58} z={BZ + 8} w={16} d={16} h={6} r={5} lift={i === 1}>
          <circle cx={8} cy={8} r={3.5} />
          {i === 1 && <circle cx={12} cy={4} r={2} fill="var(--color-error)" stroke="none" />}
        </Slab>
      ))}
      <Flat x={-84} y={-24} z={BZ} w={168} d={74} r={10}>
        <Bar x={10} y={12} w={70} fill={INK} />
        <Bar x={10} y={26} w={120} />
        <rect x={10} y={40} width={148} height={26} rx={6} stroke={TEXT} />
      </Flat>
    </Board>
  ),
  "page-title-bar": () => (
    <Board>
      <On x={-100} y={-62} w={200} d={40} h={7} r={12}>
        <Bar x={44} y={14} w={50} fill={INK} />
        <Bar x={44} y={24} w={70} />
        <circle cx={138} cy={20} r={4} />
        <circle cx={152} cy={20} r={4} />
      </On>
      <Slab x={-90} y={-56} z={BZ + 7} w={28} d={28} h={8} r={14} tone="soft" lift>
        <Person x={14} y={15} s={14} />
        <circle cx={24} cy={24} r={3.5} fill="var(--color-success)" />
      </Slab>
      <Slab x={66} y={-54} z={BZ + 7} w={28} d={22} h={6} r={7} tone="accent">
        <Plus x={14} y={11} s={8} />
      </Slab>
      <Flat x={-84} y={-12} z={BZ} w={168} d={60} r={10}>
        <Bar x={10} y={12} w={90} />
        <Bar x={10} y={24} w={130} />
        <Bar x={10} y={36} w={110} />
      </Flat>
    </Board>
  ),
  "page-header": () => (
    <Board>
      <Flat x={-88} y={-48} z={BZ} w={100} d={30} r={6}>
        <Bar x={0} y={4} w={84} h={7} fill={INK} />
        <Bar x={0} y={18} w={96} />
      </Flat>
      <On x={-88} y={-6} w={52} d={22} h={6} r={8}>
        <Bar x={8} y={9} w={14} fill="var(--iso-side-dark)" />
        <Bar x={24} y={9} w={20} />
      </On>
      <On x={-30} y={-6} w={44} d={22} h={6} r={8}>
        <Bar x={10} y={9} w={24} fill={INK} />
      </On>
      <Float x={20} y={-6} w={66} d={22} h={8} r={8} tone="accent" rise={14}>
        <Sparkle x={12} y={11} s={5} fill={W} />
        <Bar x={22} y={9} w={34} fill={W} />
      </Float>
    </Board>
  ),
  "metrics-strip": () => (
    <Board>
      <On x={-96} y={-30} w={192} d={60} h={7} r={12}>
        {[48, 96, 144].map((u) => (
          <line key={u} x1={u} y1={0} x2={u} y2={60} />
        ))}
        {[0, 48, 96, 144].map((u, i) => (
          <g key={u}>
            <Bar x={u + 8} y={10} w={28} />
            <Bar x={u + 8} y={22} w={18} h={7} fill={INK} />
            <Bar x={u + 28} y={24} w={10} fill={i === 3 ? "var(--color-error)" : "var(--color-success)"} />
            <Bar x={u + 8} y={36} w={24} />
          </g>
        ))}
      </On>
      {[0, 48, 96, 144].map((u) =>
        [6, 12, 9, 16].map((h, j) => <Column key={`${u}${j}`} x={-96 + u + 8 + j * 9} y={14} z={BZ + 7} h={h} accent={j === 3} />),
      )}
    </Board>
  ),
  "prospects-table": () => (
    <Board>
      <On x={-92} y={-58} w={184} d={116} h={6} r={12} tone="muted">
        <rect x={8} y={8} width={14} height={14} rx={4} fill="var(--iso-accent-top)" />
        <Bar x={28} y={10} w={60} fill={INK} />
        <Bar x={28} y={18} w={84} />
      </On>
      <Slab x={-86} y={-28} z={BZ + 6} w={172} d={80} h={5} r={10}>
        <Bar x={10} y={8} w={30} fill={TEXT} />
        <line x1={0} y1={16} x2={172} y2={16} stroke={TEXT} />
        {[24, 42, 60].map((v, i) => (
          <g key={v}>
            <circle cx={16} cy={v + 4} r={5} fill={["var(--color-avatar-rose-bg)", "var(--color-avatar-violet-bg)", "var(--color-avatar-teal-bg)"][i]} />
            <Bar x={26} y={v} w={36} fill={INK} />
            <Bar x={26} y={v + 6} w={28} />
            <Bar x={72} y={v + 2} w={34} />
            {Array.from({ length: 8 }, (_, k) => (
              <rect key={k} x={116 + k * 4.5} y={v - 1} width={2.6} height={10} rx={0.8} fill={k < 7 - i ? (i === 2 ? "var(--color-warning)" : "var(--color-success)") : TEXT} stroke="none" />
            ))}
          </g>
        ))}
      </Slab>
    </Board>
  ),
  "data-table": () => (
    <Board>
      <Flat x={-92} y={-60} z={BZ} w={184} d={14} r={4}>
        <Bar x={0} y={4} w={34} fill={INK} />
        <line x1={0} y1={12} x2={34} y2={12} stroke={INK} strokeWidth={1.4} />
        <Bar x={46} y={4} w={30} />
        <Bar x={88} y={4} w={30} />
      </Flat>
      <On x={-92} y={-42} w={48} d={14} h={4} r={5}>
        <circle cx={8} cy={7} r={3} />
        <Bar x={14} y={5} w={26} />
      </On>
      <On x={-40} y={-42} w={40} d={14} h={4} r={5}>
        <Bar x={7} y={5} w={22} />
      </On>
      <Flat x={4} y={-42} z={BZ} w={36} d={14} r={5} dashed>
        <Plus x={8} y={7} s={5} />
        <Bar x={14} y={5} w={16} />
      </Flat>
      <On x={-92} y={-24} w={184} d={14} h={4} r={5} tone="soft">
        <Bar x={8} y={5} w={30} fill={ACC} />
        {[110, 136, 160].map((u) => (
          <rect key={u} x={u} y={3} width={20} height={8} rx={3} fill={W} />
        ))}
      </On>
      <On x={-92} y={-6} w={184} d={64} h={6} r={10}>
        <rect x={0} y={0} width={184} height={12} rx={0} fill="var(--iso-side)" stroke="none" />
        {[12, 25, 38, 51].map((v, i) => (
          <g key={v}>
            <line x1={0} y1={v} x2={184} y2={v} stroke={TEXT} />
            {i < 3 && (
              <>
                <rect x={8} y={v + 3} width={7} height={7} rx={1.5} fill={i < 2 ? ACC : W} />
                <circle cx={26} cy={v + 6.5} r={4} fill="var(--color-avatar-blue-bg)" />
                <Bar x={34} y={v + 5} w={30} fill={INK} />
                <rect x={74} y={v + 3} width={7} height={7} rx={1.5} fill={["#8a5a2b", "#f2620f", "#0a84ff"][i]} stroke="none" />
                <Bar x={86} y={v + 5} w={24} />
                {Array.from({ length: 6 }, (_, k) => (
                  <rect key={k} x={118 + k * 4} y={v + 2} width={2.4} height={9} rx={0.8} fill={k < 5 ? "var(--color-success)" : TEXT} stroke="none" />
                ))}
                <rect x={150} y={v + 3} width={22} height={7} rx={3} fill="var(--color-success-soft)" stroke="none" />
              </>
            )}
          </g>
        ))}
      </On>
    </Board>
  ),
  "ai-search-panel": () => (
    <Board>
      <On x={-94} y={-58} w={188} d={34} h={9} r={12}>
        <Sparkle x={16} y={17} s={6} fill={ACC} />
        <Bar x={28} y={15} w={90} />
      </On>
      <Slab x={36} y={-52} z={BZ + 9} w={52} d={22} h={7} r={7} tone="accent" lift>
        <Bar x={10} y={9} w={32} fill={W} />
      </Slab>
      {[
        [-94, 40],
        [-50, 46],
        [0, 38],
        [42, 50],
      ].map(([x, w]) => (
        <On key={x} x={x!} y={-16} w={w!} d={14} h={4} r={6}>
          <Bar x={6} y={5} w={10} fill="var(--iso-side-dark)" />
          <Bar x={18} y={5} w={w! - 30} fill={INK} />
          <Cross x={w! - 6} y={7} s={4} />
        </On>
      ))}
      <On x={-94} y={8} w={78} d={50} h={6} r={10} tone="soft">
        <Sparkle x={12} y={12} s={4} fill={ACC} />
        <Bar x={20} y={10} w={26} fill={ACC} />
        <Bar x={8} y={24} w={60} fill={INK} />
        <Bar x={8} y={34} w={52} />
      </On>
      <On x={-8} y={8} w={102} d={50} h={6} r={10}>
        {[10, 22, 34].map((v, i) => (
          <g key={v}>
            <circle cx={12} cy={v + 2} r={3.5} stroke={i === 0 ? "var(--color-success)" : i === 1 ? ACC : TEXT} />
            <Bar x={20} y={v} w={50} fill={i === 1 ? INK : TEXT} />
            <Bar x={78} y={v} w={16} />
          </g>
        ))}
      </On>
    </Board>
  ),
  "sequence-flow": () => (
    <Board>
      <Flat x={-1} y={-56} z={BZ} w={2} d={112} r={1} dashed />
      <On x={-26} y={-60} w={52} d={12} h={4} r={6} tone="soft">
        <Bar x={10} y={4} w={32} fill={ACC} />
      </On>
      {[-42, 14].map((y, i) => (
        <On key={y} x={-60} y={y} w={120} d={36} h={7} r={10} lift={i === 1}>
          <rect x={8} y={8} width={14} height={14} rx={4} fill={SOFT} stroke="none" />
          {i === 0 ? <path d="M 10 12 L 15 16 L 20 12" stroke={ACC} /> : <Bar x={11} y={13} w={8} fill={ACC} />}
          <Bar x={28} y={9} w={48} fill={INK} />
          <Bar x={28} y={17} w={34} />
          <Bar x={8} y={27} w={92} />
        </On>
      ))}
      <On x={-22} y={0} w={44} d={10} h={4} r={5}>
        <circle cx={8} cy={5} r={2.6} />
        <Bar x={14} y={3.5} w={22} h={3} />
      </On>
      <Flat x={-20} y={54} z={BZ} w={40} d={8} r={4} dashed>
        <Plus x={8} y={4} s={4} />
      </Flat>
    </Board>
  ),
  "activity-feed": () => (
    <Board>
      <On x={-70} y={-58} w={140} d={116} h={6} r={12} tone="muted">
        <rect x={8} y={8} width={14} height={14} rx={4} fill="var(--color-success)" />
        <Bar x={28} y={10} w={50} fill={INK} />
        <Bar x={28} y={18} w={64} />
      </On>
      <Slab x={-64} y={-28} z={BZ + 6} w={128} d={80} h={5} r={10}>
        <line x1={12} y1={10} x2={12} y2={70} strokeDasharray="3 3" stroke={TEXT} />
        {[8, 30, 52].map((v, i) => (
          <g key={v}>
            <circle cx={12} cy={v + 4} r={5} fill={i === 0 ? SOFT : W} />
            <Bar x={24} y={v} w={[90, 76, 84][i]!} fill={INK} />
            <Bar x={24} y={v + 8} w={50} />
          </g>
        ))}
      </Slab>
    </Board>
  ),
  "performance-chart": () => (
    <Board>
      <On x={-92} y={-58} w={184} d={116} h={6} r={12} tone="muted">
        <rect x={8} y={8} width={14} height={14} rx={4} fill="var(--iso-accent-top)" />
        <Bar x={28} y={10} w={60} fill={INK} />
        <rect x={140} y={8} width={36} height={12} rx={4} fill={W} />
      </On>
      <Slab x={-86} y={-30} z={BZ + 6} w={172} d={82} h={5} r={10}>
        {[20, 40, 60].map((v) => (
          <line key={v} x1={8} y1={v} x2={164} y2={v} stroke={TEXT} strokeDasharray="2 3" />
        ))}
      </Slab>
      {/* Stacked bars: qualified (accent) at the base, discovered-not-qualified (white) on top. */}
      {[10, 18, 26, 14, 30, 34, 22, 38].map((h, i) => {
        const q = Math.round(h * 0.4) + 2;
        return (
          <g key={i}>
            <Column x={-74 + i * 19} y={14} z={BZ + 11} h={q} accent />
            <Column x={-74 + i * 19} y={14} z={BZ + 11 + q} h={h + 10 - q} />
          </g>
        );
      })}
    </Board>
  ),
  "sequence-performance": () => (
    <Board>
      <On x={-92} y={-58} w={184} d={116} h={6} r={12} tone="muted">
        <rect x={8} y={8} width={14} height={14} rx={4} fill="var(--color-error)" />
        <Bar x={28} y={10} w={60} fill={INK} />
      </On>
      <Slab x={-86} y={-30} z={BZ + 6} w={172} d={82} h={5} r={10}>
        {[10, 26, 42, 58].map((v, i) => (
          <g key={v}>
            <Bar x={10} y={v} w={44} fill={INK} />
            <rect x={64} y={v - 1} width={66} height={6} rx={3} fill="var(--iso-side)" stroke="none" />
            <rect x={64} y={v - 1} width={[60, 48, 30, 22][i]} height={6} rx={3} fill={i < 2 ? "var(--iso-accent-top)" : "var(--iso-side-dark)"} stroke="none" />
            <Bar x={140} y={v} w={20} />
          </g>
        ))}
      </Slab>
    </Board>
  ),
  "usage-card": () => (
    <Board>
      <On x={-92} y={-46} w={184} d={92} h={6} r={12} tone="muted">
        <rect x={8} y={8} width={14} height={14} rx={4} fill="var(--color-warning)" />
        <Bar x={28} y={10} w={56} fill={INK} />
        <rect x={140} y={8} width={36} height={12} rx={4} fill={W} />
      </On>
      <Slab x={-86} y={-16} z={BZ + 6} w={172} d={56} h={5} r={10}>
        {[43, 86, 129].map((u) => (
          <line key={u} x1={u} y1={0} x2={u} y2={56} stroke={TEXT} />
        ))}
        {[0, 43, 86, 129].map((u, i) => (
          <g key={u}>
            <Bar x={u + 6} y={12} w={18} />
            <Bar x={u + 26} y={12} w={10} fill={INK} />
            <rect x={u + 6} y={26} width={31} height={4} rx={2} fill="var(--iso-side)" stroke="none" />
            <rect x={u + 6} y={26} width={[20, 20, 9, 15][i]} height={4} rx={2} fill="var(--iso-accent-top)" stroke="none" />
            <Bar x={u + 6} y={38} w={16} />
          </g>
        ))}
      </Slab>
    </Board>
  ),
  "command-menu": () => (
    <Board>
      <Flat x={-100} y={-62} z={BZ} w={200} d={124} r={14} fill="var(--iso-side)" />
      <Float x={-62} y={-48} w={124} d={96} h={7} r={12} rise={26}>
        <circle cx={12} cy={12} r={4} />
        <line x1={15} y1={15} x2={18} y2={18} />
        <Bar x={24} y={10} w={60} />
        <rect x={100} y={7} width={16} height={10} rx={3} />
        <line x1={0} y1={24} x2={124} y2={24} />
        <Bar x={10} y={30} w={24} h={3} fill={TEXT} />
        <rect x={6} y={38} width={112} height={14} rx={5} fill={SOFT} stroke="none" />
        <Sparkle x={14} y={45} s={4} fill={ACC} />
        <Bar x={22} y={43} w={52} fill={ACC} />
        {[58, 70].map((v) => (
          <g key={v}>
            <rect x={10} y={v} width={7} height={7} rx={2} />
            <Bar x={22} y={v + 2} w={46} />
            <Bar x={96} y={v + 2} w={18} fill={TEXT} />
          </g>
        ))}
        <line x1={0} y1={84} x2={124} y2={84} />
      </Float>
      <Rays x={-56} y={-42} z={BZ + 40} radius={14} />
    </Board>
  ),
  "sign-in": () => (
    <Board>
      <Flat x={-100} y={-62} z={BZ} w={200} d={124} r={14} fill="var(--iso-side)" />
      <Float x={-50} y={-56} w={100} d={112} h={7} r={12} rise={18}>
        <rect x={10} y={10} width={14} height={14} rx={4} fill="var(--iso-accent-top)" />
        <Bar x={10} y={30} w={60} h={5} fill={INK} />
        <Bar x={10} y={40} w={76} />
        <rect x={10} y={50} width={80} height={12} rx={4} />
        <circle cx={38} cy={56} r={3} stroke="#4285f4" />
        <Bar x={44} y={54.5} w={30} h={3} />
        <rect x={10} y={68} width={80} height={12} rx={4} />
        <Bar x={16} y={72.5} w={40} h={3} />
        <rect x={10} y={84} width={80} height={12} rx={4} />
        <Bar x={16} y={88.5} w={30} h={3} />
        <rect x={10} y={100} width={80} height={6} rx={3} fill="var(--iso-accent-top)" />
      </Float>
      <Slab x={58} y={-20} z={BZ} w={26} d={26} h={22} r={4} lift>
        <Check x={13} y={13} s={11} stroke={ACC} />
      </Slab>
    </Board>
  ),
};
