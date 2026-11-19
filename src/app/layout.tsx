import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import "./docs.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: { default: "Vantu UI — React design system for AI SaaS dashboards", template: "%s · Vantu UI" },
  description: "Accessible React + Tailwind components, blocks, charts and templates for AI-powered SaaS dashboards, designed in Figma by Vantu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Browser extensions (e.g. ColorZilla's `cz-shortcut-listen`, `data-extension-*`) inject
    // attributes into <html>/<body> before React hydrates. suppressHydrationWarning ignores
    // attribute mismatches on these two elements only — children are still checked.
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
