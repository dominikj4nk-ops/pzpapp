import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const routes = [
  ["/", "dist/index.html"],
  ["/nabidky", "dist/nabidky/index.html"],
  ["/nabidky/mbank-ucet", "dist/nabidky/mbank-ucet/index.html"],
  ["/nabidky/airbank-ucet", "dist/nabidky/airbank-ucet/index.html"],
  ["/nabidky/tipli-cashback", "dist/nabidky/tipli-cashback/index.html"],
  ["/nabidky/patrongo", "dist/nabidky/patrongo/index.html"],
  ["/nabidky/robinhood-trading", "dist/nabidky/robinhood-trading/index.html"],
  ["/nabidky/raiffeisenbank-ucet", "dist/nabidky/raiffeisenbank-ucet/index.html"],
  ["/jak-overujeme", "dist/jak-overujeme/index.html"],
  ["/podpora", "dist/podpora/index.html"],
  ["/podminky", "dist/podminky/index.html"]
];

const titles = new Set();
const canonicals = new Set();
const forbiddenSchemaTypes = new Set(["Review", "AggregateRating"]);

for (const [route, relativeFile] of routes) {
  const html = await readFile(path.join(root, relativeFile), "utf8");
  assert.ok(html.includes('<div id="root">') && !html.includes('<div id="root"><!--app-html--></div>'), `${route}: missing prerendered app HTML`);
  assert.ok(!html.includes("G-XXXXXXXXXX"), `${route}: placeholder analytics ID leaked into build`);

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]+)"/i)?.[1];
  assert.ok(title && title.length >= 20 && title.length <= 75, `${route}: invalid title`);
  assert.ok(description && description.length >= 70 && description.length <= 180, `${route}: invalid description`);
  assert.ok(canonical?.startsWith("https://prachyzaregistraci.cz/"), `${route}: invalid canonical`);
  assert.ok(robots?.startsWith("index,") && !robots.includes("noindex"), `${route}: missing index robots directive`);
  assert.ok(html.includes(`hreflang="cs-CZ" href="${canonical}"`), `${route}: missing cs-CZ alternate`);
  assert.ok(html.includes(`hreflang="x-default" href="${canonical}"`), `${route}: missing x-default alternate`);
  assert.ok(html.includes('property="og:image:alt"'), `${route}: missing social image alt`);
  assert.ok(!titles.has(title), `${route}: duplicate title`);
  assert.ok(!canonicals.has(canonical), `${route}: duplicate canonical`);
  titles.add(title);
  canonicals.add(canonical);

  const jsonText = html.match(/<script id="route-jsonld" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(jsonText, `${route}: missing JSON-LD`);
  const jsonLd = JSON.parse(jsonText);
  assert.equal(jsonLd["@context"], "https://schema.org", `${route}: invalid JSON-LD context`);
  const graph = jsonLd["@graph"] ?? [];
  const schemaTypes = new Set(graph.map((item) => item["@type"]));
  assert.ok(schemaTypes.has("Organization"), `${route}: missing Organization schema`);
  assert.ok(schemaTypes.has("WebSite"), `${route}: missing WebSite schema`);
  assert.ok(schemaTypes.has(route === "/nabidky" ? "CollectionPage" : "WebPage"), `${route}: missing page schema`);
  if (route === "/nabidky") assert.ok(schemaTypes.has("ItemList"), `${route}: missing ItemList schema`);
  if (route.startsWith("/nabidky/")) assert.ok(schemaTypes.has("BreadcrumbList"), `${route}: missing BreadcrumbList schema`);
  for (const item of graph) {
    assert.ok(!forbiddenSchemaTypes.has(item["@type"]), `${route}: forbidden schema type ${item["@type"]}`);
  }
}

const notFound = await readFile(path.join(root, "dist/404.html"), "utf8");
assert.match(notFound, /noindex, nofollow/);
assert.ok(notFound.includes("Tahle stránka neexistuje"));

const cashback = await readFile(path.join(root, "dist/cashback/index.html"), "utf8");
assert.match(cashback, /<meta name="robots" content="noindex, nofollow"/);

const sitemap = await readFile(path.join(root, "dist/sitemap.xml"), "utf8");
for (const [route] of routes) {
  const sitemapUrl = new URL(route, "https://prachyzaregistraci.cz").toString();
  assert.ok(sitemap.includes(`<loc>${sitemapUrl}</loc>`), `sitemap missing ${route}`);
}
assert.ok(!sitemap.includes("/hledat"));
assert.ok(!sitemap.includes("/recenze"));
assert.ok(!sitemap.includes("/cashback"), "noindex cashback leaked into sitemap");
assert.match(sitemap, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);

const robots = await readFile(path.join(root, "dist/robots.txt"), "utf8");
for (const crawler of ["Googlebot", "SeznamBot", "OAI-SearchBot", "ChatGPT-User"]) {
  assert.ok(robots.includes(`User-agent: ${crawler}`), `robots.txt missing ${crawler}`);
}
assert.ok(robots.includes("https://prachyzaregistraci.cz/sitemap.xml"), "robots.txt missing sitemap URL");

const llms = await readFile(path.join(root, "dist/llms.txt"), "utf8");
assert.ok(llms.includes("https://prachyzaregistraci.cz/nabidky"), "llms.txt missing catalog URL");
assert.ok(llms.includes("affiliate"), "llms.txt missing affiliate disclosure");

const home = await readFile(path.join(root, "dist/index.html"), "utf8");
const catalog = await readFile(path.join(root, "dist/nabidky/index.html"), "utf8");
assert.match(home, /href="\/(?:pzpapp\/)?nabidky"/, "homepage catalog CTA is not a crawlable link");
assert.match(catalog, /href="\/(?:pzpapp\/)?nabidky\/mbank-ucet"/, "catalog detail CTA is not a crawlable link");

console.log(`SEO checks passed for ${routes.length} indexable routes and 404.html.`);
