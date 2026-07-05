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
    // TODO: nahradit skutečným affiliate odkazem
    partnerUrl: "https://www.mbank.cz/osobni/ucty/",
    description: "Moderní online účet od mBank. Za založení účtu a splnění podmínek můžeš získat bonus až 1 000 Kč.",
    requirements: ["Věk 15+", "Nejsi klientem mBank", "Platný doklad totožnosti", "10 plateb kartou v telefonu"],
    steps: ["Zaregistruj se přes odkaz", "Vyplň online žádost", "Ověř identitu", "Aktivuj účet", "Proveď 10 plateb kartou"],
    completionTime: "15 min",
    minRequirement: "10 plateb kartou v telefonu",
    payoutTime: "do 30 dnů"
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
    // TODO: nahradit skutečným affiliate odkazem
    partnerUrl: "https://www.airbank.cz/produkty/bezny-ucet/",
    description: "Moderní česká banka s bonusem za založení účtu a splnění jednoduchých podmínek.",
    requirements: ["Věk 15+", "Občan ČR", "Nejsi klientem Air Bank", "5 plateb kartou"],
    steps: ["Vyplň online žádost", "Ověř identitu", "Aktivuj účet", "Proveď 5 plateb kartou", "Bonus se připíše po splnění podmínek"],
    completionTime: "20 min",
    minRequirement: "5 plateb kartou",
    payoutTime: "po splnění podmínek"
  },
  {
    id: "tipli-cashback",
    name: "Tipli",
    type: "Ostatní",
    bonus: "150 Kč",
    age: "15+",
    ageGroups: ["15+", "18+"],
    rating: 4.7,
    tags: ["5 min", "Cashback"],
    logo: "T",
    logoClass: "bg-white text-emerald-600",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqODw9HVnKipgsRQlgFQBH2p955fK33V2mGw&s",
    // TODO: nahradit skutečným affiliate odkazem
    partnerUrl: "https://www.tipli.cz/",
    description: "Český cashback portál. Po registraci a prvním nákupu přes Tipli získáš bonus a další peníze zpět z nákupů.",
    requirements: ["Emailová adresa", "Registrace přes odkaz", "První nákup přes Tipli"],
    steps: ["Zaregistruj se přes odkaz", "Vyber obchod přes Tipli", "Proveď první nákup", "Po potvrzení obchodu dostaneš bonus"],
    completionTime: "5 min",
    minRequirement: "první nákup přes Tipli",
    payoutTime: "po potvrzení obchodu"
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
    // TODO: nahradit skutečným affiliate odkazem
    partnerUrl: "https://www.patrongo.com/",
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
    logoClass: "bg-emerald-500 text-white",
    logoUrl: "https://play-lh.googleusercontent.com/TPCKgN9QNFPW1YvD6cq35MuLOCUOsKqPbDNYEM5HbbLzWlbJ9DZQTZqSpbB5j_DYLO2R",
    // TODO: nahradit skutečným affiliate odkazem
    partnerUrl: "https://robinhood.com/signup",
    description: "Investiční platforma, kde získáš bonus po registraci, ověření identity a prvním vkladu.",
    requirements: ["Věk 18+", "Platný doklad totožnosti", "Minimální vklad", "První obchod podle podmínek"],
    steps: ["Zaregistruj se přes odkaz", "Ověř identitu", "Vlož první vklad", "Proveď první obchod", "Bonus se připíše automaticky"],
    completionTime: "15 min",
    minRequirement: "první vklad",
    payoutTime: "po připsání vkladu a splnění podmínek"
  }
];

export const bonusAmount = (bonus: Bonus) => Number.parseInt(bonus.bonus.replace(/\D/g, ""), 10) || 0;

export const totalPotential = bonuses.reduce((sum, bonus) => sum + bonusAmount(bonus), 0);

export const formatKc = (amount: number) => `${amount.toLocaleString("cs-CZ")} Kč`;

export const REFERRAL_REWARD = 100;

export const cashbackStores = [
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
