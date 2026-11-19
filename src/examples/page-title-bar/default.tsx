"use client";

import { CalendarDays, Plus, Users } from "lucide-react";
import { PageTitleBar } from "@/components/blocks/page-title-bar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="w-full divide-y divide-line bg-surface">
      <PageTitleBar
        bareLeading
        leading={<Avatar name="Jordan Blake" size="xl" status="online" />}
        title="Jordan Blake"
        description="Welcome back to Vantu 👋"
        actions={
          <>
            <Button leadingIcon={<CalendarDays />}>Schedule</Button>
            <Button variant="primary" leadingIcon={<Plus />}>New deal</Button>
          </>
        }
      />
      <PageTitleBar leading={<Users />} title="Team" description="Manage and collaborate with your sales team." />
    </div>
  );
}
