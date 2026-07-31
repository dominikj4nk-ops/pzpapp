# Manual actions required

## Nutné před produkčním nasazením

1. Právník musí zkontrolovat identitu provozovatele, podmínky, ochranu osobních údajů, cookies, affiliate disclosure, pravidla kola štěstí a odměny za doporučení.
2. Doplnit skutečné identifikační údaje provozovatele. Nevytvářet fiktivního autora ani firmu.
3. Ručně ověřit každou nabídku proti aktuálním pravidlům v den nasazení.
4. Potvrdit oprávnění používat loga a ochranné známky poskytovatelů.
5. Ověřit, že hosting vrací `404.html` se statusem 404 a servíruje `/nabidky/.../index.html` na čistých URL.

## Přístupy, které chybí

- Google Search Console pro doménu.
- DNS přístup pro ověření Search Console.
- Produkční hosting/CDN a nastavení cache/comprese.
- Reálný analytický účet a schválený consent management.
- Právní/obchodní doklady k affiliate partnerstvím.
- Doložitelné podklady pro případné budoucí recenze, statistiky nebo výherce.

## Po nasazení

Aktuální kontrola z 31. 7. 2026: produkční `/robots.txt` a `/sitemap.xml` vracejí HTTP 404 a doména stále servíruje starší Next.js verzi. Dokud se aktuální `dist/` nenasadí, crawlery nové SEO neuvidí.

1. Nasadit celý obsah `dist/` do kořene domény a nastavit nginx tak, aby čisté URL servírovaly odpovídající `index.html`.
2. Ověřit, že `/robots.txt`, `/sitemap.xml`, `/llms.txt` a `/b875a3eec8c04dfa9c6102d5ed024f85.txt` vracejí HTTP 200 a správný obsah.
3. Odeslat `https://prachyzaregistraci.cz/sitemap.xml` do Google Search Console a ověřit domov, katalog, jeden detail a 404 přes URL Inspection.
4. Přidat doménu do Seznam Webmasteru, odeslat sitemapu a po úspěšné kontrole produkce spustit `pnpm run indexnow`.
5. Ověřit, že hosting ani CDN neblokují `OAI-SearchBot`, `ChatGPT-User`, Googlebot nebo SeznamBot; u OpenAI povolit také jejich publikované IP rozsahy.
6. Zkontrolovat HTTP statusy, canonical, robots a JSON-LD přímo z produkčního HTML.
7. Spustit Lighthouse na mobilu i desktopu a zaznamenat LCP/INP/CLS.
8. Za 14 a 28 dnů porovnat indexaci, imprese, CTR a dotazy.

## Publikační rutina

Každý týden zkontrolovat záznamy s `nextReview` v minulosti. Změnu zdroje pouze nahlásit editorovi; finanční fakta se nesmí automaticky přepsat bez lidské validace.
