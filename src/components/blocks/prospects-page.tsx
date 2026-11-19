"use client";

import { Plus, Upload, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prospectRecords } from "@/lib/demo-data";
import { ProspectsDataTable } from "./prospects-data-table";
import { PageHeader } from "./page-header";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

/** All Prospects template: app shell + page header + data table. */
export function ProspectsPage() {
  return (
    <div className="flex h-dvh bg-app">
      <Sidebar active="Prospects" className="hidden lg:flex" />
      <div className="flex min-w-0 flex-1 flex-col bg-surface">
        <Topbar crumbs={["Prospects"]} icon={<Users />} />
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="flex min-w-0 flex-col gap-6 px-4 py-6 sm:px-8">
            <PageHeader
              title="Prospects"
              description="Discover, qualify, and manage your highest-value prospects."
              actions={
                <>
                  <Button leadingIcon={<Upload />}>Import</Button>
                  <Button variant="primary" leadingIcon={<Plus />}>
                    Add prospect
                  </Button>
                </>
              }
            />
            <ProspectsDataTable rows={prospectRecords} />
          </div>
        </main>
      </div>
    </div>
  );
}
