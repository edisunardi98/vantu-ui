"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Example() {
  const [pending, setPending] = useState(false);
  const run = () => {
    setPending(true);
    setTimeout(() => setPending(false), 1500);
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" isPending={pending} onPress={run}>
        {pending ? "Enriching…" : "Enrich 24 prospects"}
      </Button>
      <Button variant="primary" isDisabled>Disabled</Button>
      <Button isDisabled>Disabled</Button>
    </div>
  );
}
