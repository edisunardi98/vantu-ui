import type { Metadata } from "next";
import { AuthSplit } from "@/components/templates/auth-split";

export const metadata: Metadata = { title: "Sign In" };

export default function Preview() {
  return <AuthSplit />;
}
