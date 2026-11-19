"use client";

import { useState } from "react";
import { Kbd } from "@/components/ui/kbd";
import { SearchField } from "@/components/ui/search-field";

export default function Example() {
  const [q, setQ] = useState("");
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <SearchField aria-label="Search prospects" placeholder="Search prospects" shortcut={<Kbd>⌘K</Kbd>} value={q} onChange={setQ} />
      <SearchField label="Companies" size="sm" defaultValue="Ledgerly" />
      <p className="text-sm text-fg-muted">{q ? `Searching “${q}” — press Esc to clear.` : "Type to search."}</p>
    </div>
  );
}
