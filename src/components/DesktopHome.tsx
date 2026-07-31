import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Clock3,
  FerrisWheel,
  ListChecks,
  Search
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ageFilters,
  bonusAmount,
  bonusMatchesAgeFilter,
  bonuses,
  formatKc,
  offerValueLabel,
  totalPotential
} from "../data/mockData";
import { paths } from "../routes/paths";
import { JACKPOT_LABEL } from "./wheelState";
import { LogoMark, VerifiedBadge } from "./ui";

const ageBonusOrder: Record<string, string[]> = {
  "15+": ["mbank-ucet", "airbank-ucet", "tipli-cashback"],
  "18+": ["raiffeisenbank-ucet", "robinhood-trading", "mbank-ucet", "airbank-ucet", "tipli-cashback", "patrongo"],
  Vše: ["mbank-ucet", "airbank-ucet", "raiffeisenbank-ucet", "tipli-cashback", "robinhood-trading", "patrongo"]
};

const steps = [
  {
    number: "01",
    title: "Vyber si nabídku",
    text: "Porovnej odměnu, věk a čas. Vše podstatné vidíš ještě před otevřením detailu."
  },
  {
    number: "02",
    title: "Splň podmínky",
    text: "Přejdi k partnerovi a pokračuj podle detailního postupu, který tě provede krok za krokem."
  },
  {
    number: "03",
    title: "Získej odměnu",
    text: "Po splnění podmínek ti bonus vyplatí banka nebo platforma podle pravidel nabídky."
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
  const [openFaq, setOpenFaq] = useState(-1);

  const visibleBonuses = useMemo(() => {
    const order = ageBonusOrder[ageFilter] ?? ageBonusOrder.Vše;
    const position = (id: string) => {
      const index = order.indexOf(id);
      return index === -1 ? Number.MAX_SAFE_INTEGER : index;
    };

    return bonuses
      .filter((bonus) => bonusMatchesAgeFilter(bonus, ageFilter))
      .sort((a, b) => position(a.id) - position(b.id));
  }, [ageFilter]);

  const potential = visibleBonuses.reduce((sum, bonus) => sum + bonusAmount(bonus), 0);

  return (
    <div className="desktop-home hidden font-sans text-white xl:block">
      <div className="mx-auto w-full max-w-[1500px]">
        <section aria-labelledby="desktop-overview-title">
          <div className="desktop-overview-panel grid gap-6 overflow-hidden rounded-[24px] border border-white/10 p-6 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_360px] 2xl:p-7">
            <div className="relative z-10 min-w-0">
              <p className="text-[11px] font-bold uppercase text-slate-500">Přehled aktivních nabídek</p>
              <h1 id="desktop-overview-title" className="mt-3 max-w-[820px] text-[34px] font-black leading-[1.08] tracking-normal 2xl:text-[38px]">
                Bonusy za registraci na jednom místě
              </h1>
              <p className="mt-3 max-w-[680px] text-sm leading-6 text-slate-300">
                Porovnej částku, věkovou hranici a potřebný čas. U každé nabídky najdeš podmínky, zdroj a konkrétní postup.
              </p>

              <div className="mt-6 grid max-w-[760px] grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-4">
                <OverviewStat label="Celkem lze získat" value={formatKc(totalPotential)} detail="součet aktivních bonusů" />
                <OverviewStat label="Aktivní nabídky" value={String(bonuses.length)} detail="v aktuálním katalogu" />
                <OverviewStat label="Dostupné od 15 let" value={String(bonuses.filter((bonus) => (bonus.ageGroups ?? [bonus.age]).includes("15+")).length)} detail="nabídky pro mladší" />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={() => document.getElementById("nabidky")?.scrollIntoView({ behavior: "smooth" })}
                  className="neon-button flex h-11 items-center justify-center gap-2 rounded-[12px] px-5 text-xs font-black text-[#02130c]"
                >
                  Projít nabídky <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => navigate(paths.search)}
                  className="glass-button flex h-11 items-center justify-center gap-2 rounded-[12px] px-4 text-xs font-black text-slate-200 transition hover:border-neon/30 hover:text-white"
                >
                  <Search size={15} className="text-neon" /> Hledat partnera
                </button>
              </div>
            </div>

            <aside className="relative z-10 pl-6">
              <p className="text-[10px] font-black uppercase text-slate-500">Rychlé srovnání</p>
              <div className="mt-3 divide-y divide-white/10 border-y border-white/10">
                <ComparisonRow label="Nejrychlejší nabídka" value="Tipli · 5 min" />
                <ComparisonRow label="Nejvyšší odměna" value="3 000 Kč" />
                <ComparisonRow label="Kontrola podmínek" value="16. 7. 2026" />
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">Výše bonusu ani provize nerozhoduje o pořadí v katalogu.</p>
            </aside>
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
              <div className="min-w-[168px] pl-4 text-right">
                <p className="text-[10px] font-bold text-slate-600">{visibleBonuses.length} NABÍDEK · POTENCIÁL</p>
                <p className="mt-0.5 text-sm font-black text-neon">{formatKc(potential)}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            {visibleBonuses.map((bonus) => (
              <article
                key={bonus.id}
                onClick={() => navigate(paths.exchangeDetail(bonus.id))}
                className="group relative flex min-h-[218px] cursor-pointer flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#11181d] p-5 transition duration-200 hover:border-white/25 hover:bg-[#141c22]"
              >
                <div className="grid min-w-0 grid-cols-[56px_minmax(0,1fr)_148px] items-start gap-3">
                  <LogoMark bonus={bonus} />

                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex min-w-0 items-center gap-2">
                      <h3 className="truncate text-[17px] font-black leading-tight">{bonus.name}</h3>
                      <VerifiedBadge size={16} />
                    </div>
                    <p className="mt-1 text-[10px] font-bold uppercase text-slate-600">{bonus.type} · ověřený partner</p>
                  </div>

                  <div className="w-[148px] shrink-0 text-right">
                    <p className="text-[9px] font-black uppercase text-slate-600">{offerValueLabel(bonus)}</p>
                    <p className="mt-1 text-[22px] font-black leading-[1.08] text-neon">{bonus.bonus}</p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 min-h-10 text-xs leading-5 text-slate-400">{bonus.description}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-[10px] border border-neon/20 bg-neon/[.08] px-2.5 py-1.5 text-[10px] font-black text-neon">{bonus.age}</span>
                  <span className="flex items-center gap-1.5 rounded-[10px] border border-white/[.07] bg-white/[.045] px-2.5 py-1.5 text-[10px] font-bold text-slate-300"><Clock3 size={12} /> {bonus.completionTime}</span>
                  {bonus.tags.slice(1, 2).map((tag) => <span key={tag} className="rounded-[10px] border border-white/[.07] bg-white/[.045] px-2.5 py-1.5 text-[10px] font-bold text-slate-300">{tag}</span>)}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                  <span className="text-[10px] font-bold text-slate-500">Podmínky a postup v detailu</span>
                  <Link
                    to={paths.exchangeDetail(bonus.id)}
                    onClick={(event) => event.stopPropagation()}
                    className="neon-button flex h-10 min-w-[156px] items-center justify-center gap-2 rounded-[12px] px-4 text-[11px] font-black text-[#02130c]"
                  >
                    Detail nabídky <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="jak-to-funguje" className="scroll-mt-20 pt-14" aria-labelledby="desktop-how-title">
          <div className="max-w-[720px]">
            <p className="text-[11px] font-black uppercase text-neon">Jak to funguje</p>
            <h2 id="desktop-how-title" className="mt-1.5 text-[27px] font-black tracking-normal">Od výběru nabídky k odměně</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Každý detail obsahuje přesné podmínky i jednoduchý návod. Nemusíš nic dohledávat na více stránkách.</p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {steps.map((step, index) => {
              const StepIcon = [Search, ListChecks, BadgeCheck][index];
              return (
                <article key={step.number} className="group min-h-[184px] rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-emerald-50 text-neon">
                      <StepIcon size={19} strokeWidth={2.4} />
                    </span>
                    <span className="text-[11px] font-black text-neon">{step.number}</span>
                  </div>
                  <h3 className="mt-5 text-base font-black text-white">{step.title}</h3>
                  <p className="mt-2 max-w-[350px] text-xs leading-5 text-slate-500">{step.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-[minmax(0,1.35fr)_minmax(340px,.65fr)] items-start gap-6 pt-14">
          <div>
            <div>
              <p className="text-[11px] font-black uppercase text-neon">Časté otázky</p>
              <h2 className="mt-1.5 text-[25px] font-black tracking-normal">Nejdřív odpovědi, potom registrace</h2>
            </div>

            <div className="mt-5 space-y-2.5">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <article key={item.question} className={`overflow-hidden rounded-[18px] border bg-white shadow-sm transition-colors ${isOpen ? "border-emerald-300" : "border-slate-200 hover:border-slate-300"}`}>
                    <button onClick={() => setOpenFaq(isOpen ? -1 : index)} className="flex min-h-[58px] w-full items-center gap-4 px-5 py-3.5 text-left" aria-expanded={isOpen}>
                      <span className="text-[10px] font-black text-neon">{String(index + 1).padStart(2, "0")}</span>
                      <span className="flex-1 text-sm font-black">{item.question}</span>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? "bg-emerald-50 text-neon" : "bg-slate-50 text-slate-500"}`}>
                        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </span>
                    </button>
                    {isOpen ? <p className="border-t border-slate-100 px-5 py-4 pl-[57px] text-xs leading-6 text-slate-400">{item.answer}</p> : null}
                  </article>
                );
              })}
            </div>
          </div>

          <div>
            <div>
              <p className="text-[11px] font-black uppercase text-neon">Denní aktivita</p>
              <h2 className="mt-1.5 text-[25px] font-black tracking-normal">Kolo štěstí</h2>
            </div>
            <div className="mt-5">
              <QuickAction title={`Kolo o ${JACKPOT_LABEL}`} text="Každý den nový pokus o výhru." onClick={() => navigate(paths.wheel)} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function OverviewStat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="min-w-0 px-4 first:pl-0 last:pr-0">
      <p className="text-[9px] font-black uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-[21px] font-black leading-tight text-white">{value}</p>
      <p className="mt-1 text-[10px] leading-4 text-slate-500">{detail}</p>
    </div>
  );
}

function ComparisonRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-xs">
      <span className="text-slate-500">{label}</span>
      <strong className="text-right text-slate-200">{value}</strong>
    </div>
  );
}

function QuickAction({ title, text, onClick }: { title: string; text: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group flex min-h-[184px] w-full flex-col rounded-[20px] border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-slate-50">
      <span className="flex w-full items-center justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-emerald-50 text-neon">
          <FerrisWheel size={21} strokeWidth={2.3} />
        </span>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black text-neon">1× denně</span>
      </span>
      <span className="mt-5 min-w-0">
        <strong className="block text-base font-black text-white">{title}</strong>
        <span className="mt-1.5 block text-xs leading-5 text-slate-500">{text}</span>
      </span>
      <span className="mt-auto flex w-full items-center justify-between border-t border-slate-100 pt-4 text-xs font-black text-neon">
        Zatočit si
        <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 transition-transform group-hover:translate-x-0.5">
          <ArrowRight size={15} />
        </span>
      </span>
    </button>
  );
}
