import { CalendarDays, ChevronRight, Mail, ScrollText, ShieldCheck } from "lucide-react";
import Header from "../components/Header";
import { FORM_TARGET_EMAIL } from "../components/formMailer";
import { GlassCard } from "../components/ui";

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. Provozovatel a povaha služby",
    body: [
      "Web prachyzaregistraci.cz (dále jen „web“) je informační a doporučovací služba, která shromažďuje veřejně dostupné akční nabídky, bonusy a odměny třetích stran (bank, investičních platforem, e-shopů a aplikací) a poskytuje k nim návody.",
      "Provozovatel webu není bankou, platební institucí, investičním zprostředkovatelem ani poskytovatelem finančních služeb. Web neposkytuje finanční, investiční, daňové ani právní poradenství. Veškerý obsah má pouze informativní charakter."
    ]
  },
  {
    title: "2. Nabídky třetích stran",
    body: [
      "Bonusy, slevy a odměny uvedené na webu poskytují třetí strany (partneři) na základě svých vlastních podmínek. Registrace i plnění podmínek probíhá vždy přímo u partnera, mimo tento web.",
      "Výše, dostupnost a podmínky nabídek se mohou kdykoli změnit nebo být zrušeny bez předchozího upozornění. Provozovatel negarantuje, že partner bonus přizná nebo vyplatí, a nenese odpovědnost za jednání partnerů, obsah jejich stránek ani za škody vzniklé v souvislosti s využitím jejich služeb.",
      "Provozovatel může od partnerů získávat provizi za doporučení. Tato provize nemá vliv na výši bonusu uživatele."
    ]
  },
  {
    title: "3. Odměny za doporučení, soutěže a kolo štěstí",
    body: [
      "Odměny za pozvání přátel, výhry v kole štěstí a další akce provozované webem jsou dobrovolným plněním provozovatele. Není na ně právní nárok.",
      "Provozovatel si vyhrazuje právo žádost o odměnu zamítnout (zejména při podezření na zneužití, duplicitní účty, nesplnění podmínek nebo nemožnost ověření), akci kdykoli změnit, pozastavit nebo ukončit.",
      "Slosování a výplaty výher probíhají v termínech uvedených na webu; provozovatel si vyhrazuje právo termíny upravit."
    ]
  },
  {
    title: "4. Obsah webu",
    body: [
      "Web nezveřejňuje uživatelské recenze, hodnocení ani statistiky výplat bez doložitelného podkladu. Příklady sloužící k vysvětlení podmínek jsou vždy označené jako modelové a nepředstavují záruku výsledku.",
      "Všechny texty, grafika a loga webu jsou chráněny autorským právem. Loga a ochranné známky partnerů patří jejich vlastníkům."
    ]
  },
  {
    title: "5. Odpovědnost",
    body: [
      "Web je poskytován „tak, jak je“. Provozovatel neodpovídá za nepřetržitou dostupnost webu, za aktuálnost a úplnost informací, ani za jakoukoli škodu vzniklou použitím informací z webu nebo využitím nabídek třetích stran.",
      "Uživatel využívá nabídky na vlastní odpovědnost a je povinen se před registrací u partnera seznámit s jeho podmínkami. Případné příjmy z bonusů může být uživatel povinen zdanit dle platných předpisů."
    ]
  },
  {
    title: "6. Osobní údaje a soukromí",
    body: [
      "Prostřednictvím formulářů na webu zpracováváme pouze údaje, které nám uživatel sám poskytne (zejména e-mail, jméno, číslo účtu pro výplatu odměny a přiložené soubory), a to výhradně za účelem vyřízení dotazu nebo vyplacení odměny. Údaje neprodáváme ani nepředáváme třetím stranám s výjimkou technických zpracovatelů nezbytných pro doručení zpráv.",
      "Údaje uchováváme jen po dobu nezbytnou k vyřízení. Uživatel má právo na přístup ke svým údajům, jejich opravu a výmaz – stačí napsat na kontaktní e-mail níže.",
      "Web může využívat analytické nástroje (např. měření návštěvnosti) pracující se souhrnnými, anonymizovanými daty."
    ]
  },
  {
    title: "7. Závěrečná ustanovení",
    body: [
      "Provozovatel může tyto podmínky kdykoli aktualizovat; rozhodná je verze zveřejněná na webu v okamžiku použití služby.",
      "Právní vztahy vzniklé v souvislosti s používáním webu se řídí právním řádem České republiky.",
      `Kontakt: ${FORM_TARGET_EMAIL}`
    ]
  }
];

export default function TermsPage() {
  return (
    <div className="xl:mx-auto xl:max-w-[1280px]">
      <Header title="Podmínky použití" back />
      <GlassCard className="mb-4 p-4 xl:p-6">
        <div className="flex items-start gap-4 xl:items-center">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-neon/12 text-neon">
            <ScrollText size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase text-neon">Pravidla služby</p>
            <h2 className="mt-1 text-lg font-black leading-tight text-white xl:text-2xl">Podmínky použití a ochrana soukromí</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Přehledně vysvětlujeme, jak web funguje, kdo odpovídá za jednotlivé nabídky a jak zacházíme s údaji, které nám sám poskytneš.
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-5 xl:flex">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CalendarDays size={16} className="text-neon" />
              <span>Platné od 7. 7. 2026</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={16} className="text-neon" />
              <span>7 přehledných oddílů</span>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid items-start gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden space-y-3 xl:block">
          <GlassCard className="p-3">
            <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase text-slate-500">Obsah dokumentu</p>
            <nav aria-label="Obsah podmínek" className="space-y-0.5">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#oddil-${index + 1}`}
                  className="group flex min-h-10 items-center gap-3 rounded-[12px] px-3 py-2 text-xs font-semibold leading-4 text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-[10px] font-black text-slate-300 group-hover:bg-neon/12 group-hover:text-neon">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">{section.title.replace(/^\d+\.\s*/, "")}</span>
                  <ChevronRight size={14} className="shrink-0 text-slate-600 group-hover:text-neon" />
                </a>
              ))}
            </nav>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Mail size={17} className="text-neon" />
              Potřebuješ vysvětlení?
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">Napiš nám a konkrétní část podmínek s tebou projdeme.</p>
            <a href={`mailto:${FORM_TARGET_EMAIL}`} className="mt-3 block break-all text-xs font-bold text-neon hover:text-neon/80">
              {FORM_TARGET_EMAIL}
            </a>
          </GlassCard>
        </aside>

        <GlassCard className="overflow-hidden p-4 xl:p-8">
          <div className="mb-1 flex items-center gap-2 text-xs text-slate-400 xl:hidden">
            <CalendarDays size={15} className="text-neon" />
            Platné od 7. 7. 2026
          </div>

          {sections.map((section, index) => (
            <section
              id={`oddil-${index + 1}`}
              key={section.title}
              className="scroll-mt-6 border-b border-white/[0.07] py-5 first:pt-3 last:border-b-0 last:pb-1 xl:grid xl:grid-cols-[48px_minmax(0,1fr)] xl:gap-5 xl:py-7 xl:first:pt-0"
            >
              <span className="mb-3 grid h-9 w-9 place-items-center rounded-[12px] bg-neon/10 text-xs font-black text-neon xl:mb-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-black leading-6 text-white xl:text-lg">{section.title.replace(/^\d+\.\s*/, "")}</h3>
                <div className="mt-3 space-y-3 xl:mt-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-sm leading-6 text-slate-400 xl:leading-7">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
