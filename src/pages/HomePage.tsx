import { BellRing, ChevronRight, CircleDollarSign, FerrisWheel, Search, Target, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { BonusCard, FilterTabs, NeonButton, SectionHeading } from "../components/ui";
import { ageFilters, bonuses, formatKc, REFERRAL_REWARD, totalPotential } from "../data/mockData";
import { JACKPOT_LABEL } from "../components/wheelState";
import { paths } from "../routes/paths";

const socialProof: Array<{ label: string; icon: LucideIcon; color: string }> = [
  { label: "Nenech peníze ležet", icon: CircleDollarSign, color: "from-emerald-300 to-green-500" },
  { label: "Vyber si nejlepší", icon: Target, color: "from-blue-300 to-cyan-500" },
  { label: "Nabídky hlídáme", icon: BellRing, color: "from-amber-300 to-orange-500" }
];

const ageBonusOrder: Record<string, string[]> = {
  "15+": ["mbank-ucet", "airbank-ucet", "tipli-cashback"],
  "18+": ["robinhood-trading", "patrongo", "tipli-cashback"],
  "Vše": ["mbank-ucet", "airbank-ucet", "tipli-cashback", "robinhood-trading", "patrongo"]
};

const bonusMatchesAge = (bonus: (typeof bonuses)[number], filter: string) => {
  if (filter === "Vše") return true;
  return (bonus.ageGroups ?? [bonus.age]).some((age) => age === filter);
};

export default function HomePage() {
  const navigate = useNavigate();
  const [ageFilter, setAgeFilter] = useState("Vše");
  const visibleBonuses = useMemo(() => {
    const order = ageBonusOrder[ageFilter] ?? ageBonusOrder["Vše"];
    return bonuses
      .filter((bonus) => bonusMatchesAge(bonus, ageFilter))
      .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }, [ageFilter]);

  return (
    <>
      <Header />
      <section className="hero-section relative mb-8 min-h-[305px] p-4 xl:min-h-[335px] xl:p-8">
        <div className="hero-copy relative z-10 max-w-[82%] xl:max-w-[64%]">
          <h2 className="text-[44px] font-black leading-[0.98] tracking-normal sm:text-[48px] xl:text-[60px]">
            <span className="block">Získej až</span>
            <span className="block whitespace-nowrap pt-1.5 leading-[1.04] text-neon -mb-1.5">{formatKc(totalPotential)}</span>
            <span className="block whitespace-nowrap">na bonusech</span>
          </h2>
          <p className="mt-4 max-w-[245px] text-sm leading-5 text-slate-300 xl:max-w-none xl:text-base xl:leading-6">Banky, cashback a investiční platformy na jednom místě.</p>
        </div>
        <div className="relative z-20 mt-7 grid w-full grid-cols-2 gap-3 xl:max-w-[470px]">
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
        <SectionHeading title="Všechny bonusy" action="Zobrazit všechny" onAction={() => navigate(paths.exchanges)} />
        <div className="mb-3">
          <FilterTabs tabs={ageFilters} active={ageFilter} onChange={setAgeFilter} />
        </div>
        <div className="grid gap-3 xl:grid-cols-3">
          {visibleBonuses.map((bonus, index) => (
            <BonusCard key={bonus.id} bonus={bonus} rank={index + 1} />
          ))}
        </div>
      </section>

      <button
        onClick={() => navigate(paths.wheel)}
        className="glass mb-3 flex w-full items-center gap-3 p-4 text-left transition hover:border-neon/30 active:scale-[.99]"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-green-500 text-white shadow-glow">
          <FerrisWheel size={21} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-bold">Týdenní kolo o {JACKPOT_LABEL} zdarma</span>
          <span className="mt-0.5 block text-xs leading-5 text-slate-400">Zatoč, dej výsledek na story a hraj o týdenní bonus +500 Kč.</span>
        </span>
        <ChevronRight size={18} className="shrink-0 text-neon" />
      </button>

      <button
        onClick={() => navigate(paths.rewards)}
        className="glass flex w-full items-center gap-3 p-4 text-left transition hover:border-neon/30 active:scale-[.99]"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow-glow">
          <UserPlus size={21} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold">Pozvi kamaráda, vezmi si {formatKc(REFERRAL_REWARD)}</span>
          <span className="mt-0.5 block text-xs leading-5 text-slate-400">Za každého kamaráda, který dokončí bonus.</span>
        </span>
        <ChevronRight size={18} className="shrink-0 text-neon" />
      </button>
    </>
  );
}
