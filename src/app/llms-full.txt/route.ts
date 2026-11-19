import { llmsFullTxt } from "@/lib/ai";

/** Docs, props and full source of every item in one file. */
export const dynamic = "force-static";

export async function GET() {
  return new Response(await llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
}
