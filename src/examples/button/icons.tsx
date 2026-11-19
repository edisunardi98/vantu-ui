"use client";

import { ChevronDown, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" leadingIcon={<Sparkles />}>Find prospects</Button>
      <Button leadingIcon={<Plus />}>Add to list</Button>
      <Button trailingIcon={<ChevronDown />}>Owner</Button>
      <Button variant="primary" iconOnly aria-label="Add">
        <Plus />
      </Button>
      <Button iconOnly aria-label="Add">
        <Plus />
      </Button>
    </div>
  );
}
