import type { ReactNode } from "react";

export function DocHeader({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: ReactNode; children?: ReactNode }) {
  return (
    <header className="mb-10 border-b border-line pb-8">
      {eyebrow && <div className="mb-3 text-sm font-medium text-accent-text">{eyebrow}</div>}
      <h1 className="text-4xl font-semibold tracking-tight text-fg">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-lg text-fg-secondary">{description}</p>}
      {children}
    </header>
  );
}

export function DocSection({ id, title, count, description, children }: { id?: string; title: string; count?: number; description?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="flex items-baseline gap-2 text-xl font-semibold tracking-tight text-fg">
        {title}
        {count !== undefined && <span className="text-base font-normal tabular text-fg-muted">{count}</span>}
      </h2>
      {description && <p className="mt-1.5 max-w-2xl text-base text-fg-secondary">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl space-y-4 text-base leading-relaxed text-fg-secondary [&_a]:font-medium [&_a]:text-accent-text [&_a:hover]:underline [&_code]:rounded-xs [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-fg [&_strong]:font-medium [&_strong]:text-fg">
      {children}
    </div>
  );
}
