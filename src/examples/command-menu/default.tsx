"use client";

import { CommandMenu } from "@/components/blocks/command-menu";

export default function Example() {
  return <CommandMenu onAction={(id) => console.log(id)} />;
}
