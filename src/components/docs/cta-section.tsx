import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Bar, Check, IsoCanvas, Rays, Slab, Sparkle } from "./iso/iso";
import { BZ, Board, Float, On, W } from "./iso/scenes";

const INK = "var(--iso-ink)";
const ACC = "var(--iso-accent-top)";
const SOFT = "var(--iso-accent-soft)";
const TEXT = "var(--iso-text)";

/** Thin column standing on a surface at height z. */
const Column = ({ x, y, z, h, tone = "white" }: { x: number; y: number; z: number; h: number; tone?: "white" | "accent" | "soft" }) => (
  <Slab x={x} y={y} z={z} w={9} d={9} h={h} r={2} tone={tone} />
);

const PANEL_Z = BZ + 4; // top of the chart panel

/**
 * "Assembling a dashboard": an app board with a sidebar, KPI tiles and a bar
 * chart, plus a donut card and the primary button floating in on guides.
 */
function AssemblyScene() {
  const bars = [14, 22, 18, 30, 26, 38, 46];
  return (
    <>
      <Board>
        {/* Sidebar */}
        <On x={-96} y={-58} w={38} d={116} h={6} r={10} tone="muted">
          <rect x={7} y={7} width={9} height={9} rx={3} fill={ACC} stroke="none" />
          {[26, 36, 46, 56, 66].map((v, i) => (
            <Bar key={v} x={7} y={v} w={i === 0 ? 22 : 18} fill={i === 0 ? INK : TEXT} />
          ))}
        </On>

        {/* KPI tiles */}
        {[0, 1, 2].map((i) => (
          <On key={i} x={-52 + i * 49} y={-58} w={44} d={28} h={5} r={7}>
            <Bar x={6} y={6} w={18} />
            <Bar x={6} y={13} w={14} h={5} fill={INK} />
            <path d={`M 24 21 L 28 18 L 31 20 L 35 14 L 39 16`} stroke={i === 1 ? ACC : INK} strokeWidth={1.4} />
          </On>
        ))}

        {/* Chart panel with dashed gridlines */}
        <On x={-52} y={-24} w={142} d={80} h={4} r={10}>
          {[22, 40, 58].map((v) => (
            <line key={v} x1={8} y1={v} x2={134} y2={v} stroke={TEXT} strokeDasharray="2 3" />
          ))}
        </On>
      </Board>

      {/* Rising bars on the panel — the latest one in accent */}
      {bars.map((h, i) => (
        <Column key={i} x={-42 + i * 18} y={34} z={PANEL_Z} h={h} tone={i === bars.length - 1 ? "accent" : i >= bars.length - 3 ? "soft" : "white"} />
      ))}

      {/* Floating donut card */}
      <g className="iso-bob">
        <Float x={44} y={-50} w={52} d={46} h={6} r={10} rise={46}>
          {(() => {
            const cx = 26;
            const cy = 23;
            const r = 13;
            const segs: [number, number, string][] = [
              [0, 0.45, ACC],
              [0.45, 0.72, INK],
              [0.72, 1, SOFT],
            ];
            return segs.map(([a0, a1, col], k) => {
              const p = (t: number) => `${cx + r * Math.sin(t * 2 * Math.PI)} ${cy - r * Math.cos(t * 2 * Math.PI)}`;
              return <path key={k} d={`M ${p(a0 + 0.012)} A ${r} ${r} 0 ${a1 - a0 > 0.5 ? 1 : 0} 1 ${p(a1 - 0.012)}`} stroke={col} strokeWidth={6} fill="none" />;
            });
          })()}
        </Float>
      </g>

      {/* Floating primary button */}
      <g className="iso-bob iso-bob-delay">
        <Float x={-98} y={14} w={76} d={24} h={9} r={11} tone="accent" rise={34}>
          <Sparkle x={15} y={12} s={5.5} fill={W} />
          <Bar x={27} y={10} w={38} fill={W} />
        </Float>
        {/* Rays centered on the button's top face */}
        <Rays x={-60} y={26} z={BZ + 34 + 9} radius={26} count={5} spread={120} />
      </g>

      {/* Success tag rising off the tallest bar */}
      <g className="iso-bob">
        <Float x={62} y={22} w={30} d={18} h={5} r={7} tone="success" rise={64}>
          <Check x={15} y={9} s={9} stroke="var(--color-success)" />
        </Float>
      </g>
    </>
  );
}

/** Landing CTA: copy on the left, an isometric "dashboard being assembled" scene on the right. */
export function CtaSection() {
  return (
    <section className="mx-auto mt-28 max-w-[1200px] px-4 sm:px-6">
      <div className="iso-dark relative overflow-hidden rounded-[24px] bg-inverse">
        {/* Clean dark surface: only a faint top highlight; the iso grid supplies the texture. */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="px-6 pt-12 text-center sm:px-12 lg:py-16 lg:pr-0 lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 py-1 pl-2.5 pr-3 text-sm font-medium text-white/80">
              <Sparkles className="size-3.5 text-accent-soft-border" />
              Start building today
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Ship your AI dashboard this week</h2>
            <p className="mt-4 max-w-md text-lg text-white/65 max-lg:mx-auto">
              Start with the tokens, drop in the blocks and charts you need, and assemble full screens in hours — not sprints.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/docs/installation"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-base font-medium text-fg outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-white/40"
              >
                Get started <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex h-11 items-center rounded-md px-5 text-base font-medium text-white outline-none ring-1 ring-white/20 hover:bg-white/10 focus-visible:ring-white/50"
              >
                View templates
              </Link>
            </div>
            <dl className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/55 lg:justify-start">
              {[
                ["Copy-in", "no runtime package"],
                ["React Aria", "accessible by default"],
                ["AI-ready", "llms.txt + agent skill"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-medium text-white/90">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="h-[300px] px-4 pb-6 sm:h-[380px] lg:h-[460px] lg:pb-0">
            <IsoCanvas label="Isometric illustration of a dashboard being assembled from Vantu blocks" viewBox="-150 -150 300 230">
              <AssemblyScene />
            </IsoCanvas>
          </div>
        </div>
      </div>
    </section>
  );
}
