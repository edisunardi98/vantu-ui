"use client";

import { useEffect, useState } from "react";
import { EVENTS, track } from "@/lib/analytics";
import { githubRepoUrl } from "@/lib/github";
import { cx } from "@/utils/cx";

/** GitHub mark (Simple Icons, CC0). */
function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/** 1225 → "1,225"; 12_400 → "12.4k". */
const formatStars = (n: number) => (n >= 10_000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : n.toLocaleString("en-US"));

/**
 * GitHub button with the live star count (from /api/github-stars, cached for an
 * hour). Shows a placeholder while loading and just the mark if the count is
 * unavailable. Opens the repository in a new tab.
 */
export function GitHubStars({ size = "md", className }: { size?: "sm" | "md"; className?: string }) {
  const [stars, setStars] = useState<number | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    let alive = true;
    fetch("/api/github-stars")
      .then((r) => r.json() as Promise<{ stars: number | null }>)
      .then((d) => alive && setStars(d.stars))
      .catch(() => alive && setStars(null));
    return () => {
      alive = false;
    };
  }, []);

  const label = typeof stars === "number" ? `Star Vantu UI on GitHub — ${stars.toLocaleString("en-US")} stars` : "Vantu UI on GitHub";

  return (
    <a
      href={githubRepoUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(EVENTS.githubClick, { stars: typeof stars === "number" ? stars : undefined, location: size === "sm" ? "docs_topbar" : "navbar" })}
      aria-label={label}
      title={label}
      className={cx(
        "inline-flex shrink-0 items-center gap-2 bg-surface font-medium text-fg shadow-button outline-none transition-colors hover:bg-subtle focus-visible:shadow-focus",
        size === "sm" ? "h-9 rounded-md px-3 text-base" : "h-10 rounded-[12px] px-3.5 text-base",
        className,
      )}
    >
      <GitHubMark className="size-[18px]" />
      {stars === undefined ? (
        <span aria-hidden className="h-3.5 w-8 animate-pulse rounded-xs bg-muted" />
      ) : (
        stars !== null && <span className="tabular-nums">{formatStars(stars)}</span>
      )}
    </a>
  );
}
