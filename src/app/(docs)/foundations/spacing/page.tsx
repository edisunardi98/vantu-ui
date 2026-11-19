import type { Metadata } from "next";
import { DocHeader, DocSection, Prose } from "@/components/docs/doc-page";

export const metadata: Metadata = { title: "Spacing, radius & sizes" };

const space = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80];
const radii = [
  { cls: "rounded-xs", px: 4, use: "Checkbox, tags" },
  { cls: "rounded-sm", px: 8, use: "Menu items, chips, pagination" },
  { cls: "rounded-md", px: 12, use: "Buttons, inputs, inner panels" },
  { cls: "rounded-lg", px: 16, use: "Cards, modals" },
  { cls: "rounded-xl", px: 20, use: "Large surfaces" },
  { cls: "rounded-2xl", px: 24, use: "Auth cards" },
  { cls: "rounded-full", px: 999, use: "Avatars, counters, switches" },
];
const sizes = [
  ["Button sm / md / lg", "36 / 40 / 44"],
  ["Input", "40"],
  ["AI search", "64"],
  ["Nav item", "40"],
  ["Table header / row", "40 / 48"],
  ["Badge", "24"],
  ["Avatar sm / md / lg", "24 / 32 / 40"],
  ["Sidebar width", "288"],
  ["Topbar height", "60"],
  ["Icons", "12 · 16 · 20 · 24 · 32"],
];
const shadows = [
  { cls: "shadow-button", use: "Secondary buttons, raised controls" },
  { cls: "shadow-button-primary", use: "Primary button glow" },
  { cls: "shadow-card", use: "Cards and metric strips" },
  { cls: "shadow-popover", use: "Menus, toasts, dialogs" },
  { cls: "shadow-focus", use: "3px focus ring" },
];

export default function SpacingPage() {
  return (
    <>
      <DocHeader eyebrow="Foundations" title="Spacing, radius & sizes" description="The Figma “Scale” collection: a 4px spacing grid, six radii and fixed component sizes." />
      <Prose>
        <p>
          Spacing matches Tailwind’s 4px base, so Figma <code>space/16</code> is <code>p-4</code> or <code>gap-4</code>.
        </p>
      </Prose>
      <DocSection title="Spacing">
        <div className="flex flex-col gap-2 rounded-lg border border-line p-5">
          {space.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <span className="w-24 font-mono text-sm text-fg-muted">
                {s / 4} <span className="text-fg-disabled">· {s}px</span>
              </span>
              <span className="h-3 rounded-xs bg-chart-primary-soft" style={{ width: s * 3 }} />
            </div>
          ))}
        </div>
      </DocSection>
      <DocSection title="Radius">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {radii.map((r) => (
            <div key={r.cls} className="flex flex-col items-center gap-2 text-center">
              <div className={`size-16 border border-accent-soft-border bg-accent-soft ${r.cls}`} />
              <span className="font-mono text-sm text-fg">{r.cls}</span>
              <span className="text-xs text-fg-muted">
                {r.px === 999 ? "full" : `${r.px}px`} · {r.use}
              </span>
            </div>
          ))}
        </div>
      </DocSection>
      <DocSection title="Shadows">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {shadows.map((s) => (
            <div key={s.cls} className="flex flex-col items-center gap-3 text-center">
              <div className={`h-16 w-full rounded-md ${s.cls === "shadow-button-primary" ? "bg-accent" : "bg-surface"} ${s.cls}`} />
              <span className="font-mono text-sm text-fg">{s.cls}</span>
              <span className="text-xs text-fg-muted">{s.use}</span>
            </div>
          ))}
        </div>
      </DocSection>
      <DocSection title="Component sizes">
        <div className="divide-y divide-line rounded-lg border border-line">
          {sizes.map(([k, v]) => (
            <div key={k} className="flex justify-between px-5 py-3 text-base">
              <span className="text-fg-secondary">{k}</span>
              <span className="font-mono text-fg">{v}</span>
            </div>
          ))}
        </div>
      </DocSection>
    </>
  );
}
