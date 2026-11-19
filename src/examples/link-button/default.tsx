"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export default function Example() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center gap-6">
        <LinkButton tone="accent" trailingIcon={<ArrowRight />}>View all</LinkButton>
        <LinkButton tone="black" underline>Forgot password?</LinkButton>
        <LinkButton tone="gray">Skip for now</LinkButton>
        <LinkButton tone="error">Try again</LinkButton>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <LinkButton size="sm" href="https://example.com" target="_blank" trailingIcon={<ExternalLink />}>Open docs</LinkButton>
        <LinkButton size="sm" isDisabled>Disabled</LinkButton>
      </div>
    </div>
  );
}
