import { ArrowRight, Banknote, Camera, CheckCircle2, ClipboardCheck, FileText, Link2, Send, ShieldCheck, UserPlus } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import Header from "../components/Header";
import { GlassCard, NeonButton } from "../components/ui";

const steps = [
  {
    title: "Pošli odkaz",
    text: "Kamarád si přes tebe otevře nabídku a dokončí registraci.",
    icon: UserPlus
  },
  {
    title: "Nahraje proof",
    text: "Do krátkého dotazníku přidá potvrzení a pár slov k dokončení.",
    icon: Camera
  },
  {
    title: "Vyplatíme odměnu",
    text: "Po ověření pošleme 100 Kč na účet, který uvedeš.",
    icon: Banknote
  }
];

export default function RewardsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const copyInviteLink = () => {
    const inviteUrl = `${window.location.origin}/?ref=pozvanka`;
    const writeInviteUrl = navigator.clipboard?.writeText(inviteUrl) ?? Promise.resolve();
    void writeInviteUrl.finally(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <>
      <Header title="Pozvat" />
      <section className="space-y-4 pb-24 xl:pb-0">
        <GlassCard className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-xl font-black leading-tight">Pozvi kamaráda</h2>
              <p className="mt-1 text-sm leading-5 text-slate-400">Kamarád dokončí bonus, pošle proof a po kontrole vyplatíme odměnu.</p>
            </div>
            <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[.045] px-3 py-2 text-right">
              <p className="text-[11px] font-bold text-slate-500">odměna</p>
              <p className="text-xl font-black leading-tight text-white">100 Kč</p>
              <p className="text-[10px] font-medium text-slate-500">po kontrole</p>
            </div>
          </div>

          <div className="mt-4 rounded-[18px] border border-white/10 bg-[#06131b] p-3">
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
              <div className="min-w-0 text-center">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-2xl bg-neon/15 text-neon">
                  <Link2 size={18} />
                </span>
                <p className="mt-2 text-[11px] font-bold text-slate-200">Odkaz</p>
              </div>
              <ArrowRight size={15} className="text-slate-600" />
              <div className="min-w-0 text-center">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                  <CheckCircle2 size={18} />
                </span>
                <p className="mt-2 text-[11px] font-bold text-slate-200">Bonus</p>
              </div>
              <ArrowRight size={15} className="text-slate-600" />
              <div className="min-w-0 text-center">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-2xl bg-amber-300/15 text-amber-300">
                  <Banknote size={18} />
                </span>
                <p className="mt-2 text-[11px] font-bold text-slate-200">Výplata</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.035] px-3 py-2">
              <Camera size={16} className="shrink-0 text-neon" />
              <p className="text-xs leading-5 text-slate-400">Proof nahraje do dotazníku níže.</p>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-3 xl:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <GlassCard key={step.title} className="p-4">
                <div className="flex gap-3 xl:block">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[.07] text-neon xl:mb-3">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black">{step.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{step.text}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <GlassCard className="p-4">
          <div className="mb-4 flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-300/15 text-amber-300">
              <ClipboardCheck size={20} />
            </span>
            <div>
              <h2 className="text-lg font-black">Dotazník pro vyplacení</h2>
              <p className="mt-1 text-sm leading-5 text-slate-400">
                Vyplň ho až ve chvíli, kdy kamarád nabídku dokončil. Proof nahraj ideálně jako výřez bez zbytečných osobních údajů.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-[18px] border border-neon/25 bg-neon/10 p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-neon text-[#03130c]">
                  <CheckCircle2 size={22} />
                </span>
                <div>
                  <h3 className="font-black text-neon">Odesláno ke kontrole</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-300">Po ověření ti dáme vědět a připravíme výplatu.</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-bold text-slate-300">Co kamarád dokončil</span>
                <textarea
                  required
                  rows={4}
                  placeholder="Např. mBank, registrace dokončena, platby kartou splněny..."
                  className="w-full resize-none rounded-[18px] border border-white/10 bg-[#07131b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-bold text-slate-300">Proof dokončení</span>
                <div className="flex min-h-[112px] cursor-pointer flex-col items-center justify-center rounded-[18px] border border-dashed border-white/15 bg-white/[.035] px-4 py-5 text-center transition hover:border-neon/40">
                  <Camera size={24} className="text-neon" />
                  <span className="mt-2 text-sm font-bold text-white">Nahrát fotku nebo PDF</span>
                  <span className="mt-1 text-xs leading-5 text-slate-500">Stačí screenshot potvrzení, bez hesel a citlivých detailů.</span>
                  <input required type="file" accept="image/*,.pdf" className="sr-only" />
                </div>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-bold text-slate-300">Jméno pro výplatu</span>
                <input
                  required
                  placeholder="Tvoje jméno"
                  className="h-12 w-full rounded-[18px] border border-white/10 bg-[#07131b] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-bold text-slate-300">Číslo účtu</span>
                <input
                  required
                  inputMode="numeric"
                  placeholder="123456789/0100"
                  className="h-12 w-full rounded-[18px] border border-white/10 bg-[#07131b] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
                />
              </label>

              <label className="flex gap-3 rounded-[18px] border border-white/10 bg-white/[.035] p-3 text-xs leading-5 text-slate-400">
                <input required type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#22f979]" />
                <span>Souhlasím se zpracováním údajů pro ověření doporučení a vyplacení odměny.</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={copyInviteLink}
                  className="glass-button flex h-12 items-center justify-center gap-2 px-3 text-sm font-bold text-white transition active:scale-95"
                >
                  <FileText size={18} /> {copied ? "Zkopírováno" : "Kopírovat odkaz"}
                </button>
                <NeonButton type="submit" className="h-12 px-3 text-sm">
                  <Send size={17} className="inline" /> Odeslat
                </NeonButton>
              </div>
            </form>
          )}
        </GlassCard>

        <div className="rounded-[18px] border border-white/10 bg-white/[.035] p-4">
          <div className="flex gap-3">
            <ShieldCheck size={19} className="mt-0.5 shrink-0 text-neon" />
            <p className="text-xs leading-5 text-slate-400">
              Pro ověření stačí minimum údajů. Neposílej hesla, celé výpisy ani doklady totožnosti, pokud je výslovně nevyžádáme.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
