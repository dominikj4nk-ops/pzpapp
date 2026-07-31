import { readFile } from "node:fs/promises";
import path from "node:path";

const host = "prachyzaregistraci.cz";
const key = "b875a3eec8c04dfa9c6102d5ed024f85";
const sitemapPath = path.join(process.cwd(), "dist", "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (urlList.length === 0) throw new Error("V dist/sitemap.xml nejsou žádné URL.");

const keyLocation = `https://${host}/${key}.txt`;
const keyResponse = await fetch(keyLocation);
if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error(`IndexNow klíč zatím není dostupný na ${keyLocation}. Nejdřív nasaď aktuální dist/.`);
}

const response = await fetch("https://search.seznam.cz/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList })
});

if (!response.ok && response.status !== 202) {
  throw new Error(`IndexNow odpověděl HTTP ${response.status}: ${await response.text()}`);
}

console.log(`IndexNow přijal ${urlList.length} URL (HTTP ${response.status}).`);
