import { BarChart3, Building2, CalendarDays, Circle, FileText, Home, LifeBuoy, Plug, Settings, Users } from "lucide-react";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/blocks/page-header";
import { Sidebar, type SidebarSection } from "@/components/blocks/sidebar";
import { Topbar } from "@/components/blocks/topbar";
import { NavItem } from "@/components/ui/nav-item";

const dot = (color: string) => <Circle className="!size-2" fill={color} stroke="none" />;

/** Team-workspace navigation used by the workspace templates. */
export const workspaceNav: SidebarSection[] = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", icon: <Home /> },
      { label: "Calendar", icon: <CalendarDays /> },
      { label: "Team", icon: <Users />, count: 24 },
      { label: "Accounts", icon: <Building2 />, count: 318 },
      { label: "Reports", icon: <BarChart3 /> },
      { label: "Integrations", icon: <Plug /> },
      { label: "Documents", icon: <FileText /> },
    ],
  },
  {
    label: "Favorites",
    items: [
      { label: "Q4 Enterprise push", icon: dot("var(--color-accent)"), count: "⌘1" },
      { label: "EMEA expansion", icon: dot("var(--color-error)"), count: "⌘2" },
      { label: "Partner launch", icon: dot("var(--color-success)"), count: "⌘3" },
    ],
  },
];

export interface AppShellProps {
  /** Active sidebar item. */
  active: string;
  /** Breadcrumb trail for the topbar; the last crumb is the current page. */
  crumbs: string[];
  /** Icon before the first crumb. */
  icon?: ReactNode;
  /** Page header, same as Home Dashboard and All Prospects. */
  title: string;
  description?: string;
  badge?: ReactNode;
  /** Header actions — secondary before primary. Pass `null` for none. */
  actions?: ReactNode;
  children: ReactNode;
}

/** Workspace layout: sidebar · topbar (breadcrumb, help, notifications) · page header · content. */
export function AppShell({ active, crumbs, icon, title, description, badge, actions = null, children }: AppShellProps) {
  return (
    <div className="flex h-dvh bg-app">
      <Sidebar
        active={active}
        sections={workspaceNav}
        footer={
          <>
            <NavItem label="Settings" icon={<Settings />} active={active === "Settings"} />
            <NavItem label="Support" icon={<LifeBuoy />} />
          </>
        }
        className="hidden lg:flex"
      />
      <div className="flex min-w-0 flex-1 flex-col bg-surface">
        <Topbar crumbs={crumbs} icon={icon} />
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="px-4 pt-6 sm:px-8">
            <PageHeader title={title} description={description} badge={badge} actions={actions} />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
