"use client";

import { ChevronRight, Slash } from "lucide-react";
import type { ReactNode } from "react";
import { Breadcrumb as AriaBreadcrumb, Breadcrumbs, Link } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "chevron" | "slash";
  /** Collapse middle items into "…" when there are more than this many. */
  maxItems?: number;
  className?: string;
}

/** Path trail. The last item is the current page. */
export function Breadcrumb({ items, separator = "chevron", maxItems, className }: BreadcrumbProps) {
  const shown: (BreadcrumbItem | "…")[] =
    maxItems && items.length > maxItems ? [items[0]!, "…", ...items.slice(items.length - (maxItems - 1))] : items;
  const Sep = separator === "chevron" ? ChevronRight : Slash;
  return (
    <Breadcrumbs className={cx("flex flex-wrap items-center gap-1.5 text-base", className)}>
      {shown.map((it, i) => (
        <AriaBreadcrumb key={it === "…" ? "ellipsis" : it.id} id={it === "…" ? "ellipsis" : it.id} className="flex items-center gap-1.5">
          {it === "…" ? (
            <span className="px-1 text-fg-muted">…</span>
          ) : (
            <Link
              href={it.href}
              className={cx(
                "inline-flex items-center gap-1.5 rounded-xs outline-none data-focus-visible:shadow-focus [&_svg]:size-4",
                "text-fg-secondary data-hovered:text-fg data-current:font-medium data-current:text-fg",
              )}
            >
              {it.icon}
              {it.label}
            </Link>
          )}
          {i < shown.length - 1 && <Sep aria-hidden className={cx("text-fg-disabled", separator === "chevron" ? "size-3.5" : "size-3 -rotate-12")} />}
        </AriaBreadcrumb>
      ))}
    </Breadcrumbs>
  );
}
