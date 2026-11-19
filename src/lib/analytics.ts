/**
 * Google Tag Manager + custom events.
 *
 * Every event is pushed to `window.dataLayer` as `{ event: "<name>", ...params }`.
 * In GTM, create a "Custom Event" trigger with the event name and forward it to
 * GA4 (or any tag). Events are pushed even when GTM isn't loaded (e.g. in dev),
 * which is harmless — nothing reads them.
 */

/** GTM container ID. Override with NEXT_PUBLIC_GTM_ID. */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NHD4VN67";

export type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Push a custom event to the GTM dataLayer. Safe to call anywhere on the client. */
export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_path: window.location.pathname, ...params });
}

/**
 * Event names used across the site — the list to set up as triggers in GTM.
 * Declarative clicks use `data-track="<event>"` plus `data-track-*` params on the element.
 */
export const EVENTS = {
  /** In-app navigation (Next.js client routing). Params: page_path, page_title. */
  pageView: "virtual_page_view",
  /** Any marked CTA (`data-track="cta_click"`). Params: cta, location. */
  ctaClick: "cta_click",
  /** Link to another site. Params: link_url, link_domain, link_text. */
  outboundClick: "outbound_click",
  /** Copy button on a code block or command. Params: copy_kind, snippet. */
  copyCode: "copy_code",
  /** Preview ⇄ Code switch on a docs example. Params: tab. */
  previewTab: "preview_tab_change",
  /** npm / pnpm / yarn tab in Installation steps. Params: manager. */
  packageManager: "package_manager_select",
  /** ⌘K search opened. Params: method (shortcut | click). */
  searchOpen: "search_open",
  /** Result picked in ⌘K search. Params: destination. */
  searchSelect: "search_select",
  /** GitHub stars button. Params: stars. */
  githubClick: "github_click",
} as const;

// Keep analytics out of library items (components/ui, blocks, charts, templates):
// they are distributed through the registry, and importing this file would ship
// the GTM ID to everyone who installs them. Track docs-site UI only.
