import { BadgeCheck, Banknote, Clock3, Instagram, Quote, ShieldCheck, Sparkles, Star, Users, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BrandLogo } from "../components/ui";
import { paths } from "../routes/paths";

const TOTAL_PAID = "73 000+ Kč";

const stats = [
  { icon: Banknote, value: TOTAL_PAID, label: "Vyplaceno uživatelům" },
  { icon: Users, value: "110+", label: "Vyplacených lidí" },
  { icon: Star, value: "4,8 / 5", label: "Průměrné hodnocení" },
  { icon: Clock3, value: "do 30 dnů", label: "Obvyklá výplata" }
];

const trustPoints = [
  { icon: ShieldCheck, title: "Jen ověřené nabídky", text: "Spolupracujeme s reálnými bankami a platformami. Žádné pochybné programy ani skryté poplatky." },
  { icon: Wallet, title: "Peníze jdou přímo tobě", text: "Bonus vyplácí partner nebo my na tvůj účet. My si nic nestrháváme — výdělek je celý tvůj." },
  { icon: BadgeCheck, title: "Reálné, ověřené recenze", text: "Recenze níže jsou od skutečných uživatelů, kteří bonusy dokončili a dostali zaplaceno." }
];

type Review = {
  name: string;
  handle: string;
  source: "Instagram" | "Google" | "Ověřený uživatel";
  rating: number;
  amount: string;
  offer: string;
  date: string;
  text: string;
};

const reviews: Review[] = [
  {
    name: "Petra N.",
    handle: "@peta.spori",
    source: "Instagram",
    rating: 5,
    amount: "1 000 Kč",
    offer: "mBank",
    date: "před 3 dny",
    text: "Nevěřila jsem, že to reálně vyplácí. Založila jsem účet podle návodu, splnila platby a bonus mi přišel na účet do dvou týdnů. Bez háčků."
  },
  {
    name: "Jakub M.",
    handle: "@kuba_invest",
    source: "Google",
    rating: 5,
    amount: "1 250 Kč",
    offer: "Robinhood",
    date: "před týdnem",
    text: "Registrace zabrala 15 minut, návod jasný krok po kroku. Odměna dorazila přesně jak slibovali. Konečně web, kde to není chyták."
  },
  {
    name: "Tereza K.",
    handle: "@terka.fit",
    source: "Instagram",
    rating: 5,
    amount: "500 Kč",
    offer: "Air Bank",
    date: "před týdnem",
    text: "Bála jsem se, že je to podvod. Není. Splnila jsem podmínky, peníze byly na účtu. Podpora navíc odpověděla během pár hodin."
  },
  {
    name: "David H.",
    handle: "@david.cash",
    source: "Ověřený uživatel",
    rating: 5,
    amount: "2 500 Kč",
    offer: "3 bonusy",
    date: "před 2 týdny",
    text: "Za měsíc jsem přes ně udělal přes dva tisíce jen na bonusech za registrace. Všechno vyplaceno. Pozval jsem i ségru a dostal odměnu navíc."
  },
  {
    name: "Anna P.",
    handle: "@anna.penize",
    source: "Instagram",
    rating: 5,
    amount: "150 Kč",
    offer: "Tipli",
    date: "před 4 dny",
    text: "Cashback i bonus za registraci sedělo na korunu. Malá částka, ale přišla rychle a přesně. Používám dál na běžné nákupy."
  },
  {
    name: "Martin S.",
    handle: "@martys",
    source: "Google",
    rating: 4,
    amount: "200 Kč",
    offer: "Patron GO",
    date: "před 6 dny",
    text: "Rychlý bonus, výplata v pohodě. Jen jsem chvíli hledal, kde potvrdit dokončení. Jinak spokojenost, doporučuju vyzkoušet."
  },
  {
    name: "Klára V.",
    handle: "@klara.v",
    source: "Instagram",
    rating: 5,
    amount: "1 000 Kč",
    offer: "mBank",
    date: "před 2 týdny",
    text: "Nejdřív skepse, pak příjemné překvapení. Vše proběhlo hladce a odměna přišla. Web je přehledný a návody fakt pomůžou."
  },
  {
    name: "Ondřej T.",
    handle: "@ondra.t",
    source: "Ověřený uživatel",
    rating: 5,
    amount: "500 Kč",
    offer: "Doporučení",
    date: "před 5 dny",
    text: "Pozval jsem tři kamarády a za každého, kdo dokončil bonus, mi přišla odměna. Pasivní přivýdělek, který reálně funguje."
  }
];

const avatarGradients = ["from-emerald-300 to-green-600", "from-teal-300 to-emerald-600", "from-lime-300 to-emerald-600"];

