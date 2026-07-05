import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useBonusProgress } from "../components/bonusState";
import { GlassCard, LogoMark, ProgressRing } from "../components/ui";
import type { Bonus } from "../data/mockData";
import { bonusAmount, bonuses, formatKc, totalPotential } from "../data/mockData";
import { paths } from "../routes/paths";

function ProfitRow({ bonus, done }: { bonus: Bonus; done?: boolean }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(paths.exchangeDetail(bonus.id))}
      className="flex w-full items-center gap-3 rounded-2xl bg-white/[.045] p-3 text-left transition hover:bg-white/[.07] active:scale-[.99]"
    >
      <LogoMark bonus={bonus} size="sm" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{bonus.name}</span>
        <span className="block text-xs text-slate-500">{done ? "Dokončeno" : bonus.completionTime}</span>
      </span>
      <span className={`text-sm font-black ${done ? "text-slate-300" : "text-neon"}`}>+{bonus.bonus}</span>
      <ChevronRight size={15} className="shrink-0 text-slate-500" />
    </button>
  );
}

export default function ProfitPage() {
  const { activatedIds, completedIds } = useBonusProgress();
  const completed = bonuses.filter((bonus) => completedIds.includes(bonus.id));
  const inProgress = bonuses.filter((bonus) => activatedIds.includes(bonus.id) && !completedIds.includes(bonus.id));
  const remaining = bonuses.filter((bonus) => !activatedIds.includes(bonus.id) && !completedIds.includes(bonus.id));
  const earned = completed.reduce((sum, bonus) => sum + bonusAmount(bonus), 0);
  const remainingTotal = totalPotential - earned;

  return (
    <>
      <Header title="Můj potenciální zisk" back />
      <GlassCard className="mb-5 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-3xl font-black">{formatKc(remainingTotal)}</p>
            <p className="mt-1 text-sm text-slate-400">
              {completed.length ? `zbývá získat · ${formatKc(earned)} už máš` : `ze ${bonuses.length} dostupných bonusů`}
            </p>
          </div>
          <ProgressRing size={104} value={activatedIds.length} total={bonuses.length} />
        </div>
      </GlassCard>

      {inProgress.length ? (
        <section className="mb-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-300">Rozpracované bonusy</h2>
          <div className="space-y-2">
            {inProgress.map((bonus) => (
              <ProfitRow key={bonus.id} bonus={bonus} />
            ))}
          </div>
        </section>
      ) : null}

      {remaining.length ? (
        <section className="mb-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-300">Čekají na aktivaci</h2>
          <div className="space-y-2">
            {remaining.map((bonus) => (
              <ProfitRow key={bonus.id} bonus={bonus} />
            ))}
          </div>
        </section>
      ) : null}

      {completed.length ? (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-300">Dokončené bonusy</h2>
          <div className="space-y-2">
            {completed.map((bonus) => (
              <ProfitRow key={bonus.id} bonus={bonus} done />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
