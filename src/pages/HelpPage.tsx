import { ChevronDown, Clock3, HelpCircle, Instagram, Lightbulb, Mail, Send, ShieldCheck } from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import type { ComponentType, FormEvent } from "react";
import { useState } from "react";
import Header from "../components/Header";
import { FORM_TARGET_EMAIL, HONEYPOT_FIELD, RATE_LIMIT_MESSAGE, sendForm } from "../components/formMailer";
import { GlassCard, TikTokIcon } from "../components/ui";

const CONTACT_EMAIL = FORM_TARGET_EMAIL;

type FormStatus = "idle" | "sending" | "sent" | "error" | "rate-limited";

type ContactMethod = {
  icon: LucideIcon | ComponentType<LucideProps>;
  label: string;
  value: string;
  hint: string;
  href: string;
  external?: boolean;
};

const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    label: "E-mail",
    value: CONTACT_EMAIL,
    hint: "Dotazy k nabídkám, podmínkám i výplatám.",
    href: `mailto:${CONTACT_EMAIL}`
  },
  {
    icon: TikTokIcon as ComponentType<LucideProps>,
    label: "TikTok",
    value: "@prachyzaregistraci",
    hint: "Nové akce a krátké návody.",
    href: "https://www.tiktok.com/@prachyzaregistraci",
    external: true
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@prachyzaregistracicz",
    hint: "Rychlá zpráva přes DM.",
    href: "https://instagram.com/prachyzaregistracicz",
    external: true
  }
];

const faqs = [
  ["Je to opravdu zdarma?", "Ano. Registrace u partnerů jsou zdarma a my si z tvého bonusu nic nebereme. Platí nás partneři za doporučení."],
  ["Jak získám bonus?", "Vyber nabídku, otevři detail a dokonči registraci u partnera přesně podle uvedených kroků. Bonus potom vyplatí partner."],
  ["Kdy mi přijdou peníze?", "Záleží na partnerovi a splnění všech podmínek. Orientační i nejzazší dohledatelný termín uvádíme v detailu nabídky."],
  ["Jak ověřujete bezpečnost?", "Aktivní nabídky porovnáváme s oficiálním zdrojem poskytovatele. Registrace probíhá přímo u partnera a nikdy po tobě nechceme heslo."],
  ["Musím účet po získání bonusu zrušit?", "Nemusíš. Účet můžeš dál používat, nebo ho po vyplacení bonusu zrušit podle podmínek partnera."],
  ["Nepřišel mi bonus, co teď?", "Napiš nám název nabídky, datum dokončení a co už máš splněno. Pomůžeme ti dohledat další postup."]
];

