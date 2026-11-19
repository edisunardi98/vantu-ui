"use client";

import { Input } from "@/components/ui/input";

export default function Example() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
      <Input label="Default" placeholder="Work email" />
      <Input label="Error" defaultValue="jordan@" errorMessage="Enter a valid email." />
      <Input label="Disabled" placeholder="Work email" isDisabled />
    </div>
  );
}
