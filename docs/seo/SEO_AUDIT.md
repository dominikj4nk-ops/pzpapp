# SEO audit

Datum auditu: 2026-07-16

## Shrnutí

Projekt je React/Vite aplikace s nabídkami uloženými v TypeScriptu. Původně šlo o čisté SPA: všechny routy sdílely jedno title, description, canonical a JSON-LD a hlavní obsah nebyl v produkčním HTML bez JavaScriptu. Sitemap neobsahovala detaily nabídek a neplatný slug detailu zobrazil první nabídku, což vytvářelo soft 404.

Největší riziko nebylo jen technické. Web obsahoval nedoložené recenze, hodnocení, statistiky výplat a automaticky generované „poslední výherce“. U finančního a investičního obsahu jde o zásadní problém důvěryhodnosti. Několik podmínek nabídek bylo zastaralých nebo nebylo možné potvrdit primárním zdrojem.

## Nálezy podle priority

### P0 - odstraněno v tomto bloku

- Nedoložené recenze, ratingy a statistiky výplat.
- Fiktivní seznam výherců.
- Neplatné GA Measurement ID načítané na každé stránce.
- Soft 404 na neexistujícím detailu nabídky.
- Patron GO prezentovaný jako garantovaných 200 Kč, ačkoli oficiální web takovou odměnu nepotvrzuje.
- Robinhood prezentovaný jako pevný bonus 50 EUR za vklad 20 EUR a bez poplatků; oficiální podmínky uvádějí proměnlivou odměnu, proměnlivý minimální vklad, 180denní držení hodnoty odměny a poplatek za kryptoměnové obchody.

### P1 - odstraněno v tomto bloku

- Klientské SPA bez předrenderovaného obsahu.
- Jednotná metadata a canonical pro všechny routy.
- Sitemap bez detailů nabídek a s nekvalitními interními routami.
- Chybějící affiliate disclosure u CTA.
- Chybějící oficiální zdroj, datum ověření, poplatky a rizika na detailu.
- Falešné hvězdičkové hodnocení nahrazeno datem ověření.

### P1 - zbývá

- Ověřit právní pravidla kola štěstí a odměn za doporučení před indexací nebo placenou propagací.
- Ověřit všechny cashback/referral nabídky primárními zdroji; stránka `/cashback` je do té doby `noindex`.
- Doplnit identitu provozovatele, IČO/adresu, právně zkontrolované soukromí a cookies.
- Nahradit vzdálené obrázky log lokálními, optimalizovanými a právně použitelnými soubory.

## Technický stav po změnách

- Produkční build generuje statické HTML pro devět indexovatelných rout a `404.html`; interaktivní React aplikace se po načtení připojí čistým klientským mountem.
- Každá indexovatelná routa má unikátní title, description, canonical, Open Graph a robots.
- JSON-LD obsahuje pouze `Organization`, `WebSite` a faktický `WebPage`; nepoužívá `Review` ani `AggregateRating`.
- Utility routy a neověřený cashback jsou `noindex`.
- Produkční base URL je `/`; lokální Vite vývoj zůstává na `/pzpapp/`.

## Výkon

Produkční JS má přibližně 443 kB před gzip a 137 kB po gzip. Největší další příležitost je route-level code splitting a optimalizace obrázku hero (aktuálně přibližně 1,18 MB PNG). Prioritou je také self-hosting fontu a odstranění vzdálených log z Google image proxy.

## Ověřené primární zdroje

- mBank: https://www.mbank.cz/mgm/ucty-mkonto.html
- Air Bank: https://www.airbank.cz/co-vas-nejvic-zajima/jak-se-stat-klientem-air-bank-na-doporuceni-pritele/
- Tipli: https://www.tipli.cz/casto-kladene-otazky
- Robinhood: https://robinhood.com/eu/en/support/articles/rewards/
- Patron GO: https://www.patrongo.com/
