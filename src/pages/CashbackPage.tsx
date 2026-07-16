import { AnimatePresence, motion } from "framer-motion";
import { BadgePercent, Check, CheckCircle2, ChevronDown, Copy, ExternalLink, Info } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import { GlassCard } from "../components/ui";
import { referralDeals, type ReferralDeal } from "../data/mockData";

type DealCardProps = {
  deal: ReferralDeal;
  isOpen: boolean;
  copiedCode: string;
  onToggle: () => void;
  onCopy: (code: string) => void;
  onOpen: (url: string) => void;
};

function CashbackDealCard({ deal, isOpen, copiedCode, onToggle, onCopy, onOpen }: DealCardProps) {
  return (
    <GlassCard className={`overflow-hidden transition ${isOpen ? "border-neon/30" : "hover:border-neon/30"}`}>
      <button onClick={onToggle} className="flex min-h-[80px] w-full items-center gap-3 p-3 text-left" aria-expanded={isOpen}>
        <div className={`relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-gradient-to-br ${deal.color} text-xl font-black shadow-[0_10px_20px_rgba(0,0,0,.24)]`}>
          <img
            src={deal.logoUrl}
            alt={`${deal.name} logo`}
            className="relative z-10 h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              event.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <span className="hidden">{deal.logo}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <p className="truncate font-bold">{deal.name}</p>
            <span className="rounded-[8px] border border-neon/25 bg-neon/10 px-2 py-0.5 text-[11px] font-black text-neon">
              {deal.reward}
            </span>
          </div>
          <p className="mt-0.5 text-sm leading-5 text-slate-300">{deal.tagline}</p>
        </div>

        <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-neon" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[.08] p-4">
              <p className="text-sm leading-6 text-slate-300">{deal.description}</p>

              <div className="mt-3 space-y-2">
                {deal.steps.map((step, index) => (
                  <div key={step} className="flex min-h-10 items-start gap-2.5 rounded-[12px] bg-white/[.04] px-3 py-2 text-xs leading-5 text-slate-200">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neon/12 text-[10px] font-black text-neon">
                      {index + 1}
                    </span>
                    <span className="min-w-0">{step}</span>
                  </div>
                ))}
              </div>

              {deal.promoCode ? (
                <button
                  type="button"
                  onClick={() => onCopy(deal.promoCode!)}
                  className="glass-button mt-3 flex min-h-10 w-full items-center justify-between gap-3 px-3 py-2 text-left text-xs font-bold text-slate-200 transition hover:border-neon/30"
                >
                  <span className="min-w-0">Slevový kód <strong className="ml-1 text-white">{deal.promoCode}</strong></span>
                  <span className="flex shrink-0 items-center gap-1.5 text-neon">
                    {copiedCode === deal.promoCode ? <Check size={14} /> : <Copy size={14} />}
                    {copiedCode === deal.promoCode ? "Zkopírováno" : "Kopírovat"}
                  </span>
                </button>
              ) : null}

              {deal.note ? (
                <p className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-slate-500">
                  <Info size={13} className="mt-1 shrink-0" /> {deal.note}
                </p>
              ) : null}

              <button
                onClick={() => onOpen(deal.partnerUrl)}
                className="neon-button mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-[14px] px-4 py-2 text-sm font-black text-[#02130c] transition active:scale-95"
              >
                {deal.actionLabel ?? `Získat ${deal.reward}`} <ExternalLink size={15} />
              </button>
              <p className="mt-2 flex items-center justify-center gap-1 text-center text-[11px] leading-4 text-slate-500">
                <CheckCircle2 size={12} className="shrink-0 text-neon" /> Ověřená akce pro nové uživatele
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </GlassCard>
  );
}

export default function CashbackPage() {
  const [openId, setOpenId] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<string>("");

  const toggle = (id: string) => setOpenId((current) => (current === id ? "" : id));
  const openDeal = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    window.setTimeout(() => setCopiedCode(""), 1800);
  };
  const renderDeal = (deal: ReferralDeal) => (
    <CashbackDealCard
      key={deal.id}
      deal={deal}
      isOpen={openId === deal.id}
      copiedCode={copiedCode}
      onToggle={() => toggle(deal.id)}
      onCopy={(code) => void copyCode(code)}
      onOpen={openDeal}
    />
  );

  return (
    <>
      <Header title="Cashback" />
      <GlassCard className="mb-4 p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-pink-400/15 text-pink-400">
            <BadgePercent size={20} />
          </span>
          <div className="min-w-0">
            <h2 className="font-black">Kredity a slevy zdarma</h2>
            <p className="mt-0.5 text-xs leading-5 text-slate-400">
              Ověřené akce pro nové uživatele. Po rozkliknutí vždy uvidíš přesný postup i důležité podmínky.
            </p>
          </div>
        </div>
      </GlassCard>

      <section className="space-y-3 xl:hidden">
        {referralDeals.map(renderDeal)}
      </section>

      <section className="hidden grid-cols-2 items-start gap-3 xl:grid">
        <div className="space-y-3">{referralDeals.filter((_, index) => index % 2 === 0).map(renderDeal)}</div>
        <div className="space-y-3">{referralDeals.filter((_, index) => index % 2 === 1).map(renderDeal)}</div>
      </section>
    </>
  );
}
