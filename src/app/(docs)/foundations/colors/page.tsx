import type { Metadata } from "next";
import { DocHeader, DocSection, Prose } from "@/components/docs/doc-page";

export const metadata: Metadata = { title: "Color" };

type Swatch = { token: string; className: string; hex: string; figma: string };

const groups: { title: string; description: string; swatches: Swatch[] }[] = [
  {
    title: "Background",
    description: "App canvas, surfaces and interactive fills.",
    swatches: [
      { token: "app", className: "bg-app", hex: "#F7F7F8", figma: "bg/app" },
      { token: "surface", className: "bg-surface", hex: "#FFFFFF", figma: "bg/surface" },
      { token: "subtle", className: "bg-subtle", hex: "#FAFAFA", figma: "bg/subtle" },
      { token: "muted", className: "bg-muted", hex: "#F4F4F5", figma: "bg/muted" },
      { token: "active", className: "bg-active", hex: "#F0F0F2", figma: "bg/active" },
      { token: "inverse", className: "bg-inverse", hex: "#222224", figma: "bg/inverse" },
    ],
  },
  {
    title: "Border",
    description: "Use with border-*, divide-* and ring-*.",
    swatches: [
      { token: "line", className: "bg-line", hex: "#E8E8EA", figma: "border/default" },
      { token: "line-strong", className: "bg-line-strong", hex: "#DCDDE1", figma: "border/strong" },
      { token: "line-subtle", className: "bg-line-subtle", hex: "#F0F0F2", figma: "border/subtle" },
    ],
  },
  {
    title: "Text",
    description: "Use with text-*.",
    swatches: [
      { token: "fg", className: "bg-fg", hex: "#222224", figma: "text/primary" },
      { token: "fg-secondary", className: "bg-fg-secondary", hex: "#6F7075", figma: "text/secondary" },
      { token: "fg-muted", className: "bg-fg-muted", hex: "#96979C", figma: "text/muted" },
      { token: "fg-disabled", className: "bg-fg-disabled", hex: "#B5B6BA", figma: "text/disabled" },
      { token: "fg-inverse", className: "bg-fg-inverse", hex: "#FFFFFF", figma: "text/inverse" },
    ],
  },
  {
    title: "Accent",
    description: "Brand violet for primary actions, selection and focus.",
    swatches: [
      { token: "accent", className: "bg-accent", hex: "#635BFF", figma: "accent/default" },
      { token: "accent-hover", className: "bg-accent-hover", hex: "#574FFF", figma: "accent/hover" },
      { token: "accent-pressed", className: "bg-accent-pressed", hex: "#4A42E8", figma: "accent/pressed" },
      { token: "accent-soft", className: "bg-accent-soft", hex: "#F2F1FF", figma: "accent/soft" },
      { token: "accent-soft-border", className: "bg-accent-soft-border", hex: "#E2E0FF", figma: "accent/soft-border" },
      { token: "accent-text", className: "bg-accent-text", hex: "#564EF0", figma: "accent/text" },
    ],
  },
  ...(
    [
      ["Success", "success", ["#22A06B", "#EAF6F0", "#CDEBDC", "#1A7F54"]],
      ["Warning", "warning", ["#D98B24", "#FCF3E6", "#F3DDBA", "#9E6116"]],
      ["Error", "error", ["#D64545", "#FCEEEE", "#F5D0D0", "#B53535"]],
      ["Info", "info", ["#3B82F6", "#EDF3FE", "#D3E2FC", "#2C68CC"]],
    ] as const
  ).map(([title, key, hex]) => ({
    title,
    description: "Default for icons and fills, soft + border for surfaces, text for labels on soft.",
    swatches: (["", "-soft", "-border", "-text"] as const).map((suffix, i) => ({
      token: `${key}${suffix}`,
      className: `bg-${key}${suffix}`,
      hex: hex[i]!,
      figma: `${key}/${suffix ? suffix.slice(1) : "default"}`,
    })),
  })),
  {
    title: "Chart",
    description: "Series and grid colors for data visualisation.",
    swatches: [
      { token: "chart-primary", className: "bg-chart-primary", hex: "#635BFF", figma: "chart/primary" },
      { token: "chart-primary-soft", className: "bg-chart-primary-soft", hex: "#D9D7FF", figma: "chart/primary-soft" },
      { token: "chart-neutral", className: "bg-chart-neutral", hex: "#C7C8CE", figma: "chart/neutral" },
      { token: "chart-neutral-soft", className: "bg-chart-neutral-soft", hex: "#E6E6E9", figma: "chart/neutral-soft" },
      { token: "chart-grid", className: "bg-chart-grid", hex: "#EDEDEF", figma: "chart/grid" },
    ],
  },
  {
    title: "Chart series",
    description:
      "Categorical colors 2–6, assigned in this fixed order after chart-primary and never cycled. Validated for color-vision deficiency (adjacent ΔE ≥ 9.6); chart-3 is below 3:1 on white, so charts always pair color with a legend or tooltip.",
    swatches: [
      { token: "chart-2", className: "bg-chart-2", hex: "#1FA58F", figma: "—" },
      { token: "chart-3", className: "bg-chart-3", hex: "#E8772B", figma: "—" },
      { token: "chart-4", className: "bg-chart-4", hex: "#3B82F6", figma: "—" },
      { token: "chart-5", className: "bg-chart-5", hex: "#E5507A", figma: "—" },
      { token: "chart-6", className: "bg-chart-6", hex: "#B98A12", figma: "—" },
    ],
  },
  {
    title: "Chart sequential",
    description: "One hue, light → dark, for magnitude (heatmaps, density). Never use it for categories.",
    swatches: [1, 2, 3, 4, 5, 6].map((n, i) => ({
      token: `chart-seq-${n}`,
      className: ["bg-chart-seq-1", "bg-chart-seq-2", "bg-chart-seq-3", "bg-chart-seq-4", "bg-chart-seq-5", "bg-chart-seq-6"][i]!,
      hex: ["#EFEEFF", "#D9D7FF", "#B3AEFF", "#8A83FF", "#635BFF", "#4038C7"][i]!,
      figma: "—",
    })),
  },
];

