import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

export interface SettingRowProps {
  title: ReactNode;
  description?: ReactNode;
  /** The control: a <Switch>, <Select>, <Button>… */
  control: ReactNode;
  /** `inline` puts the control on the right; `leading` puts it before the text (toggle lists). */
  layout?: "inline" | "leading";
  className?: string;
}

/** Title + description + control. The building block of settings pages. */
export function SettingRow({ title, description, control, layout = "inline", className }: SettingRowProps) {
  if (layout === "leading") {
    return (
      <div className={cx("flex items-start gap-3", className)}>
        <div className="pt-px">{control}</div>
        <div className="min-w-0">
          <div className="text-base font-medium text-fg">{title}</div>
          {description && <p className="mt-0.5 text-sm text-fg-secondary">{description}</p>}
        </div>
      </div>
    );
  }
  return (
    <div className={cx("flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8", className)}>
      <div className="min-w-0">
        <div className="text-base font-medium text-fg">{title}</div>
        {description && <p className="mt-0.5 text-sm text-fg-secondary">{description}</p>}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

/** Section heading + divider used between groups of setting rows. */
export function SettingSection({ title, description, children, className }: { title: string; description?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cx("flex flex-col gap-5", className)}>
      <header className="border-b border-line pb-4">
        <h3 className="text-lg font-medium text-fg">{title}</h3>
        {description && <p className="mt-0.5 text-base text-fg-secondary">{description}</p>}
      </header>
      {children}
    </section>
  );
}
