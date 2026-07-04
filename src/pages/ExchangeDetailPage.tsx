import { CheckCircle2, ExternalLink, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { markBonusCompleted, markBonusOpened } from "../components/notificationState";
import { DetailRow, GlassCard, LogoMark, NeonButton } from "../components/ui";
import { bonuses, detailSteps } from "../data/mockData";
import { paths } from "../routes/paths";

export default function ExchangeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activated, setActivated] = useState(false);
  const activatedRef = useRef(false);
  const bonus = useMemo(() => bonuses.find((item) => item.id === id) ?? bonuses[0], [id]);
  const activateBonus = () => {
    activatedRef.current = true;
    setActivated(true);
    markBonusCompleted(bonus.id);
  };

  useEffect(() => {
    activatedRef.current = false;
    setActivated(false);

    return () => {
      if (!activatedRef.current) markBonusOpened(bonus.id);
    };
  }, [bonus.id]);

  return (
    <>
      <Header title="Detail nabídky" back />
      <GlassCard className="mb-4 p-4">
        <div className="flex items-start gap-4">
          <LogoMark bonus={bonus} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-black">{bonus.name}</h2>
            <p className="text-sm text-slate-400">{bonus.type}</p>
          </div>
          <span className="flex items-center gap-1 text-sm font-bold">
            <Star className="fill-yellow-300 text-yellow-300" size={15} />
            {bonus.rating}
          </span>
        </div>
        <p className="mt-5 text-3xl font-black text-neon">{bonus.bonus}</p>
        <p className="text-sm text-slate-400">Odměna za splnění podmínek</p>
        <NeonButton onClick={activateBonus} className="mt-5 w-full">
          {activated ? "Bonus aktivován" : "Získat bonus"} <ExternalLink size={15} className="inline" />
        </NeonButton>
        {activated ? (
          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-neon/20 bg-neon/10 p-3 text-sm text-neon">
            <CheckCircle2 size={18} />
            Aktivace je připravená. Další postup najdeš níže.
          </div>
        ) : null}
      </GlassCard>

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
          {(bonus.steps.length ? bonus.steps : detailSteps).map((step, index, steps) => {
            const isLastStep = index === steps.length - 1;

            return (
              <button key={step} onClick={() => (isLastStep ? navigate(paths.myBonuses) : activateBonus())} className="glass-button flex w-full items-center gap-3 p-3 text-left text-sm transition">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-xs font-black text-neon">{index + 1}</span>
                <span>{step}</span>
              </button>
            );
          })}
        </div>
      </GlassCard>
    </>
  );
}
