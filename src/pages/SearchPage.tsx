import { Search, SearchX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { trackEvent } from "../analytics/events";
import { ExchangeCard, GlassCard, SearchBar } from "../components/ui";
import { bonuses, suggestions } from "../data/mockData";
import { paths } from "../routes/paths";

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      bonuses.filter(
        (bonus) =>
          bonus.name.toLowerCase().includes(normalized) ||
          bonus.bonus.toLowerCase().includes(normalized) ||
          bonus.type.toLowerCase().includes(normalized)
      ),
    [normalized]
  );

  useEffect(() => {
    if (!normalized) return;
    const timeout = window.setTimeout(() => {
      trackEvent("internal_search", { query_length: normalized.length, result_count: results.length });
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [normalized, results.length]);

  return (
    <div className="xl:mx-auto xl:max-w-[720px]">
      <Header title="Hledat bonus" back />
      <SearchBar placeholder="Např. mBank, Air Bank, Tipli..." value={query} onChange={setQuery} />

      {normalized ? (
        <section className="mt-5 space-y-2">
          <h2 className="text-sm font-semibold text-slate-300">Výsledky</h2>
          {results.length ? (
            results.map((bonus) => <ExchangeCard key={bonus.id} bonus={bonus} />)
          ) : (
            <GlassCard className="p-5 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/[.06] text-slate-300">
                <SearchX size={22} />
              </span>
              <h3 className="mt-3 text-base font-bold">Nic jsme nenašli</h3>
              <p className="mx-auto mt-1 max-w-[280px] text-sm leading-6 text-slate-400">
                Zkus kratší dotaz, třeba jen název banky.
              </p>
            </GlassCard>
          )}
        </section>
      ) : (
        <section className="mt-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-300">Doporučené hledání</h2>
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  const match = bonuses.find((bonus) => suggestion.includes(bonus.name) || suggestion.includes(bonus.bonus));
                  if (match) navigate(paths.exchangeDetail(match.id));
                  else setQuery(suggestion);
                }}
                className="glass-button flex w-full items-center gap-3 p-3 text-left text-sm transition active:scale-[.99]"
              >
                <Search size={16} className="text-neon" />
                {suggestion}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
