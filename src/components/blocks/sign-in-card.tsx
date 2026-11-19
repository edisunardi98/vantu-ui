"use client";

import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8h-4v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z" />
    </svg>
  );
}

/** Authentication card: social sign-in, email + password, remember me. */
export function SignInCard({ product = "Vantu" }: { product?: string }) {
  return (
    // Layered card shell: subtle frame (4px) around the white form panel.
    <div className="w-full max-w-[400px] rounded-lg border border-line bg-subtle p-1 shadow-card">
      <div className="rounded-[12px] border border-line bg-surface p-7">
      <span className="flex size-10 items-center justify-center rounded-[12px] bg-linear-to-b from-accent-light to-accent text-base font-semibold text-white shadow-button-primary">
        {product[0]}
      </span>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-fg">Sign in to {product}</h1>
      <p className="mt-1.5 text-base text-fg-secondary">Welcome back. Pick up where your pipeline left off.</p>

      <Button className="mt-6 w-full" leadingIcon={<GoogleMark />}>
        Continue with Google
      </Button>
      <div className="my-5 flex items-center gap-3 text-sm text-fg-muted">
        <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
      </div>

      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <Input label="Work email" type="email" placeholder="you@company.com" icon={<Mail />} isRequired />
        <Input label="Password" type="password" placeholder="••••••••" icon={<Lock />} isRequired />
        <div className="flex items-center justify-between">
          <Checkbox defaultSelected>Remember me</Checkbox>
          <a href="#" className="text-base font-medium text-accent-text hover:underline">
            Forgot password?
          </a>
        </div>
        <Button type="submit" variant="primary" className="mt-1 w-full">
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-base text-fg-secondary">
        New to {product}?{" "}
        <a href="#" className="font-medium text-accent-text hover:underline">
          Create a workspace
        </a>
      </p>
      </div>
    </div>
  );
}
