# Structured data

Implementace: `src/seo/seo.ts`, runtime synchronizace `src/components/RouteSeo.tsx`, kontrola `scripts/test-seo.mjs`.

## Použité typy

- `Organization` na předrenderovaných stránkách.
- `WebSite` na domovské stránce.
- `WebPage` na aktivním detailu nabídky.

## Záměrně nepoužité typy

- `Review` a `AggregateRating`: web nemá doložené uživatelské recenze ani ratingy.
- `FAQPage`: odpovědi nejsou všechny současně viditelné bez interakce.
- `BreadcrumbList`: bude přidán až současně s viditelnými breadcrumbs.
- `Offer`/`FinancialProduct`: aktuální datový model kombinuje banky, cashback a kryptoměny; jeden typ by byl zavádějící.
- `Person`: není zveřejněn skutečný odpovědný editor se souhlasem.

## Validace

`npm run build && npm run test:seo` ověřuje přítomnost a JSON validitu, zakazuje `Review` a `AggregateRating` a kontroluje unikátní metadata. Po nasazení navíc ručně ověřit URL v Schema Markup Validatoru a URL Inspection v Search Console. Rich result není garantován.
