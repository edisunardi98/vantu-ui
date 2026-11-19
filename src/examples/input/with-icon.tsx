"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";

export default function Example() {
  return <Input aria-label="Search" placeholder="Search prospects" icon={<Search />} trailing={<Kbd>⌘K</Kbd>} className="w-full max-w-80" />;
}
