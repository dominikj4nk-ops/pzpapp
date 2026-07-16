# Measurement plan

## Současný stav

Placeholder GA byl odstraněn. `src/analytics/events.ts` poskytuje události v prohlížeči přes `pzp:analytics`, ale bez výslovného adaptéru nic neodesílá a neukládá cookies.

## Implementované události

| Událost | Parametry | Účel |
| --- | --- | --- |
| `page_view` | `path` | výkon landing pages |
| `offer_view` | `offer_id`, `status` | zájem o detail |
| `affiliate_click` | `offer_id`, `provider` | odchod k partnerovi |
| `offer_filter` | `filter` | používání filtrů |
| `internal_search` | `query_length`, `result_count` | kvalita hledání bez ukládání dotazu |

Nikdy neposílat e-mail, telefon, číslo účtu, text zprávy, vyhledávací dotaz ani údaje o finanční situaci.

## Po získání přístupů

1. Zvolit consent-aware analytiku a právně schválit režim souhlasu.
2. Adapter připojit až po souhlasu uživatele k `window.addEventListener("pzp:analytics", ...)`.
3. Nastavit Google Search Console pro doménovou property a odeslat sitemapu.
4. Měřit organické landing pages, CTR na affiliate, zero-result rate a návraty na detail.
5. Zapnout monitoring Core Web Vitals (LCP, INP, CLS) bez osobních dat.

## KPI po nasazení

- Podíl indexovaných URL bez chyb.
- Organické imprese a kliknutí po landing page a dotazu.
- CTR `offer_view -> affiliate_click` podle nabídky, nikoli podle osoby.
- Podíl hledání s nulovým výsledkem.
- Aktuálnost dat: podíl aktivních nabídek před `nextReview`.
- LCP p75 pod 2,5 s, INP p75 pod 200 ms, CLS p75 pod 0,1.
