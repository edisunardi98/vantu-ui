import { DocsSearchProvider } from "@/components/docs/docs-search";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsTopbar } from "@/components/docs/docs-topbar";

/** Docs shell: a floating sidebar panel on the left, sticky breadcrumb header over the content. */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsSearchProvider>
      <div className="min-h-dvh bg-surface">
        <aside className="fixed inset-y-3 left-3 z-30 hidden w-[272px] md:flex">
          <DocsSidebar />
        </aside>
        <div className="md:pl-[296px]">
          <DocsTopbar />
          <main className="px-4 pb-16 pt-4 sm:px-10 lg:px-14">
            <div className="mx-auto max-w-5xl">{children}</div>
          </main>
        </div>
      </div>
    </DocsSearchProvider>
  );
}
