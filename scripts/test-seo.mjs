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
  ["/nabidky/robinhood-trading", "dist/nabidky/robinhood-trading/index.html"],
  ["/nabidky/raiffeisenbank-ucet", "dist/nabidky/raiffeisenbank-ucet/index.html"],
  ["/nabidky/revolut-cestovani", "dist/nabidky/revolut-cestovani/index.html"],
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
  assert.ok(robots?.includes("index"), `${route}: missing robots directive`);
  assert.ok(!titles.has(title), `${route}: duplicate title`);
  assert.ok(!canonicals.has(canonical), `${route}: duplicate canonical`);
  titles.add(title);
  canonicals.add(canonical);

  const jsonText = html.match(/<script id="route-jsonld" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(jsonText, `${route}: missing JSON-LD`);
  const jsonLd = JSON.parse(jsonText);
  assert.equal(jsonLd["@context"], "https://schema.org", `${route}: invalid JSON-LD context`);
  for (const item of jsonLd["@graph"] ?? []) {
    assert.ok(!forbiddenSchemaTypes.has(item["@type"]), `${route}: forbidden schema type ${item["@type"]}`);
  }
}

const notFound = await readFile(path.join(root, "dist/404.html"), "utf8");
assert.match(notFound, /noindex, nofollow/);
assert.ok(notFound.includes("Tahle stránka neexistuje"));

const sitemap = await readFile(path.join(root, "dist/sitemap.xml"), "utf8");
for (const [route] of routes) {
  assert.ok(sitemap.includes(`https://prachyzaregistraci.cz${route}`), `sitemap missing ${route}`);
}
assert.ok(!sitemap.includes("/hledat"));
assert.ok(!sitemap.includes("/recenze"));

console.log(`SEO checks passed for ${routes.length} indexable routes and 404.html.`);
