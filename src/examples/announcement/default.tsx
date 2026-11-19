"use client";

import { useState } from "react";
import { AnnouncementPill, Announcement } from "@/components/ui/announcement";
import { Button } from "@/components/ui/button";

export default function Example() {
  const [shown, setShown] = useState(true);
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <AnnouncementPill href="#">23 new components are live</AnnouncementPill>
      {shown ? (
        <Announcement
          title="Two new components"
          description="Input OTP and Token Input are installable today."
          onDismiss={() => setShown(false)}
          action={<Button size="sm" className="w-full">See what’s new</Button>}
        />
      ) : (
        <Button size="sm" onPress={() => setShown(true)}>Show announcement again</Button>
      )}
    </div>
  );
}
