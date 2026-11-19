"use client";

import { Select, SelectItem } from "@/components/ui/select";

export default function Example() {
  return (
    <Select label="Company size" className="w-full max-w-72">
      <SelectItem id="1-10">1–10 employees</SelectItem>
      <SelectItem id="11-50">11–50 employees</SelectItem>
      <SelectItem id="51-200">51–200 employees</SelectItem>
      <SelectItem id="201-1000">201–1,000 employees</SelectItem>
      <SelectItem id="1000+">1,000+ employees</SelectItem>
    </Select>
  );
}
