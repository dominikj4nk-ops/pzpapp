import Header from "../components/Header";
import { GlassCard } from "../components/ui";
import { cashbackStores } from "../data/mockData";
import { useState } from "react";

export default function CashbackPage() {
  const [selected, setSelected] = useState("");

  return (
    <>
      <Header title="Cashback" />
      <section className="space-y-3">
        {cashbackStores.map((store) => {
          return (
            <button key={store.name} onClick={() => setSelected(store.name)} className="w-full text-left">
              <GlassCard className="flex items-center gap-3 p-3 transition hover:border-neon/30">
                <div className={`relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${store.color} text-xl font-black shadow-glow`}>
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
                  {selected === store.name ? <p className="mt-1 text-xs font-bold text-neon">Cashback připraven</p> : null}
                </div>
              </GlassCard>
            </button>
          );
        })}
      </section>
    </>
  );
}
