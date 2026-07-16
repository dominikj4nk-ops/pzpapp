import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = path.join(root, "dist");
const serverDir = path.join(root, ".ssr-dist");
const template = await readFile(path.join(distDir, "index.html"), "utf8");
const serverEntry = pathToFileURL(path.join(serverDir, "entry-server.js")).href;
const { render, prerenderPaths } = await import(serverEntry);

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

function seoHead(seo, jsonLd) {
  const canonical = new URL(seo.canonicalPath, "https://prachyzaregistraci.cz").toString();
  const image = seo.image ?? "https://prachyzaregistraci.cz/assets/hero-trust-v3.png";
  const robots = seo.index ? "index, follow, max-image-preview:large" : "noindex, nofollow";
  return `<!--seo-head-->
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${seo.type ?? "website"}" />
    <meta property="og:site_name" content="prachyzaregistraci.cz" />
    <meta property="og:locale" content="cs_CZ" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${image}" />
    <script id="route-jsonld" type="application/ld+json">${JSON.stringify(jsonLd).replaceAll("<", "\\u003c")}</script>
    <!--/seo-head-->`;
}

async function writeRoute(route, filePath) {
  const { html, seo, jsonLd } = render(route);
  const output = template
    .replace(/<!--seo-head-->[\s\S]*?<!--\/seo-head-->/, seoHead(seo, jsonLd))
    .replace("<!--app-html-->", html);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, output, "utf8");
}

for (const route of prerenderPaths) {
  const target = route === "/" ? path.join(distDir, "index.html") : path.join(distDir, route.slice(1), "index.html");
  await writeRoute(route, target);
}

await writeRoute("/404", path.join(distDir, "404.html"));
await rm(serverDir, { recursive: true, force: true });
