import { SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import Header from "../components/Header";
import { BonusCard, FilterTabs, GlassCard, SearchBar } from "../components/ui";
import { bonusAmount, bonuses, exchangeFilters, formatKc } from "../data/mockData";

export default function ExchangesPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Vše");
  const filtered = useMemo(
    () =>
      bonuses.filter((bonus) => {
        const normalized = query.trim().toLowerCase();
        const matchesQuery =
          !normalized ||
          bonus.name.toLowerCase().includes(normalized) ||
          bonus.type.toLowerCase().includes(normalized) ||
          bonus.bonus.toLowerCase().includes(normalized);
        const matchesFilter = active === "Vše" || bonus.type === active;
        return matchesQuery && matchesFilter;
      }),
    [active, query]
  );
  const filteredTotal = filtered.reduce((sum, bonus) => sum + bonusAmount(bonus), 0);
  const offerWord = filtered.length === 1 ? "nabídka" : filtered.length >= 2 && filtered.length <= 4 ? "nabídky" : "nabídek";

  return (
    <>
      <Header title="Nabídky" />
      <div className="space-y-3">
        <SearchBar placeholder="Hledat nabídku" value={query} onChange={setQuery} />
        <FilterTabs tabs={exchangeFilters} active={active} onChange={setActive} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-[18px] border border-neon/20 bg-neon/[.07] px-4 py-3">
        <p className="text-sm text-slate-300">
          {filtered.length} {offerWord} k dispozici
        </p>
        <p className="whitespace-nowrap text-sm font-black text-neon">až {formatKc(filteredTotal)}</p>
      </div>

      <section className="mt-4 grid gap-3 xl:grid-cols-2">
        {filtered.map((bonus) => (
          <BonusCard key={bonus.id} bonus={bonus} />
        ))}
      </section>

      {filtered.length === 0 ? (
        <GlassCard className="mt-4 p-5 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/[.06] text-slate-300">
            <SearchX size={22} />
          </span>
          <h3 className="mt-3 text-base font-bold">Nic jsme nenašli</h3>
          <p className="mx-auto mt-1 max-w-[280px] text-sm leading-6 text-slate-400">
            Zkus jiný název nebo přepni kategorii na „Vše“.
          </p>
        </GlassCard>
      ) : null}
    </>
  );
}
