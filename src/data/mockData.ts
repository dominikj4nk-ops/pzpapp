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
    logoUrl: `${import.meta.env.BASE_URL}assets/mbank-logo.png`,
    partnerUrl: "https://www.mbank.cz/mgm/ucty-mkonto.html?numer=dominikj5463",
    promoCode: "dominikj5463",
    description: "Moderní online bankovnictví s bonusem pro nové klienty. Za platby kartou v telefonu ti mBank vrací 100 Kč za každou platbu, celkem až 1 000 Kč.",
    requirements: ["Věk 15+", "Český občanský průkaz", "Nejsi klientem mBank", "Platby kartou v telefonu (Google Pay / Apple Pay)"],
    steps: [
      "Klikni na náš odkaz a vyplň údaje",
      "Do kolonky „Přicházím na základě akce“ vepiš kód dominikj5463",
      "Plať za nákupy kartou v telefonu, za každou platbu ti mBank vrátí 100 Kč",
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

export type ReferralDeal = {
  id: string;
  name: string;
  reward: string;
  tagline: string;
  logo: string;
  logoUrl: string;
  color: string;
  description: string;
  steps: string[];
  note?: string;
  // TODO: nahradit našimi pozvánkovými odkazy / kódy
  partnerUrl: string;
};

// Jen akce, které novému uživateli reálně něco dají (kredit / slevu v penězích).
export const referralDeals: ReferralDeal[] = [
  {
    id: "shein",
    name: "SHEIN",
    reward: "60 %",
    tagline: "60% sleva na nákup pro nové uživatele",
    logo: "S",
    logoUrl: "https://www.google.com/s2/favicons?domain=shein.com&sz=128",
    color: "from-slate-600 to-slate-900",
    description:
      "Módní e-shop s oblečením a doplňky za nízké ceny. Přes naši exkluzivní pozvánku získáš jako nový uživatel slevu 60 % na nákup – jedna z nejvyšších slev, jaké SHEIN nabízí.",
    steps: [
      "Klikni na náš odkaz, nebo v aplikaci SHEIN vyhledej kód 9XP543G",
      "Zaregistruj se jako nový uživatel",
      "Sleva 60 % se ti uplatní na nákup"
    ],
    note: "Platí jen pro nové účty. Pokud už na SHEIN účet máš, stačí si vytvořit nový a sleva platí i pro tebe.",
    partnerUrl: "https://onelink.shein.com/41/5uzgm7pyfokh"
  },
  {
    id: "bolt",
    name: "Bolt",
    reward: "100 Kč",
    tagline: "100 Kč sleva na 2 první jízdy",
    logo: "B",
    logoUrl: "https://www.google.com/s2/favicons?domain=bolt.eu&sz=128",
    color: "from-emerald-400 to-green-600",
    description:
      "Taxi a sdílené koloběžky. Přes naši pozvánku dostaneš jako nový uživatel slevu 100 Kč, která se ti rozloží na 2 první jízdy. Ideální na cestu domů z večírku nebo rychlý přesun po městě.",
    steps: [
      "Stáhni si appku Bolt přes náš odkaz",
      "Při registraci zadej náš pozvánkový kód 22UJ1U",
      "Sleva 100 Kč se ti automaticky uplatní na 2 první jízdy"
    ],
    note: "Platí pro nové uživatele. Přesná výše promo akce se může lišit podle města.",
    partnerUrl: "https://invite.bolt.eu/22UJ1U"
  },
  {
    id: "liftago",
    name: "Liftago",
    reward: "50 %",
    tagline: "50% sleva na první jízdu nebo doručení",
    logo: "L",
    logoUrl: "https://www.google.com/s2/favicons?domain=liftago.cz&sz=128",
    color: "from-blue-400 to-indigo-600",
    description:
      "Česká appka na taxi, odvoz tvého vozu i kurýrní doručení. Přes naši pozvánku dostaneš 50% slevu na první objednávku – je jedno, jestli pojedeš taxíkem, necháš si odvézt auto, nebo pošleš balík kurýrem.",
    steps: [
      "Stáhni si aplikaci Liftago přes náš odkaz",
      "Při registraci zadej náš slevový kód 3C5Y3G",
      "50% sleva se ti uplatní na první jízdu, odvoz vozu nebo doručení"
    ],
    note: "Platí pro nové uživatele na první objednávku v aplikaci.",
    partnerUrl: "https://www.liftago.cz/invite?code=3C5Y3G"
  },
  {
    id: "wolt",
    name: "Wolt",
    reward: "150 Kč",
    tagline: "3× 50 Kč sleva na první objednávky",
    logo: "W",
    logoUrl: "https://www.google.com/s2/favicons?domain=wolt.com&sz=128",
    color: "from-sky-400 to-blue-600",
    description:
      "Rozvoz jídla a nákupů. Přes naši pozvánku dostaneš slevu 50 Kč na každou z prvních 3 objednávek s doručením – celkem tedy ušetříš 150 Kč.",
    steps: [
      "Stáhni si appku Wolt přes náš odkaz",
      "Při registraci zadej náš pozvánkový kód ZH23BQT",
      "Sleva 50 Kč se ti automaticky uplatní na každou z prvních 3 objednávek s doručením"
    ],
    note: "Platí pro nové uživatele na objednávky s doručením.",
    partnerUrl: "https://get.wolt.com/ZH23BQT"
  },
  {
    id: "vosime",
    name: "Vosíme.cz",
    reward: "100 Kč",
    tagline: "100 Kč na první objednávku jídla",
    logo: "V",
    logoUrl: "https://www.google.com/s2/favicons?domain=vosime.cz&sz=128",
    color: "from-orange-400 to-red-500",
    description:
      "Rozvoz jídla po českých městech. Přes náš pozvánkový odkaz dostaneš 100 Kč slevu na první objednávku, takže tě pizza může vyjít na pár desetikorun.",
    steps: [
      "Otevři Vosíme.cz přes náš odkaz – kupón se ti aktivuje automaticky",
      "Vyber si jídlo a objednej",
      "100 Kč se ti odečte rovnou z první objednávky"
    ],
    note: "Platí pro nové zákazníky na první objednávku.",
    partnerUrl: "https://vosime.cz/coupon-go/REF6UOVVEG4"
  }
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
