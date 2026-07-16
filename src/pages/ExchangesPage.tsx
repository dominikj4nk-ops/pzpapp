import { SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import Header from "../components/Header";
import { trackEvent } from "../analytics/events";
import { BonusCard, FilterTabs, GlassCard, SearchBar } from "../components/ui";
import { ageFilters, bonusAmount, bonuses, exchangeFilters, formatKc } from "../data/mockData";

export default function ExchangesPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Vše");
  const [activeAge, setActiveAge] = useState("Vše");
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
        const matchesAge = activeAge === "Vše" || (bonus.ageGroups ?? [bonus.age]).includes(activeAge as "15+" | "18+");
        return matchesQuery && matchesFilter && matchesAge;
      }),
    [active, activeAge, query]
  );
  const filteredTotal = filtered.reduce((sum, bonus) => sum + bonusAmount(bonus), 0);
  const offerWord = filtered.length === 1 ? "nabídka" : filtered.length >= 2 && filtered.length <= 4 ? "nabídky" : "nabídek";

  return (
    <>
      <Header title="Nabídky" />
      <div className="space-y-3 xl:grid xl:grid-cols-[1fr_auto] xl:items-center xl:gap-4 xl:space-y-0">
        <SearchBar placeholder="Hledat nabídku" value={query} onChange={setQuery} />
        <FilterTabs
          tabs={exchangeFilters}
          active={active}
          onChange={(filter) => {
            setActive(filter);
            trackEvent("offer_filter", { filter });
          }}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-[16px] border border-white/10 bg-white/[.035] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-4 sm:block">
          <p className="text-sm font-bold text-slate-200">{filtered.length} {offerWord} k dispozici</p>
          <p className="whitespace-nowrap text-xs font-bold text-neon sm:mt-0.5">Potenciál {formatKc(filteredTotal)}</p>
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 text-[10px] font-black uppercase text-slate-500">Věk</span>
          <FilterTabs
            tabs={ageFilters}
            active={activeAge}
            onChange={(filter) => {
              setActiveAge(filter);
              trackEvent("offer_filter", { filter: `věk:${filter}` });
            }}
          />
        </div>
      </div>

      <section className="mt-4 grid gap-3 lg:grid-cols-2">
        {filtered.map((bonus) => (
          <BonusCard key={bonus.id} bonus={bonus} variant="list" />
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
