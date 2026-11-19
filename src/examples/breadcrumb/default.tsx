"use client";

import { Building2, Home } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { id: "home", label: "Home", href: "#", icon: <Home /> },
          { id: "companies", label: "Companies", href: "#", icon: <Building2 /> },
          { id: "ledgerly", label: "Ledgerly" },
        ]}
      />
      <Breadcrumb
        separator="slash"
        items={[
          { id: "ws", label: "Workspace", href: "#" },
          { id: "lists", label: "Lists", href: "#" },
          { id: "list", label: "Series B — VP Sales" },
        ]}
      />
      <Breadcrumb
        maxItems={3}
        items={[
          { id: "a", label: "Home", href: "#" },
          { id: "b", label: "Analytics", href: "#" },
          { id: "c", label: "Outreach", href: "#" },
          { id: "d", label: "Sequences", href: "#" },
          { id: "e", label: "Post-event: SaaStr" },
        ]}
      />
    </div>
  );
}
