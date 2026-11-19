"use client";

import { AlignCenter, AlignLeft, AlignRight, CalendarDays, LayoutGrid, List } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

export default function Example() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonGroup
        aria-label="Range"
        defaultValue={["30d"]}
        items={[
          { id: "today", label: "Today" },
          { id: "7d", label: "7 days" },
          { id: "30d", label: "30 days" },
          { id: "custom", label: "Custom", icon: <CalendarDays /> },
        ]}
      />
      <ButtonGroup
        aria-label="View"
        size="xs"
        defaultValue={["list"]}
        items={[
          { id: "list", icon: <List />, label: "List" },
          { id: "board", icon: <LayoutGrid />, label: "Board" },
        ]}
      />
      <ButtonGroup
        aria-label="Alignment"
        size="2xs"
        defaultValue={["left"]}
        items={[
          { id: "left", icon: <AlignLeft />, "aria-label": "Align left" },
          { id: "center", icon: <AlignCenter />, "aria-label": "Align center" },
          { id: "right", icon: <AlignRight />, "aria-label": "Align right" },
        ]}
      />
    </div>
  );
}
