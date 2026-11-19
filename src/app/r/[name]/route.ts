import { baseItem, catalog, findItem, registryIndex, registryItem, skillItem } from "@/lib/ai";

/** shadcn registry: /r/registry.json, /r/vantu-base.json, /r/vantu-skill.json and /r/<slug>.json. */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ["registry", "vantu-base", "vantu-skill", ...catalog().map((i) => i.slug)].map((n) => ({ name: `${n}.json` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const slug = name.replace(/\.json$/, "");
  const body =
    slug === "registry"
      ? registryIndex()
      : slug === "vantu-base"
        ? await baseItem()
        : slug === "vantu-skill"
          ? skillItem()
          : findItem(slug)
            ? await registryItem(findItem(slug)!)
            : null;
  if (!body) return new Response("Not found", { status: 404 });
  return Response.json(body, { headers: { "Access-Control-Allow-Origin": "*" } });
}
