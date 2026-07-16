import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { getJsonLdForPath, getSeoForPath, prerenderPaths } from "./seo/seo";

export { prerenderPaths };

export function render(pathname: string) {
  const html = renderToString(
    <StaticRouter location={pathname}>
      <App />
    </StaticRouter>
  );
  return { html, seo: getSeoForPath(pathname), jsonLd: getJsonLdForPath(pathname) };
}
