"use client";

import { Button } from "@/components/ui/button";
import { GoogleGlyph, MicrosoftGlyph } from "@/components/ui/integration-mark";

export default function Example() {
  return (
    <div className="grid w-full max-w-md gap-3 sm:grid-cols-2">
      <Button size="lg" leadingIcon={<GoogleGlyph />}>Continue with Google</Button>
      <Button size="lg" leadingIcon={<MicrosoftGlyph />}>Continue with Microsoft</Button>
    </div>
  );
}
