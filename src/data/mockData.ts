import {
  Car,
  Coins,
  Gamepad2,
  Gift,
  Headphones,
  Hotel,
  Landmark,
  Percent,
  ShoppingBag,
  Smartphone,
  UserPlus,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { paths } from "../routes/paths";

export type Bonus = {
  id: string;
  name: string;
  type: string;
  bonus: string;
  age: "15+" | "18+";
  rating: number;
  tags: string[];
  logo: string;
  logoClass: string;
  logoUrl: string;
  description: string;
  requirements: string[];
  steps: string[];
  completionTime: string;
  minRequirement: string;
  payoutTime: string;
  status?: "Aktivní" | "Dokončeno" | "Neaktivní";
};

export type Category = {
  label: string;
  path: string;
  icon: LucideIcon;
  color: string;
};

export const categories: Category[] = [
  { label: "Vše", path: paths.home, icon: Gift, color: "from-emerald-300 to-green-500" },
  { label: "Nabídky", path: paths.exchanges, icon: Landmark, color: "from-blue-400 to-cyan-400" },
  { label: "Pozvat", path: paths.rewards, icon: UserPlus, color: "from-amber-300 to-orange-500" },
  { label: "Cashback", path: paths.cashback, icon: Percent, color: "from-pink-400 to-rose-500" }
];

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
    description: "Moderní online účet od mBank. Za založení účtu a splnění podmínek můžeš získat bonus až 1 000 Kč.",
    requirements: ["Věk 15+", "Nejsi klientem mBank", "Platný doklad totožnosti", "10 plateb kartou v telefonu"],
    steps: ["Zaregistruj se přes odkaz", "Vyplň online žádost", "Ověř identitu", "Aktivuj účet", "Proveď 10 plateb kartou"],
    completionTime: "15 min",
    minRequirement: "10 plateb kartou v telefonu",
    payoutTime: "do 30 dnů"
  },
  {
    id: "george-ucet",
    name: "George",
    type: "Banky",
    bonus: "1 200 Kč",
    age: "15+",
    rating: 4.8,
    tags: ["20 min", "Novinka"],
    logo: "G",
    logoClass: "bg-blue-600 text-white",
    logoUrl: "https://play-lh.googleusercontent.com/vhbP7CdNzYbWGMFO0F8dYEmTHXsreV2bilSaAzH3rhaybbXmsYqR4XKI70U0AVTOk6c",
    description: "George od České spořitelny nabízí bonus za založení účtu a aktivní používání karty.",
    requirements: ["Věk 15+", "Nejsi klientem České spořitelny", "Platný doklad totožnosti", "Aktivní používání karty"],
    steps: ["Zaregistruj se v George aplikaci", "Vyplň online žádost", "Ověř identitu", "Aktivuj účet a kartu", "Používej kartu podle podmínek"],
    completionTime: "20 min",
    minRequirement: "aktivní používání karty",
    payoutTime: "postupně podle splnění podmínek"
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
    description: "Investiční platforma, kde získáš bonus po registraci, ověření identity a prvním vkladu.",
    requirements: ["Věk 18+", "Platný doklad totožnosti", "Minimální vklad", "První obchod podle podmínek"],
    steps: ["Zaregistruj se přes odkaz", "Ověř identitu", "Vlož první vklad", "Proveď první obchod", "Bonus se připíše automaticky"],
    completionTime: "15 min",
    minRequirement: "první vklad",
    payoutTime: "po připsání vkladu a splnění podmínek"
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
    rating: 4.7,
    tags: ["5 min", "Cashback"],
    logo: "T",
    logoClass: "bg-white text-emerald-600",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqODw9HVnKipgsRQlgFQBH2p955fK33V2mGw&s",
    description: "Český cashback portál. Po registraci a prvním nákupu přes Tipli získáš bonus a další peníze zpět z nákupů.",
    requirements: ["Emailová adresa", "Registrace přes odkaz", "První nákup přes Tipli"],
    steps: ["Zaregistruj se přes odkaz", "Vyber obchod přes Tipli", "Proveď první nákup", "Po potvrzení obchodu dostaneš bonus"],
    completionTime: "5 min",
    minRequirement: "první nákup přes Tipli",
    payoutTime: "po potvrzení obchodu"
  }
];

export const rewards = [
  { title: "iPhone 15 Pro", kind: "Soutěžní odměna", time: "Do 5 dní", icon: Smartphone, color: "from-blue-300 to-cyan-500" },
  { title: "PlayStation 5", kind: "Partnerská odměna", time: "Do 10 dní", icon: Gamepad2, color: "from-slate-300 to-slate-700" },
  { title: "100 Kč", kind: "Referral odměna", time: "Po ověření", icon: Coins, color: "from-emerald-300 to-green-500" },
  { title: "Tesla Model 3", kind: "Hlavní odměna", time: "Do 15 dní", icon: Car, color: "from-zinc-100 to-zinc-500" },
  { title: "AirPods Pro", kind: "Partnerská odměna", time: "Do 7 dní", icon: Headphones, color: "from-blue-200 to-cyan-500" }
];

export const cashbackStores = [
  { name: "Alza.cz", text: "až 5 % cashback", logo: "a", logoUrl: "https://www.google.com/s2/favicons?domain=alza.cz&sz=128", icon: ShoppingBag, color: "from-blue-500 to-indigo-700" },
  { name: "Mall.cz", text: "až 4 % cashback", logo: "M", logoUrl: "https://www.google.com/s2/favicons?domain=mall.cz&sz=128", icon: ShoppingBag, color: "from-red-500 to-orange-500" },
  { name: "Booking.com", text: "až 6 % cashback", logo: "B.", logoUrl: "https://www.google.com/s2/favicons?domain=booking.com&sz=128", icon: Hotel, color: "from-sky-500 to-blue-800" },
  { name: "Rohlik.cz", text: "až 3 % cashback", logo: "R", logoUrl: "https://www.google.com/s2/favicons?domain=rohlik.cz&sz=128", icon: ShoppingBag, color: "from-yellow-400 to-orange-500" },
  { name: "Notino.cz", text: "až 4 % cashback", logo: "N", logoUrl: "https://www.google.com/s2/favicons?domain=notino.cz&sz=128", icon: ShoppingBag, color: "from-zinc-700 to-black" },
  { name: "Datart.cz", text: "až 2 % cashback", logo: "D", logoUrl: "https://www.google.com/s2/favicons?domain=datart.cz&sz=128", icon: Zap, color: "from-amber-400 to-yellow-600" }
];

export const suggestions = ["mBank", "George", "Robinhood", "Air Bank", "Tipli", "1 000 Kč bonus"];

export const exchangeFilters = ["Vše", "Banky", "Investice", "Ostatní"];
export const rewardFilters = ["Vše", "Odměny", "Soutěže", "Partneři"];
export const ageFilters = ["Vše", "15+", "18+"];

export const activeBonusRows = [
  ["mBank", "+1 000 Kč"],
  ["George", "+1 200 Kč"],
  ["Robinhood", "+1 250 Kč"]
];

export const inactiveBonusRows = [
  ["Air Bank", "+500 Kč"],
  ["Tipli", "+150 Kč"]
];

export const detailSteps = [
  "Zaregistruj se přes náš odkaz",
  "Ověř identitu nebo účet",
  "Splň podmínky nabídky",
  "Získej bonus"
];
