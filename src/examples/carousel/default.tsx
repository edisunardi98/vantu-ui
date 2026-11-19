"use client";

import { Sparkles, Target, Zap } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";

const slides = [
  { icon: <Sparkles />, title: "AI prospecting", text: "Describe your ideal buyer and get a ranked list in seconds.", tone: "bg-accent-soft text-accent" },
  { icon: <Zap />, title: "Instant enrichment", text: "Verified emails, phones and firmographics on every row.", tone: "bg-success-soft text-success" },
  { icon: <Target />, title: "Score every lead", text: "ICP fit plus buying signals, refreshed every morning.", tone: "bg-warning-soft text-warning" },
  { icon: <Sparkles />, title: "Sequences that adapt", text: "Pause on reply, branch on opens, personalise with AI.", tone: "bg-info-soft text-info" },
];

export default function Example() {
  return (
    <Carousel label="Product highlights" perView={2} className="w-full max-w-2xl">
      {slides.map((s) => (
        <div key={s.title} className="flex h-44 flex-col justify-end rounded-lg border border-line bg-surface p-5 shadow-card">
          <span className={`mb-auto flex size-9 items-center justify-center rounded-[10px] [&_svg]:size-4 ${s.tone}`}>{s.icon}</span>
          <h3 className="text-lg font-medium text-fg">{s.title}</h3>
          <p className="mt-1 text-sm text-fg-secondary">{s.text}</p>
        </div>
      ))}
    </Carousel>
  );
}
