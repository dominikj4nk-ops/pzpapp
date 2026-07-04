import { BellRing, ChevronRight, CircleDollarSign, Search, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { BonusCard, FilterTabs, NeonButton } from "../components/ui";
import { ageFilters, bonuses } from "../data/mockData";
import { paths } from "../routes/paths";

const socialProof: Array<{ label: string; icon: LucideIcon; color: string }> = [
  { label: "Nenech peníze ležet", icon: CircleDollarSign, color: "from-emerald-300 to-green-500" },
  { label: "Neber první bonus", icon: Target, color: "from-blue-300 to-cyan-500" },
  { label: "Nabídky hlídáme", icon: BellRing, color: "from-amber-300 to-orange-500" }
];

export default function HomePage() {
  const navigate = useNavigate();
  const [ageFilter, setAgeFilter] = useState("Vše");
  const visibleBonuses = useMemo(
    () => bonuses.filter((bonus) => ageFilter === "Vše" || bonus.age === ageFilter).slice(0, 3),
    [ageFilter]
  );

  return (
    <>
      <Header />
      <section className="hero-section relative mb-8 min-h-[285px] p-4 xl:min-h-[315px] xl:p-8">
        <div className="hero-copy relative z-10 max-w-[68%] xl:max-w-[58%]">
          <h2 className="text-[32px] font-black leading-[1.08] tracking-normal sm:text-[36px] xl:text-[42px]">
            <span className="block">Získej až</span>
            <span className="block whitespace-nowrap text-neon">4 100 Kč</span>
            <span className="block whitespace-nowrap">na bonusech</span>
          </h2>
          <p className="mt-3 max-w-[230px] text-sm leading-5 text-slate-300 xl:max-w-none xl:text-base xl:leading-6">Banky, cashback a investiční platformy na jednom místě.</p>
        </div>
        <div className="relative z-20 mt-6 grid w-full grid-cols-2 gap-3 xl:max-w-[470px]">
          <NeonButton onClick={() => navigate(paths.exchanges)} className="h-12 whitespace-nowrap px-3 text-sm">
            Nejlepší bonusy
          </NeonButton>
          <button onClick={() => navigate(paths.search)} className="glass-button flex h-12 items-center justify-center gap-2 px-3 text-sm font-bold text-slate-200 transition active:scale-95">
            <Search size={19} className="shrink-0" />
            Hledat bonus
          </button>
        </div>
      </section>

      <div className="mb-6 grid grid-cols-3 gap-2 xl:gap-3">
        {socialProof.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex min-w-0 flex-col items-center gap-2">
              <span className={`category-glow grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${item.color}`}>
                <Icon size={23} className="text-white drop-shadow" />
              </span>
              <span className="min-h-7 w-full text-center text-[10px] font-medium leading-tight text-slate-200 sm:text-[11px]">{item.label}</span>
            </div>
          );
        })}
      </div>

      <section className="mb-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="shrink-0 text-lg font-bold xl:text-xl xl:font-black">Top bonusy</h2>
          <button onClick={() => navigate(paths.exchanges)} className="flex items-center gap-1 text-xs text-slate-300">
            Zobrazit všechny <ChevronRight size={14} />
          </button>
        </div>
        <div className="mb-3">
          <FilterTabs tabs={ageFilters} active={ageFilter} onChange={setAgeFilter} />
        </div>
        <div className="grid gap-3 xl:grid-cols-3">
          {visibleBonuses.map((bonus, index) => (
            <BonusCard key={bonus.id} bonus={bonus} rank={index + 1} />
          ))}
        </div>
      </section>

      <div className="h-24 xl:hidden" />
    </>
  );
}
