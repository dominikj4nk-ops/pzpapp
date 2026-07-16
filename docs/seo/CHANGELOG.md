# SEO changelog

## 2026-07-16

### Indexace a metadata

- Změna: přidáno SSG/předrenderování, metadata po routách, canonical, robots, OG a `404.html`.
- Důvod: hlavní obsah a metadata nebyly dostupné bez klientského JavaScriptu.
- Přínos: indexovatelný HTML výstup a menší riziko duplicit.
- Riziko: hosting musí servírovat vygenerované adresáře a `404.html`.
- Ověření: produkční build a `scripts/test-seo.mjs`.
- Soubory: `src/entry-server.tsx`, `src/seo/seo.ts`, `scripts/prerender.mjs`, `index.html`, `vite.config.ts`.

### Důvěryhodnost a data

- Změna: odstraněny nedoložené recenze, ratingy, statistiky a fiktivní výherci; doplněna metodika.
- Důvod: obsah nebyl podložený a u finančního webu vytvářel zásadní reputační riziko.
- Přínos: transparentní a auditovatelná komunikace.
- Riziko: dočasně méně sociálního důkazu; nahradit lze pouze ověřenými podklady.
- Ověření: fulltext kontrola zakázaných tvrzení a ruční revize stránky.
- Soubory: `src/pages/MethodologyPage.tsx`, `src/pages/WheelPage.tsx`, `src/pages/TermsPage.tsx`.

### Nabídky

- Změna: doplněn stav, zdroj, datum ověření, další kontrola, poplatky, upozornění a rizika; Patron GO vyřazen z aktivních; Robinhood opraven na proměnlivé podmínky.
- Důvod: původní fakta byla částečně zastaralá nebo nedoložená.
- Přínos: přesnější rozhodování a bezpečnější publikace.
- Riziko: podmínky se mohou změnit před dalším termínem kontroly.
- Ověření: porovnání s primárními zdroji uvedenými v `SEO_AUDIT.md`.
- Soubory: `src/data/mockData.ts`, `src/pages/ExchangeDetailPage.tsx`.

### Měření

- Změna: odstraněn neplatný GA kód a přidána lokální event vrstva bez odesílání dat.
- Důvod: placeholder načítal třetí stranu bez funkčního měření a souhlasu.
- Přínos: připravené události bez privacy dluhu.
- Riziko: do připojení adaptéru se data nikam neukládají.
- Ověření: build neobsahuje `G-XXXXXXXXXX`.
- Soubory: `src/analytics/events.ts`, `src/components/RouteSeo.tsx`.
