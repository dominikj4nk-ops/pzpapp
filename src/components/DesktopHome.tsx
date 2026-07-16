import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FerrisWheel,
  Gift,
  ListChecks,
  Search,
  ShieldCheck,
  WalletCards
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ageFilters,
  bonusAmount,
  bonuses,
  formatKc,
  offerValueLabel,
  totalPotential
} from "../data/mockData";
import { paths } from "../routes/paths";
import { JACKPOT_LABEL } from "./wheelState";
import { LogoMark } from "./ui";

const ageBonusOrder: Record<string, string[]> = {
  "15+": ["mbank-ucet", "airbank-ucet", "tipli-cashback"],
  "18+": ["robinhood-trading", "revolut-cestovani", "raiffeisenbank-ucet", "tipli-cashback"],
  Vše: ["mbank-ucet", "airbank-ucet", "raiffeisenbank-ucet", "tipli-cashback", "robinhood-trading", "revolut-cestovani"]
};

const bonusMatchesAge = (bonus: (typeof bonuses)[number], filter: string) => {
  if (filter === "Vše") return true;
  return (bonus.ageGroups ?? [bonus.age]).some((age) => age === filter);
};

const steps: Array<{ number: string; title: string; text: string; icon: LucideIcon; color: string }> = [
  {
    number: "01",
    title: "Vyber si nabídku",
    text: "Porovnej odměnu, věk a čas. Vše podstatné vidíš ještě před otevřením detailu.",
    icon: Search,
    color: "from-blue-300 to-cyan-500"
  },
  {
    number: "02",
    title: "Splň podmínky",
    text: "Přejdi k partnerovi a pokračuj podle detailního postupu, který tě provede krok za krokem.",
    icon: ListChecks,
    color: "from-amber-300 to-orange-500"
  },
  {
    number: "03",
    title: "Získej odměnu",
    text: "Po splnění podmínek ti bonus vyplatí banka nebo platforma podle pravidel nabídky.",
    icon: WalletCards,
    color: "from-emerald-300 to-green-500"
  }
];

const faqItems = [
  { question: "Je používání webu zdarma?", answer: "Ano. Přehled nabídek, porovnání i naše návody používáš bez poplatku." },
  { question: "Jak ověřujete nabídky?", answer: "Pravidelně kontrolujeme částku, věk, časovou náročnost i podmínky každého partnera." },
  { question: "Můžu získat více bonusů?", answer: "Ano. Pokud splňuješ podmínky jednotlivých partnerů, můžeš postupně dokončit více nabídek." },
  { question: "Jsou tu nabídky také pro 15+?", answer: "Ano. Pomocí filtru 15+ zobrazíš pouze nabídky dostupné mladším uživatelům." }
];

