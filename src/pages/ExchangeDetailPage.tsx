import { BadgeCheck, CheckCircle2, Clock3, ExternalLink, Star, Wallet } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { markBonusStarted, markBonusViewed } from "../components/bonusState";
import { ContactCard, DetailRow, GlassCard, LogoMark, NeonButton, VerifiedBadge } from "../components/ui";
import { bonuses, detailSteps } from "../data/mockData";

export default function ExchangeDetailPage() {
  const { id } = useParams();
  const bonus = useMemo(() => bonuses.find((item) => item.id === id) ?? bonuses[0], [id]);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  const openPartner = () => {
    // Klik = redirect na partnera přes náš odkaz. Tiše si jen poznamenáme, že uživatel odešel
    // (kvůli upomínce „nedokončený bonus"). Nepřepínáme nabídku do žádného viditelného stavu.
    markBonusStarted(bonus.id);
    window.open(bonus.partnerUrl, "_blank", "noopener,noreferrer");
  };

  // Zaznamenáme, že se uživatel na nabídku podíval (retargeting notifikace „koukal ses na…").
  useEffect(() => {
    markBonusViewed(bonus.id);
  }, [bonus.id]);

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

          <NeonButton onClick={openPartner} className="mt-5 w-full">
            Získat {bonus.bonus} <ExternalLink size={15} className="inline" />
          </NeonButton>
          <p className="mt-3 text-center text-xs leading-5 text-slate-400">
            Otevře se web partnera přes náš odkaz a párování proběhne automaticky. Bonus získáš splněním podmínek přímo u partnera.
            {bonus.promoCode ? (
              <>
                {" "}
                Kdyby web chtěl promo kód, je to <span className="font-bold text-neon">{bonus.promoCode}</span>.
              </>
            ) : null}
          </p>
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
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-black text-neon">
                {index + 1}
              </span>
              <span className="text-slate-200">{step}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="mt-4">
        <ContactCard title="Nevíš si s nabídkou rady?" text="Napiš nám, s dokončením ti pomůžeme." />
      </div>

      {!heroVisible ? (
        <div className="fixed bottom-[84px] left-1/2 z-40 w-[calc(100%-40px)] max-w-[398px] -translate-x-1/2 xl:hidden">
          <div className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-[#07131b]/95 p-2 pl-4 shadow-[0_16px_44px_rgba(0,0,0,.42)] backdrop-blur-2xl">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-300">{bonus.name}</p>
              <p className="text-sm font-black text-neon">{bonus.bonus}</p>
            </div>
            <NeonButton onClick={openPartner} className="h-10 shrink-0 whitespace-nowrap px-4 text-xs">
              Získat bonus
            </NeonButton>
          </div>
        </div>
      ) : null}
      <div className="h-16 xl:hidden" />
    </>
  );
}
