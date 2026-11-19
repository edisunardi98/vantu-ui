"use client";

import { useState } from "react";
import { InputOTP } from "@/components/ui/input-otp";

export default function Example() {
  const [status, setStatus] = useState<"idle" | "ok" | "bad">("idle");
  return (
    <div className="flex flex-col items-center gap-5">
      <InputOTP groupSize={3} isInvalid={status === "bad"} onChange={() => setStatus("idle")} onComplete={(code) => setStatus(code === "123456" ? "ok" : "bad")} />
      <p className="text-sm text-fg-muted">
        {status === "ok" ? "✅ Verified" : status === "bad" ? "That code didn’t match — try 123456." : "Enter 123456. Paste works too."}
      </p>
      <InputOTP length={4} pattern="alphanumeric" label="Invite code" defaultValue="A7" />
    </div>
  );
}