export default function HelpPage() {
  const [open, setOpen] = useState<string>("");
  const [contactStatus, setContactStatus] = useState<FormStatus>("idle");
  const [tipStatus, setTipStatus] = useState<FormStatus>("idle");
  const toggleFaq = (title: string) => setOpen((current) => (current === title ? "" : title));

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactStatus === "sending") return;
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!email || !message) return;

    setContactStatus("sending");
    const result = await sendForm("Dotaz z webu prachyzaregistraci.cz", {
      [HONEYPOT_FIELD]: String(data.get(HONEYPOT_FIELD) ?? ""),
      "E-mail pro odpověď": email,
      Zpráva: message
    });
    setContactStatus(result === "sent" ? "sent" : result === "rate-limited" ? "rate-limited" : "error");
  };

  const submitTip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (tipStatus === "sending") return;
    const data = new FormData(event.currentTarget);
    const link = String(data.get("link") ?? "").trim();
    if (!link) return;

    setTipStatus("sending");
    const result = await sendForm("Tip na novou nabídku", {
      [HONEYPOT_FIELD]: String(data.get(HONEYPOT_FIELD) ?? ""),
      "Odkaz na nabídku": link,
      Poznámka: String(data.get("note") ?? "").trim() || "bez poznámky"
    });
    setTipStatus(result === "sent" ? "sent" : result === "rate-limited" ? "rate-limited" : "error");
  };

  return (
    <>
      <Header title="Kontakt a podpora" back />
      <div className="space-y-4 xl:mx-auto xl:max-w-[1320px] xl:space-y-5">
        <section className="grid gap-4 xl:grid-cols-[minmax(320px,.78fr)_minmax(0,1.22fr)] xl:items-start xl:gap-5">
          <div className="space-y-4">
            <GlassCard className="p-4 xl:p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-neon/15 text-neon">
                  <Mail size={21} />
                </span>
                <div className="min-w-0">
                  <h1 className="text-lg font-black leading-tight">Jsme tu pro tebe</h1>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-neon">
                    <span className="h-2 w-2 rounded-full bg-neon" /> Po–Pá 9:00–18:00
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Napiš nám, se kterou nabídkou potřebuješ pomoct a co už máš splněno. Ozveme se co nejdřív.
              </p>
            </GlassCard>

            <div className="space-y-2.5" aria-label="Kontaktní možnosti">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={`${method.label}-${method.value}`}
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="glass-button flex min-h-[74px] items-center gap-3 p-3.5 text-left transition hover:border-neon/30 active:scale-[.99]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-white/[.07] text-neon">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-black uppercase text-slate-500">{method.label}</span>
                      <span className="mt-0.5 block break-all text-sm font-bold leading-5 text-white">{method.value}</span>
                      <span className="mt-0.5 block text-xs leading-4 text-slate-500">{method.hint}</span>
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="flex gap-3 rounded-[16px] border border-white/10 bg-white/[.03] p-4">
              <ShieldCheck size={19} className="mt-0.5 shrink-0 text-neon" />
              <p className="text-xs leading-5 text-slate-400">
                Nikdy po tobě nechceme heslo ani přístup do bankovnictví. Pro pomoc stačí název nabídky a datum dokončení.
              </p>
            </div>
          </div>

          <GlassCard className="p-4 xl:p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-neon/10 text-neon">
                <Clock3 size={18} />
              </span>
              <div>
                <h2 className="text-lg font-black">Napiš nám rovnou</h2>
                <p className="mt-0.5 text-xs text-slate-500">Popiš problém a přidej e-mail pro odpověď.</p>
              </div>
            </div>

            {contactStatus === "sent" ? (
              <div className="rounded-[16px] border border-neon/25 bg-neon/10 p-4 text-sm leading-6 text-slate-200">
                Díky! Zpráva je odeslaná, odpovíme ti na uvedený e-mail co nejdřív.
              </div>
            ) : (
              <form onSubmit={submitContact} className="space-y-3">
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold text-slate-400">E-mail pro odpověď</span>
                  <input required type="email" name="email" placeholder="jmeno@email.cz" autoComplete="email" className="h-12 w-full rounded-[14px] border border-white/10 bg-[#07131b] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold text-slate-400">S čím potřebuješ pomoct?</span>
                  <textarea required name="message" rows={7} placeholder="Název nabídky, kdy jsi ji dokončil a co se stalo…" className="w-full resize-none rounded-[14px] border border-white/10 bg-[#07131b] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50" />
                </label>
                <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute left-[-9999px] opacity-0" />
                {contactStatus === "rate-limited" ? <p className="rounded-[14px] border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-5 text-amber-100">{RATE_LIMIT_MESSAGE}</p> : null}
                {contactStatus === "error" ? (
                  <p className="rounded-[14px] border border-red-400/25 bg-red-400/10 p-3 text-sm leading-5 text-red-200">
                    Zprávu se nepodařilo odeslat. Napiš nám přímo na <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-red-100 underline">{CONTACT_EMAIL}</a>.
                  </p>
                ) : null}
                <button type="submit" disabled={contactStatus === "sending"} className="neon-button flex h-12 w-full items-center justify-center gap-2 rounded-[14px] px-4 text-sm font-black text-[#02130c] active:scale-95 disabled:opacity-60">
                  <Send size={17} /> {contactStatus === "sending" ? "Odesílám…" : "Odeslat zprávu"}
                </button>
              </form>
            )}
          </GlassCard>
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,.75fr)] xl:items-start xl:gap-5">
          <GlassCard className="overflow-hidden p-4 xl:p-5">
            <div className="mb-2 flex items-center gap-2 px-1 pb-3">
              <HelpCircle size={17} className="text-neon" />
              <h2 className="text-base font-black">Časté dotazy</h2>
            </div>
            <div className="divide-y divide-white/10 border-t border-white/10">
              {faqs.map(([title, answer]) => {
                const isOpen = open === title;
                return (
                  <div key={title}>
                    <button onClick={() => toggleFaq(title)} className="flex w-full items-center gap-3 px-1 py-3.5 text-left" aria-expanded={isOpen}>
                      <span className="flex-1 text-sm font-bold">{title}</span>
                      <ChevronDown size={16} className={`shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180 text-neon" : ""}`} />
                    </button>
                    {isOpen ? <p className="px-1 pb-4 pr-8 text-sm leading-6 text-slate-400">{answer}</p> : null}
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="p-4 xl:p-5">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb size={17} className="text-neon" />
              <h2 className="text-base font-black">Chybí nám nabídka?</h2>
            </div>
            <p className="mb-4 text-xs leading-5 text-slate-400">Pošli odkaz. Podmínky ověříme a pokud dávají smysl, přidáme ji do katalogu.</p>
            {tipStatus === "sent" ? (
              <div className="rounded-[14px] border border-neon/25 bg-neon/10 p-4 text-sm leading-6 text-slate-200">Díky za tip! Prověříme ho.</div>
            ) : (
              <form onSubmit={submitTip} className="space-y-3">
                <input required type="url" name="link" placeholder="https://… odkaz na nabídku" className="h-12 w-full rounded-[14px] border border-white/10 bg-[#07131b] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50" />
                <textarea name="note" rows={3} placeholder="Poznámka, např. výše bonusu" className="w-full resize-none rounded-[14px] border border-white/10 bg-[#07131b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50" />
                <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute left-[-9999px] opacity-0" />
                {tipStatus === "rate-limited" ? <p className="rounded-[14px] border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-5 text-amber-100">{RATE_LIMIT_MESSAGE}</p> : null}
                {tipStatus === "error" ? <p className="rounded-[14px] border border-red-400/25 bg-red-400/10 p-3 text-sm leading-5 text-red-200">Tip se nepodařilo odeslat. Zkus to znovu za chvíli.</p> : null}
                <button type="submit" disabled={tipStatus === "sending"} className="glass-button flex h-12 w-full items-center justify-center gap-2 rounded-[14px] px-4 text-sm font-black text-white active:scale-95 disabled:opacity-60">
                  <Lightbulb size={16} className="text-neon" /> {tipStatus === "sending" ? "Odesílám…" : "Poslat tip"}
                </button>
              </form>
            )}
          </GlassCard>
        </section>
      </div>
    </>
  );
}
