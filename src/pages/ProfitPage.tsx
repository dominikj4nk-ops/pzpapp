import Header from "../components/Header";
import { GlassCard, ProgressRing } from "../components/ui";
import { activeBonusRows, bonuses, inactiveBonusRows } from "../data/mockData";

function ProfitRow({ name, value }: { name: string; value: string }) {
  const bonus = bonuses.find((item) => item.name === name) ?? bonuses[0];
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/[.045] p-3">
      <div className={`grid h-8 w-8 place-items-center rounded-xl ${bonus.logoClass} text-xs font-black`}>{bonus.logo}</div>
      <span className="flex-1 text-sm font-semibold">{name}</span>
      <span className="text-sm font-black text-neon">{value}</span>
    </div>
  );
}

export default function ProfitPage() {
  return (
    <>
      <Header title="Můj potenciální zisk" back />
      <GlassCard className="mb-5 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-3xl font-black">4 100 Kč</p>
            <p className="mt-1 text-sm text-slate-400">z 5 dostupných bonusů</p>
          </div>
          <ProgressRing size={104} />
        </div>
      </GlassCard>
      <section className="mb-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-300">Aktivované bonusy</h2>
        <div className="space-y-2">
          {activeBonusRows.map(([name, value]) => (
            <ProfitRow key={name} name={name} value={value} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-300">Neaktivované bonusy</h2>
        <div className="space-y-2">
          {inactiveBonusRows.map(([name, value]) => (
            <ProfitRow key={name} name={name} value={value} />
          ))}
        </div>
      </section>
    </>
  );
}
