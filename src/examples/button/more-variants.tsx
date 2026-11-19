"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="neutral" leadingIcon={<Plus />}>New deal</Button>
      <Button variant="soft">Enrich</Button>
      <Button variant="outline">Preview</Button>
      <Button variant="danger-soft" leadingIcon={<Trash2 />}>Remove</Button>
    </div>
  );
}
