import { llmsTxt } from "@/lib/ai";

/** https://llmstxt.org — the index a coding assistant reads first. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
}
