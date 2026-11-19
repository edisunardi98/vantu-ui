import type { Metadata } from "next";
import { SettingsPage } from "@/components/templates/settings-page";

export const metadata: Metadata = { title: "Settings" };

export default function Preview() {
  return <SettingsPage />;
}
