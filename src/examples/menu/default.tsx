"use client";

import { Download, List, MoreHorizontal, Send, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu";

export default function Example() {
  return (
    <MenuTrigger>
      <Button trailingIcon={<MoreHorizontal />}>Actions</Button>
      <Menu onAction={(key) => console.log(key)}>
        <MenuItem id="list" icon={<List />} shortcut="L">Add to list</MenuItem>
        <MenuItem id="sequence" icon={<Send />} shortcut="S">Start sequence</MenuItem>
        <MenuItem id="enrich" icon={<Zap />} shortcut="E">Enrich</MenuItem>
        <MenuItem id="export" icon={<Download />} shortcut="⌘E">Export</MenuItem>
        <MenuSeparator />
        <MenuItem id="delete" icon={<Trash2 />} danger>Delete</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
