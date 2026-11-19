import type { Metadata } from "next";
import { TeamMembers } from "@/components/templates/team-members";

export const metadata: Metadata = { title: "Team Members" };

export default function Preview() {
  return <TeamMembers />;
}
