import { BadgePercent, CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import { GlassCard } from "../components/ui";
import { cashbackStores } from "../data/mockData";

const storageKey = "pzp:cashback-active";

function readActiveStores() {
  try {
    const value = window.localStorage.getItem(storageKey);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter((name): name is string => typeof name === "string") : [];
  } catch {
    return [];
  }
}

export default function CashbackPage() {
  const [activeStores, setActiveStores] = useState<string[]>(readActiveStores);

  const activateStore = (name: string) => {
    setActiveStores((prev) => {
      if (prev.includes(name)) return prev;
      const next = [...prev, name];
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // úložiště není dostupné, stav zůstane jen pro tuto relaci
      }
      return next;
    });
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
            <h2 className="font-black">Peníze zpět z nákupů</h2>
            <p className="mt-0.5 text-xs leading-5 text-slate-400">
              Aktivuj obchod a nakup přes něj. Cashback se připíše podle podmínek partnera.
            </p>
          </div>
        </div>
        {activeStores.length ? (
          <p className="mt-3 rounded-2xl border border-neon/20 bg-neon/[.07] px-3 py-2 text-xs font-bold text-neon">
            Aktivováno obchodů: {activeStores.length}
          </p>
        ) : null}
      </GlassCard>

      <section className="grid gap-3 xl:grid-cols-2">
        {cashbackStores.map((store) => {
          const isActive = activeStores.includes(store.name);

          return (
            <button key={store.name} onClick={() => activateStore(store.name)} className="w-full text-left">
              <GlassCard className={`flex items-center gap-3 p-3 transition ${isActive ? "border-neon/30" : "hover:border-neon/30"}`}>
                <div className={`relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${store.color} text-xl font-black shadow-[0_10px_20px_rgba(0,0,0,.24)]`}>
                  <img
                    src={store.logoUrl}
                    alt={`${store.name} logo`}
                    className="relative z-10 h-full w-full scale-110 object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <span className="hidden">{store.logo}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{store.name}</p>
                  <p className="text-sm text-slate-300">{store.text}</p>
                  {isActive ? (
                    <p className="mt-1 flex items-center gap-1 text-xs font-bold text-neon">
                      <CheckCircle2 size={13} /> Aktivováno – nákup se započítá
                    </p>
                  ) : null}
                </div>
                {isActive ? null : (
                  <span className="flex shrink-0 items-center gap-1 rounded-xl border border-white/10 bg-white/[.06] px-3 py-2 text-xs font-bold text-white">
                    Aktivovat <ChevronRight size={13} className="text-neon" />
                  </span>
                )}
              </GlassCard>
            </button>
          );
        })}
      </section>
    </>
  );
}
