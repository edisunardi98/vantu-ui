import type { Metadata } from "next";
import { DocHeader, DocSection, Prose } from "@/components/docs/doc-page";

export const metadata: Metadata = { title: "Typography" };

const scale = [
  { cls: "text-8xl", px: 48 },
  { cls: "text-7xl", px: 44 },
  { cls: "text-6xl", px: 40 },
  { cls: "text-5xl", px: 36 },
  { cls: "text-4xl", px: 32 },
  { cls: "text-3xl", px: 28 },
  { cls: "text-2xl", px: 24 },
  { cls: "text-xl", px: 20 },
  { cls: "text-lg", px: 16 },
  { cls: "text-base", px: 14 },
  { cls: "text-sm", px: 12 },
  { cls: "text-xs", px: 10 },
];

const weights = [
  { cls: "font-normal", label: "Regular 400" },
  { cls: "font-medium", label: "Medium 500" },
  { cls: "font-semibold", label: "SemiBold 600" },
];

export default function TypographyPage() {
  return (
    <>
      <DocHeader
        eyebrow="Foundations"
        title="Typography"
        description="Geist for UI and Geist Mono for code and IDs. 12 sizes from 10 to 48px, three weights, 140% line height for body text."
      />
      <Prose>
        <p>
          Sizes map to Tailwind’s names, so <code>text-base</code> is the 14px body size used across the dashboard. Combine a size with a weight:{" "}
          <code>text-lg font-medium</code> for card titles, <code>text-4xl font-semibold</code> for metrics.
        </p>
      </Prose>

      <DocSection title="Scale">
        <div className="divide-y divide-line rounded-lg border border-line">
          {scale.map((s) => (
            <div key={s.cls} className="grid items-baseline gap-2 px-5 py-4 md:grid-cols-[140px_1fr]">
              <div className="font-mono text-sm text-fg-muted">
                {s.cls} <span className="text-fg-disabled">· {s.px}px</span>
              </div>
              <div className="grid gap-x-8 gap-y-1 sm:grid-cols-3">
                {weights.map((w) => (
                  <span key={w.cls} className={`${s.cls} ${w.cls} truncate text-fg`}>
                    The quick brown
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 grid gap-8 px-5 text-sm text-fg-muted sm:ml-[140px] sm:grid-cols-3">
          {weights.map((w) => (
            <span key={w.cls}>{w.label}</span>
          ))}
        </div>
      </DocSection>

      <DocSection title="Label" description="Section labels: uppercase, 12 Medium, +0.6px tracking. Use the text-label utility.">
        <div className="flex flex-col gap-3 rounded-lg border border-line p-5">
          <span className="text-label text-fg-muted">Outreach</span>
          <code className="font-mono text-sm text-fg-secondary">{`<div className="text-label text-fg-muted">Outreach</div>`}</code>
        </div>
      </DocSection>

      <DocSection title="Mono" description="Geist Mono for code, IDs and keyboard hints.">
        <div className="flex flex-col gap-2 rounded-lg border border-line p-5 font-mono">
          <span className="text-sm text-fg">The quick brown · 12</span>
          <span className="text-lg text-fg">The quick brown · 16</span>
        </div>
      </DocSection>

      <DocSection title="Metric" description="32 SemiBold, tight tracking, tabular figures. Use the text-metric utility.">
        <div className="rounded-lg border border-line p-5">
          <span className="text-metric text-fg">1,284</span>
        </div>
      </DocSection>
    </>
  );
}
