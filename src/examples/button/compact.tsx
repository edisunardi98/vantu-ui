"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="2xs" leadingIcon={<Plus />}>2XS · 28</Button>
      <Button size="xs" leadingIcon={<Plus />}>XS · 32</Button>
      <Button size="xs" variant="primary">See all</Button>
      <Button size="2xs" variant="soft">Today</Button>
    </div>
  );
}
