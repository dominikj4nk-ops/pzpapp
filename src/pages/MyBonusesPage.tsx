import { CheckCircle2, ChevronRight, ClipboardList, Heart, TimerReset, WalletCards } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FilterTabs, GlassCard, LogoMark } from "../components/ui";
import { bonusFilters, myBonuses } from "../data/mockData";
import { paths } from "../routes/paths";

const statusClass = {
  Aktivní: "border-neon/25 bg-neon/12 text-neon",
  Dokončeno: "border-blue-300/20 bg-blue-400/12 text-blue-300",
  Neaktivní: "border-white/10 bg-white/[.08] text-slate-400"
};

export default function MyBonusesPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Vše");

  const activeBonuses = useMemo(() => myBonuses.filter((bonus) => bonus.status === "Aktivní"), []);
  const completedBonuses = useMemo(() => myBonuses.filter((bonus) => bonus.status === "Dokončeno"), []);
  const wishlistBonuses = useMemo(() => myBonuses.filter((bonus) => bonus.status === "Neaktivní"), []);

  const filtered = useMemo(() => {
    if (active === "Aktivní") return activeBonuses;
    if (active === "Dokončené") return completedBonuses;
    if (active === "Wishlist") return wishlistBonuses;
    return myBonuses;
  }, [active, activeBonuses, completedBonuses, wishlistBonuses]);

  return (
    <>
      <Header title="Profil" back />

      <GlassCard className="mb-4 overflow-hidden p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.12em] text-neon">Můj přehled</p>
            <h2 className="mt-1 text-2xl font-black leading-tight">Bonusy pod kontrolou</h2>
            <p className="mt-2 max-w-[280px] text-sm leading-5 text-slate-400">
              Tady máš rozdělané nabídky, hotové bonusy i wishlist, kam si necháš věci na později.
            </p>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-neon/20 bg-neon/12 text-neon shadow-glow">
            <WalletCards size={24} />
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-white/10 bg-white/[.055] p-3">
            <TimerReset size={17} className="mb-2 text-neon" />
            <p className="text-xl font-black">{activeBonuses.length}</p>
            <p className="text-[11px] leading-4 text-slate-400">rozpracované</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.055] p-3">
            <CheckCircle2 size={17} className="mb-2 text-blue-300" />
            <p className="text-xl font-black">{completedBonuses.length}</p>
            <p className="text-[11px] leading-4 text-slate-400">hotovo</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.055] p-3">
            <Heart size={17} className="mb-2 text-pink-300" />
            <p className="text-xl font-black">{wishlistBonuses.length}</p>
            <p className="text-[11px] leading-4 text-slate-400">wishlist</p>
          </div>
        </div>
      </GlassCard>

      <div className="mb-4">
        <FilterTabs tabs={bonusFilters} active={active} onChange={setActive} />
      </div>

      <section className="space-y-3">
        {filtered.map((bonus) => {
          const isDone = bonus.status === "Dokončeno";
          const isWishlist = bonus.status === "Neaktivní";

          return (
            <button key={bonus.id} onClick={() => navigate(paths.exchangeDetail(bonus.id))} className="w-full text-left">
              <GlassCard className="p-3 transition hover:border-neon/30">
                <div className="flex items-center gap-3">
                  <LogoMark bonus={bonus} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-bold">{bonus.name}</p>
                      <span className={`shrink-0 rounded-xl border px-2 py-1 text-[10px] font-bold ${statusClass[bonus.status ?? "Neaktivní"]}`}>
                        {isWishlist ? "Wishlist" : bonus.status}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm font-black text-neon">{bonus.bonus}</p>
                    <p className="mt-1 text-xs leading-4 text-slate-400">
                      {isDone ? "Proof uložený, bonus počítáme do hotových." : isWishlist ? "Nech si ji bokem a vrať se, až bude čas." : "Rozdělané. Dokonči podmínky a pošli proof."}
                    </p>
                  </div>
                  <ChevronRight size={17} className="shrink-0 text-slate-500" />
                </div>
                {!isWishlist ? (
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[.08]">
                    <div className={`h-full rounded-full ${isDone ? "w-full bg-blue-300" : "w-2/3 bg-neon"}`} />
                  </div>
                ) : null}
              </GlassCard>
            </button>
          );
        })}
      </section>

      {active === "Vše" ? (
        <GlassCard className="mt-4 p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/[.06] text-neon">
              <ClipboardList size={20} />
            </span>
            <div>
              <h3 className="font-bold">Další krok</h3>
              <p className="mt-1 text-sm leading-5 text-slate-400">
                Začni tím, co je rozdělané. Wishlist si nechává nabídky bokem, aby se ti neztratily mezi hotovými bonusy.
              </p>
            </div>
          </div>
        </GlassCard>
      ) : null}
    </>
  );
}
