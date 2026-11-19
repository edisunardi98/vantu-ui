import type { Metadata } from "next";
import { HomeDashboard } from "@/components/blocks/home-dashboard";

export const metadata: Metadata = { title: "Home Dashboard" };

export default function HomeDashboardPreview() {
  return <HomeDashboard />;
}
