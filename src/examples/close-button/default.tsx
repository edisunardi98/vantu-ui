"use client";

import { CloseButton } from "@/components/ui/close-button";

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <CloseButton size="sm" />
      <CloseButton size="md" />
      <CloseButton size="lg" />
      <CloseButton size="sm" variant="filled" />
      <CloseButton size="md" variant="filled" />
      <CloseButton size="lg" variant="filled" />
    </div>
  );
}
