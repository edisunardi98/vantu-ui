import { extendTailwindMerge } from "tailwind-merge";

type ClassValue = string | number | null | undefined | false | ClassValue[];

// Teach tailwind-merge about the custom tokens from styles/:
// - shadow tokens, so `shadow-card` and `shadow-none` resolve as one group;
// - composite type utilities, so `text-metric` is a font size and is not
//   dropped as a "color" when combined with `text-fg`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      shadow: ["button", "button-primary", "card", "popover", "focus", "focus-error"],
    },
    classGroups: {
      "font-size": [{ text: ["label", "metric"] }],
    },
  },
});

/** Join class names and resolve Tailwind conflicts (last one wins). */
export function cx(...inputs: ClassValue[]): string {
  const flat: string[] = [];
  const walk = (v: ClassValue) => {
    if (!v) return;
    if (Array.isArray(v)) v.forEach(walk);
    else flat.push(String(v));
  };
  inputs.forEach(walk);
  return twMerge(flat.join(" "));
}
