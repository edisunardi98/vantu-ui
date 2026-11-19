"use client";

import { Sparkles, Upload, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function Example() {
  return (
    <EmptyState
      icon={<Users />}
      title="No prospects yet"
      description="Describe your ideal customer and let AI find your first qualified prospects."
      actions={
        <>
          <Button size="sm" leadingIcon={<Upload />}>Import CSV</Button>
          <Button size="sm" variant="primary" leadingIcon={<Sparkles />}>Find prospects</Button>
        </>
      }
    />
  );
}
