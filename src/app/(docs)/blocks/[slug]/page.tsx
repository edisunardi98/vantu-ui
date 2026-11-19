import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryDoc } from "@/components/docs/entry-doc";
import { blocks } from "@/lib/registry";

export function generateStaticParams() {
  return blocks.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = blocks.find((b) => b.slug === slug);
  return entry ? { title: entry.name, description: entry.description } : {};
}

export default async function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = blocks.findIndex((b) => b.slug === slug);
  if (i < 0) notFound();
  return <EntryDoc entry={blocks[i]!} prev={blocks[i - 1]} next={blocks[i + 1]} />;
}
