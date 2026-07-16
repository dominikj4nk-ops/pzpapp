export type AnalyticsEventName =
  | "page_view"
  | "offer_view"
  | "affiliate_click"
  | "partner_click"
  | "offer_guide_open"
  | "offer_filter"
  | "internal_search";

export type AnalyticsPayload = Record<string, string | number | boolean | null>;

/**
 * Privacy-conscious integration point. Events stay in the browser until a
 * consent-aware analytics adapter explicitly listens for this custom event.
 */
export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("pzp:analytics", { detail: { name, payload } }));
}
