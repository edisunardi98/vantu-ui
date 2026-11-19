/**
 * One isometric line-art scene per component, keyed by registry slug.
 * Every scene sits on the same board so the grid reads as one system.
 */
import type { ReactNode } from "react";
import { Bar, Check, Chevron, Cross, Flat, Person, Plus, Rays, Slab, type SlabProps, Sparkle, type Tone } from "./iso";

export const BZ = 6; // board top height
export const W = "var(--iso-face)";
export const ACC = "var(--color-accent)";
export const SOFT = "var(--iso-accent-soft)";

export function Board({ children }: { children?: ReactNode }) {
  return (
    <>
      <Slab x={-100} y={-62} w={200} d={124} h={BZ} r={14} shadow />
      {children}
    </>
  );
}

/** A raised pill/slab resting on the board. */
export const On = (p: Omit<SlabProps, "z"> & { z?: number }) => <Slab z={BZ} {...p} />;

/** A slab floating above the board with dashed guides and a shadow. */
export const Float = ({ rise = 30, ...p }: Omit<SlabProps, "z" | "lift"> & { rise?: number }) => <Slab z={BZ + rise} dropTo={BZ} shadow shadowZ={BZ} lift {...p} />;

const tick = (tone: Tone) => (tone === "accent" ? W : "var(--iso-ink)");

