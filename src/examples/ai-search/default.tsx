"use client";

import { useState } from "react";
import { AISearch } from "@/components/ui/ai-search";

export default function Example() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <AISearch onSubmit={setSubmitted} />
      <p className="text-sm text-fg-muted">{submitted ? `Searching for: ${submitted}` : "Type a query and press Enter."}</p>
    </div>
  );
}
