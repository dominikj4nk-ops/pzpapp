import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = path.join(root, "dist");
const serverDir = path.join(root, ".ssr-dist");
const template = await readFile(path.join(distDir, "index.html"), "utf8");
const serverEntry = pathToFileURL(path.join(serverDir, "entry-server.js")).href;
const { render, prerenderPaths } = await import(serverEntry);
const baseArgumentIndex = process.argv.indexOf("--base");
const deploymentBase = baseArgumentIndex === -1 ? "/" : process.argv[baseArgumentIndex + 1];

if (!deploymentBase?.startsWith("/") || !deploymentBase.endsWith("/")) {
  throw new Error("Hodnota --base musí začínat i končit lomítkem, například /pzpapp/.");
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

function seoHead(seo, jsonLd) {
  const canonical = new URL(seo.canonicalPath, "https://prachyzaregistraci.cz").toString();
  const image = seo.image ?? "https://prachyzaregistraci.cz/assets/hero-trust-v3.png";
  const imageAlt = "Prachy za registraci - přehled ověřených bonusů";
  const robots = seo.index ? "index, follow, max-image-preview:large" : "noindex, nofollow";
  return `<!--seo-head-->
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="cs-CZ" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${canonical}" />
    <meta property="og:type" content="${seo.type ?? "website"}" />
    <meta property="og:site_name" content="prachyzaregistraci.cz" />
    <meta property="og:locale" content="cs_CZ" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="${imageAlt}" />
    ${seo.type === "article" && seo.lastModified ? `<meta property="article:modified_time" content="${seo.lastModified}" />` : ""}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${imageAlt}" />
    <script id="route-jsonld" type="application/ld+json">${JSON.stringify(jsonLd).replaceAll("<", "\\u003c")}</script>
    <!--/seo-head-->`;
}

async function writeRoute(route, filePath) {
  const { html, seo, jsonLd } = render(route);
  const routedHtml = deploymentBase === "/"
    ? html
    : html.replaceAll('href="/', `href="${deploymentBase}`);
  const output = template
    .replace(/<!--seo-head-->[\s\S]*?<!--\/seo-head-->/, seoHead(seo, jsonLd))
    .replace("<!--app-html-->", routedHtml);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, output, "utf8");
  return seo;
}

const sitemapEntries = [];
for (const route of prerenderPaths) {
  const target = route === "/" ? path.join(distDir, "index.html") : path.join(distDir, route.slice(1), "index.html");
  const seo = await writeRoute(route, target);
  if (seo.index) sitemapEntries.push(seo);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map((seo) => {
    const location = new URL(seo.canonicalPath, "https://prachyzaregistraci.cz").toString();
    const lastModified = seo.lastModified ? `<lastmod>${escapeXml(seo.lastModified)}</lastmod>` : "";
    return `  <url><loc>${escapeXml(location)}</loc>${lastModified}</url>`;
  })
  .join("\n")}
</urlset>
`;
await writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");

await writeRoute("/404", path.join(distDir, "404.html"));
await rm(serverDir, { recursive: true, force: true });
