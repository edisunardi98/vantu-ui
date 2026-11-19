import type { Metadata } from "next";
import { DocHeader, DocSection } from "@/components/docs/doc-page";
import { EntryGrid } from "@/components/docs/entry-grid";
import { examples } from "@/examples";
import { componentGroups, components } from "@/lib/registry";

export const metadata: Metadata = { title: "Components" };

const groupBlurb: Record<string, string> = {
  Actions: "Buttons and triggers that start something.",
  Forms: "Inputs, choices and settings controls.",
  "Data display": "Badges, avatars, meters and cards that show information.",
  Navigation: "Moving between views and steps.",
  Overlays: "Dialogs and floating surfaces.",
  "AI & workflow": "Patterns built for AI prospecting and sequences.",
  Feedback: "Alerts, toasts, progress and empty states.",
};

export default function ComponentsPage() {
  return (
    <>
      <DocHeader
        eyebrow="Components"
        title={`${components.length} components`}
        description="Accessible building blocks styled from the Vantu Figma file. Every form and interactive component is built on React Aria."
      />
      {componentGroups.map((g) => (
        <DocSection key={g} id={g.toLowerCase().replace(/\W+/g, "-")} title={g} count={components.filter((c) => c.group === g).length} description={groupBlurb[g]}>
          <EntryGrid entries={components.filter((c) => c.group === g)} examples={examples} />
        </DocSection>
      ))}
    </>
  );
}
