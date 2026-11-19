"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { EVENTS, GTM_ID, track } from "@/lib/analytics";

/**
 * Loads the Google Tag Manager container and wires the automatic events:
 * - virtual_page_view on client-side navigations (the first load is GTM's own page view)
 * - cta_click / any `data-track="<event>"` element, with its `data-track-*` params
 * - outbound_click for links to other sites
 */
export function GoogleTagManager() {
  const pathname = usePathname();
  const first = useRef(true);

  // Page views for Next.js client navigations.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    track(EVENTS.pageView, { page_path: pathname, page_title: document.title });
  }, [pathname]);

  // One delegated listener for declarative and outbound clicks.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      const marked = target.closest<HTMLElement>("[data-track]");
      if (marked) {
        const params: Record<string, string> = {};
        for (const [key, value] of Object.entries(marked.dataset)) {
          // data-track-cta="hero_get_started" → dataset.trackCta → cta
          if (key.startsWith("track") && key !== "track") params[key.slice(5).replace(/^./, (c) => c.toLowerCase())] = value ?? "";
        }
        track(marked.dataset.track!, params);
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (link) {
        try {
          const url = new URL(link.href, window.location.href);
          if (url.origin !== window.location.origin && /^https?:$/.test(url.protocol)) {
            track(EVENTS.outboundClick, { link_url: url.href, link_domain: url.hostname, link_text: (link.textContent ?? "").trim().slice(0, 80) });
          }
        } catch {
          /* not a URL */
        }
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <Script id="gtm" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** GTM's <noscript> fallback — place first inside <body>. */
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
    </noscript>
  );
}
