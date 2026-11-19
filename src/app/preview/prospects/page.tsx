import type { Metadata } from "next";
import { ProspectsPage } from "@/components/blocks/prospects-page";

export const metadata: Metadata = { title: "All Prospects" };

export default function ProspectsPreview() {
  return <ProspectsPage />;
}
