import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import { GlassCard, Toggle } from "../components/ui";

function SettingLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[.08] py-3 text-sm last:border-0">
      <span>{label}</span>
      <span className="text-slate-400">{value}</span>
    </div>
  );
}

function LinkLine({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between border-b border-white/[.08] py-3 text-left text-sm last:border-0">
      <span>{label}</span>
      <ChevronRight size={16} className="text-slate-500" />
    </button>
  );
}

export default function SettingsPage() {
  const [dark, setDark] = useState(true);
  const [bonus, setBonus] = useState(true);
  const [rewards, setRewards] = useState(true);
  const [cashback, setCashback] = useState(true);
  const [note, setNote] = useState("");

  return (
    <>
      <Header title="Nastavení" back />
      <section className="space-y-4">
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-300">Obecné</h2>
          <GlassCard className="p-4">
            <SettingLine label="Jazyk" value="Čeština" />
            <SettingLine label="Měna" value="CZK - Kč" />
            <div className="flex items-center justify-between pt-3 text-sm">
              <span>Tmavý režim</span>
              <Toggle checked={dark} onChange={() => setDark((value) => !value)} />
            </div>
          </GlassCard>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-300">Notifikace</h2>
          <GlassCard className="space-y-3 p-4">
            <div className="flex items-center justify-between text-sm"><span>Nové bonusy</span><Toggle checked={bonus} onChange={() => setBonus((value) => !value)} /></div>
            <div className="flex items-center justify-between text-sm"><span>Pozvánky a odměny</span><Toggle checked={rewards} onChange={() => setRewards((value) => !value)} /></div>
            <div className="flex items-center justify-between text-sm"><span>Cashback nabídky</span><Toggle checked={cashback} onChange={() => setCashback((value) => !value)} /></div>
          </GlassCard>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-300">Ostatní</h2>
          <GlassCard className="p-4">
            <LinkLine label="Soukromí" onClick={() => setNote("Soukromí je v prototypu připravené.")} />
            <LinkLine label="Podmínky použití" onClick={() => setNote("Podmínky použití jsou ukázková sekce.")} />
            <LinkLine label="O aplikaci" onClick={() => setNote("prachyzaregistraci.cz prototyp 2026")} />
          </GlassCard>
          {note ? <p className="mt-3 rounded-2xl bg-neon/10 p-3 text-sm text-neon">{note}</p> : null}
        </div>
      </section>
    </>
  );
}
