import { Clock3, HelpCircle, Instagram, Mail, MessageCircle, Send, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import { GlassCard } from "../components/ui";

const SUPPORT_EMAIL = "podpora@prachyzaregistraci.cz";
const SUPPORT_WHATSAPP = "420777123456";

type ContactMethod = {
  icon: LucideIcon;
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
    value: SUPPORT_EMAIL,
    hint: "Odpovídáme obvykle do pár hodin.",
    href: `mailto:${SUPPORT_EMAIL}`
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Napsat na WhatsApp",
    hint: "Nejrychlejší odpověď během dne.",
    href: `https://wa.me/${SUPPORT_WHATSAPP}`,
    external: true
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@prachyzaregistraci",
    hint: "Napiš nám do DM.",
    href: "https://instagram.com/",
    external: true
  }
];

const faqs = [
  ["Jak získat bonus?", "Vyber nabídku, otevři detail a pokračuj přes tlačítko Získat bonus. Přesměrujeme tě k partnerovi, kde dokončíš registraci."],
  ["Kdy dostanu odměnu za kamaráda?", "Odměnu vyplácíme po tom, co partner potvrdí registraci tvého kamaráda. Obvykle do 30 dnů od odeslání žádosti."],
  ["Jak funguje cashback?", "Aktivuj obchod v sekci Cashback a nakup přes něj. Cashback se ti připíše podle podmínek partnera."],
  ["Nepřišel mi bonus, co teď?", "Napiš nám na e-mail nebo WhatsApp číslo nabídky a datum dokončení. Ověříme to u partnera a poradíme dál."]
];

export default function HelpPage() {
  const [open, setOpen] = useState<string>("");
  const [sent, setSent] = useState(false);
  const toggleFaq = (title: string) => setOpen((current) => (current === title ? "" : title));

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
                key={method.label}
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
          {sent ? (
            <div className="rounded-[18px] border border-neon/25 bg-neon/10 p-4 text-sm leading-6 text-slate-200">
              Zpráva je připravená k odeslání ve tvém e-mailovém klientovi. Kdyby se neotevřel, napiš nám přímo na{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-neon">
                {SUPPORT_EMAIL}
              </a>
              .
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const subject = encodeURIComponent("Dotaz z aplikace");
                const body = encodeURIComponent(String(data.get("message") ?? ""));
                window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
                setSent(true);
              }}
              className="space-y-3"
            >
              <textarea
                required
                name="message"
                rows={4}
                placeholder="S čím ti můžeme pomoct?"
                className="w-full resize-none rounded-[18px] border border-white/10 bg-[#07131b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
              />
              <button
                type="submit"
                className="neon-button flex h-12 w-full items-center justify-center gap-2 rounded-[18px] px-4 text-sm font-black text-[#02130c] active:scale-95"
              >
                <Send size={17} /> Odeslat zprávu
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
