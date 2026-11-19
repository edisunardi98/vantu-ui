"use client";

import { Building2, List, Plus, Send, Settings, Sparkles, Upload, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/ui/command-palette";
import { Kbd } from "@/components/ui/kbd";

export default function Example() {
  const [open, setOpen] = useState(false);
  const [ran, setRan] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center gap-3">
      <Button onPress={() => setOpen(true)} trailingIcon={<Kbd className="ml-1">⌘K</Kbd>}>
        Open command palette
      </Button>
      <p className="text-sm text-fg-muted">{ran ? `Ran: ${ran}` : "Or press ⌘K / Ctrl+K."}</p>
      <CommandPalette
        isOpen={open}
        onOpenChange={setOpen}
        onAction={setRan}
        groups={[
          {
            title: "Actions",
            items: [
              { id: "find", label: "Find prospects with AI", icon: <Sparkles />, meta: "⌘F" },
              { id: "new-seq", label: "Create sequence", icon: <Plus />, meta: "⌘N" },
              { id: "import", label: "Import CSV", icon: <Upload /> },
            ],
          },
          {
            title: "Go to",
            items: [
              { id: "sarah", label: "Sarah Chen", icon: <User />, meta: "Prospect", keywords: "ledgerly vp sales" },
              { id: "ledgerly", label: "Ledgerly", icon: <Building2 />, meta: "Company" },
              { id: "list", label: "Series B — VP Sales", icon: <List />, meta: "List" },
              { id: "seqs", label: "Sequences", icon: <Send /> },
              { id: "settings", label: "Settings", icon: <Settings />, meta: "⌘," },
            ],
          },
        ]}
      />
    </div>
  );
}
