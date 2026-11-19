import { Cloud, FileSpreadsheet, Hash, Mail, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Simplified integration marks: a 24px tile in the provider's color with a
 * generic glyph. Swap in official logos if your license allows.
 */
export type IntegrationId = "salesforce" | "hubspot" | "gmail" | "outlook" | "apollo" | "linkedin" | "zapier" | "slack" | "google" | "microsoft" | "csv";

const marks: Record<IntegrationId, { name: string; className: string; glyph: ReactNode }> = {
  salesforce: { name: "Salesforce", className: "bg-[#00a1e0] text-white", glyph: <Cloud /> },
  hubspot: { name: "HubSpot", className: "bg-[#ff7a59] text-white", glyph: <span>h</span> },
  gmail: { name: "Gmail", className: "bg-[#ea4335] text-white", glyph: <Mail /> },
  outlook: { name: "Outlook", className: "bg-[#0a64d6] text-white", glyph: <Mail /> },
  apollo: { name: "Apollo", className: "bg-[#f8d021] text-[#1b1b1b]", glyph: <span>A</span> },
  linkedin: { name: "LinkedIn", className: "bg-[#0a66c2] text-white", glyph: <span>in</span> },
  zapier: { name: "Zapier", className: "bg-[#ff4f00] text-white", glyph: <Zap /> },
  slack: { name: "Slack", className: "bg-[#4a154b] text-white", glyph: <Hash /> },
  google: { name: "Google", className: "bg-surface shadow-button", glyph: <GoogleGlyph /> },
  microsoft: { name: "Microsoft", className: "bg-surface shadow-button", glyph: <MicrosoftGlyph /> },
  csv: { name: "CSV", className: "bg-muted text-fg-secondary", glyph: <FileSpreadsheet /> },
};

export const integrationIds = Object.keys(marks) as IntegrationId[];

export function integrationName(id: IntegrationId) {
  return marks[id].name;
}

export function IntegrationMark({ id, size = "md", className }: { id: IntegrationId; size?: "md" | "lg"; className?: string }) {
  const m = marks[id];
  return (
    <span
      role="img"
      aria-label={m.name}
      title={m.name}
      className={cx(
        "inline-flex shrink-0 items-center justify-center font-bold leading-none",
        size === "md" ? "size-6 rounded-[7px] text-[10px] [&_svg]:size-3.5" : "size-10 rounded-[12px] text-base [&_svg]:size-5",
        m.className,
        className,
      )}
    >
      {m.glyph}
    </span>
  );
}

export function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8h-4v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z" />
    </svg>
  );
}

export function MicrosoftGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path fill="#F25022" d="M1 1h10.5v10.5H1z" />
      <path fill="#7FBA00" d="M12.5 1H23v10.5H12.5z" />
      <path fill="#00A4EF" d="M1 12.5h10.5V23H1z" />
      <path fill="#FFB900" d="M12.5 12.5H23V23H12.5z" />
    </svg>
  );
}

/** Product lockup: mark + wordmark in Large (32) and Small (24). */
export function BrandLockup({ name = "Vantu", size = "lg", variant = "lockup" }: { name?: string; size?: "lg" | "sm"; variant?: "lockup" | "wordmark" | "mark" }) {
  const mark = (
    <span
      className={cx(
        "inline-flex shrink-0 items-center justify-center bg-linear-to-b from-accent-light to-accent font-semibold text-white shadow-button-primary",
        size === "lg" ? "size-8 rounded-[10px] text-base" : "size-6 rounded-[7px] text-sm",
      )}
    >
      {name[0]}
    </span>
  );
  if (variant === "mark") return <span aria-label={name}>{mark}</span>;
  return (
    <span className={cx("inline-flex items-center font-semibold tracking-tight text-fg", size === "lg" ? "gap-2.5 text-xl" : "gap-2 text-lg")}>
      {variant === "lockup" && mark}
      <span>
        {name}
        <sup className="ml-px text-[0.5em] font-medium">®</sup>
      </span>
    </span>
  );
}
