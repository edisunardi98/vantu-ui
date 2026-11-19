"use client";

import { ChevronRight, Menu as MenuIcon, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";
import { blocks, charts, components } from "@/lib/registry";
import { findNav } from "./docs-nav";
import { useDocsSearch } from "./docs-search";
import { GitHubStars } from "./github-stars";
import { VantuMark } from "./vantu-mark";
import { DocsSidebar } from "./docs-sidebar";

function useCrumbs(pathname: string) {
  const hit = findNav(pathname);
  if (hit) {
    // Overview pages (Components, Blocks, Templates) live under Foundations but read best on their own.
    const overview = ["/components", "/blocks", "/charts", "/templates"].includes(pathname);
    if (overview) return [hit.link.label];
    if (pathname.startsWith("/components/")) return ["Components", hit.section.title, hit.link.label];
    if (pathname.startsWith("/blocks/")) return ["Blocks", hit.link.label];
    if (pathname.startsWith("/charts/")) return ["Charts", hit.link.label];
    return [hit.section.title, hit.link.label];
  }
  const [, kind, slug] = pathname.split("/");
  const list = kind === "components" ? components : kind === "blocks" ? blocks : kind === "charts" ? charts : [];
  const entry = list.find((e) => e.slug === slug);
  return entry ? [kind![0]!.toUpperCase() + kind!.slice(1), entry.name] : [];
}

/** Sticky content header: breadcrumb on the left, search + actions on the right, sidebar drawer on mobile. */
export function DocsTopbar() {
  const pathname = usePathname();
  const crumbs = useCrumbs(pathname);
  const { open } = useDocsSearch();
  const [drawer, setDrawer] = useState(false);
  useEffect(() => setDrawer(false), [pathname]);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 bg-surface/85 px-4 backdrop-blur-md sm:px-10 lg:px-14">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setDrawer(true)}
        className="inline-flex size-9 items-center justify-center rounded-[10px] text-fg-secondary shadow-button outline-none focus-visible:shadow-focus md:hidden"
      >
        <MenuIcon className="size-4" />
      </button>

      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm">
        <Link href="/" className="flex shrink-0 items-center gap-1.5 rounded-xs text-fg-secondary outline-none hover:text-fg focus-visible:shadow-focus">
          <VantuMark className="size-4" />
          <span className="hidden sm:inline">Vantu UI</span>
        </Link>
        {crumbs.map((c, i) => (
          <span key={c} className={i < crumbs.length - 1 ? "hidden min-w-0 items-center gap-2 sm:flex" : "flex min-w-0 items-center gap-2"}>
            <ChevronRight className="size-3.5 shrink-0 text-fg-disabled" aria-hidden />
            <span aria-current={i === crumbs.length - 1 ? "page" : undefined} className={i === crumbs.length - 1 ? "truncate font-medium text-fg" : "truncate text-fg-secondary"}>
              {c}
            </span>
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          aria-label="Search documentation"
          onClick={open}
          className="inline-flex size-9 items-center justify-center rounded-[10px] text-fg-secondary shadow-button outline-none hover:text-fg focus-visible:shadow-focus md:hidden"
        >
          <Search className="size-4" />
        </button>
        <GitHubStars size="sm" className="hidden sm:inline-flex" />
        <Link href="/templates" className="hidden h-9 items-center rounded-md bg-surface px-3 text-base font-medium text-fg shadow-button outline-none hover:bg-subtle focus-visible:shadow-focus sm:inline-flex">
          Templates
        </Link>
        <Link
          href="/docs/installation"
          className="inline-flex h-9 items-center whitespace-nowrap rounded-md bg-linear-to-b from-accent-light to-accent px-3.5 text-base font-medium text-white shadow-button-primary outline-none hover:to-accent-hover focus-visible:ring-3 focus-visible:ring-accent/25"
        >
          Get started
        </Link>
      </div>

      <ModalOverlay isOpen={drawer} onOpenChange={setDrawer} isDismissable className="fixed inset-0 z-50 bg-inverse/30 md:hidden">
        <Modal className="h-full w-[min(300px,86vw)] p-2 outline-none">
          <Dialog aria-label="Navigation" className="relative h-full outline-none">
            <DocsSidebar onNavigate={() => setDrawer(false)} />
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setDrawer(false)}
              className="absolute right-3 top-3.5 inline-flex size-8 items-center justify-center rounded-sm text-fg-muted outline-none hover:bg-muted hover:text-fg focus-visible:shadow-focus"
            >
              <X className="size-4" />
            </button>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </header>
  );
}
