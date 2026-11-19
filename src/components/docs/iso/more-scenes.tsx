/** Isometric scenes for the second wave of components. */
import type { ReactNode } from "react";
import { Bar, Check, Chevron, Cross, Flat, Person, Plus, Rays, Slab, Sparkle } from "./iso";
import { ACC, BZ, Board, Float, On, SOFT, W } from "./scenes";

const INK = "var(--iso-ink)";
const TEXT = "var(--iso-text)";

export const moreScenes: Record<string, () => ReactNode> = {
  "close-button": () => (
    <Board>
      <On x={-62} y={-14} w={28} d={28} h={8} r={8}>
        <Cross x={14} y={14} s={9} />
      </On>
      <On x={-18} y={-14} w={28} d={28} h={8} r={14} tone="muted">
        <Cross x={14} y={14} s={9} />
      </On>
      <Float x={28} y={-18} w={36} d={36} h={10} r={18} rise={16}>
        <Cross x={18} y={18} s={12} />
      </Float>
    </Board>
  ),
  "search-field": () => (
    <Board>
      <On x={-86} y={-18} w={172} d={36} h={9} r={12}>
        <circle cx={18} cy={17} r={6} />
        <line x1={22} y1={21} x2={26} y2={25} />
        <Bar x={34} y={16} w={64} fill={INK} />
        <line x1={102} y1={10} x2={102} y2={26} stroke={ACC} strokeWidth={1.6} />
        <circle cx={154} cy={18} r={7} fill="var(--iso-side)" stroke="none" />
        <Cross x={154} y={18} s={5} />
      </On>
      <Flat x={-86} y={26} z={BZ} w={120} d={10} r={4}>
        <Bar x={0} y={3} w={90} />
      </Flat>
    </Board>
  ),
  combobox: () => (
    <Board>
      <On x={-84} y={-54} w={150} d={30} h={8} r={10}>
        <Bar x={14} y={13} w={40} fill={INK} />
        <line x1={58} y1={8} x2={58} y2={22} stroke={ACC} strokeWidth={1.6} />
        <Chevron x={134} y={15} />
      </On>
      <Float x={-60} y={-14} w={150} d={72} h={6} r={10} rise={18}>
        {[12, 32, 52].map((v, i) => (
          <g key={v}>
            {i === 0 && <rect x={6} y={v - 6} width={138} height={18} rx={6} fill={SOFT} stroke="none" />}
            <Bar x={14} y={v} w={[40, 56, 48][i]!} fill={i === 0 ? ACC : TEXT} />
            <Bar x={14} y={v} w={18} fill={i === 0 ? ACC : INK} />
          </g>
        ))}
      </Float>
    </Board>
  ),
  "number-field": () => (
    <Board>
      <On x={-80} y={-18} w={160} d={36} h={9} r={12}>
        <line x1={40} y1={0} x2={40} y2={36} />
        <line x1={120} y1={0} x2={120} y2={36} />
        <path d="M 14 18 H 26" />
        <Bar x={66} y={14} w={28} h={8} fill={INK} />
        <Plus x={140} y={18} s={12} />
      </On>
      <Slab x={42} y={-14} z={BZ + 9} w={34} d={28} h={6} r={6} tone="soft" lift>
        <Plus x={17} y={14} s={10} />
      </Slab>
    </Board>
  ),
  "input-otp": () => (
    <Board>
      {[-86, -58, -30, 6, 34, 62].map((x, i) => (
        <On key={x} x={x} y={-14} w={24} d={28} h={i < 4 ? 9 : 6} r={6} tone={i === 3 ? "soft" : "white"} lift={i === 3}>
          {i < 3 && <Bar x={8} y={10} w={8} h={8} fill={INK} />}
          {i === 3 && <line x1={12} y1={7} x2={12} y2={21} stroke={ACC} strokeWidth={1.6} />}
        </On>
      ))}
      <Flat x={-4} y={-1} z={BZ} w={6} d={2} r={1} fill={INK} />
    </Board>
  ),
  "token-input": () => (
    <Board>
      <On x={-86} y={-26} w={172} d={52} h={8} r={12}>
        {[
          [10, 10, 50],
          [66, 10, 40],
          [10, 30, 58],
        ].map(([x, y, w], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={14} rx={5} fill="var(--iso-side)" />
            <Bar x={x! + 6} y={y! + 5} w={w! - 20} fill={INK} />
            <Cross x={x! + w! - 7} y={y! + 7} s={4} />
          </g>
        ))}
        <line x1={76} y1={31} x2={76} y2={43} stroke={ACC} strokeWidth={1.6} />
      </On>
      <Float x={20} y={-46} w={56} d={16} h={6} r={6} tone="soft" rise={22}>
        <Bar x={8} y={6} w={30} fill={ACC} />
      </Float>
    </Board>
  ),
  "color-picker": () => (
    <Board>
      <On x={-86} y={-46} w={56} d={26} h={8} r={9}>
        <rect x={5} y={5} width={16} height={16} rx={4} fill="var(--color-accent)" />
        <Bar x={27} y={11} w={22} fill={INK} />
      </On>
      <Float x={-36} y={-24} w={110} d={84} h={6} r={10} rise={22}>
        <defs>
          <linearGradient id="iso-sat" x1="0" x2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#635bff" />
          </linearGradient>
          <linearGradient id="iso-val" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="iso-hue" x1="0" x2="1">
            {["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#ff0000"].map((c, i) => (
              <stop key={i} offset={i / 6} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
        <rect x={8} y={8} width={94} height={46} rx={4} fill="url(#iso-sat)" />
        <rect x={8} y={8} width={94} height={46} rx={4} fill="url(#iso-val)" />
        <circle cx={78} cy={22} r={4} fill="none" stroke={W} strokeWidth={1.6} />
        <rect x={8} y={60} width={94} height={7} rx={3.5} fill="url(#iso-hue)" stroke="none" />
        {["#635bff", "#22a06b", "#d98b24", "#d64545", "#222224"].map((c, i) => (
          <rect key={c} x={8 + i * 14} y={72} width={9} height={9} rx={2} fill={c} stroke="none" />
        ))}
      </Float>
    </Board>
  ),
  "date-calendar": () => (
    <Board>
      <On x={-70} y={-56} w={140} d={112} h={6} r={12}>
        <Chevron x={14} y={14} dir="left" s={7} />
        <Bar x={50} y={12} w={40} fill={INK} />
        <Chevron x={126} y={14} dir="right" s={7} />
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 7 }, (_, c) => {
            const sel = r === 2 && c === 3;
            const range = r === 3 && c >= 1 && c <= 4;
            return (
              <rect
                key={`${r}${c}`}
                x={10 + c * 18}
                y={28 + r * 16}
                width={14}
                height={12}
                rx={3}
                fill={sel ? ACC : range ? SOFT : "none"}
                stroke={sel || range ? "none" : TEXT}
              />
            );
          }),
        )}
      </On>
      <Slab x={-14} y={-10} z={BZ + 6} w={22} d={18} h={8} r={4} tone="accent" lift />
    </Board>
  ),
  "date-picker": () => (
    <Board>
      <On x={-84} y={-56} w={150} d={30} h={8} r={10}>
        {[14, 38, 62].map((u, i) => (
          <Bar key={u} x={u} y={13} w={i === 2 ? 28 : 18} fill={i === 1 ? ACC : INK} />
        ))}
        <rect x={124} y={9} width={14} height={12} rx={2} />
        <line x1={124} y1={13} x2={138} y2={13} />
      </On>
      <Float x={-56} y={-16} w={124} d={74} h={6} r={10} rise={16}>
        {Array.from({ length: 4 }, (_, r) =>
          Array.from({ length: 7 }, (_, c) => (
            <rect key={`${r}${c}`} x={8 + c * 16} y={8 + r * 16} width={12} height={11} rx={3} fill={r === 1 && c === 4 ? ACC : "none"} stroke={r === 1 && c === 4 ? "none" : TEXT} />
          )),
        )}
      </Float>
    </Board>
  ),
  "time-field": () => (
    <Board>
      <On x={-80} y={-18} w={160} d={36} h={9} r={12}>
        <circle cx={18} cy={18} r={7} />
        <path d="M 18 14 V 18 L 21 20" />
        <rect x={34} y={11} width={22} height={14} rx={4} fill={ACC} stroke="none" />
        <Bar x={39} y={16} w={12} fill={W} />
        <Bar x={60} y={16} w={4} fill={INK} />
        <Bar x={68} y={16} w={14} fill={INK} />
        <Bar x={92} y={16} w={18} fill={TEXT} />
      </On>
      <Float x={36} y={-44} w={40} d={40} h={8} r={20} rise={18}>
        <circle cx={20} cy={20} r={13} />
        <path d="M 20 11 V 20 L 27 24" stroke={ACC} strokeWidth={1.6} />
      </Float>
    </Board>
  ),
  table: () => (
    <Board>
      <On x={-88} y={-54} w={176} d={108} h={7} r={12}>
        <rect x={0} y={0} width={176} height={18} rx={0} fill="var(--iso-side)" stroke="none" />
        {[18, 40, 62, 84].map((v) => (
          <line key={v} x1={0} y1={v} x2={176} y2={v} stroke={TEXT} />
        ))}
        {[8, 26, 48, 70, 92].map((v, r) => (
          <g key={v}>
            <Bar x={10} y={v + (r ? 2 : 0)} w={r ? 44 : 30} fill={r ? INK : TEXT} />
            <Bar x={70} y={v + (r ? 2 : 0)} w={r ? 36 : 26} fill={TEXT} />
            <Bar x={130} y={v + (r ? 2 : 0)} w={r ? 32 : 24} fill={r === 2 ? ACC : TEXT} />
          </g>
        ))}
      </On>
      <Slab x={-82} y={-12} z={BZ + 7} w={164} d={22} h={4} r={4} tone="soft" lift />
    </Board>
  ),
  "tag-group": () => (
    <Board>
      {(
        [
          [-86, -40, 52, true],
          [-28, -40, 46, true],
          [24, -40, 58, false],
          [-86, -8, 60, false],
          [-20, -8, 50, false],
        ] as const
      ).map(([x, y, w, sel], i) => (
        <On key={i} x={x} y={y} w={w} d={22} h={sel ? 8 : 5} r={7} tone={sel ? "soft" : "white"} lift={i === 0}>
          <Bar x={10} y={9} w={w - 26} fill={sel ? ACC : INK} />
          <Cross x={w - 9} y={11} s={4} />
        </On>
      ))}
    </Board>
  ),
  "tree-view": () => (
    <Board>
      <On x={-72} y={-56} w={144} d={112} h={6} r={12}>
        {(
          [
            [0, 12, true],
            [1, 30, false],
            [1, 48, false],
            [1, 66, true],
            [2, 84, false],
          ] as const
        ).map(([lvl, v, folder], i) => (
          <g key={v}>
            {i === 2 && <rect x={6} y={v - 7} width={132} height={16} rx={5} fill={SOFT} stroke="none" />}
            {lvl > 0 && <path d={`M ${8 + (lvl - 1) * 16 + 6} ${v - 10} V ${v} H ${8 + lvl * 16}`} stroke={TEXT} />}
            {folder ? <path d={`M ${8 + lvl * 16} ${v - 4} h 4 l 2 2 h 6 v 7 h -12 Z`} /> : <rect x={8 + lvl * 16} y={v - 4} width={9} height={11} rx={1.5} />}
            <Bar x={26 + lvl * 16} y={v - 1} w={[60, 48, 54, 44, 40][i]!} fill={i === 2 ? ACC : i === 0 || i === 3 ? INK : TEXT} />
          </g>
        ))}
      </On>
    </Board>
  ),
  meter: () => (
    <Board>
      {[-44, -6, 32].map((y, i) => (
        <g key={y}>
          <Flat x={-84} y={y - 12} z={BZ} w={168} d={8} r={4}>
            <Bar x={0} y={2} w={50} fill={INK} />
            <Bar x={140} y={2} w={28} />
          </Flat>
          {i < 2 ? (
            <On x={-84} y={y} w={168} d={10} h={3} r={5} tone="muted">
              <rect x={0} y={0} width={i === 0 ? 70 : 150} height={10} rx={5} fill={i === 0 ? "var(--iso-accent-top)" : "var(--color-error)"} />
            </On>
          ) : (
            [0, 1, 2, 3].map((k) => <On key={k} x={-84 + k * 43} y={y} w={39} d={8} h={k < 3 ? 6 : 3} r={4} tone={k < 3 ? "success" : "muted"} />)
          )}
        </g>
      ))}
    </Board>
  ),
  divider: () => (
    <Board>
      <Flat x={-84} y={-40} z={BZ} w={168} d={30} r={6}>
        <Bar x={0} y={4} w={100} fill={INK} />
        <Bar x={0} y={16} w={140} />
      </Flat>
      <Flat x={-84} y={-2} z={BZ} w={168} d={8} r={2}>
        <line x1={0} y1={4} x2={70} y2={4} />
        <Bar x={76} y={2} w={16} fill={TEXT} />
        <line x1={98} y1={4} x2={168} y2={4} />
      </Flat>
      <Flat x={-84} y={16} z={BZ} w={168} d={30} r={6}>
        <Bar x={0} y={4} w={120} fill={INK} />
        <Bar x={0} y={16} w={90} />
      </Flat>
      <Slab x={-8} y={-4} z={BZ} w={16} d={12} h={8} r={4} tone="accent" lift />
    </Board>
  ),
  carousel: () => (
    <Board>
      <On x={-96} y={-40} w={48} d={70} h={6} r={10} tone="muted" />
      <Float x={-38} y={-46} w={76} d={84} h={8} r={12} rise={14}>
        <rect x={10} y={10} width={18} height={18} rx={5} fill={SOFT} stroke="none" />
        <Sparkle x={19} y={19} s={5} fill={ACC} />
        <Bar x={10} y={50} w={50} fill={INK} />
        <Bar x={10} y={62} w={40} />
      </Float>
      <On x={48} y={-40} w={48} d={70} h={6} r={10} tone="muted" />
      {[-12, 0, 12].map((u, i) => (
        <Flat key={u} x={u - (i === 1 ? 6 : 3)} y={46} z={BZ} w={i === 1 ? 12 : 6} d={4} r={2} fill={i === 1 ? ACC : TEXT} />
      ))}
    </Board>
  ),
  breadcrumb: () => (
    <Board>
      <Flat x={-90} y={-12} z={BZ} w={180} d={24} r={6}>
        <path d="M 6 10 L 11 6 L 16 10 V 17 H 6 Z" />
        <Bar x={22} y={10} w={26} fill={TEXT} />
        <Chevron x={58} y={12} dir="right" s={6} />
        <Bar x={68} y={10} w={34} fill={TEXT} />
        <Chevron x={112} y={12} dir="right" s={6} />
      </Flat>
      <Float x={36} y={-12} w={54} d={22} h={7} r={7} tone="soft" rise={14}>
        <Bar x={9} y={9} w={36} fill={ACC} />
      </Float>
    </Board>
  ),
  popover: () => (
    <Board>
      <On x={-20} y={18} w={40} d={26} h={9} r={9}>
        <circle cx={20} cy={13} r={6} />
        <path d="M 20 11 V 15 M 20 17.5 V 18" />
      </On>
      <Float x={-58} y={-54} w={116} d={60} h={6} r={10} rise={26}>
        <Bar x={12} y={12} w={70} fill={INK} />
        <Bar x={12} y={26} w={92} />
        <Bar x={12} y={36} w={80} />
        <path d="M 52 60 L 58 66 L 64 60" fill={W} />
      </Float>
    </Board>
  ),
  "context-menu": () => (
    <Board>
      <Flat x={-84} y={-52} z={BZ} w={168} d={104} r={12} dashed />
      <path d="M -40 -12 l 0 12 l 3 -3 l 2 5 l 2 -1 l -2 -5 l 4 0 Z" transform="translate(0 -10)" fill={INK} />
      <Float x={-34} y={-30} w={96} d={74} h={6} r={10} rise={18}>
        {[12, 28, 44, 60].map((v, i) => (
          <g key={v}>
            {i === 1 && <rect x={6} y={v - 6} width={84} height={15} rx={5} fill={SOFT} stroke="none" />}
            <rect x={12} y={v - 3} width={7} height={7} rx={2} />
            <Bar x={24} y={v - 1} w={[44, 50, 38, 34][i]!} fill={i === 3 ? "var(--color-error)" : i === 1 ? ACC : INK} />
            {i < 3 && <Bar x={78} y={v - 1} w={6} fill={TEXT} />}
          </g>
        ))}
      </Float>
    </Board>
  ),
  "command-palette": () => (
    <Board>
      <Flat x={-100} y={-62} z={BZ} w={200} d={124} r={14} fill="var(--iso-side)" />
      <Float x={-60} y={-46} w={120} d={92} h={7} r={12} rise={24}>
        <circle cx={12} cy={12} r={4} />
        <Bar x={22} y={10} w={56} />
        <rect x={98} y={7} width={14} height={10} rx={3} />
        <line x1={0} y1={24} x2={120} y2={24} />
        <rect x={6} y={32} width={108} height={14} rx={5} fill={SOFT} stroke="none" />
        <Sparkle x={14} y={39} s={4} fill={ACC} />
        <Bar x={22} y={37} w={50} fill={ACC} />
        {[52, 64, 76].map((v) => (
          <g key={v}>
            <rect x={10} y={v} width={7} height={7} rx={2} />
            <Bar x={22} y={v + 2} w={46} />
          </g>
        ))}
      </Float>
      <Slab x={52} y={36} z={BZ} w={22} d={22} h={10} r={5} lift>
        <Bar x={6} y={9} w={10} fill={INK} />
      </Slab>
    </Board>
  ),
  spinner: () => (
    <Board>
      <On x={-30} y={-30} w={60} d={60} h={10} r={30}>
        <circle cx={30} cy={30} r={20} stroke={TEXT} strokeWidth={5} />
        <path d="M 30 10 A 20 20 0 0 1 50 30" stroke={ACC} strokeWidth={5} />
      </On>
      <Rays x={0} y={0} z={BZ + 10} radius={44} count={7} spread={200} />
    </Board>
  ),
  notification: () => (
    <Board>
      <On x={-84} y={-54} w={168} d={46} h={6} r={10}>
        <circle cx={18} cy={18} r={9} fill="var(--color-avatar-rose-bg)" />
        <Person x={18} y={19} s={10} />
        <Bar x={34} y={12} w={90} fill={INK} />
        <Bar x={34} y={22} w={60} />
        <circle cx={156} cy={14} r={3.5} fill={ACC} stroke="none" />
        <rect x={34} y={30} width={120} height={10} rx={3} fill="var(--iso-side)" stroke="none" />
      </On>
      <Float x={-84} y={0} w={168} d={50} h={7} r={10} rise={12}>
        <circle cx={18} cy={18} r={9} fill="var(--color-avatar-violet-bg)" />
        <Person x={18} y={19} s={10} />
        <Bar x={34} y={12} w={100} fill={INK} />
        <Bar x={34} y={22} w={50} />
        <rect x={34} y={32} width={34} height={11} rx={4} />
        <rect x={74} y={32} width={34} height={11} rx={4} fill="var(--iso-accent-top)" />
      </Float>
    </Board>
  ),
  announcement: () => (
    <Board>
      <Flat x={-70} y={-54} z={BZ} w={140} d={16} r={8} fill={W}>
        <rect x={3} y={3} width={26} height={10} rx={5} fill={SOFT} stroke="none" />
        <Bar x={8} y={6} w={16} fill={ACC} />
        <Bar x={36} y={6} w={80} fill={INK} />
        <path d="M 124 5 L 128 8 L 124 11" />
      </Flat>
      <Float x={-60} y={-24} w={120} d={78} h={7} r={12} rise={18}>
        <rect x={12} y={12} width={18} height={18} rx={5} fill={SOFT} stroke="none" />
        <path d="M 16 23 V 19 L 25 15 V 27 L 16 23" stroke={ACC} />
        <Bar x={38} y={14} w={56} fill={INK} />
        <Bar x={38} y={24} w={66} />
        <circle cx={108} cy={12} r={5} fill="var(--iso-side)" stroke="none" />
        <Cross x={108} y={12} s={4} />
        <rect x={12} y={46} width={96} height={18} rx={6} />
        <Bar x={36} y={53} w={48} fill={INK} />
      </Float>
    </Board>
  ),
};
