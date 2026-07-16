import { BadgeCheck, ExternalLink, Mail, RefreshCw, Scale, ShieldCheck } from "lucide-react";
import { FORM_TARGET_EMAIL } from "../components/formMailer";
import Header from "../components/Header";
import { bonuses, formatVerifiedDate } from "../data/mockData";

const checks = [
  {
    icon: ShieldCheck,
    title: "Primární zdroj",
    text: "Každou aktivní nabídku kontrolujeme proti oficiální stránce nebo pravidlům poskytovatele. Bez dohledatelného zdroje ji nezařadíme mezi aktivní nabídky."
  },
  {
    icon: Scale,
    title: "Podmínky před odměnou",
    text: "Sledujeme věk, termíny, požadované platby či vklad, poplatky, dobu výplaty a omezení. U investic uvádíme také relevantní rizika."
  },
  {
    icon: RefreshCw,
    title: "Pravidelná kontrola",
    text: "U záznamu ukládáme datum posledního ověření i termín další kontroly. Neověřená nebo ukončená nabídka se nezobrazuje jako aktivní."
  }
];

export default function MethodologyPage() {
  return (
    <>
      <Header title="Jak ověřujeme" back />
      <div className="mx-auto w-full max-w-[1080px] pb-4 xl:max-w-[1320px]">
        <section className="reviews-hero relative overflow-hidden rounded-[28px] border border-white/10 p-6 shadow-[0_24px_70px_rgba(0,0,0,.4)] sm:p-10 xl:p-8">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-neon/25 bg-neon/10 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-neon">
            <BadgeCheck size={13} /> Transparentní metodika
          </p>
          <h1 className="mt-4 max-w-[720px] text-[34px] font-black leading-[1.05] sm:text-[52px]">Jak ověřujeme nabídky</h1>
          <p className="mt-4 max-w-[680px] text-sm leading-6 text-slate-300 sm:text-base">
            Cílem není ukázat co nejvyšší číslo, ale srozumitelně popsat nabídky, jejich podmínky a zdroje. Pořadí nabídek neurčuje výše provize.
          </p>
          <p className="mt-4 text-xs font-bold text-slate-400">Metodika aktualizována 16. 7. 2026</p>
        </section>

        <section className="mt-6 grid gap-3 lg:grid-cols-3">
          {checks.map((check) => {
            const Icon = check.icon;
            return (
              <article key={check.title} className="glass p-5">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-neon/12 text-neon"><Icon size={20} /></span>
                <h2 className="mt-3 text-base font-black">{check.title}</h2>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">{check.text}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black">Aktuálně ověřené zdroje</h2>
          <p className="mt-1 text-sm text-slate-400">Přímé odkazy vedou na podmínky poskytovatele, ne na náš affiliate odkaz.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {bonuses.map((bonus) => (
              <article key={bonus.id} className="glass flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-neon/10 text-neon"><ShieldCheck size={18} /></span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-black">{bonus.name}</h3>
                  <p className="text-xs text-slate-400">{formatVerifiedDate(bonus)}</p>
                </div>
                <a href={bonus.officialSourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Oficiální zdroj nabídky ${bonus.name}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] border border-white/10 text-neon transition hover:border-neon/40">
                  <ExternalLink size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="glass mt-8 p-5">
          <h2 className="text-lg font-black">Jak web vydělává</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Některé odkazy jsou affiliate nebo doporučovací. Když přes ně nabídku využiješ, můžeme od poskytovatele získat provizi. Výši tvé odměny to nesnižuje. Partnerství samo o sobě není důvodem pro lepší pořadí.
          </p>
          <a href={`mailto:${FORM_TARGET_EMAIL}?subject=Chyba%20v%20nabídce`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-neon underline underline-offset-4">
            <Mail size={15} /> Nahlásit chybu v nabídce
          </a>
        </section>

      </div>
    </>
  );
}
