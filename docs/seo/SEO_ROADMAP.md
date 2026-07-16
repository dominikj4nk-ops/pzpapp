# SEO roadmap

## Hotovo

1. Předrenderování hlavních rout a detailů aktivních nabídek.
2. Unikátní metadata, canonical, robots a Open Graph.
3. Validní JSON-LD bez falešných recenzí nebo hodnocení.
4. Oprava soft 404 a vytvoření `404.html`.
5. Affiliate disclosure, oficiální zdroj a datum kontroly na detailu.
6. Vyřazení neověřených nabídek z aktivního přehledu.
7. Metodika ověřování a transparentní vysvětlení monetizace.
8. Privacy-conscious event layer bez odesílání třetí straně.

## Dalších 10 úkolů podle dopadu

1. Právní kontrola provozovatele, affiliate disclosure, GDPR, soutěží a investičních upozornění.
2. Ověřit a strukturovat všechny cashback/referral nabídky; teprve pak zrušit `noindex`.
3. Přidat automatickou frontu nabídek s prošlým `nextReview` a CI kontrolu expirace.
4. Zavést route-level code splitting a snížit počáteční JS pod 100 kB gzip.
5. Převést hero a lokální loga do AVIF/WebP se správnými rozměry a cache hlavičkami.
6. Přidat viditelné breadcrumbs a následně `BreadcrumbList` na detail nabídek.
7. Přidat stránku O projektu, Kontakt, Redakční zásady, Opravy a samostatné zásady soukromí/cookies.
8. Po získání souhlasu připojit Search Console a consent-aware analytiku k existujícím událostem.
9. Vytvořit kvalitní kategorii bankovních bonusů až po získání alespoň tří aktuálních ověřených bankovních nabídek.
10. Vytvořit historii změn nabídek a užitečný archiv ukončených akcí s alternativami.

## Quality gate pro novou indexovatelnou stránku

- Má samostatný uživatelský záměr a není jen variantou titulku.
- Obsahuje primární zdroje a datum kontroly.
- Finanční fakta prošla lidskou kontrolou.
- Má unikátní title, description a canonical.
- Neobsahuje falešná hodnocení, recenze, naléhavost ani statistiky.
- Má smysluplné interní odkazy a není orphan page.
- Prošla buildem a `npm run test:seo`.