export const scenes: Record<string, () => ReactNode> = {
  /* ---------------- Actions ---------------- */
  button: () => (
    <Board>
      <On x={-78} y={-46} w={96} d={30} h={8} r={10}>
        <Bar x={18} y={13} w={58} />
      </On>
      <Float x={-40} y={2} w={118} d={36} h={10} r={12} tone="accent" rise={16}>
        <Sparkle x={20} y={18} s={6} fill={W} />
        <Bar x={34} y={16} w={64} fill={W} />
      </Float>
    </Board>
  ),
  "icon-button": () => (
    <Board>
      {[-70, -18, 34].map((x, i) => (
        <On key={x} x={x} y={-16} w={36} d={36} h={i === 1 ? 14 : 9} r={9} tone={i === 1 ? "accent" : "white"} lift={i === 1}>
          {i === 0 && <Plus x={18} y={18} s={12} />}
          {i === 1 && <circle cx={18} cy={18} r={7} stroke={W} />}
          {i === 2 && (
            <>
              <circle cx={11} cy={18} r={1.6} fill="var(--iso-ink)" />
              <circle cx={18} cy={18} r={1.6} fill="var(--iso-ink)" />
              <circle cx={25} cy={18} r={1.6} fill="var(--iso-ink)" />
            </>
          )}
        </On>
      ))}
    </Board>
  ),
  menu: () => (
    <Board>
      <On x={-82} y={-50} w={70} d={26} h={8} r={9}>
        <Bar x={12} y={11} w={34} />
        <Chevron x={56} y={13} />
      </On>
      <Float x={-36} y={-18} w={104} d={92} h={6} r={10} rise={26}>
        <Bar x={14} y={14} w={56} />
        <rect x={6} y={30} width={92} height={18} rx={6} fill={SOFT} stroke="none" />
        <Bar x={14} y={37} w={48} fill={ACC} />
        <Bar x={14} y={58} w={64} />
        <line x1={6} y1={72} x2={98} y2={72} stroke="var(--iso-text)" />
        <Bar x={14} y={80} w={40} fill="var(--color-error)" />
      </Float>
    </Board>
  ),
  filter: () => (
    <Board>
      {[
        [-84, -44, 78],
        [-84, -8, 64],
      ].map(([x, y, w]) => (
        <On key={y} x={x} y={y} w={w} d={26} h={8} r={9}>
          <Bar x={10} y={11} w={18} fill="var(--iso-side-dark)" />
          <Bar x={32} y={11} w={w - 52} />
          <Chevron x={w - 11} y={13} />
        </On>
      ))}
      <Flat x={-84} y={28} z={BZ} w={70} d={26} r={9} dashed>
        <Plus x={13} y={13} s={7} />
        <Bar x={22} y={11} w={36} />
      </Flat>
      <Float x={14} y={-20} w={70} d={60} h={6} r={10} rise={22}>
        {[12, 28, 44].map((v, i) => (
          <g key={v}>
            <rect x={10} y={v - 4} width={8} height={8} rx={2} fill={i === 0 ? ACC : W} />
            <Bar x={24} y={v - 2} w={34} />
          </g>
        ))}
      </Float>
    </Board>
  ),
  "link-button": () => (
    <Board>
      <Flat x={-70} y={-30} z={BZ} w={140} d={60} r={10} fill={W}>
        <Bar x={18} y={20} w={70} fill={ACC} />
        <line x1={18} y1={30} x2={88} y2={30} stroke={ACC} />
        <path d="M 100 22 H 116 M 110 16 L 116 22 L 110 28" stroke={ACC} strokeWidth={1.4} />
        <Bar x={18} y={42} w={44} fill="var(--iso-text)" />
      </Flat>
    </Board>
  ),
  "button-group": () => (
    <Board>
      <On x={-82} y={-20} w={164} d={38} h={10} r={11}>
        <line x1={55} y1={0} x2={55} y2={38} />
        <line x1={110} y1={0} x2={110} y2={38} />
        <Bar x={14} y={17} w={28} />
        <rect x={58} y={4} width={49} height={30} rx={8} fill="var(--iso-side)" stroke="none" />
        <Bar x={68} y={17} w={28} fill="var(--iso-ink)" />
        <Bar x={124} y={17} w={28} />
      </On>
    </Board>
  ),

  /* ---------------- Forms ---------------- */
  input: () => (
    <Board>
      <Flat x={-84} y={-44} z={BZ} w={60} d={12} r={4}>
        <Bar x={0} y={4} w={44} fill="var(--iso-ink)" />
      </Flat>
      <On x={-84} y={-26} w={168} d={34} h={8} r={11} tone="white">
        <circle cx={18} cy={17} r={5} />
        <line x1={22} y1={21} x2={25} y2={24} />
        <Bar x={32} y={15} w={70} />
        <line x1={108} y1={9} x2={108} y2={25} stroke={ACC} strokeWidth={1.6} />
      </On>
      <Flat x={-84} y={20} z={BZ} w={120} d={10} r={4}>
        <Bar x={0} y={3} w={90} fill="var(--iso-text)" />
      </Flat>
    </Board>
  ),
  select: () => (
    <Board>
      <On x={-84} y={-52} w={150} d={30} h={8} r={10}>
        <Bar x={14} y={13} w={70} />
        <Chevron x={134} y={15} />
      </On>
      <Float x={-60} y={-12} w={150} d={72} h={6} r={10} rise={20}>
        <Bar x={14} y={14} w={70} />
        <rect x={6} y={28} width={138} height={18} rx={6} fill={SOFT} stroke="none" />
        <Bar x={14} y={35} w={60} fill={ACC} />
        <Check x={130} y={37} s={9} stroke={ACC} />
        <Bar x={14} y={56} w={52} />
      </Float>
    </Board>
  ),
  textarea: () => (
    <Board>
      <On x={-80} y={-44} w={160} d={88} h={8} r={12}>
        {[16, 28, 40, 52].map((v, i) => (
          <Bar key={v} x={14} y={v} w={[120, 104, 128, 66][i]!} />
        ))}
        <line x1={68} y1={50} x2={68} y2={60} stroke={ACC} strokeWidth={1.6} />
        <path d="M 150 72 L 140 82 M 150 78 L 146 82" />
      </On>
    </Board>
  ),
  checkbox: () => (
    <Board>
      {[-46, -10, 26].map((y, i) => (
        <g key={y}>
          <On x={-74} y={y} w={22} d={22} h={i < 2 ? 10 : 7} r={5} tone={i < 2 ? "accent" : "white"} lift={i === 0}>
            {i < 2 && <Check x={11} y={11} s={11} stroke={W} />}
          </On>
          <Flat x={-40} y={y + 7} z={BZ} w={110} d={8} r={4}>
            <Bar x={0} y={2} w={[96, 72, 84][i]!} />
          </Flat>
        </g>
      ))}
    </Board>
  ),
  radio: () => (
    <Board>
      {[-46, -10, 26].map((y, i) => (
        <g key={y}>
          <On x={-74} y={y} w={22} d={22} h={i === 0 ? 11 : 7} r={11} tone={i === 0 ? "accent" : "white"} lift={i === 0}>
            {i === 0 && <circle cx={11} cy={11} r={4} fill={W} />}
          </On>
          <Flat x={-40} y={y + 7} z={BZ} w={110} d={8} r={4}>
            <Bar x={0} y={2} w={[88, 104, 70][i]!} />
          </Flat>
        </g>
      ))}
    </Board>
  ),
  switch: () => (
    <Board>
      <On x={-72} y={-44} w={72} d={36} h={10} r={18} tone="accent" />
      <Slab x={-36} y={-42} z={BZ + 10} w={32} d={32} h={8} r={16} lift />
      <On x={-72} y={10} w={72} d={36} h={10} r={18} tone="muted" />
      <Slab x={-70} y={12} z={BZ + 10} w={32} d={32} h={6} r={16} />
      <Flat x={14} y={-34} z={BZ} w={70} d={14} r={4}>
        <Bar x={0} y={5} w={60} />
      </Flat>
      <Flat x={14} y={20} z={BZ} w={70} d={14} r={4}>
        <Bar x={0} y={5} w={46} />
      </Flat>
    </Board>
  ),
  chip: () => (
    <Board>
      <On x={-88} y={-48} w={70} d={26} h={8} r={10} tone="soft">
        <Check x={14} y={13} s={8} stroke={ACC} />
        <Bar x={24} y={11} w={36} fill={ACC} />
      </On>
      <On x={2} y={-48} w={66} d={26} h={8} r={10}>
        <Bar x={12} y={11} w={42} />
      </On>
      <On x={-88} y={6} w={78} d={26} h={8} r={10}>
        <Bar x={12} y={11} w={40} />
        <Cross x={64} y={13} s={6} />
      </On>
      <On x={10} y={6} w={60} d={26} h={8} r={10}>
        <Bar x={12} y={11} w={26} />
        <Cross x={48} y={13} s={6} />
      </On>
    </Board>
  ),
  slider: () => (
    <Board>
      <On x={-86} y={-6} w={172} d={12} h={4} r={6} tone="muted">
        <rect x={0} y={0} width={104} height={12} rx={6} fill="var(--iso-accent-top)" />
      </On>
      <Slab x={6} y={-12} z={BZ + 4} w={24} d={24} h={10} r={12} lift />
      <Float x={-6} y={-48} w={48} d={22} h={6} r={7} tone="ink" rise={34}>
        <Bar x={10} y={9} w={28} fill={W} />
      </Float>
      {[-86, -43, 0, 43, 86].map((x) => (
        <Flat key={x} x={x - 1} y={18} z={BZ} w={2} d={6} r={1} fill="var(--iso-text)" />
      ))}
    </Board>
  ),
  "file-upload": () => (
    <Board>
      <Flat x={-84} y={-50} z={BZ} w={168} d={100} r={12} dashed fill="var(--iso-face)" />
      <Float x={-26} y={-30} w={52} d={60} h={5} r={6} rise={34}>
        <path d="M 38 0 V 14 H 52" />
        <Bar x={10} y={24} w={30} />
        <Bar x={10} y={34} w={22} />
        <rect x={10} y={44} width={22} height={9} rx={2} fill="var(--color-error)" stroke="none" />
      </Float>
      <Rays x={0} y={0} z={BZ + 52} radius={18} />
    </Board>
  ),
  "choice-card": () => (
    <Board>
      <On x={-80} y={-50} w={160} d={42} h={8} r={10} tone="white">
        <path d="M 0 10 A 10 10 0 0 1 10 0 H 150 A 10 10 0 0 1 160 10 V 32 A 10 10 0 0 1 150 42 H 10 A 10 10 0 0 1 0 32 Z" className="iso-accent-stroke" />
        <rect x={12} y={11} width={20} height={20} rx={6} fill={SOFT} stroke="none" />
        <Bar x={42} y={14} w={60} fill="var(--iso-ink)" />
        <Bar x={42} y={24} w={84} />
        <circle cx={144} cy={21} r={6} fill={ACC} stroke="none" />
        <circle cx={144} cy={21} r={2.4} fill={W} stroke="none" />
      </On>
      <On x={-80} y={2} w={160} d={42} h={6} r={10}>
        <rect x={12} y={11} width={20} height={20} rx={6} />
        <Bar x={42} y={14} w={56} />
        <Bar x={42} y={24} w={76} />
        <circle cx={144} cy={21} r={6} />
      </On>
    </Board>
  ),
  "setting-row": () => (
    <Board>
      {[-48, -8, 32].map((y, i) => (
        <g key={y}>
          <Flat x={-84} y={y} z={BZ} w={100} d={20} r={4}>
            <Bar x={0} y={3} w={60} fill="var(--iso-ink)" />
            <Bar x={0} y={13} w={92} />
          </Flat>
          <On x={36} y={y} w={44} d={22} h={7} r={11} tone={i === 1 ? "muted" : "accent"}>
            <circle cx={i === 1 ? 11 : 33} cy={11} r={7} fill={W} />
          </On>
        </g>
      ))}
    </Board>
  ),

  /* ---------------- Data display ---------------- */
  badge: () => (
    <Board>
      {(
        [
          [-84, -40, "soft", ACC],
          [-14, -40, "success", "var(--color-success)"],
          [-84, 0, "warning", "var(--color-warning)"],
          [-14, 0, "error", "var(--color-error)"],
        ] as const
      ).map(([x, y, tone, dot]) => (
        <On key={`${x}${y}`} x={x} y={y} w={62} d={24} h={6} r={8} tone={tone}>
          <circle cx={12} cy={12} r={3} fill={dot} stroke="none" />
          <Bar x={20} y={10} w={32} fill={dot} />
        </On>
      ))}
      <On x={56} y={-20} w={30} d={30} h={10} r={15} tone="accent" lift>
        <Bar x={9} y={13} w={12} fill={W} />
      </On>
    </Board>
  ),
  counter: () => (
    <Board>
      <On x={-70} y={-12} w={40} d={24} h={8} r={12} tone="muted">
        <Bar x={12} y={10} w={16} fill="var(--iso-ink)" />
      </On>
      <On x={-16} y={-12} w={40} d={24} h={10} r={12} tone="accent">
        <Bar x={12} y={10} w={16} fill={W} />
      </On>
      <Float x={38} y={-12} w={40} d={24} h={10} r={12} tone="error" rise={18}>
        <Bar x={12} y={10} w={16} fill="var(--color-error)" />
      </Float>
    </Board>
  ),
  avatar: () => (
    <Board>
      {[-72, -42, -12].map((x, i) => (
        <On key={x} x={x} y={-44} w={34} d={34} h={8} r={17} tone={i === 2 ? "soft" : "white"}>
          <Person x={17} y={18} s={16} />
        </On>
      ))}
      <Float x={20} y={-6} w={48} d={48} h={10} r={24} tone="soft" rise={18}>
        <Person x={24} y={25} s={24} />
        <circle cx={41} cy={41} r={5} fill="var(--color-success)" />
      </Float>
    </Board>
  ),
  "score-meter": () => (
    <Board>
      {Array.from({ length: 10 }, (_, i) => (
        <Slab key={i} x={-74 + i * 14} y={-6} z={BZ} w={8} d={8} h={i < 8 ? 26 : 10} r={1.5} tone={i < 8 ? "accent" : "white"} />
      ))}
      <Flat x={-74} y={20} z={BZ} w={140} d={10} r={4}>
        <Bar x={0} y={3} w={60} />
      </Flat>
    </Board>
  ),
  metric: () => (
    <Board>
      <Flat x={-84} y={-48} z={BZ} w={80} d={26} r={4}>
        <Bar x={0} y={2} w={52} />
        <Bar x={0} y={12} w={36} h={10} fill="var(--iso-ink)" />
        <Bar x={42} y={15} w={24} fill="var(--color-success)" />
      </Flat>
      {[10, 18, 14, 24, 20, 30, 38].map((hgt, i) => (
        <Slab key={i} x={10 + i * 11} y={-26} z={BZ} w={7} d={7} h={hgt} r={1.5} tone={i === 6 ? "accent" : "white"} />
      ))}
      <Flat x={-84} y={14} z={BZ} w={168} d={30} r={8} fill={W}>
        <path d="M 10 22 L 40 14 L 70 18 L 100 8 L 130 12 L 158 4" stroke={ACC} strokeWidth={1.6} />
      </Flat>
    </Board>
  ),
  "progress-bar": () => (
    <Board>
      {[-36, 4].map((y, i) => (
        <g key={y}>
          <Flat x={-84} y={y - 14} z={BZ} w={168} d={10} r={4}>
            <Bar x={0} y={3} w={50} />
            <Bar x={140} y={3} w={28} fill="var(--iso-ink)" />
          </Flat>
          <On x={-84} y={y} w={168} d={10} h={3} r={5} tone="muted">
            <rect x={0} y={0} width={i === 0 ? 112 : 58} height={10} rx={5} fill="var(--iso-accent-top)" />
          </On>
        </g>
      ))}
    </Board>
  ),
  card: () => (
    <Board>
      <On x={-80} y={-52} w={160} d={104} h={6} r={14} tone="muted">
        <rect x={10} y={10} width={20} height={20} rx={6} fill="var(--iso-accent-top)" />
        <Bar x={40} y={12} w={60} fill="var(--iso-ink)" />
        <Bar x={40} y={22} w={80} />
      </On>
      <Float x={-72} y={-12} w={144} d={56} h={6} r={10} rise={12} shadowZ={BZ + 6}>
        <Bar x={12} y={14} w={100} />
        <Bar x={12} y={26} w={80} />
        <Bar x={12} y={38} w={110} />
      </Float>
    </Board>
  ),
  timeline: () => (
    <Board>
      <Flat x={-70} y={-48} z={BZ} w={2} d={96} r={1} dashed />
      {[-48, -10, 28].map((y, i) => (
        <g key={y}>
          <On x={-80} y={y} w={22} d={22} h={8} r={11} tone={i === 0 ? "accent" : "white"} lift={i === 0}>
            {i === 0 && <Check x={11} y={11} s={9} stroke={W} />}
          </On>
          <Flat x={-46} y={y + 3} z={BZ} w={120} d={16} r={4}>
            <Bar x={0} y={1} w={[110, 90, 100][i]!} fill="var(--iso-ink)" />
            <Bar x={0} y={10} w={60} />
          </Flat>
        </g>
      ))}
    </Board>
  ),
  "description-list": () => (
    <Board>
      <On x={-80} y={-52} w={160} d={104} h={6} r={12}>
        <Bar x={14} y={14} w={50} fill="var(--iso-ink)" />
        {[34, 52, 70, 88].map((v, i) => (
          <g key={v}>
            <Bar x={14} y={v} w={34} fill="var(--iso-side-dark)" />
            <Bar x={64} y={v} w={[80, 60, 70, 50][i]!} />
          </g>
        ))}
      </On>
    </Board>
  ),
  "integration-mark": () => (
    <Board>
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2].map((c) => {
          const tone: Tone = r === 1 && c === 1 ? "accent" : r === 0 && c === 2 ? "info" : r === 2 && c === 0 ? "success" : "white";
          return (
            <On key={`${r}${c}`} x={-60 + c * 42} y={-58 + r * 42} w={30} d={30} h={r === 1 && c === 1 ? 18 : 10} r={7} tone={tone} lift={r === 1 && c === 1}>
              <circle cx={15} cy={15} r={6} stroke={tone === "accent" ? W : "var(--iso-ink)"} />
            </On>
          );
        }),
      )}
    </Board>
  ),
  tag: () => (
    <Board>
      {(
        [
          [-84, -44, 66],
          [-10, -44, 54],
          [-84, -12, 80],
          [4, -12, 60],
          [-84, 20, 56],
        ] as const
      ).map(([x, y, w], i) => (
        <On key={i} x={x} y={y} w={w} d={22} h={5} r={6} tone={i === 2 ? "soft" : "white"}>
          <circle cx={11} cy={11} r={4} fill={i === 2 ? ACC : "none"} />
          <Bar x={20} y={9} w={w - (i % 2 ? 34 : 30)} />
          {i % 2 === 1 && <Cross x={w - 9} y={11} s={5} />}
        </On>
      ))}
    </Board>
  ),
  "circular-progress": () => (
    <Board>
      <On x={-82} y={-36} w={72} d={72} h={8} r={36}>
        <circle cx={36} cy={36} r={26} stroke="var(--iso-text)" strokeWidth={5} />
        <path d="M 36 10 A 26 26 0 1 1 10 36" stroke={ACC} strokeWidth={5} />
      </On>
      <Float x={10} y={-30} w={72} d={60} h={6} r={10} rise={20}>
        <path d="M 12 46 A 24 24 0 0 1 60 46" stroke="var(--iso-text)" strokeWidth={6} />
        <path d="M 12 46 A 24 24 0 0 1 48 25" stroke={ACC} strokeWidth={6} />
      </Float>
    </Board>
  ),

  /* ---------------- Navigation ---------------- */
  "nav-item": () => (
    <Board>
      <On x={-80} y={-56} w={110} d={112} h={6} r={12} tone="muted">
        {[14, 66, 84].map((v) => (
          <g key={v}>
            <rect x={12} y={v} width={8} height={8} rx={2} />
            <Bar x={26} y={v + 2} w={56} />
          </g>
        ))}
        <Bar x={12} y={52} w={30} fill="var(--iso-side-dark)" />
      </On>
      <Float x={-74} y={-26} w={98} d={22} h={6} r={8} rise={10} shadowZ={BZ + 6}>
        <rect x={10} y={7} width={8} height={8} rx={2} />
        <Bar x={24} y={9} w={46} fill="var(--iso-ink)" />
      </Float>
    </Board>
  ),
  tabs: () => (
    <Board>
      <Flat x={-84} y={-20} z={BZ} w={168} d={40} r={6}>
        <Bar x={0} y={12} w={36} fill="var(--iso-ink)" />
        <Bar x={52} y={12} w={36} />
        <Bar x={104} y={12} w={44} />
        <line x1={0} y1={30} x2={168} y2={30} stroke="var(--iso-text)" />
      </Flat>
      <On x={-84} y={8} w={36} d={4} h={3} r={2} tone="ink" />
    </Board>
  ),
  "segmented-control": () => (
    <Board>
      <On x={-84} y={-18} w={168} d={36} h={6} r={11} tone="muted">
        <Bar x={18} y={16} w={24} />
        <Bar x={128} y={16} w={24} />
      </On>
      <Slab x={-26} y={-15} z={BZ + 6} w={52} d={30} h={7} r={9} lift>
        <Bar x={14} y={13} w={24} fill="var(--iso-ink)" />
      </Slab>
    </Board>
  ),
  pagination: () => (
    <Board>
      {[-84, -54, -24, 6, 36, 66].map((x, i) => (
        <On key={x} x={x} y={-12} w={22} d={22} h={i === 2 ? 12 : 6} r={6} tone={i === 2 ? "accent" : i === 0 || i === 5 ? "muted" : "white"} lift={i === 2}>
          {i === 0 && <Chevron x={11} y={11} dir="left" s={7} />}
          {i === 5 && <Chevron x={11} y={11} dir="right" s={7} />}
          {i > 0 && i < 5 && <Bar x={7} y={9} w={8} fill={tick(i === 2 ? "accent" : "white")} />}
        </On>
      ))}
    </Board>
  ),
  "step-indicator": () => (
    <Board>
      <Flat x={-70} y={-1} z={BZ} w={140} d={2} r={1} dashed />
      {[-84, -26, 32].map((x, i) => (
        <On key={x} x={x} y={-12} w={24} d={24} h={i === 1 ? 12 : 7} r={12} tone={i === 0 ? "success" : i === 1 ? "accent" : "white"} lift={i === 1}>
          {i === 0 && <Check x={12} y={12} s={10} stroke="var(--color-success)" />}
          {i === 1 && <Bar x={9} y={10} w={6} fill={W} />}
          {i === 2 && <Bar x={9} y={10} w={6} />}
        </On>
      ))}
      {[-84, -26, 32].map((x) => (
        <Flat key={`l${x}`} x={x - 6} y={22} z={BZ} w={40} d={8} r={4}>
          <Bar x={0} y={2} w={36} />
        </Flat>
      ))}
    </Board>
  ),
  accordion: () => (
    <Board>
      <On x={-80} y={-54} w={160} d={60} h={8} r={10}>
        <Bar x={14} y={12} w={70} fill="var(--iso-ink)" />
        <Cross x={144} y={14} s={8} />
        <Bar x={14} y={30} w={120} />
        <Bar x={14} y={42} w={96} />
      </On>
      <On x={-80} y={14} w={160} d={24} h={5} r={8} tone="muted">
        <Bar x={14} y={10} w={60} />
        <Plus x={144} y={12} s={8} />
      </On>
      <On x={-80} y={44} w={160} d={16} h={4} r={6} tone="muted" />
    </Board>
  ),

  /* ---------------- Overlays ---------------- */
  modal: () => (
    <Board>
      <Flat x={-100} y={-62} z={BZ} w={200} d={124} r={14} fill="var(--iso-side)" />
      <Float x={-62} y={-42} w={124} d={84} h={7} r={12} rise={30}>
        <Bar x={12} y={14} w={56} fill="var(--iso-ink)" />
        <Cross x={110} y={16} s={7} />
        <line x1={0} y1={28} x2={124} y2={28} />
        <Bar x={12} y={38} w={90} />
        <Bar x={12} y={48} w={70} />
        <rect x={70} y={62} width={44} height={14} rx={5} fill="var(--iso-accent-top)" />
        <rect x={24} y={62} width={40} height={14} rx={5} />
      </Float>
    </Board>
  ),
  tooltip: () => (
    <Board>
      <On x={-20} y={4} w={40} d={40} h={10} r={10}>
        <circle cx={20} cy={20} r={8} />
        <path d="M 20 14 V 21 M 20 25 V 25.5" />
      </On>
      <Float x={-34} y={-46} w={68} d={26} h={6} r={8} tone="ink" rise={30}>
        <Bar x={12} y={11} w={44} fill={W} />
      </Float>
    </Board>
  ),

  /* ---------------- AI & workflow ---------------- */
  "ai-search": () => (
    <Board>
      <On x={-90} y={-22} w={180} d={44} h={10} r={14}>
        <Sparkle x={18} y={22} s={7} fill={ACC} />
        <Bar x={32} y={20} w={70} />
      </On>
      <Slab x={22} y={-14} z={BZ + 10} w={60} d={28} h={8} r={9} tone="accent" lift>
        <Bar x={12} y={12} w={36} fill={W} />
      </Slab>
      <Rays x={-60} y={0} z={BZ + 16} radius={16} />
    </Board>
  ),
  "criterion-chip": () => (
    <Board>
      {(
        [
          [-84, -40, 86],
          [8, -40, 72],
          [-84, -6, 70],
          [-8, -6, 92],
        ] as const
      ).map(([x, y, w], i) => (
        <On key={i} x={x} y={y} w={w} d={26} h={7} r={9} lift={i === 3}>
          <Bar x={10} y={11} w={22} fill="var(--iso-side-dark)" />
          <Bar x={36} y={11} w={w - 58} fill="var(--iso-ink)" />
          <Cross x={w - 10} y={13} s={6} />
        </On>
      ))}
      <Flat x={-84} y={30} z={BZ} w={70} d={22} r={8} dashed>
        <Plus x={12} y={11} s={6} />
        <Bar x={22} y={9} w={36} />
      </Flat>
    </Board>
  ),
  "sequence-step": () => (
    <Board>
      <On x={-80} y={-56} w={110} d={46} h={7} r={10}>
        <rect x={10} y={10} width={18} height={18} rx={5} fill={SOFT} stroke="none" />
        <path d="M 13 15 L 19 20 L 25 15" stroke={ACC} />
        <Bar x={36} y={12} w={52} fill="var(--iso-ink)" />
        <Bar x={36} y={22} w={40} />
        <Bar x={10} y={34} w={86} />
      </On>
      <Flat x={-26} y={-8} z={BZ} w={2} d={18} r={1} dashed />
      <On x={-46} y={6} w={44} d={16} h={5} r={8}>
        <circle cx={10} cy={8} r={3.5} />
        <Bar x={18} y={6} w={18} />
      </On>
      <Float x={-20} y={28} w={110} d={34} h={7} r={10} rise={14}>
        <rect x={10} y={8} width={18} height={18} rx={5} fill={SOFT} stroke="none" />
        <Bar x={36} y={10} w={52} fill="var(--iso-ink)" />
        <Bar x={36} y={20} w={40} />
      </Float>
    </Board>
  ),

  /* ---------------- Feedback ---------------- */
  banner: () => (
    <Board>
      <On x={-100} y={-62} w={200} d={28} h={8} r={12} tone="accent">
        <Sparkle x={58} y={14} s={6} fill={W} />
        <Bar x={70} y={12} w={70} fill={W} />
        <Cross x={186} y={14} s={6} />
      </On>
      <Flat x={-84} y={-20} z={BZ} w={168} d={70} r={10} fill={W}>
        <Bar x={14} y={14} w={80} fill="var(--iso-ink)" />
        <Bar x={14} y={28} w={130} />
        <Bar x={14} y={40} w={110} />
      </Flat>
    </Board>
  ),
  alert: () => (
    <Board>
      {(
        [
          [-54, "info", "var(--color-info)"],
          [-18, "success", "var(--color-success)"],
          [18, "error", "var(--color-error)"],
        ] as const
      ).map(([y, tone, c], i) => (
        <On key={y} x={-84} y={y} w={168} d={28} h={i === 2 ? 9 : 6} r={9} tone={tone} lift={i === 2}>
          <circle cx={14} cy={14} r={5} stroke={c} />
          <Bar x={26} y={9} w={80} fill="var(--iso-ink)" />
          <Bar x={26} y={17} w={110} fill={c} />
        </On>
      ))}
    </Board>
  ),
  toast: () => (
    <Board>
      <Float x={-60} y={-24} w={140} d={52} h={8} r={10} rise={26}>
        <circle cx={18} cy={18} r={7} stroke="var(--color-success)" />
        <Check x={18} y={18} s={7} stroke="var(--color-success)" />
        <Bar x={34} y={13} w={74} fill="var(--iso-ink)" />
        <Bar x={34} y={23} w={88} />
        <Cross x={128} y={14} s={6} />
        <rect x={34} y={34} width={36} height={11} rx={4} />
      </Float>
    </Board>
  ),
  "ai-insight": () => (
    <Board>
      <On x={-80} y={-40} w={160} d={78} h={8} r={12} tone="soft">
        <Sparkle x={18} y={18} s={6} fill={ACC} />
        <Bar x={30} y={16} w={44} fill={ACC} />
        <Bar x={14} y={36} w={100} fill="var(--iso-ink)" />
        <Bar x={14} y={50} w={130} />
        <Bar x={14} y={60} w={96} />
      </On>
      <Rays x={-56} y={-26} z={BZ + 12} radius={14} />
    </Board>
  ),
  "progress-steps": () => (
    <Board>
      {[-44, -8, 28].map((y, i) => (
        <g key={y}>
          <On x={-78} y={y} w={20} d={20} h={i === 1 ? 10 : 6} r={10} tone={i === 0 ? "success" : i === 1 ? "accent" : "white"} lift={i === 1}>
            {i === 0 && <Check x={10} y={10} s={8} stroke="var(--color-success)" />}
            {i === 1 && <path d="M 10 4 A 6 6 0 1 1 4 10" stroke={W} strokeWidth={1.6} />}
          </On>
          <Flat x={-46} y={y + 6} z={BZ} w={130} d={8} r={4}>
            <Bar x={0} y={2} w={[70, 86, 60][i]!} fill={i === 1 ? "var(--iso-ink)" : "var(--iso-text)"} />
            <Bar x={100} y={2} w={28} />
          </Flat>
        </g>
      ))}
    </Board>
  ),
  skeleton: () => (
    <Board>
      {[-48, -10, 28].map((y) => (
        <g key={y}>
          <On x={-80} y={y} w={22} d={22} h={4} r={11} tone="muted" />
          <Flat x={-48} y={y + 3} z={BZ} w={128} d={16} r={4}>
            <Bar x={0} y={0} w={70} h={6} fill="var(--iso-side-dark)" />
            <Bar x={0} y={10} w={110} h={6} fill="var(--iso-side)" />
          </Flat>
        </g>
      ))}
    </Board>
  ),
  "empty-state": () => (
    <Board>
      <Flat x={-84} y={-52} z={BZ} w={168} d={104} r={12} dashed />
      <Float x={-16} y={-34} w={32} d={32} h={30} r={4} tone="accent" rise={28} />
      <Rays x={0} y={-18} z={BZ + 72} radius={16} />
      <Flat x={-40} y={20} z={BZ} w={80} d={22} r={6}>
        <Bar x={10} y={4} w={60} fill="var(--iso-ink)" />
        <Bar x={0} y={14} w={80} />
      </Flat>
    </Board>
  ),
};

export const hasScene = (slug: string) => slug in scenes;
