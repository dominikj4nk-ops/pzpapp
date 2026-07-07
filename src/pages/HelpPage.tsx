import { Clock3, HelpCircle, Instagram, Lightbulb, Mail, Send, ShieldCheck } from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import type { ComponentType, FormEvent } from "react";
import { useState } from "react";
import Header from "../components/Header";
import { FORM_TARGET_EMAIL, HONEYPOT_FIELD, sendForm } from "../components/formMailer";
import { GlassCard, TikTokIcon } from "../components/ui";

const CONTACT_EMAIL = FORM_TARGET_EMAIL;

type FormStatus = "idle" | "sending" | "sent" | "error";

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
    hint: "Hlavní kontakt i pomoc s nabídkami a výplatami.",
    href: `mailto:${CONTACT_EMAIL}`
  },
  {
    icon: TikTokIcon as ComponentType<LucideProps>,
    label: "TikTok",
    value: "@prachyzaregistraci",
    hint: "Sleduj nás, ať ti neuteče nová akce.",
    href: "https://www.tiktok.com/@prachyzaregistraci",
    external: true
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@prachyzaregistracicz",
    hint: "Napiš nám do DM.",
    href: "https://instagram.com/prachyzaregistracicz",
    external: true
  }
];

const faqs = [
  ["Je to opravdu zdarma?", "Ano. Registrace u partnerů jsou zdarma a my si z tvého bonusu nic nebereme. Platí nás partneři za doporučení."],
  ["Jak získám bonus?", "Vyber nabídku, klikni na Získat bonus a dokonči registraci u partnera přesně podle kroků v detailu nabídky. Bonus pak vyplatí partner."],
  ["Kdy mi přijdou peníze?", "Záleží na partnerovi. Air Bank vyplácí obvykle do 2 dnů, mBank do 30 dnů od měsíce platby. Přesný termín najdeš u každé nabídky."],
  ["Je to bezpečné a legální?", "Ano. Jde o oficiální akce bank a platforem pro nové klienty. Registruješ se vždy přímo u partnera, my tvoje údaje nevidíme."],
  ["Musím účet po získání bonusu zrušit?", "Nemusíš. Účet můžeš dál používat, nebo ho po vyplacení bonusu zrušit. Záleží jen na tobě a podmínkách partnera."],
  ["Kdy dostanu odměnu za kamaráda?", "Po tom, co partner potvrdí registraci tvého kamaráda. Obvykle do 30 dnů od odeslání žádosti a o výsledku dáme vědět e-mailem."],
  ["Nepřišel mi bonus, co teď?", "Napiš nám na e-mail název nabídky a datum dokončení. Ověříme to u partnera a poradíme, jak dál."]
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
    const ok = await sendForm("Dotaz z webu prachyzaregistraci.cz", {
      [HONEYPOT_FIELD]: String(data.get(HONEYPOT_FIELD) ?? ""),
      "E-mail pro odpověď": email,
      "Zpráva": message
    });
    setContactStatus(ok ? "sent" : "error");
  };

  const submitTip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (tipStatus === "sending") return;
    const data = new FormData(event.currentTarget);
    const link = String(data.get("link") ?? "").trim();
    if (!link) return;

    setTipStatus("sending");
    const ok = await sendForm("Tip na novou nabídku", {
      [HONEYPOT_FIELD]: String(data.get(HONEYPOT_FIELD) ?? ""),
      "Odkaz na nabídku": link,
      "Poznámka": String(data.get("note") ?? "").trim() || "bez poznámky"
    });
    setTipStatus(ok ? "sent" : "error");
  };

  return (
    <>
      <Header title="Kontakt a podpora" back />
      <section className="space-y-4">
        <GlassCard className="p-4 xl:p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-neon/15 text-neon">
              <Mail size={21} />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-black leading-tight">Jsme tu pro tebe</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-neon">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-neon opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
                </span>
                Online · Po–Pá 9:00–18:00
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Nevíš si rady s nabídkou, bonusem nebo výplatou odměny? Vyber si, jak se ti nejlíp píše – ozveme se co nejdřív.
          </p>
        </GlassCard>

        <div className="grid gap-3 sm:grid-cols-2">
          {contactMethods.map((method) => {
            const Icon = method.icon;

            return (
              <a
                key={`${method.label}-${method.value}`}
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="glass-button flex items-center gap-3 p-3 text-left transition active:scale-[.99]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[.07] text-neon">
                  <Icon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-500">{method.label}</span>
                  <span className="block truncate text-sm font-bold text-white">{method.value}</span>
                  <span className="mt-0.5 block text-xs leading-4 text-slate-400">{method.hint}</span>
                </span>
              </a>
            );
          })}
        </div>

        <GlassCard className="p-4 xl:p-5">
          <div className="mb-3 flex items-center gap-2">
            <Clock3 size={16} className="text-neon" />
            <h2 className="text-base font-black">Napiš nám rovnou</h2>
          </div>
          {contactStatus === "sent" ? (
            <div className="rounded-[18px] border border-neon/25 bg-neon/10 p-4 text-sm leading-6 text-slate-200">
              Díky! Zpráva je odeslaná, odpovíme ti na uvedený e-mail co nejdřív.
            </div>
          ) : (
            <form onSubmit={submitContact} className="space-y-3">
              <input
                required
                type="email"
                name="email"
                placeholder="Tvůj e-mail (ať víme, kam odpovědět)"
                autoComplete="email"
                className="h-12 w-full rounded-[18px] border border-white/10 bg-[#07131b] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
              />
              <textarea
                required
                name="message"
                rows={4}
                placeholder="S čím ti můžeme pomoct?"
                className="w-full resize-none rounded-[18px] border border-white/10 bg-[#07131b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
              />
              <input
                type="text"
                name={HONEYPOT_FIELD}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute left-[-9999px] opacity-0"
              />
              {contactStatus === "error" ? (
                <p className="rounded-[18px] border border-red-400/25 bg-red-400/10 p-3 text-sm leading-5 text-red-200">
                  Zprávu se nepodařilo odeslat. Zkus to prosím znovu, nebo nám napiš přímo na{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-red-100 underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              ) : null}
              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="neon-button flex h-12 w-full items-center justify-center gap-2 rounded-[18px] px-4 text-sm font-black text-[#02130c] active:scale-95 disabled:opacity-60"
              >
                <Send size={17} /> {contactStatus === "sending" ? "Odesílám…" : "Odeslat zprávu"}
              </button>
            </form>
          )}
        </GlassCard>

        <GlassCard className="p-4 xl:p-5">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb size={16} className="text-neon" />
            <h2 className="text-base font-black">Poděl se o nabídku</h2>
          </div>
          <p className="mb-3 text-xs leading-5 text-slate-400">
            Narazil jsi na bonus za registraci, který u nás chybí? Pošli nám odkaz, prověříme ho a přidáme.
          </p>
          {tipStatus === "sent" ? (
            <div className="rounded-[18px] border border-neon/25 bg-neon/10 p-4 text-sm leading-6 text-slate-200">
              Díky za tip! Prověříme ho a když projde, přidáme ho na web.
            </div>
          ) : (
            <form onSubmit={submitTip} className="space-y-3">
              <input
                required
                type="url"
                name="link"
                placeholder="https://… odkaz na nabídku"
                className="h-12 w-full rounded-[18px] border border-white/10 bg-[#07131b] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
              />
              <input
                type="text"
                name="note"
                placeholder="Poznámka (nepovinné), např. výše bonusu"
                className="h-12 w-full rounded-[18px] border border-white/10 bg-[#07131b] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
              />
              <input
                type="text"
                name={HONEYPOT_FIELD}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute left-[-9999px] opacity-0"
              />
              {tipStatus === "error" ? (
                <p className="rounded-[18px] border border-red-400/25 bg-red-400/10 p-3 text-sm leading-5 text-red-200">
                  Tip se nepodařilo odeslat. Zkus to prosím znovu za chvíli.
                </p>
              ) : null}
              <button
                type="submit"
                disabled={tipStatus === "sending"}
                className="glass-button flex h-12 w-full items-center justify-center gap-2 rounded-[18px] px-4 text-sm font-black text-white active:scale-95 disabled:opacity-60"
              >
                <Lightbulb size={16} className="text-neon" /> {tipStatus === "sending" ? "Odesílám…" : "Poslat tip"}
              </button>
            </form>
          )}
        </GlassCard>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-300">Časté dotazy</h2>
          <GlassCard className="space-y-2 p-2">
            {faqs.map(([title, text]) => (
              <button key={title} onClick={() => toggleFaq(title)} className="glass-button w-full p-3 text-left transition">
                <div className="flex items-center gap-3">
                  <HelpCircle size={16} className="shrink-0 text-neon" />
                  <span className="text-sm font-semibold">{title}</span>
                </div>
                {open === title ? <p className="mt-2 pl-7 text-sm leading-5 text-slate-400">{text}</p> : null}
              </button>
            ))}
          </GlassCard>
        </section>

        <div className="rounded-[18px] border border-white/10 bg-white/[.035] p-4">
          <div className="flex gap-3">
            <ShieldCheck size={19} className="mt-0.5 shrink-0 text-neon" />
            <p className="text-xs leading-5 text-slate-400">
              Nikdy po tobě nechceme hesla ani přístupy do bankovnictví. Pro pomoc s bonusem stačí název nabídky a datum dokončení.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
