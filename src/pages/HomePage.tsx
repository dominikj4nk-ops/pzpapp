import { ArrowRight, BellRing, CheckCircle2, ChevronRight, FerrisWheel, Search, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DesktopHome from "../components/DesktopHome";
import Header from "../components/Header";
import { BonusCard, FilterTabs, NeonButton, SectionHeading } from "../components/ui";
import { JACKPOT_LABEL } from "../components/wheelState";
import { ageFilters, bonuses, formatKc, totalPotential } from "../data/mockData";
import { paths } from "../routes/paths";

const socialProof: Array<{ label: string; icon: LucideIcon; color: string }> = [
  { label: "Ověřené nabídky", icon: ShieldCheck, color: "from-emerald-300 to-green-500" },
  { label: "Aktuální odměny", icon: BellRing, color: "from-blue-300 to-cyan-500" },
  { label: "Web je zdarma", icon: CheckCircle2, color: "from-amber-300 to-orange-500" }
];

const ageBonusOrder: Record<string, string[]> = {
  "15+": ["mbank-ucet", "airbank-ucet", "tipli-cashback"],
  "18+": ["robinhood-trading", "patrongo", "raiffeisenbank-ucet", "tipli-cashback"],
  "Vše": ["mbank-ucet", "airbank-ucet", "tipli-cashback", "robinhood-trading", "patrongo", "raiffeisenbank-ucet"]
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
    const position = (id: string) => {
      const index = order.indexOf(id);
      return index === -1 ? Number.MAX_SAFE_INTEGER : index;
    };
    return bonuses
      .filter((bonus) => bonusMatchesAge(bonus, ageFilter))
      .sort((a, b) => position(a.id) - position(b.id));
  }, [ageFilter]);

  return (
    <>
      <Header />

      <div className="xl:hidden">
        <section className="hero-section relative mb-8 min-h-[305px] p-4 sm:mb-7 sm:min-h-[340px] sm:rounded-[16px] sm:p-7 lg:min-h-[360px] lg:p-8">
          <div className="hero-copy relative z-10 max-w-[82%] sm:max-w-[54%]">
            <h2 className="text-[44px] font-black leading-[0.98] tracking-normal sm:text-[50px] md:text-[56px] lg:text-[62px]">
              <span className="block">Získej</span>
              <span className="block whitespace-nowrap pt-1.5 leading-[1.04] text-neon -mb-1.5">{formatKc(totalPotential)}</span>
              <span className="block whitespace-nowrap">na bonusech</span>
            </h2>
            <p className="mt-4 max-w-[245px] text-sm leading-5 text-slate-300 sm:max-w-[310px] sm:text-[15px] sm:leading-6">Banky, cashback a investiční platformy na jednom místě.</p>
          </div>
          <div className="relative z-20 mt-7 grid w-full grid-cols-2 gap-3 sm:mt-8 sm:w-[60%] md:w-[58%] lg:w-[54%]">
            <NeonButton onClick={() => navigate(paths.exchanges)} className="h-12 whitespace-nowrap px-3 text-sm">
              Zobrazit nabídky <ArrowRight size={17} className="ml-1 inline" />
            </NeonButton>
            <button onClick={() => navigate(paths.search)} className="glass-button flex h-12 items-center justify-center gap-2 px-3 text-sm font-bold text-slate-200 transition active:scale-95">
              <Search size={19} className="shrink-0" /> Hledat bonus
            </button>
          </div>
        </section>

        <div className="mb-6 grid grid-cols-3 gap-2 sm:mb-8 sm:rounded-[16px] sm:border sm:border-white/10 sm:bg-white/[.025] sm:px-5 sm:py-5">
          {socialProof.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex min-w-0 flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
                <span className={`category-glow grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br sm:h-12 sm:w-12 sm:rounded-[14px] ${item.color}`}>
                  <Icon size={23} className="text-white drop-shadow" />
                </span>
                <span className="min-h-7 w-full text-center text-[10px] font-medium leading-tight text-slate-200 sm:min-h-0 sm:w-auto sm:text-left sm:text-xs sm:font-bold">{item.label}</span>
              </div>
            );
          })}
        </div>

        <section className="mb-5">
          <SectionHeading title="Doporučené nabídky" action="Zobrazit všechny" onAction={() => navigate(paths.exchanges)} />
          <div className="mb-3"><FilterTabs tabs={ageFilters} active={ageFilter} onChange={setAgeFilter} /></div>
          <div className="grid gap-3 md:grid-cols-2">
            {visibleBonuses.slice(0, 4).map((bonus, index) => (
              <BonusCard key={bonus.id} bonus={bonus} rank={index + 1} variant="featured" />
            ))}
          </div>
        </section>

        <button onClick={() => navigate(paths.wheel)} className="glass flex w-full items-center gap-3 p-4 text-left transition hover:border-neon/30 active:scale-[.99]">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-green-500 text-white shadow-glow"><FerrisWheel size={21} /></span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-bold">Týdenní kolo o {JACKPOT_LABEL} zdarma</span>
            <span className="mt-0.5 block text-xs leading-5 text-slate-400">Zatoč a sdílej story. Když tě vylosujeme, proplatíme ti, co ti padlo.</span>
          </span>
          <ChevronRight size={18} className="shrink-0 text-neon" />
        </button>
      </div>

      <DesktopHome />
    </>
  );
}
