import { HelpCircle, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import { GlassCard } from "../components/ui";

const faqs = [
  ["Často kladené dotazy", "Najdeš zde odpovědi k bonusům, výhrám i cashbacku."],
  ["Jak získat bonus?", "Vyber nabídku, otevři detail a pokračuj přes tlačítko Získat bonus."],
  ["Jak funguje cashback?", "Po kliknutí na obchod se ti cashback připíše podle podmínek partnera."],
  ["Kontaktovat podporu", "Napiš nám na e-mail nebo otevři live chat v pracovní době."]
];

export default function HelpPage() {
  const [open, setOpen] = useState(faqs[0][0]);

  return (
    <>
      <Header title="Nápověda a podpora" back />
      <section className="mb-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-300">FAQ</h2>
        <GlassCard className="p-2">
          {faqs.map(([title, text]) => (
            <button key={title} onClick={() => setOpen(title)} className="glass-button w-full p-3 text-left transition">
              <div className="flex items-center gap-3">
                <HelpCircle size={16} className="text-neon" />
                <span className="text-sm font-semibold">{title}</span>
              </div>
              {open === title ? <p className="mt-2 pl-7 text-sm leading-5 text-slate-400">{text}</p> : null}
            </button>
          ))}
        </GlassCard>
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-300">Kontakt</h2>
        <GlassCard className="space-y-3 p-4">
          <a href="mailto:podpora@prachyzaregistraci.cz" className="glass-button flex items-center gap-3 p-3 text-sm">
            <Mail size={18} className="text-neon" />
            <span className="flex-1">podpora@prachyzaregistraci.cz</span>
          </a>
          <button onClick={() => setOpen("Kontaktovat podporu")} className="glass-button flex w-full items-center gap-3 p-3 text-left text-sm">
            <MessageCircle size={18} className="text-neon" />
            <span>Live chat <span className="text-neon">Online</span> 9:00 - 18:00</span>
          </button>
        </GlassCard>
      </section>
    </>
  );
}
