"use client";

import { Bell, ChevronRight, Globe2, Mail, Palette, Settings, ShieldCheck, SlidersHorizontal, Smartphone, User } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChoiceCard, ChoiceCardGroup } from "@/components/ui/choice-card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { SettingRow, SettingSection } from "@/components/ui/setting-row";
import { Switch } from "@/components/ui/switch";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cx } from "@/utils/cx";
import { AppShell } from "./app-shell";

function SubMenu({ items, value, onChange }: { items: { id: string; label: string; icon: ReactNode }[]; value: string; onChange: (id: string) => void }) {
  return (
    <nav aria-label="Section" className="h-fit rounded-lg border border-line bg-subtle p-1 shadow-card lg:w-64">
      <div className="px-3 pb-2 pt-2.5 text-label text-[11px] text-fg-muted">Select menu</div>
      <ul className="flex flex-col gap-0.5 rounded-[12px] border border-line bg-surface p-1.5">
        {items.map((it) => (
          <li key={it.id}>
            <button
              type="button"
              aria-current={value === it.id ? "true" : undefined}
              onClick={() => onChange(it.id)}
              className={cx(
                "flex h-9 w-full items-center gap-2.5 rounded-sm px-2.5 text-left text-base outline-none transition-colors focus-visible:shadow-focus [&_svg]:size-4",
                value === it.id ? "bg-muted font-medium text-fg [&_svg]:text-accent" : "text-fg-secondary hover:bg-subtle hover:text-fg",
              )}
            >
              {it.icon}
              <span className="flex-1">{it.label}</span>
              {value === it.id && <ChevronRight className="!size-3.5 !text-fg-muted" />}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FormActions() {
  return (
    <div className="grid grid-cols-2 gap-3 pt-2">
      <Button>Discard</Button>
      <Button variant="primary">Apply changes</Button>
    </div>
  );
}

function GeneralTab() {
  const [section, setSection] = useState("regional");
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
      <SubMenu
        value={section}
        onChange={setSection}
        items={[
          { id: "regional", label: "Regional preferences", icon: <Globe2 /> },
          { id: "theme", label: "Appearance", icon: <Palette /> },
        ]}
      />
      <div className="w-full max-w-md">
        {section === "regional" ? (
          <SettingSection title="Regional preferences" description="Select your preferences for your region.">
            <Select label="Language" defaultSelectedKey="en-us">
              <SelectItem id="en-us">🇺🇸 English (US)</SelectItem>
              <SelectItem id="en-gb">🇬🇧 English (UK)</SelectItem>
              <SelectItem id="id">🇮🇩 Bahasa Indonesia</SelectItem>
            </Select>
            <Select label="Timezone" defaultSelectedKey="pst">
              <SelectItem id="pst">GMT-8:00 — Pacific Time (PT)</SelectItem>
              <SelectItem id="est">GMT-5:00 — Eastern Time (ET)</SelectItem>
              <SelectItem id="wib">GMT+7:00 — Western Indonesia (WIB)</SelectItem>
            </Select>
            <Select label="Time format" defaultSelectedKey="24">
              <SelectItem id="24">24 hours</SelectItem>
              <SelectItem id="12">12 hours</SelectItem>
            </Select>
            <Select label="Date format" defaultSelectedKey="dmy">
              <SelectItem id="dmy">DD/MM/YY</SelectItem>
              <SelectItem id="mdy">MM/DD/YY</SelectItem>
              <SelectItem id="iso">YYYY-MM-DD</SelectItem>
            </Select>
            <FormActions />
          </SettingSection>
        ) : (
          <SettingSection title="Appearance" description="Choose how Vantu looks for you.">
            <ChoiceCardGroup aria-label="Theme" defaultValue="light">
              <ChoiceCard value="light" title="Light" description="The default Vantu theme." />
              <ChoiceCard value="system" title="Match system" description="Follow your OS setting." />
              <ChoiceCard value="dark" title="Dark" description="Coming soon." isDisabled />
            </ChoiceCardGroup>
            <SettingRow title="Compact tables" description="Show more rows by reducing row height." control={<Switch aria-label="Compact tables" />} />
            <FormActions />
          </SettingSection>
        )}
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
      <SubMenu value="info" onChange={() => {}} items={[{ id: "info", label: "Personal information", icon: <User /> }]} />
      <div className="w-full max-w-md">
        <SettingSection title="Personal information" description="Update your photo and personal details.">
          <div className="flex items-center gap-4">
            <Avatar name="Edi Sunardi" size="2xl" />
            <div>
              <div className="text-base font-medium text-fg">Upload image</div>
              <div className="text-sm text-fg-muted">Min 400×400px, PNG or JPEG</div>
              <Button size="xs" className="mt-2">
                Upload
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="First name" defaultValue="Edi" />
            <Input label="Last name" defaultValue="Sunardi" />
          </div>
          <Input label="Email" type="email" defaultValue="edi@vantu.dev" icon={<Mail />} />
          <Input label="Phone" defaultValue="+1 (415) 555-0199" icon={<Smartphone />} />
          <Textarea label="Bio" defaultValue="AE covering Series B SaaS in North America." rows={3} />
          <FormActions />
        </SettingSection>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [section, setSection] = useState("preferences");
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
      <SubMenu
        value={section}
        onChange={setSection}
        items={[
          { id: "preferences", label: "Preferences", icon: <SlidersHorizontal /> },
          { id: "method", label: "Method", icon: <Bell /> },
        ]}
      />
      <div className="w-full max-w-md">
        {section === "preferences" ? (
          <SettingSection title="Notification preferences" description="Choose what notifications you want to receive.">
            <SettingRow layout="leading" title="Replies and meetings" description="When a prospect replies or books a meeting from a sequence." control={<Switch aria-label="Replies and meetings" defaultSelected />} />
            <SettingRow layout="leading" title="AI matches" description="When a saved search finds new prospects above your score threshold." control={<Switch aria-label="AI matches" defaultSelected />} />
            <SettingRow layout="leading" title="Product updates" description="New features, tips and occasional offers." control={<Switch aria-label="Product updates" />} />
            <Alert tone="info" size="sm" title="Keep replies on so you never miss a hot lead." />
            <FormActions />
          </SettingSection>
        ) : (
          <SettingSection title="Notification method" description="Where should we reach you?">
            <SettingRow title="Email" description="edi@vantu.dev" control={<Switch aria-label="Email" defaultSelected />} />
            <SettingRow title="Push" description="Desktop and mobile app." control={<Switch aria-label="Push" defaultSelected />} />
            <SettingRow title="Slack" description="#sales-alerts" control={<Switch aria-label="Slack" />} />
            <FormActions />
          </SettingSection>
        )}
      </div>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-line-strong px-6 py-16 text-center">
      <ShieldCheck className="size-5 text-fg-muted" />
      <div className="text-base font-medium text-fg">{title}</div>
      <p className="max-w-sm text-sm text-fg-muted">Uses the same sub-menu + setting section pattern as the other tabs.</p>
    </div>
  );
}

/** Settings: top tabs, a left sub-menu card and a constrained form column. */
export function SettingsPage() {
  return (
    <AppShell active="Settings" crumbs={["Settings"]} icon={<Settings />} title="Settings" description="Manage your preferences and configure workspace options.">
      <Tabs className="mt-4 px-4 sm:px-8">
        <TabList aria-label="Settings sections" className="overflow-x-auto pt-2">
          <Tab id="general">General</Tab>
          <Tab id="profile">Profile</Tab>
          <Tab id="workspace">Workspace</Tab>
          <Tab id="notifications">Notifications</Tab>
          <Tab id="privacy">Privacy &amp; security</Tab>
          <Tab id="integrations">Integrations</Tab>
        </TabList>
        <TabPanel id="general" className="py-8">
          <GeneralTab />
        </TabPanel>
        <TabPanel id="profile" className="py-8">
          <ProfileTab />
        </TabPanel>
        <TabPanel id="workspace" className="py-8">
          <Placeholder title="Workspace settings" />
        </TabPanel>
        <TabPanel id="notifications" className="py-8">
          <NotificationsTab />
        </TabPanel>
        <TabPanel id="privacy" className="py-8">
          <Placeholder title="Privacy & security" />
        </TabPanel>
        <TabPanel id="integrations" className="py-8">
          <Placeholder title="Integrations" />
        </TabPanel>
      </Tabs>
    </AppShell>
  );
}
