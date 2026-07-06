import { Hotel, ShoppingBag, Zap } from "lucide-react";

export type Bonus = {
  id: string;
  name: string;
  type: string;
  bonus: string;
  age: "15+" | "18+";
  ageGroups?: ("15+" | "18+")[];
  rating: number;
  tags: string[];
  logo: string;
  logoClass: string;
  logoUrl: string;
  partnerUrl: string;
  promoCode?: string;
  description: string;
  requirements: string[];
  steps: string[];
  completionTime: string;
  minRequirement: string;
  payoutTime: string;
  status?: "Aktivní" | "Dokončeno" | "Neaktivní";
};

export const bonuses: Bonus[] = [
  {
    id: "mbank-ucet",
    name: "mBank",
    type: "Banky",
    bonus: "1 000 Kč",
    age: "15+",
    rating: 4.7,
    tags: ["15 min", "Snadné"],
    logo: "mB",
    logoClass: "bg-white text-pink-600",
    logoUrl: "https://play-lh.googleusercontent.com/rvyT-isZRd9AxtgK20HG-uG6IVarqEDJ_sivrkrD7eZCiEMMSVvMCrqFBB4d_Nt-47M",
    partnerUrl: "https://www.mbank.cz/mgm/ucty-mkonto.html?numer=dominikj5463",
    promoCode: "dominikj5463",
    description: "Moderní online bankovnictví s bonusem pro nové klienty. Za platby kartou v telefonu ti mBank vrací 100 Kč za každou platbu, celkem až 1 000 Kč.",
    requirements: ["Věk 15+", "Český občanský průkaz", "Nejsi klientem mBank", "Platby kartou v telefonu (Google Pay / Apple Pay)"],
    steps: [
      "Klikni na náš odkaz a vyplň údaje",
      "Do kolonky „Přicházím na základě akce“ vepiš kód dominikj5463",
      "Plať za nákupy kartou v telefonu — za každou platbu ti mBank vrátí 100 Kč",
      "Takhle získáš až 1 000 Kč (10 plateb × 100 Kč)"
    ],
    completionTime: "15 min",
    minRequirement: "platby kartou v telefonu",
    payoutTime: "do 30 dnů od měsíce platby"
  },
  {
    id: "airbank-ucet",
    name: "Air Bank",
    type: "Banky",
    bonus: "500 Kč",
    age: "15+",
    rating: 4.6,
    tags: ["20 min", "Snadné"],
    logo: "AB",
    logoClass: "bg-white text-lime-600",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsBMNGhZVKbQ66rdl8e-xLyDwhp9jmwjSWKw&s",
    partnerUrl: "https://www.airbank.cz/pozvani-pratel?referrer=pkddk9",
    description: "Moderní česká banka s přívětivým přístupem. Za založení účtu a splnění podmínek získáš bonus 500 Kč.",
    requirements: ["Věk 15+", "Český občanský průkaz", "Nejsi klientem Air Bank", "5 plateb kartou"],
    steps: [
      "Klikni na náš odkaz, vyplň telefonní číslo a založ si účet",
      "Proveď 5 plateb kartou (tip: pošli si na účet 100 Kč a kup 5 maličkostí)",
      "Bonus ti Air Bank vyplatí většinou tentýž den, nejpozději do druhého dne"
    ],
    completionTime: "20 min",
    minRequirement: "5 plateb kartou",
    payoutTime: "obvykle do 2 dnů"
  },
  {
    id: "tipli-cashback",
    name: "Tipli",
    type: "Ostatní",
    bonus: "300 Kč",
    age: "15+",
    ageGroups: ["15+", "18+"],
    rating: 4.7,
    tags: ["5 min", "Cashback"],
    logo: "T",
    logoClass: "bg-white text-emerald-600",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqODw9HVnKipgsRQlgFQBH2p955fK33V2mGw&s",
    partnerUrl: "https://www.tipli.cz/p/5332612",
    description: "Největší český cashback portál. Zaregistruj se přes náš odkaz, nakup přes Tipli a jakmile nasbíráš 50 Kč potvrzeného cashbacku, odemkne se ti bonus 300 Kč za registraci.",
    requirements: ["Věk 15+", "Platná e-mailová adresa", "Registrace přes náš odkaz", "Nákup přes Tipli do 30 dnů od registrace"],
    steps: [
      "Zaregistruj se přes náš odkaz",
      "Do 30 dnů od registrace nakup přes Tipli a začni sbírat cashback",
      "Jakmile máš na účtu aspoň 50 Kč z potvrzených odměn, odemkne se ti bonus 300 Kč"
    ],
    completionTime: "5 min",
    minRequirement: "50 Kč potvrzeného cashbacku",
    payoutTime: "po potvrzení odměn obchodem"
  },
  {
    id: "patrongo",
    name: "Patron GO",
    type: "Ostatní",
    bonus: "200 Kč",
    age: "18+",
    rating: 4.6,
    tags: ["1 min", "Bonus"],
    logo: "P",
    logoClass: "bg-white text-emerald-600",
    logoUrl: "https://www.google.com/s2/favicons?domain=patrongo.com&sz=128",
    partnerUrl: "https://patrongoapp.app.link/invite/prachyzaregistraci",
    description: "Aplikace, která projde tvé pravidelné platby a poradí, kde ušetřit. Za samotnou registraci dostaneš bonus 200 Kč, další odměny pak za vyřešené tipy na úsporu.",
    requirements: ["Věk 18+", "Chytrý telefon", "Propojení bankovního výpisu", "Doplnění PSČ"],
    steps: ["Stáhni aplikaci a zaregistruj se", "Doplň PSČ a základní údaje", "Povol bance poslat online výpis", "Bonus 200 Kč se připíše po registraci"],
    completionTime: "1 min",
    minRequirement: "dokončení registrace",
    payoutTime: "po registraci"
  },
  {
    id: "robinhood-trading",
    name: "Robinhood",
    type: "Investice",
    bonus: "1 250 Kč",
    age: "18+",
    rating: 4.5,
    tags: ["15 min", "Vklad"],
    logo: "R",
    logoClass: "bg-white text-emerald-600",
    logoUrl: "https://www.google.com/s2/favicons?domain=robinhood.com&sz=128",
    partnerUrl: "https://join.robinhood.com/eu_crypto/petrak-376f276/",
    description: "Populární investiční platforma bez poplatků. Za registraci přes náš odkaz a vklad 20 € získáš bonus 50 € (cca 1 250 Kč).",
    requirements: ["Věk 18+", "Platný doklad totožnosti", "Možnost vložit 20 €"],
    steps: [
      "Klikni na náš odkaz a zadej svůj e-mail",
      "Na ten e-mail dokonči registraci",
      "Vlož 20 € zahraniční platbou (údaje vyskočí po kliknutí na tlačítko Deposit)",
      "Druhý den od poslání platby se ti přičte bonus 50 € (cca 1 250 Kč)"
    ],
    completionTime: "15 min",
    minRequirement: "vklad 20 €",
    payoutTime: "druhý den po vkladu"
  }
];

