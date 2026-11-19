import { GITHUB_REPO } from "@/lib/github";

/**
 * Live GitHub star count for the navbar/docs button. Fetched on the server and
 * cached for an hour, so visitors never hit GitHub's unauthenticated rate limit
 * (60 requests/hour per IP) themselves.
 */
export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "vantu-ui-docs" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return Response.json({ stars: null }, { status: 200 });
    const data = (await res.json()) as { stargazers_count?: number };
    return Response.json({ stars: typeof data.stargazers_count === "number" ? data.stargazers_count : null });
  } catch {
    return Response.json({ stars: null });
  }
}
