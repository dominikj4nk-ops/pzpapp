import { AlertTriangle, BadgeCheck, CheckCircle2, ChevronDown, ChevronUp, ClipboardCheck, Clock3, ExternalLink, Lightbulb, ShieldCheck, Wallet } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { trackEvent } from "../analytics/events";
import Header from "../components/Header";
import { markBonusStarted, markBonusViewed } from "../components/bonusState";
import { ContactCard, DetailRow, GlassCard, LogoMark, NeonButton, VerifiedBadge } from "../components/ui";
import { allBonuses, detailSteps, isTravelOffer, offerCompactCtaLabel, offerCtaLabel, offerValueLabel } from "../data/mockData";
import { offerGuides } from "../data/offerGuides";

export default function ExchangeDetailPage() {
  const { id } = useParams();
  const bonus = useMemo(() => allBonuses.find((item) => item.id === id), [id]);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [guideOpen, setGuideOpen] = useState(false);

  const openPartner = () => {
    if (!bonus || bonus.status !== "Aktivní") return;
    // Klik = redirect na partnera přes náš odkaz. Tiše si jen poznamenáme, že uživatel odešel
    // (kvůli upomínce „nedokončený bonus"). Nepřepínáme nabídku do žádného viditelného stavu.
    markBonusStarted(bonus.id);
    trackEvent(bonus.isAffiliate ? "affiliate_click" : "partner_click", { offer_id: bonus.id, provider: bonus.provider });
    window.open(bonus.partnerUrl, "_blank", "noopener,noreferrer");
  };

  // Zaznamenáme, že se uživatel na nabídku podíval (retargeting notifikace „koukal ses na…").
  useEffect(() => {
    if (bonus) {
      markBonusViewed(bonus.id);
      trackEvent("offer_view", { offer_id: bonus.id, status: bonus.status });
    }
  }, [bonus]);

  useEffect(() => {
    setGuideOpen(false);
  }, [bonus?.id]);

  useEffect(() => {
    const node = heroRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [bonus]);

  if (!bonus) {
    return (
      <>
        <Header title="Nabídka nenalezena" back heading={false} />
        <div className="mx-auto max-w-[720px]">
          <GlassCard className="p-6 text-center">
            <AlertTriangle className="mx-auto text-amber-300" size={28} />
            <h1 className="mt-3 text-xl font-black">Tato nabídka neexistuje</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">Odkaz je chybný nebo byla stránka odstraněna. Aktuální nabídky najdeš v přehledu.</p>
          </GlassCard>
        </div>
      </>
    );
  }

  const steps = bonus.steps.length ? bonus.steps : detailSteps;
  const travelOffer = isTravelOffer(bonus);
  const guide = offerGuides[bonus.id];
  const payoutSummary = bonus.payoutTimeLabel ?? bonus.payoutTime;

  const toggleGuide = () => {
    const nextOpen = !guideOpen;
    setGuideOpen(nextOpen);
    if (nextOpen) trackEvent("offer_guide_open", { offer_id: bonus.id });
  };

  return (
    <>
      <Header title="Detail nabídky" back heading={false} />
      <div className="xl:mx-auto xl:grid xl:max-w-[1400px] xl:grid-cols-[5fr_7fr] xl:items-start xl:gap-4">
      <div ref={heroRef} className="xl:sticky xl:top-[96px]">
        <GlassCard className="mb-4 p-4 xl:rounded-[12px] xl:p-6">
          <div className="flex items-start gap-4">
            <LogoMark bonus={bonus} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h1 className="truncate text-xl font-black">{bonus.name}</h1>
                <VerifiedBadge size={17} />
              </div>
              <p className="text-sm text-slate-400">{bonus.type}</p>
            </div>
            <span className="hidden items-center gap-1 text-xs font-bold text-slate-300 sm:flex">
              <ShieldCheck className="text-neon" size={15} />
              Ověřeno
            </span>
          </div>
          <p className="mt-5 text-3xl font-black text-neon xl:text-4xl">{bonus.bonus}</p>
          <p className="mt-1 text-xs font-black uppercase text-slate-500">{offerValueLabel(bonus)}</p>
          {bonus.pitch ? <p className="mt-3 text-sm font-semibold leading-6 text-slate-200">{bonus.pitch}</p> : null}

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex min-h-[84px] flex-col items-center justify-center rounded-[14px] border border-white/10 bg-white/[.04] p-2 text-center">
              <Clock3 size={16} className="mx-auto text-neon" />
              <p className="mt-1.5 text-[11px] font-bold leading-4 text-white">{bonus.completionTime}</p>
              <p className="mt-0.5 text-[10px] leading-3 text-slate-500">zabere</p>
            </div>
            <div className="flex min-h-[84px] flex-col items-center justify-center rounded-[14px] border border-white/10 bg-white/[.04] p-2 text-center">
              <Wallet size={16} className="mx-auto text-neon" />
              <p className="mt-1.5 flex min-h-7 items-center justify-center text-[10px] font-bold leading-[14px] text-white">{payoutSummary}</p>
              <p className="mt-0.5 text-[10px] leading-3 text-slate-500">{travelOffer ? "charakter" : "výplata"}</p>
            </div>
            <div className="flex min-h-[84px] flex-col items-center justify-center rounded-[14px] border border-white/10 bg-white/[.04] p-2 text-center">
              <BadgeCheck size={16} className="mx-auto text-neon" />
              <p className="mt-1.5 text-[11px] font-bold leading-4 text-white">{bonus.age}</p>
              <p className="mt-0.5 text-[10px] leading-3 text-slate-500">věk</p>
            </div>
          </div>

          {bonus.status === "Aktivní" ? (
            <NeonButton onClick={openPartner} className="mt-5 w-full xl:h-14 xl:rounded-[12px] xl:text-base">
              {offerCtaLabel(bonus)} <ExternalLink size={15} className="inline" />
            </NeonButton>
          ) : (
            <p className="mt-5 rounded-[18px] border border-amber-300/20 bg-amber-300/10 p-3 text-center text-sm font-bold text-amber-100">Nabídka není v aktivním přehledu</p>
          )}
          <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[11px] font-semibold leading-4 text-slate-500">
            <ShieldCheck size={13} className="shrink-0 text-neon" /> Otevře se nová karta. Návod ti zůstane otevřený.
          </p>
          <p className="mt-3 text-center text-xs leading-5 text-slate-400">
            {bonus.isAffiliate
              ? "Používáme partnerský odkaz; tvoje odměna ani podmínky se tím nemění. "
              : "Přejdeš přímo na oficiální web poskytovatele. "}
            Před dokončením zkontroluj pravidla poskytovatele.
            {bonus.promoCode ? (
              <>
                {" "}
                Pro správné přiřazení nabídky zadej promo kód <span className="font-bold text-neon">{bonus.promoCode}</span>.
              </>
            ) : null}
          </p>
        </GlassCard>
      </div>

      <div className="min-w-0">
      <GlassCard className="mb-4 p-4">
        <h3 className="mb-1 font-bold">{travelOffer ? "Podmínky nabídky" : "Podmínky bonusu"}</h3>
        <DetailRow label="Co splnit" value={bonus.minRequirement} />
        <DetailRow label="Časová náročnost" value={bonus.completionTime} />
        <DetailRow label={travelOffer ? "Charakter" : "Výplata"} value={bonus.payoutTime} />
        <DetailRow label={travelOffer ? "Hlavní výhoda" : "Odměna"} value={bonus.bonus} />
        <DetailRow label="Typ odměny" value={bonus.rewardType} />
        <DetailRow label="Platnost do" value={bonus.validUntil ? bonus.validUntil.split("-").reverse().join(". ") : "Není uvedena"} />
      </GlassCard>

      <GlassCard className="mb-4 p-4">
        <h3 className="mb-3 font-bold">Náklady, omezení a zdroj</h3>
        <div className="space-y-2 text-xs leading-5 text-slate-300">
          {bonus.fees.map((fee) => <p key={fee}>{fee}</p>)}
          {bonus.warnings.map((warning) => <p key={warning}>{warning}</p>)}
          {bonus.riskNotice ? <p className="text-amber-200">{bonus.riskNotice}</p> : null}
        </div>
        <a href={bonus.officialSourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-neon underline underline-offset-4">
          Oficiální zdroj podmínek <ExternalLink size={13} />
        </a>
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
        <h3 className="mb-1 font-bold">Rychlý přehled</h3>
        <p className="mb-3 text-xs leading-5 text-slate-500">Nejdřív si zkontroluj základní cestu. Podrobný návod najdeš hned pod ní.</p>
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

      {guide ? (
        <GlassCard className={`mt-4 overflow-hidden p-0 transition ${guideOpen ? "border-neon/30" : "hover:border-neon/25"}`}>
          <button
            type="button"
            onClick={toggleGuide}
            aria-expanded={guideOpen}
            className="flex w-full items-center gap-3 p-4 text-left xl:p-5"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-neon/12 text-neon">
              <ClipboardCheck size={21} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-black xl:text-base">Detailní postup krok za krokem</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">Co připravit, kam kliknout a jak nepřijít o odměnu nebo úsporu.</span>
            </span>
            {guideOpen ? <ChevronUp size={19} className="shrink-0 text-neon" /> : <ChevronDown size={19} className="shrink-0 text-neon" />}
          </button>

          {guideOpen ? (
            <div className="border-t border-white/10 px-4 pb-5 pt-4 xl:px-5 xl:pb-6">
              <p className="text-sm leading-6 text-slate-300">{guide.intro}</p>

              <div className="mt-4 rounded-[16px] border border-white/10 bg-white/[.04] p-4">
                <p className="text-[11px] font-black uppercase text-slate-500">Než začneš, připrav si</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {guide.preparation.map((item) => (
                    <p key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-neon" /> {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-[16px] border border-amber-300/20 bg-amber-300/[.07] p-4">
                <Lightbulb size={18} className="mt-0.5 shrink-0 text-amber-300" />
                <div>
                  <p className="text-xs font-black text-amber-200">Nejčastější chyba</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">{guide.commonMistake}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {guide.steps.map((step, index) => (
                  <article key={step.title} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 rounded-[16px] border border-white/10 bg-white/[.035] p-4">
                    <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-neon text-xs font-black text-[#02130c]">{index + 1}</span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-white">{step.title}</h4>
                      <p className="mt-1.5 text-xs leading-5 text-slate-300">{step.description}</p>
                      <p className="mt-3 flex items-start gap-2 border-t border-white/[.08] pt-3 text-[11px] font-semibold leading-5 text-slate-400">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-neon" /> Kontrola: {step.check}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {bonus.status === "Aktivní" ? (
                <div className="mt-5 border-t border-white/10 pt-5 text-center">
                  <p className="mb-3 text-xs font-semibold text-slate-400">Máš jasno? Otevři partnera a postupuj bod po bodu.</p>
                  <NeonButton onClick={openPartner} className="w-full xl:h-14 xl:rounded-[12px] xl:text-base">
                    {offerCtaLabel(bonus)} <ExternalLink size={15} className="inline" />
                  </NeonButton>
                </div>
              ) : null}
            </div>
          ) : null}
        </GlassCard>
      ) : null}

      <div className="mt-4">
        <ContactCard title="Nevíš si s nabídkou rady?" text="Napiš nám, s dokončením ti pomůžeme." />
      </div>
      </div>
      </div>

      {!heroVisible && typeof document !== "undefined" ? createPortal(
        <div className="fixed bottom-[84px] left-1/2 z-[60] w-[calc(100%-40px)] max-w-[398px] -translate-x-1/2 xl:hidden">
          <div className="flex min-h-[68px] items-center gap-2.5 rounded-[16px] border border-white/10 bg-[#07131b]/95 p-2.5 pl-4 shadow-[0_16px_44px_rgba(0,0,0,.42)] backdrop-blur-2xl">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-bold uppercase text-slate-500">Odměna u {bonus.name}</p>
              <p className="mt-0.5 truncate text-sm font-black text-neon">{bonus.bonus}</p>
            </div>
            <NeonButton onClick={openPartner} className="h-11 max-w-[58%] shrink-0 whitespace-nowrap rounded-[12px] px-4 text-xs">
              {offerCompactCtaLabel(bonus)} <ExternalLink size={13} className="ml-1 inline" />
            </NeonButton>
          </div>
        </div>,
        document.body
      ) : null}
      <div className="h-16 xl:hidden" />
    </>
  );
}