export const bonusAmount = (bonus: Bonus) => Number.parseInt(bonus.bonus.replace(/\D/g, ""), 10) || 0;

export const totalPotential = bonuses.reduce((sum, bonus) => sum + bonusAmount(bonus), 0);

export const formatKc = (amount: number) => `${amount.toLocaleString("cs-CZ")} Kč`;

export const REFERRAL_REWARD = 100;

export const cashbackStores = [
  { name: "Bolt", text: "bonus na jízdy za pozvání", logo: "B", logoUrl: "https://www.google.com/s2/favicons?domain=bolt.eu&sz=128", icon: Zap, color: "from-emerald-400 to-green-600" },
  { name: "Vosíme.cz", text: "bonus na rozvoz za pozvání", logo: "V", logoUrl: "https://www.google.com/s2/favicons?domain=vosime.cz&sz=128", icon: ShoppingBag, color: "from-orange-400 to-red-500" },
  { name: "Alza.cz", text: "až 5 % cashback", logo: "a", logoUrl: "https://www.google.com/s2/favicons?domain=alza.cz&sz=128", icon: ShoppingBag, color: "from-blue-500 to-indigo-700" },
  { name: "Mall.cz", text: "až 4 % cashback", logo: "M", logoUrl: "https://www.google.com/s2/favicons?domain=mall.cz&sz=128", icon: ShoppingBag, color: "from-red-500 to-orange-500" },
  { name: "Booking.com", text: "až 6 % cashback", logo: "B.", logoUrl: "https://www.google.com/s2/favicons?domain=booking.com&sz=128", icon: Hotel, color: "from-sky-500 to-blue-800" },
  { name: "Rohlik.cz", text: "až 3 % cashback", logo: "R", logoUrl: "https://www.google.com/s2/favicons?domain=rohlik.cz&sz=128", icon: ShoppingBag, color: "from-yellow-400 to-orange-500" },
  { name: "Notino.cz", text: "až 4 % cashback", logo: "N", logoUrl: "https://www.google.com/s2/favicons?domain=notino.cz&sz=128", icon: ShoppingBag, color: "from-zinc-700 to-black" },
  { name: "Datart.cz", text: "až 2 % cashback", logo: "D", logoUrl: "https://www.google.com/s2/favicons?domain=datart.cz&sz=128", icon: Zap, color: "from-amber-400 to-yellow-600" }
];

export const suggestions = ["mBank", "Air Bank", "Tipli", "Robinhood", "1 000 Kč bonus"];

export const exchangeFilters = ["Vše", "Banky", "Investice", "Ostatní"];
export const ageFilters = ["Vše", "15+", "18+"];

export const detailSteps = [
  "Zaregistruj se přes náš odkaz",
  "Ověř identitu nebo účet",
  "Splň podmínky nabídky",
  "Získej bonus"
];
