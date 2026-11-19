"use client";

import {
  BarChart3,
  Building2,
  ChevronsUpDown,
  Home,
  Inbox,
  List,
  ListChecks,
  PanelLeftClose,
  PanelLeftOpen,
  Plug,
  Search,
  Send,
  Settings,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import { useId, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Kbd } from "@/components/ui/kbd";
import { NavCollapsedContext, NavItem, SectionLabel } from "@/components/ui/nav-item";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cx } from "@/utils/cx";

export interface SidebarNavItem {
  label: string;
  icon: React.ReactNode;
  count?: number | string;
  badge?: number;
}

export interface SidebarSection {
  /** Uppercase section label. Omit for the first, unlabeled group. */
  label?: string;
  items: SidebarNavItem[];
}

export interface SidebarProps {
  /** Label of the active nav item. */
  active?: string;
  workspace?: string;
  user?: { name: string; email: string };
  /** Custom navigation. Defaults to the Vantu prospecting nav. */
  sections?: SidebarSection[];
  /** Content pinned above the profile. Defaults to invite + credit usage; `null` hides it. NavItems here collapse too. */
  footer?: React.ReactNode;
  /** Controlled collapsed (icon-only) state. */
  collapsed?: boolean;
  /** Initial state when uncontrolled. */
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
}

const iconButton =
  "flex size-9 shrink-0 items-center justify-center rounded-[10px] text-fg-secondary outline-none transition-colors hover:bg-active hover:text-fg focus-visible:shadow-focus [&_svg]:size-4";

/**
 * Workspace selector, quick actions (⌘K), grouped navigation, then invite,
 * credit usage and profile pinned to the bottom. The panel button collapses it
 * to a 72px icon rail (labels become tooltips and accessible names).
 */
export function Sidebar({
  active = "Home",
  workspace = "Vantu",
  user = { name: "Edi Sunardi", email: "edi@vantu.dev" },
  sections,
  footer,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  className,
}: SidebarProps) {
  const [inner, setInner] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? inner;
  const navId = useId();
  const toggle = () => {
    setInner(!collapsed);
    onCollapsedChange?.(!collapsed);
  };

  const item = (label: string, icon: React.ReactNode, extra?: { count?: number | string; badge?: number }) => (
    <NavItem key={label} label={label} icon={icon} active={active === label} {...extra} />
  );

  return (
    <NavCollapsedContext.Provider value={collapsed}>
      <aside
        data-collapsed={collapsed || undefined}
        className={cx(
          "flex h-full shrink-0 flex-col overflow-hidden border-r border-line bg-app transition-[width] duration-200 ease-out motion-reduce:transition-none",
          collapsed ? "w-[72px]" : "w-sidebar",
          className,
        )}
      >
        {/* Workspace + collapse toggle */}
        <div className={cx("flex h-topbar shrink-0 items-center border-b border-line", collapsed ? "justify-center px-2" : "justify-between px-4")}>
          {!collapsed && (
            <button className="flex min-w-0 items-center gap-2 rounded-sm p-1 text-base font-medium outline-none hover:bg-active focus-visible:shadow-focus">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-[7px] bg-linear-to-b from-accent-light to-accent text-xs font-semibold text-white shadow-button-primary">
                {workspace[0]}
              </span>
              <span className="truncate">{workspace}</span>
              <ChevronsUpDown className="size-3.5 shrink-0 text-fg-muted" />
            </button>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            aria-controls={navId}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={iconButton}
          >
            {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </button>
        </div>

        {/* Quick actions */}
        <div className={cx("shrink-0 border-b border-line", collapsed ? "flex justify-center p-3" : "p-4")}>
          {collapsed ? (
            <button type="button" aria-label="Quick actions (⌘K)" title="Quick actions ⌘K" className={cx(iconButton, "size-10 border border-line bg-surface")}>
              <Search />
            </button>
          ) : (
            <div className="flex h-10 items-center gap-3 rounded-md border border-line bg-surface px-3 text-base text-fg-muted">
              <Search className="size-4" />
              <span className="flex-1">Quick actions</span>
              <Kbd>⌘K</Kbd>
            </div>
          )}
        </div>

        <nav id={navId} aria-label="Main" className={cx("flex-1 overflow-y-auto overflow-x-hidden py-3", collapsed ? "px-3" : "px-4")}>
          {sections ? (
            sections.map((sec, i) => (
              <div key={sec.label ?? i}>
                {sec.label && <SectionLabel className="mt-1">{sec.label}</SectionLabel>}
                <div className="flex flex-col gap-0.5">{sec.items.map((it) => item(it.label, it.icon, { count: it.count, badge: it.badge }))}</div>
              </div>
            ))
          ) : (
            <>
              <div className="flex flex-col gap-0.5">
                {item("Home", <Home />)}
                {item("AI Prospecting", <Sparkles />)}
                {item("Prospects", <Users />, { count: 12486 })}
                {item("Companies", <Building2 />, { count: 2318 })}
                {item("Lists", <List />, { count: 18 })}
              </div>
              <SectionLabel className="mt-1">Outreach</SectionLabel>
              <div className="flex flex-col gap-0.5">
                {item("Sequences", <Send />, { count: 9 })}
                {item("Inbox", <Inbox />, { badge: 12 })}
                {item("Tasks", <ListChecks />, { count: 8 })}
              </div>
              <SectionLabel className="mt-1">Insights</SectionLabel>
              {item("Analytics", <BarChart3 />)}
              <SectionLabel className="mt-1">Workspace</SectionLabel>
              <div className="flex flex-col gap-0.5">
                {item("Integrations", <Plug />)}
                {item("Settings", <Settings />)}
              </div>
            </>
          )}
        </nav>

        {footer === undefined ? (
          <div className={cx("flex shrink-0 flex-col gap-2 pb-4", collapsed ? "px-3" : "px-4")}>
            <NavItem label="Invite teammates" icon={<UserPlus />} />
            {!collapsed && (
              <div className="rounded-md border border-line bg-surface p-4">
                <ProgressBar label="AI credits" value={6240} max={10000} showValue caption="Resets Oct 1 · Growth plan" />
              </div>
            )}
          </div>
        ) : (
          footer && <div className={cx("flex shrink-0 flex-col gap-2 pb-4", collapsed ? "px-3" : "px-4")}>{footer}</div>
        )}

        {/* Profile */}
        <div className={cx("flex shrink-0 items-center gap-3 border-t border-line py-4", collapsed ? "justify-center px-2" : "px-4")} title={collapsed ? `${user.name} · ${user.email}` : undefined}>
          <Avatar name={user.name} size="md" />
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <div className="truncate text-base font-medium text-fg">{user.name}</div>
                <div className="truncate text-sm text-fg-muted">{user.email}</div>
              </div>
              <ChevronsUpDown className="size-4 text-fg-muted" />
            </>
          )}
        </div>
      </aside>
    </NavCollapsedContext.Provider>
  );
}
