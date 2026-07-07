import { ScrollText } from "lucide-react";
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
      "Části obsahu webu – včetně recenzí, hodnocení, statistik, ukázek výher a příkladů výdělků – mohou být ilustrativní a slouží k demonstraci fungování služby. Skutečné výsledky jednotlivých uživatelů se liší a nejsou zaručeny.",
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
    <>
      <Header title="Podmínky použití" back />
      <GlassCard className="mb-4 p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-neon/12 text-neon">
            <ScrollText size={20} />
          </span>
          <div className="min-w-0">
            <h2 className="font-black">Podmínky použití a ochrana soukromí</h2>
            <p className="mt-0.5 text-xs leading-5 text-slate-400">Platné od 7. 7. 2026 · Používáním webu s podmínkami souhlasíš.</p>
          </div>
        </div>
      </GlassCard>

      <section className="space-y-3">
        {sections.map((section) => (
          <GlassCard key={section.title} className="p-4">
            <h3 className="text-sm font-black text-white">{section.title}</h3>
            <div className="mt-2 space-y-2">
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-xs leading-5 text-slate-400">
                  {paragraph}
                </p>
              ))}
            </div>
          </GlassCard>
        ))}
      </section>
    </>
  );
}
