import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryDoc } from "@/components/docs/entry-doc";
import { componentGroups, components } from "@/lib/registry";

// Order follows the sidebar: by group, then registry order.
const ordered = componentGroups.flatMap((g) => components.filter((c) => c.group === g));

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = components.find((c) => c.slug === slug);
  return entry ? { title: entry.name, description: entry.description } : {};
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = ordered.findIndex((c) => c.slug === slug);
  if (i < 0) notFound();
  return <EntryDoc entry={ordered[i]!} prev={ordered[i - 1]} next={ordered[i + 1]} />;
}
