import { BadgeCheck, CheckCircle2, Clock3, ExternalLink, Star, Wallet } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { markBonusActivated, markBonusFinished, useBonusProgress } from "../components/bonusState";
import { ContactCard, DetailRow, GlassCard, LogoMark, NeonButton, VerifiedBadge } from "../components/ui";
import { bonuses, detailSteps } from "../data/mockData";
import { paths } from "../routes/paths";

export default function ExchangeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activatedIds, completedIds } = useBonusProgress();
  const bonus = useMemo(() => bonuses.find((item) => item.id === id) ?? bonuses[0], [id]);
  const activated = activatedIds.includes(bonus.id);
  const completed = completedIds.includes(bonus.id);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  const activateBonus = () => {
    // rozdělaná nabídka => okamžitě vznikne notifikace (aktivováno, nedokončeno)
    markBonusActivated(bonus.id);
    window.open(bonus.partnerUrl, "_blank", "noopener,noreferrer");
  };

  const finishBonus = () => {
    markBonusFinished(bonus.id);
    navigate(paths.profit);
  };

  useEffect(() => {
    const node = heroRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [bonus.id]);

  const steps = bonus.steps.length ? bonus.steps : detailSteps;

  return (
    <>
      <Header title="Detail nabídky" back />
      <div ref={heroRef}>
        <GlassCard className="mb-4 p-4">
          <div className="flex items-start gap-4">
            <LogoMark bonus={bonus} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate text-xl font-black">{bonus.name}</h2>
                <VerifiedBadge size={17} />
              </div>
              <p className="text-sm text-slate-400">{bonus.type}</p>
            </div>
            <span className="flex items-center gap-1 text-sm font-bold">
              <Star className="fill-yellow-300 text-yellow-300" size={15} />
              {bonus.rating}
            </span>
          </div>
          <p className="mt-5 text-3xl font-black text-neon">{bonus.bonus}</p>
          <p className="text-sm text-slate-400">Odměna za splnění podmínek</p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-2xl border border-white/10 bg-white/[.04] px-2 py-2.5 text-center">
              <Clock3 size={16} className="mx-auto text-neon" />
              <p className="mt-1 text-[11px] font-bold text-white">{bonus.completionTime}</p>
              <p className="text-[10px] text-slate-500">zabere</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.04] px-2 py-2.5 text-center">
              <Wallet size={16} className="mx-auto text-neon" />
              <p className="mt-1 truncate text-[11px] font-bold text-white">{bonus.payoutTime}</p>
              <p className="text-[10px] text-slate-500">výplata</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.04] px-2 py-2.5 text-center">
              <BadgeCheck size={16} className="mx-auto text-neon" />
              <p className="mt-1 text-[11px] font-bold text-white">{bonus.age}</p>
              <p className="text-[10px] text-slate-500">věk</p>
            </div>
          </div>

          {completed ? (
            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-neon/25 bg-neon/10 p-3 text-sm font-bold text-neon">
              <CheckCircle2 size={18} />
              Bonus máš dokončený. Skvělá práce!
            </div>
          ) : (
            <>
              <NeonButton onClick={activateBonus} className="mt-5 w-full">
                {activated ? "Otevřít nabídku u partnera" : `Získat ${bonus.bonus}`} <ExternalLink size={15} className="inline" />
              </NeonButton>
              {activated ? (
                <div className="mt-3 flex items-center gap-2 rounded-2xl border border-neon/20 bg-neon/10 p-3 text-sm text-neon">
                  <CheckCircle2 size={18} />
                  Nabídka se otevřela u partnera. Až splníš podmínky, označ dokončení níže.
                </div>
              ) : null}
            </>
          )}
        </GlassCard>
      </div>

      <GlassCard className="mb-4 p-4">
        <h3 className="mb-1 font-bold">Podmínky bonusu</h3>
        <DetailRow label="Co splnit" value={bonus.minRequirement} />
        <DetailRow label="Časová náročnost" value={bonus.completionTime} />
        <DetailRow label="Výplata" value={bonus.payoutTime} />
        <DetailRow label="Odměna" value={bonus.bonus} />
        <DetailRow label="Typ odměny" value="Peněžní bonus" />
      </GlassCard>

      <GlassCard className="mb-4 p-4">
        <h3 className="mb-3 font-bold">Popis</h3>
        <p className="text-sm leading-6 text-slate-300">{bonus.description}</p>
        <div className="mt-3 space-y-2">
          {bonus.requirements.map((requirement) => (
            <div key={requirement} className="flex items-start gap-2 rounded-xl bg-white/[.04] px-3 py-2 text-xs leading-5 text-slate-300">
              <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-neon" />
              <span>{requirement}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <h3 className="mb-3 font-bold">Jak získat bonus</h3>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-3 text-sm">
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black ${
                  completed ? "bg-neon text-[#03130c]" : "bg-white/10 text-neon"
                }`}
              >
                {completed ? <CheckCircle2 size={15} /> : index + 1}
              </span>
              <span className="text-slate-200">{step}</span>
            </div>
          ))}
        </div>
        {!completed ? (
          activated ? (
            <NeonButton onClick={finishBonus} className="mt-4 w-full">
              Splnil jsem všechny podmínky
            </NeonButton>
          ) : (
            <p className="mt-4 rounded-2xl border border-white/10 bg-white/[.035] p-3 text-xs leading-5 text-slate-400">
              Nejdřív aktivuj bonus tlačítkem výše, potom projdi kroky a označ splnění.
            </p>
          )
        ) : null}
      </GlassCard>

      <div className="mt-4">
        <ContactCard title="Nevíš si s nabídkou rady?" text="Napiš nám, s dokončením ti pomůžeme." />
      </div>

      {!completed && !heroVisible ? (
        <div className="fixed bottom-[84px] left-1/2 z-40 w-[calc(100%-40px)] max-w-[398px] -translate-x-1/2 xl:hidden">
          <div className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-[#07131b]/95 p-2 pl-4 shadow-[0_16px_44px_rgba(0,0,0,.42)] backdrop-blur-2xl">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-300">{bonus.name}</p>
              <p className="text-sm font-black text-neon">{bonus.bonus}</p>
            </div>
            <NeonButton onClick={activated ? finishBonus : activateBonus} className="h-10 shrink-0 whitespace-nowrap px-4 text-xs">
              {activated ? "Mám splněno" : "Získat bonus"}
            </NeonButton>
          </div>
        </div>
      ) : null}
      <div className="h-16 xl:hidden" />
    </>
  );
}
