"use client";

import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Find prospects</Button>
      <Button variant="secondary">Export</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">Delete list</Button>
    </div>
  );
}
