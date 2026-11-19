"use client";

import { useState } from "react";
import { type Color, parseColor } from "react-aria-components";
import { ColorPicker } from "@/components/ui/color-picker";

export default function Example() {
  const [color, setColor] = useState<Color>(parseColor("#635BFF"));
  return (
    <div className="flex flex-col items-center gap-4">
      <ColorPicker label="Brand color" value={color} onChange={setColor} />
      <div className="flex items-center gap-2 text-sm text-fg-secondary">
        Preview
        <span className="rounded-sm px-2 py-1 font-medium text-white" style={{ background: color.toString("hex") }}>
          Find prospects
        </span>
      </div>
    </div>
  );
}