// Literal class list so Tailwind generates the status swatches built above.
// bg-success bg-success-soft bg-success-border bg-success-text bg-warning bg-warning-soft bg-warning-border bg-warning-text
// bg-error bg-error-soft bg-error-border bg-error-text bg-info bg-info-soft bg-info-border bg-info-text

const avatars = ["blue", "green", "amber", "rose", "violet", "slate", "teal"] as const;
// bg-avatar-blue-bg text-avatar-blue-fg bg-avatar-green-bg text-avatar-green-fg bg-avatar-amber-bg text-avatar-amber-fg
// bg-avatar-rose-bg text-avatar-rose-fg bg-avatar-violet-bg text-avatar-violet-fg bg-avatar-slate-bg text-avatar-slate-fg bg-avatar-teal-bg text-avatar-teal-fg

export default function ColorsPage() {
  return (
    <>
      <DocHeader
        eyebrow="Foundations"
        title="Color"
        description="58 semantic tokens from the Figma “Color” collection. Tailwind’s default palette is removed, so only these colors exist."
      />
      <Prose>
        <p>
          Every token is a CSS variable on <code>@theme</code>, so it works with any color utility: <code>bg-surface</code>, <code>text-fg-secondary</code>,{" "}
          <code>border-line</code>, <code>ring-accent/25</code>. Never use raw hex values in components.
        </p>
      </Prose>
      <div className="mt-10">
        {groups.map((g) => (
          <DocSection key={g.title} title={g.title} description={g.description}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {g.swatches.map((s) => (
                <div key={s.token} className="overflow-hidden rounded-md border border-line bg-surface">
                  <div className={`h-16 border-b border-line ${s.className}`} />
                  <div className="p-2.5">
                    <div className="truncate font-mono text-[12px] font-medium text-fg">{s.token}</div>
                    <div className="mt-0.5 font-mono text-[11px] text-fg-muted">{s.hex}</div>
                    <div className="truncate text-[11px] text-fg-disabled">{s.figma}</div>
                  </div>
                </div>
              ))}
            </div>
          </DocSection>
        ))}
        <DocSection title="Avatar tints" description="Seven background/foreground pairs for initials. Avatar picks one from the name.">
          <div className="flex flex-wrap gap-3">
            {avatars.map((a) => (
              <div key={a} className={`flex h-12 w-24 items-center justify-center rounded-md text-base font-semibold bg-avatar-${a}-bg text-avatar-${a}-fg`}>
                {a}
              </div>
            ))}
          </div>
        </DocSection>
      </div>
    </>
  );
}
