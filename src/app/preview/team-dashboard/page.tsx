import type { Metadata } from "next";
import { TeamDashboard } from "@/components/templates/team-dashboard";

export const metadata: Metadata = { title: "Team Dashboard" };

export default function Preview() {
  return <TeamDashboard />;
}
