"use client";

import { TokenInput } from "@/components/ui/token-input";

export default function Example() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <TokenInput label="Job titles" defaultValue={["VP Sales", "Head of Revenue"]} placeholder="Type a title and press Enter" />
      <TokenInput label="Invite by email" placeholder="name@company.com, …" validate={(t) => /^\S+@\S+\.\S+$/.test(t)} />
    </div>
  );
}
