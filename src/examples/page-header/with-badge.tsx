"use client";

import { Plus, Upload } from "lucide-react";
import { PageHeader } from "@/components/blocks/page-header";
import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="w-full">
      <PageHeader
        title="Prospects"
        badge="Active"
        description="Discover, qualify, and manage your highest-value prospects."
        actions={
          <>
            <Button leadingIcon={<Upload />}>Import</Button>
            <Button variant="primary" leadingIcon={<Plus />}>Add prospect</Button>
          </>
        }
      />
    </div>
  );
}