export default function DesktopHome() {
  const navigate = useNavigate();
  const [ageFilter, setAgeFilter] = useState("Vše");
  const [openFaq, setOpenFaq] = useState(0);

  const visibleBonuses = useMemo(() => {
    const order = ageBonusOrder[ageFilter] ?? ageBonusOrder.Vše;
    const position = (id: string) => {
      const index = order.indexOf(id);
      return index === -1 ? Number.MAX_SAFE_INTEGER : index;
    };

    return bonuses
      .filter((bonus) => bonusMatchesAge(bonus, ageFilter))
      .sort((a, b) => position(a.id) - position(b.id));
  }, [ageFilter]);

  const potential = visibleBonuses.reduce((sum, bonus) => sum + bonusAmount(bonus), 0);

  return (
    <div className="desktop-home hidden font-sans text-white xl:block">
      <div className="mx-auto w-full max-w-[1500px]">
        <section aria-labelledby="desktop-overview-title">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-black uppercase text-neon">
                <span className="h-1.5 w-1.5 rounded-full bg-neon" /> Ověřený katalog
              </p>
              <h1 id="desktop-overview-title" className="mt-2 text-[32px] font-black leading-tight tracking-normal 2xl:text-[36px]">
                Najdi nabídku, která se ti vyplatí
              </h1>
              <p className="mt-2 text-sm text-slate-400">Bonusy, podmínky a detailní postupy přehledně na jednom místě.</p>
            </div>
            <p className="hidden items-center gap-2 text-xs font-semibold text-slate-500 2xl:flex">
              <ShieldCheck size={15} className="text-neon" /> Nabídky kontrolujeme podle oficiálních zdrojů
            </p>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3">
            <OverviewStat icon={Gift} label="Peněžní potenciál" value={formatKc(totalPotential)} detail="z aktuálních bonusů" color="text-neon" />
            <OverviewStat icon={BadgeCheck} label="Aktivní nabídky" value={String(bonuses.length)} detail="všechny na jedné stránce" color="text-cyan-300" />
            <OverviewStat icon={CheckCircle2} label="Nabídky pro 15+" value={String(bonuses.filter((bonus) => (bonus.ageGroups ?? [bonus.age]).includes("15+")).length)} detail="vhodné i pro mladší" color="text-amber-300" />
            <OverviewStat icon={ShieldCheck} label="Detailní návody" value="Krok za krokem" detail="bez hledání podmínek" color="text-blue-300" compact />
          </div>
        </section>

        <section id="nabidky" className="scroll-mt-20 pt-10" aria-labelledby="desktop-offers-title">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="text-[11px] font-black uppercase text-neon">Katalog</p>
              <h2 id="desktop-offers-title" className="mt-1.5 text-[27px] font-black leading-tight tracking-normal">Všechny aktivní nabídky</h2>
              <p className="mt-2 text-sm text-slate-500">Porovnej si bonus, věkovou hranici a čas potřebný k dokončení.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex rounded-[12px] border border-white/10 bg-white/[.025] p-1" role="group" aria-label="Filtrovat podle věku">
                {ageFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setAgeFilter(filter)}
                    className={`h-8 rounded-[10px] px-4 text-[11px] font-black transition ${ageFilter === filter ? "bg-neon text-[#02130c]" : "text-slate-400 hover:bg-white/[.06] hover:text-white"}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="min-w-[168px] border-l border-white/10 pl-4 text-right">
                <p className="text-[10px] font-bold text-slate-600">{visibleBonuses.length} NABÍDEK · POTENCIÁL</p>
                <p className="mt-0.5 text-sm font-black text-neon">{formatKc(potential)}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(430px,1fr))] gap-4">
            {visibleBonuses.map((bonus, index) => (
              <article
                key={bonus.id}
                onClick={() => navigate(paths.exchangeDetail(bonus.id))}
                className={`group relative flex min-h-[226px] cursor-pointer flex-col overflow-hidden rounded-[12px] border p-5 transition duration-200 hover:-translate-y-0.5 hover:border-neon/40 hover:bg-white/[.065] ${index === 0 ? "border-neon/30 bg-neon/[.045]" : "border-white/10 bg-white/[.035]"}`}
              >
                <div className="grid min-w-0 grid-cols-[28px_64px_minmax(0,1fr)_minmax(112px,180px)] items-start gap-3">
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-[10px] text-[10px] font-black ${index === 0 ? "bg-neon text-[#02130c]" : "border border-white/10 bg-[#111f29] text-slate-400"}`}>
                    {index + 1}
                  </span>

                  <LogoMark bonus={bonus} size="lg" />

                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex min-w-0 items-center gap-2">
                      <h3 className="truncate text-lg font-black">{bonus.name}</h3>
                      <BadgeCheck size={16} className="shrink-0 text-neon" />
                    </div>
                    <p className="mt-1 text-[10px] font-bold uppercase text-slate-600">{bonus.type} · ověřený partner</p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[9px] font-black uppercase text-slate-600">{offerValueLabel(bonus)}</p>
                    <p className="mt-1 max-w-[180px] text-[23px] font-black leading-tight text-neon">{bonus.bonus}</p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 min-h-10 text-xs leading-5 text-slate-400">{bonus.description}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-[10px] border border-neon/20 bg-neon/[.08] px-2.5 py-1.5 text-[10px] font-black text-neon">{bonus.age}</span>
                  <span className="flex items-center gap-1.5 rounded-[10px] border border-white/[.07] bg-white/[.045] px-2.5 py-1.5 text-[10px] font-bold text-slate-300"><Clock3 size={12} /> {bonus.completionTime}</span>
                  {bonus.tags.slice(1, 2).map((tag) => <span key={tag} className="rounded-[10px] border border-white/[.07] bg-white/[.045] px-2.5 py-1.5 text-[10px] font-bold text-slate-300">{tag}</span>)}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/[.07] pt-4">
                  <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                    <ListChecks size={14} className="text-neon" /> Detailní postup krok za krokem
                  </span>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(paths.exchangeDetail(bonus.id));
                    }}
                    className="neon-button flex h-10 min-w-[156px] items-center justify-center gap-2 rounded-[12px] px-4 text-[11px] font-black text-[#02130c]"
                  >
                    Detail nabídky <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="jak-to-funguje" className="scroll-mt-20 pt-12" aria-labelledby="desktop-how-title">
          <div className="flex items-end justify-between gap-8 border-b border-white/10 pb-4">
            <div>
              <p className="text-[11px] font-black uppercase text-neon">Jak to funguje</p>
              <h2 id="desktop-how-title" className="mt-1.5 text-[27px] font-black tracking-normal">Od výběru nabídky k odměně</h2>
            </div>
            <p className="max-w-[520px] text-right text-xs leading-5 text-slate-500">Každý detail obsahuje přesné podmínky i jednoduchý návod. Nemusíš nic dohledávat na více stránkách.</p>
          </div>

          <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.number} className="flex min-h-[174px] gap-4 px-5 py-6 first:pl-0 last:pr-0">
                  <span className={`category-glow grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-gradient-to-br ${step.color}`}><Icon size={18} className="text-white" /></span>
                  <div>
                    <p className="text-[9px] font-black text-slate-600">KROK {step.number}</p>
                    <h3 className="mt-2 text-base font-black">{step.title}</h3>
                    <p className="mt-2 max-w-[340px] text-xs leading-5 text-slate-500">{step.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-[1.25fr_.75fr] gap-8 pt-12">
          <div>
            <div className="flex items-end justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] font-black uppercase text-neon">Časté otázky</p>
                <h2 className="mt-1.5 text-[25px] font-black tracking-normal">Nejdřív odpovědi, potom registrace</h2>
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <article key={item.question}>
                    <button onClick={() => setOpenFaq(isOpen ? -1 : index)} className="flex w-full items-center gap-4 py-4 text-left" aria-expanded={isOpen}>
                      <span className="text-[10px] font-black text-neon">{String(index + 1).padStart(2, "0")}</span>
                      <span className="flex-1 text-sm font-black">{item.question}</span>
                      <ChevronDown size={16} className={`text-slate-600 transition-transform ${isOpen ? "rotate-180 text-neon" : ""}`} />
                    </button>
                    {isOpen ? <p className="pb-4 pl-8 text-xs leading-6 text-slate-400">{item.answer}</p> : null}
                  </article>
                );
              })}
            </div>
          </div>

          <div>
            <div className="border-b border-white/10 pb-4">
              <p className="text-[11px] font-black uppercase text-neon">Denní aktivita</p>
              <h2 className="mt-1.5 text-[25px] font-black tracking-normal">Kolo štěstí</h2>
            </div>
            <div className="mt-4 space-y-3">
              <QuickAction icon={FerrisWheel} title={`Kolo o ${JACKPOT_LABEL}`} text="Každý den nový pokus o výhru." onClick={() => navigate(paths.wheel)} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function OverviewStat({ icon: Icon, label, value, detail, color, compact = false }: { icon: LucideIcon; label: string; value: string; detail: string; color: string; compact?: boolean }) {
  return (
    <div className="flex min-h-0 flex-col justify-between rounded-[12px] border border-white/10 bg-white/[.035] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-black uppercase text-slate-600">{label}</p>
        <Icon size={16} className={color} />
      </div>
      <div className="mt-3">
        <p className={`${compact ? "text-[15px]" : "text-[21px]"} font-black leading-tight ${color}`}>{value}</p>
        <p className="mt-1 text-[10px] leading-4 text-slate-500">{detail}</p>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, title, text, onClick }: { icon: LucideIcon; title: string; text: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group flex w-full items-center gap-4 rounded-[12px] border border-white/10 bg-white/[.035] p-4 text-left transition hover:border-neon/35 hover:bg-white/[.06]">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-neon/10 text-neon"><Icon size={18} /></span>
      <span className="min-w-0 flex-1">
        <strong className="block text-sm font-black text-white">{title}</strong>
        <span className="mt-1 block text-[10px] text-slate-500">{text}</span>
      </span>
      <ArrowRight size={16} className="text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-neon" />
    </button>
  );
}
