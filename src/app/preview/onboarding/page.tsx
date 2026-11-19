import type { Metadata } from "next";
import { Onboarding } from "@/components/templates/onboarding";

export const metadata: Metadata = { title: "Onboarding" };

export default function Preview() {
  return <Onboarding />;
}
