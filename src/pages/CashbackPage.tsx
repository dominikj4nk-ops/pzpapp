import { BadgePercent, CheckCircle2, ChevronDown, ExternalLink, Info } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import { GlassCard } from "../components/ui";
import { referralDeals } from "../data/mockData";

export default function CashbackPage() {
  const [openId, setOpenId] = useState<string>("");
  const toggle = (id: string) => setOpenId((current) => (current === id ? "" : id));

  const openDeal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Header title="Cashback" />
      <GlassCard className="mb-4 p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-pink-400/15 text-pink-400">
            <BadgePercent size={20} />
          </span>
          <div className="min-w-0">
            <h2 className="font-black">Kredity a slevy zdarma</h2>
            <p className="mt-0.5 text-xs leading-5 text-slate-400">
              Ověřené akce, kde jako nový uživatel dostaneš reálné peníze nebo kredit. Rozklikni a zjisti, co přesně získáš.
            </p>
          </div>
        </div>
      </GlassCard>

      <section className="grid gap-3 xl:grid-cols-2 xl:items-start">
        {referralDeals.map((deal) => {
          const isOpen = openId === deal.id;

          return (
            <GlassCard key={deal.id} className={`overflow-hidden transition ${isOpen ? "border-neon/30" : "hover:border-neon/30"}`}>
              <button onClick={() => toggle(deal.id)} className="flex w-full items-center gap-3 p-3 text-left" aria-expanded={isOpen}>
                <div className={`relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${deal.color} text-xl font-black shadow-[0_10px_20px_rgba(0,0,0,.24)]`}>
                  <img
                    src={deal.logoUrl}
                    alt={`${deal.name} logo`}
                    className="relative z-10 h-full w-full scale-110 object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <span className="hidden">{deal.logo}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{deal.name}</p>
                    <span className="rounded-lg border border-neon/25 bg-neon/10 px-2 py-0.5 text-[11px] font-black text-neon">
                      {deal.reward}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-300">{deal.tagline}</p>
                </div>
                <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-neon" : ""}`} />
              </button>

              {isOpen ? (
                <div className="border-t border-white/[.08] p-3 pt-3">
                  <p className="text-sm leading-6 text-slate-300">{deal.description}</p>

                  <div className="mt-3 space-y-2">
                    {deal.steps.map((step, index) => (
                      <div key={step} className="flex items-start gap-2.5 rounded-xl bg-white/[.04] px-3 py-2 text-xs leading-5 text-slate-200">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neon/12 text-[10px] font-black text-neon">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  {deal.note ? (
                    <p className="mt-3 flex items-start gap-2 text-[11px] leading-4 text-slate-500">
                      <Info size={13} className="mt-0.5 shrink-0" /> {deal.note}
                    </p>
                  ) : null}

                  <button
                    onClick={() => openDeal(deal.partnerUrl)}
                    className="neon-button mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[16px] text-sm font-black text-[#02130c] transition active:scale-95"
                  >
                    Získat {deal.reward} <ExternalLink size={15} />
                  </button>
                  <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-slate-500">
                    <CheckCircle2 size={12} className="text-neon" /> Ověřená akce pro nové uživatele
                  </p>
                </div>
              ) : null}
            </GlassCard>
          );
        })}
      </section>
    </>
  );
}
