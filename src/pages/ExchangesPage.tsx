import { useMemo, useState } from "react";
import Header from "../components/Header";
import { ExchangeCard, FilterTabs, SearchBar } from "../components/ui";
import { bonuses, exchangeFilters } from "../data/mockData";

export default function ExchangesPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Vše");
  const filtered = useMemo(
    () =>
      bonuses.filter((bonus) => {
        const matchesQuery = bonus.name.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = active === "Vše" || bonus.type === active;
        return matchesQuery && matchesFilter;
      }),
    [active, query]
  );

  return (
    <>
      <Header title="Nabídky" />
      <div className="space-y-3">
        <SearchBar placeholder="Hledat nabídku" value={query} onChange={setQuery} />
        <FilterTabs tabs={exchangeFilters} active={active} onChange={setActive} />
      </div>
      <section className="mt-4 space-y-3">
        {filtered.map((bonus) => (
          <ExchangeCard key={bonus.id} bonus={bonus} />
        ))}
      </section>
    </>
  );
}
