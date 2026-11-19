import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

export interface TimelineItem {
  id: string;
  icon: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
}

/** Items connect with a 1px rail; the last item drops the rail. */
export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol className={cx("flex flex-col", className)}>
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
          {i < items.length - 1 && <span aria-hidden className="absolute bottom-0 left-[11px] top-7 w-px bg-line" />}
          <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface text-fg-secondary shadow-button [&_svg]:size-3.5">
            {item.icon}
          </span>
          <div className="min-w-0 pt-0.5">
            <div className="text-base text-fg">{item.title}</div>
            {item.meta && <div className="mt-1 text-sm text-fg-muted">{item.meta}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
