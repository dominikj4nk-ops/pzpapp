import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { GlassCard, SearchBar } from "../components/ui";
import { bonuses, suggestions } from "../data/mockData";
import { paths } from "../routes/paths";

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const results = bonuses.filter((bonus) => bonus.name.toLowerCase().includes(query.toLowerCase()) || bonus.bonus.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <Header title="Hledat bonus" back />
      <SearchBar placeholder="Např. mBank, George, Tipli..." value={query} onChange={setQuery} />
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
      {query ? (
        <section className="mt-5 space-y-2">
          <h2 className="text-sm font-semibold text-slate-300">Výsledky</h2>
          {results.map((bonus) => (
            <button key={bonus.id} onClick={() => navigate(paths.exchangeDetail(bonus.id))} className="w-full text-left">
              <GlassCard className="p-3">
                <p className="font-bold">{bonus.name}</p>
                <p className="text-sm text-neon">{bonus.bonus}</p>
              </GlassCard>
            </button>
          ))}
        </section>
      ) : null}
    </>
  );
}
