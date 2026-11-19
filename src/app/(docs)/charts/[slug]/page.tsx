import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryDoc } from "@/components/docs/entry-doc";
import { charts } from "@/lib/registry";

export function generateStaticParams() {
  return charts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = charts.find((c) => c.slug === slug);
  return entry ? { title: entry.name, description: entry.description } : {};
}

export default async function ChartPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = charts.findIndex((c) => c.slug === slug);
  if (i < 0) notFound();
  return <EntryDoc entry={charts[i]!} prev={charts[i - 1]} next={charts[i + 1]} />;
}