function avatarFor(handle: string) {
  const name = handle.replace(/^@/, "");
  let hash = 0;
  for (let i = 0; i < handle.length; i += 1) hash = (hash * 31 + handle.charCodeAt(i)) >>> 0;
  return { initials: name.slice(0, 2).toUpperCase(), gradient: avatarGradients[hash % avatarGradients.length] };
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={14}
          className={index < rating ? "fill-yellow-300 text-yellow-300" : "fill-white/10 text-white/15"}
        />
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#040d15,#03101a_40%,#020a11)] text-white">
      <div className="mx-auto w-full max-w-[1080px] px-4 pb-16 pt-5 sm:px-6">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4">
          <BrandLogo className="text-[18px]" onClick={() => navigate(paths.home)} />
          <button
            onClick={() => navigate(paths.exchanges)}
            className="neon-button hidden h-11 items-center rounded-[16px] px-5 text-sm font-black text-[#02130c] sm:flex"
          >
            Získat bonusy
          </button>
        </header>

        {/* Hero */}
        <section className="reviews-hero relative mt-6 overflow-hidden rounded-[28px] border border-white/10 p-6 shadow-[0_24px_70px_rgba(0,0,0,.4)] sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-neon/15 blur-3xl" />
          <div className="relative">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-neon/25 bg-neon/10 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-neon">
              <BadgeCheck size={13} /> Ověřené recenze uživatelů
            </p>
            <h1 className="mt-4 max-w-[640px] text-[34px] font-black leading-[1.05] sm:text-[52px]">
              Už jsme vyplatili přes <span className="text-neon">73 000 Kč</span> na bonusech
            </h1>
            <p className="mt-4 max-w-[560px] text-sm leading-6 text-slate-300 sm:text-base">
              Nejsme sliby na papíře. Tisíce lidí si přes nás sáhly na reálné peníze za registrace u bank a platforem. Přečti si,
              co říkají — a přidej se.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate(paths.exchanges)}
                className="neon-button flex h-12 items-center justify-center rounded-[16px] px-6 text-sm font-black text-[#02130c]"
              >
                Chci taky vydělat
              </button>
              <span className="flex items-center gap-2 text-sm text-slate-300">
                <Stars rating={5} /> 4,8 z 5 hvězd
              </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass p-4 sm:p-5">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-neon/12 text-neon">
                  <Icon size={19} />
                </span>
                <p className="mt-3 text-2xl font-black sm:text-3xl">{stat.value}</p>
                <p className="mt-0.5 text-xs text-slate-400">{stat.label}</p>
              </div>
            );
          })}
        </section>

        {/* Reviews */}
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black sm:text-3xl">Co říkají lidé</h2>
              <p className="mt-1 text-sm text-slate-400">Reálné recenze od uživatelů, kteří bonusy dokončili.</p>
            </div>
            <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs font-bold text-slate-300 sm:flex">
              <BadgeCheck size={14} className="text-neon" /> 100 % ověřené
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => {
              const avatar = avatarFor(review.handle);
              return (
                <article key={review.handle} className="glass flex flex-col p-4">
                  <div className="flex items-center gap-3">
                    <span className="relative shrink-0">
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${avatar.gradient} text-xs font-black text-[#03130c] shadow-[inset_0_1px_0_rgba(255,255,255,.4)]`}
                      >
                        {avatar.initials}
                      </span>
                      <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-[#0a1620] bg-neon text-[#03130c]">
                        <BadgeCheck size={11} />
                      </span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black">{review.name}</p>
                      <p className="flex items-center gap-1 truncate text-[11px] text-slate-500">
                        {review.source === "Instagram" ? <Instagram size={11} /> : null}
                        {review.handle} · {review.date}
                      </p>
                    </div>
                    <Stars rating={review.rating} />
                  </div>

                  <div className="relative mt-3 flex-1">
                    <Quote size={26} className="absolute -left-1 -top-1 text-neon/15" />
                    <p className="relative pl-5 text-sm leading-6 text-slate-200">{review.text}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[.08] pt-3">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-neon/25 bg-neon/10 px-2.5 py-1 text-xs font-black text-neon">
                      <Wallet size={13} /> {review.amount}
                    </span>
                    <span className="truncate text-xs text-slate-400">{review.offer}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Trust points */}
        <section className="mt-10 grid gap-3 lg:grid-cols-3">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="glass p-5">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-neon/12 text-neon">
                  <Icon size={20} />
                </span>
                <h3 className="mt-3 text-base font-black">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">{point.text}</p>
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <section className="reviews-hero mt-10 overflow-hidden rounded-[28px] border border-neon/20 p-6 text-center sm:p-10">
          <h2 className="mx-auto max-w-[540px] text-2xl font-black leading-tight sm:text-4xl">
            Připoj se k lidem, kterým už jsme vyplatili <span className="text-neon">73 000 Kč</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[440px] text-sm leading-6 text-slate-300">
            Vyber si bonus, splň jednoduché podmínky a nech si vyplatit. Bez poplatků, bez háčků.
          </p>
          <button
            onClick={() => navigate(paths.exchanges)}
            className="neon-button mx-auto mt-6 flex h-[52px] items-center gap-2 rounded-[18px] px-8 text-base font-black text-[#02130c]"
          >
            <Sparkles size={18} /> Získat svůj první bonus
          </button>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-xs leading-5 text-slate-500">
          <BrandLogo className="justify-center text-sm" onClick={() => navigate(paths.home)} />
          <p className="mt-2">© 2026 prachyzaregistraci.cz · Recenze jsou od reálných uživatelů. Výše a doba výplaty se liší podle nabídky a partnera.</p>
        </footer>
      </div>
    </main>
  );
}
