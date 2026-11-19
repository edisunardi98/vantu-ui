"use client";

import { CheckSquare, Clock, Mail, MoreHorizontal, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/utils/cx";
import { IconButton } from "./icon-button";
import { Menu, MenuItem, MenuSeparator, MenuTrigger } from "./menu";

export type SequenceChannel = "email" | "linkedin" | "call" | "task";

function LinkedinGlyph(props: { "aria-hidden"?: boolean }) {
  return (
    <span {...props} className="text-[11px] font-bold leading-none">
      in
    </span>
  );
}

const channels: Record<SequenceChannel, { label: string; Icon: React.ComponentType<{ "aria-hidden"?: boolean }> }> = {
  email: { label: "Email", Icon: Mail },
  linkedin: { label: "LinkedIn", Icon: LinkedinGlyph },
  call: { label: "Call", Icon: Phone },
  task: { label: "Task", Icon: CheckSquare },
};

export interface SequenceStepProps {
  step: number;
  channel: SequenceChannel;
  /** e.g. "Intro" — rendered as "Email · Intro". */
  name: string;
  /** Timing meta, e.g. "Day 1 · Automatic". */
  timing: string;
  subject?: string;
  preview?: string;
  stats?: { label: string; value: ReactNode }[];
  className?: string;
}

/** Highlights {{variables}} in templates. */
function Template({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\{\{[^}]+\}\})/g).map((part, i) =>
        part.startsWith("{{") ? (
          <span key={i} className="rounded-xs bg-accent-soft px-0.5 text-accent-text">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** One card per step: channel tile, title, timing meta, content preview and optional stats. */
export function SequenceStep({ step, channel, name, timing, subject, preview, stats, className }: SequenceStepProps) {
  const ch = channels[channel];
  return (
    <article className={cx("overflow-hidden rounded-lg border border-line bg-surface shadow-card", className)}>
      <div className="flex gap-3 p-4">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-accent-soft text-accent [&_svg]:size-4">
          <ch.Icon aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-base font-medium text-fg">
                {ch.label} · {name}
              </h4>
              <p className="text-sm text-fg-muted">{timing}</p>
            </div>
            <span className="pt-0.5 text-sm text-fg-muted">Step {step}</span>
            <MenuTrigger>
              <IconButton variant="ghost" size="xs" aria-label={`Step ${step} options`}>
                <MoreHorizontal />
              </IconButton>
              <Menu>
                <MenuItem>Edit step</MenuItem>
                <MenuItem>Duplicate</MenuItem>
                <MenuSeparator />
                <MenuItem danger>Delete</MenuItem>
              </Menu>
            </MenuTrigger>
          </div>
          {(subject || preview) && (
            <div className="mt-3">
              {subject && (
                <p className="truncate text-base font-medium text-fg">
                  <Template text={subject} />
                </p>
              )}
              {preview && (
                <p className="mt-0.5 truncate text-base text-fg-secondary">
                  <Template text={preview} />
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {stats && (
        <dl className="flex gap-5 border-t border-line bg-subtle px-4 py-2.5 pl-15 text-sm">
          {stats.map((s) => (
            <div key={s.label} className="flex gap-1.5">
              <dt className="text-fg-muted">{s.label}</dt>
              <dd className="font-medium tabular text-fg">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

/** Wait pill on the connector between steps. */
export function SequenceWait({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-8 items-center gap-2 rounded-full border border-line bg-surface px-3 text-sm font-medium text-fg-secondary">
      <Clock aria-hidden className="size-3.5" />
      {children}
    </span>
  );
}
