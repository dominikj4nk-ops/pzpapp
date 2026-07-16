import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../analytics/events";
import { DEFAULT_SOCIAL_IMAGE, getJsonLdForPath, getSeoForPath, SITE_URL } from "../seo/seo";

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function RouteSeo() {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(location.pathname);
    const canonical = new URL(seo.canonicalPath, SITE_URL).toString();
    document.title = seo.title;
    setMeta('meta[name="description"]', "name", "description", seo.description);
    setMeta('meta[name="robots"]', "name", "robots", seo.index ? "index, follow, max-image-preview:large" : "noindex, nofollow");
    setMeta('meta[property="og:title"]', "property", "og:title", seo.title);
    setMeta('meta[property="og:description"]', "property", "og:description", seo.description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:image"]', "property", "og:image", seo.image ?? DEFAULT_SOCIAL_IMAGE);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", seo.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", seo.image ?? DEFAULT_SOCIAL_IMAGE);

    let canonicalElement = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.rel = "canonical";
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.href = canonical;

    let jsonLd = document.head.querySelector<HTMLScriptElement>("#route-jsonld");
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.id = "route-jsonld";
      jsonLd.type = "application/ld+json";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(getJsonLdForPath(location.pathname));
    trackEvent("page_view", { path: location.pathname });
  }, [location.pathname]);

  return null;
}
