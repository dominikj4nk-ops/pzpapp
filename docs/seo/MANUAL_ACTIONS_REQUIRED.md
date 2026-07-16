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

1. Odeslat `https://prachyzaregistraci.cz/sitemap.xml` do Search Console.
2. Ověřit domov, přehled, jeden detail a 404 přes URL Inspection.
3. Zkontrolovat HTTP statusy, canonical a robots z produkčního HTML.
4. Spustit Lighthouse na mobilu i desktopu a zaznamenat LCP/INP/CLS.
5. Za 14 a 28 dnů porovnat indexaci, imprese, CTR a dotazy.

## Publikační rutina

Každý týden zkontrolovat záznamy s `nextReview` v minulosti. Změnu zdroje pouze nahlásit editorovi; finanční fakta se nesmí automaticky přepsat bez lidské validace.
