"use client";

import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" size="sm">Small · 36</Button>
      <Button variant="primary" size="md">Medium · 40</Button>
      <Button variant="primary" size="lg">Large · 44</Button>
    </div>
  );
}
