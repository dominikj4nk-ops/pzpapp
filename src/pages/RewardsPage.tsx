import { CheckCircle2, Copy, Hourglass, Send, Share2, UserPlus } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import { addReferralClaim, getReferralLink, useReferralClaims } from "../components/referralState";
import { GlassCard, NeonButton, SectionHeading } from "../components/ui";
import { formatKc, REFERRAL_REWARD } from "../data/mockData";

const MONTHLY_CLAIM_LIMIT = 5;

export default function RewardsPage() {
  const claims = useReferralClaims();
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [offer, setOffer] = useState("");
  const [completedAt, setCompletedAt] = useState("");
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [fileName, setFileName] = useState("");
  const [consent, setConsent] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    setInviteLink(getReferralLink());
    return () => window.clearTimeout(copyTimer.current);
  }, []);

  const pendingClaims = useMemo(() => claims.filter((claim) => claim.status === "V kontrole"), [claims]);
  const monthlyClaims = useMemo(() => {
    const now = new Date();
    return claims.filter((claim) => {
      const created = new Date(claim.createdAt);
      return created.getFullYear() === now.getFullYear() && created.getMonth() === now.getMonth();
    });
  }, [claims]);
  const limitReached = monthlyClaims.length >= MONTHLY_CLAIM_LIMIT;

  const copyInviteLink = () => {
    const writeInviteUrl = navigator.clipboard?.writeText(inviteLink) ?? Promise.resolve();
    void writeInviteUrl.catch(() => undefined).finally(() => {
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
    });
  };

  const shareInvite = () => {
    if (typeof navigator.share === "function") {
      void navigator
        .share({ title: "prachyzaregistraci.cz", text: "Vydělej si na bonusech za registrace. Tady je můj odkaz:", url: inviteLink })
        .catch(() => undefined);
    } else {
      copyInviteLink();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addReferralClaim({ offer, completedAt, name: name.trim(), account: account.trim(), fileName });
    event.currentTarget.reset();
    setOffer("");
    setCompletedAt("");
    setName("");
    setAccount("");
    setFileName("");
    setConsent(false);
    setJustSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header title="Pozvi přátele" back />
      <section className="space-y-4">
        {justSubmitted ? (
          <div className="flex items-center gap-3 rounded-[18px] border border-neon/25 bg-neon/10 p-3">
            <CheckCircle2 size={20} className="shrink-0 text-neon" />
            <p className="text-sm font-bold text-neon">Odesláno ke kontrole – najdeš to níže.</p>
          </div>
        ) : null}

        <GlassCard className="p-4 xl:p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow-glow">
              <UserPlus size={22} />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-black leading-tight">{formatKc(REFERRAL_REWARD)} za kamaráda</h2>
              <p className="text-xs leading-5 text-slate-400">Dokončí bonus přes tvůj odkaz → odměna je tvoje.</p>
            </div>
          </div>

          <p className="mt-4 truncate rounded-xl border border-white/10 bg-[#06131b] px-3 py-2.5 text-sm font-semibold text-slate-200">
            {inviteLink || "Načítám odkaz..."}
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              onClick={copyInviteLink}
              className="glass-button flex h-11 items-center justify-center gap-2 px-3 text-sm font-bold text-white transition active:scale-95"
            >
              {copied ? <CheckCircle2 size={17} className="text-neon" /> : <Copy size={17} />}
              {copied ? "Zkopírováno" : "Kopírovat"}
            </button>
            <NeonButton onClick={shareInvite} className="h-11 px-3 text-sm">
              <Share2 size={16} className="inline" /> Sdílet
            </NeonButton>
          </div>
        </GlassCard>

        <GlassCard className="p-4 xl:p-5">
          <h2 className="text-base font-black">Máš dokončeného kamaráda?</h2>
          <p className="mt-1 text-xs leading-5 text-slate-400">Vyplň krátký formulář. Odměnu vyplatíme po potvrzení partnerem.</p>

          {limitReached ? (
            <div className="mt-3 flex items-center gap-3 rounded-[18px] border border-amber-300/25 bg-amber-300/10 p-3">
              <Hourglass size={18} className="shrink-0 text-amber-300" />
              <p className="text-sm leading-5 text-slate-200">
                Tento měsíc máš {MONTHLY_CLAIM_LIMIT} žádostí. Další od začátku příštího měsíce.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  value={offer}
                  onChange={(event) => setOffer(event.target.value)}
                  placeholder="Nabídka (např. mBank)"
                  className="h-12 w-full rounded-[18px] border border-white/10 bg-[#07131b] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
                />
                <input
                  required
                  type="date"
                  value={completedAt}
                  max={today}
                  onChange={(event) => setCompletedAt(event.target.value)}
                  className="h-12 w-full rounded-[18px] border border-white/10 bg-[#07131b] px-4 text-sm text-white outline-none transition focus:border-neon/50"
                />
              </div>

              <label
                className={`flex min-h-[64px] cursor-pointer items-center justify-center gap-2 rounded-[18px] border border-dashed px-4 py-3 text-center text-sm transition hover:border-neon/40 ${
                  fileName ? "border-neon/40 bg-neon/[.06] text-white" : "border-white/15 bg-white/[.035] text-slate-400"
                }`}
              >
                {fileName ? <CheckCircle2 size={18} className="text-neon" /> : null}
                <span className="truncate font-bold">{fileName || "Nahrát screenshot potvrzení"}</span>
                <input
                  required
                  type="file"
                  accept="image/*,.pdf"
                  className="sr-only"
                  onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Jméno pro výplatu"
                  autoComplete="name"
                  className="h-12 w-full rounded-[18px] border border-white/10 bg-[#07131b] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
                />
                <input
                  required
                  value={account}
                  onChange={(event) => setAccount(event.target.value)}
                  pattern="(\d{1,6}-)?\d{2,10}/\d{4}"
                  title="Zadej číslo účtu ve formátu 123456789/0100"
                  placeholder="Číslo účtu"
                  className="h-12 w-full rounded-[18px] border border-white/10 bg-[#07131b] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
                />
              </div>

              <label className="flex gap-2 text-xs leading-5 text-slate-400">
                <input
                  required
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#22f979]"
                />
                <span>Souhlasím s podmínkami a zpracováním údajů pro vyplacení odměny.</span>
              </label>

              <NeonButton type="submit" className="w-full">
                <Send size={17} className="inline" /> Odeslat ke kontrole
              </NeonButton>
            </form>
          )}
        </GlassCard>

        {claims.length ? (
          <section>
            <SectionHeading title="Tvoje žádosti" />
            <div className="space-y-2">
              {claims.map((claim) => (
                <GlassCard key={claim.id} className="flex items-center gap-3 p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-amber-300/15 text-amber-300">
                    {claim.status === "Vyplaceno" ? <CheckCircle2 size={17} /> : <Hourglass size={17} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{claim.offer || "Doporučení"}</p>
                    <p className="text-xs text-slate-500">{claim.name}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-black text-neon">{formatKc(REFERRAL_REWARD)}</p>
                    <span className={`text-[11px] font-bold ${claim.status === "Vyplaceno" ? "text-neon" : "text-amber-300"}`}>
                      {claim.status}
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
            {pendingClaims.length ? (
              <p className="mt-2 text-xs text-slate-500">
                Ve frontě na kontrolu: {pendingClaims.length} · po potvrzení dostaneš {formatKc(pendingClaims.length * REFERRAL_REWARD)}.
              </p>
            ) : null}
          </section>
        ) : null}

        <details className="rounded-[18px] border border-white/10 bg-white/[.035] p-4 text-slate-400">
          <summary className="cursor-pointer text-sm font-bold text-slate-200">Podmínky odměny</summary>
          <ul className="mt-2 space-y-1.5 text-xs leading-5">
            <li>• Kamarád musí být nový klient a dokončit nabídku přes tvůj odkaz.</li>
            <li>• Odměnu vyplácíme po potvrzení registrace partnerem (obvykle do 30 dnů).</li>
            <li>• Pokud důkaz nebude jasný nebo ho nepůjde ověřit, nemáme povinnost odměnu vyplatit.</li>
            <li>• Max. {MONTHLY_CLAIM_LIMIT} odměn měsíčně, jedna za kamaráda a nabídku.</li>
            <li>• Nelze pozvat sám sebe. Nikdy nechceme hesla ani přístupy do banky.</li>
          </ul>
        </details>
      </section>
    </>
  );
}
