import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FilterTabs, GlassCard, LogoMark } from "../components/ui";
import { bonusFilters, myBonuses } from "../data/mockData";
import { paths } from "../routes/paths";

const statusClass = {
  Aktivní: "bg-neon/12 text-neon",
  Dokončeno: "bg-blue-400/12 text-blue-300",
  Neaktivní: "bg-white/[.08] text-slate-400"
};

export default function MyBonusesPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Vše");
  const filtered = active === "Vše" ? myBonuses : myBonuses.filter((bonus) => (active === "Dokončené" ? bonus.status === "Dokončeno" : bonus.status === active));

  return (
    <>
      <Header title="Moje bonusy" back />
      <FilterTabs tabs={bonusFilters} active={active} onChange={setActive} />
      <section className="mt-4 space-y-3">
        {filtered.map((bonus) => (
          <button key={bonus.id} onClick={() => navigate(paths.exchangeDetail(bonus.id))} className="w-full text-left">
            <GlassCard className="flex items-center gap-3 p-3">
              <LogoMark bonus={bonus} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="font-bold">{bonus.name}</p>
                <p className="text-sm font-black text-neon">{bonus.bonus}</p>
              </div>
              <span className={`rounded-xl px-2 py-1 text-[11px] font-bold ${statusClass[bonus.status ?? "Neaktivní"]}`}>
                {bonus.status}
              </span>
            </GlassCard>
          </button>
        ))}
      </section>
    </>
  );
}
