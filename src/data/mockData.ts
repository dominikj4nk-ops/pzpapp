export type Bonus = {
  id: string;
  name: string;
  type: string;
  bonus: string;
  age: "15+" | "18+";
  ageGroups?: ("15+" | "18+")[];
  tags: string[];
  logo: string;
  logoClass: string;
  logoUrl: string;
  logoFit?: "cover" | "contain" | "symbol";
  partnerUrl: string;
  promoCode?: string;
  pitch?: string;
  ctaLabel?: string;
  compactCtaLabel?: string;
  valueLabel?: string;
  description: string;
  requirements: string[];
  steps: string[];
  completionTime: string;
  minRequirement: string;
  payoutTime: string;
  status: "Aktivní" | "Dokončeno" | "Neaktivní";
  provider: string;
  rewardType: "Peněžní bonus" | "Cashback" | "Kryptoměna" | "Proměnlivá odměna" | "Cestovní výhody";
  bonusValueCzk: number | null;
  officialSourceUrl: string;
  isAffiliate: boolean;
  verificationStatus: "verified" | "needs-review";
  lastVerified: string | null;
  nextReview: string | null;
  validUntil?: string;
  fees: string[];
  warnings: string[];
  riskNotice?: string;
};

const offerRecords: Bonus[] = [
  {
    id: "mbank-ucet",
    name: "mBank",
    type: "Banky",
    bonus: "až 1 000 Kč",
    age: "15+",
    tags: ["15 min", "Snadné"],
    logo: "mB",
    logoClass: "bg-white text-pink-600",
    logoUrl: `${import.meta.env.BASE_URL}assets/mbank-logo.png`,
    partnerUrl: "https://www.mbank.cz/mgm/ucty-mkonto.html?numer=dominikj5463",
    promoCode: "dominikj5463",
    pitch: "100 Kč za každou z prvních 10 plateb mobilem nebo chytrým zařízením.",
    description: "mBank připisuje novému klientovi 100 Kč za každou z prvních deseti kvalifikovaných plateb mobilem nebo nositelným zařízením. Celkem lze podle aktuálních pravidel získat až 1 000 Kč.",
    requirements: ["Věk 15+", "Český občanský průkaz", "Nejsi klientem mBank", "Platby kartou v telefonu (Google Pay / Apple Pay)"],
    steps: [
      "Klikni na náš odkaz, sjeď na stránce dolů a klikni na tlačítko „Založit účet“",
      "Do kolonky „Přicházím na základě akce“ vepiš kód dominikj5463",
      "Plať za nákupy kartou v telefonu, za každou platbu ti mBank vrátí 100 Kč",
      "Takhle získáš až 1 000 Kč (10 plateb × 100 Kč)"
    ],
    completionTime: "15 min",
    minRequirement: "platby kartou v telefonu",
    payoutTime: "nejpozději do 45 dnů",
    status: "Aktivní",
    provider: "mBank S.A.",
    rewardType: "Peněžní bonus",
    bonusValueCzk: 1000,
    officialSourceUrl: "https://www.mbank.cz/mgm/ucty-mkonto.html",
    isAffiliate: true,
    verificationStatus: "verified",
    lastVerified: "2026-07-16",
    nextReview: "2026-08-16",
    validUntil: "2026-09-30",
    fees: ["Založení a vedení mKonta je podle oficiální stránky zdarma."],
    warnings: ["Je nutné použít doporučovací kód a splnit podmínky do 60 dnů od otevření účtu."]
  },
  {
    id: "airbank-ucet",
    name: "Air Bank",
    type: "Banky",
    bonus: "Účet zdarma",
    age: "15+",
    tags: ["20 min", "5 plateb"],
    logo: "AB",
    logoClass: "bg-white text-lime-600",
    logoUrl: `${import.meta.env.BASE_URL}assets/airbank-logo.png`,
    logoFit: "contain",
    partnerUrl: "https://www.airbank.cz/pozvani-pratel?referrer=pkddk9",
    pitch: "Běžný účet bez poplatku za vedení. Peněžní odměnu 500 Kč podle pravidel doporučovacího programu získává doporučitel.",
    ctaLabel: "Otevřít nabídku",
    compactCtaLabel: "Detail nabídky",
    valueLabel: "Hlavní výhoda",
    description: "Přes pozvánku si může nový klient založit první běžný účet u Air Bank. Aktuální pravidla programu uvádějí odměnu 500 Kč pro doporučitele po založení účtu a pěti platbách nového klienta; novému klientovi peněžní odměnu automaticky neslibují.",
    requirements: ["Věk 15+", "Český občanský průkaz", "Nejsi klientem Air Bank", "5 plateb kartou"],
    steps: [
      "Klikni na náš odkaz, vyplň telefonní číslo a založ si účet",
      "Proveď 5 plateb kartou (tip: pošli si na účet 100 Kč a kup 5 maličkostí)",
      "V měsíci aktivace nebo v bezprostředně následujícím měsíci proveď 5 plateb kartou",
      "Odměna 500 Kč podle pravidel připadne doporučiteli, nikoli automaticky novému klientovi"
    ],
    completionTime: "20 min",
    minRequirement: "první účet do 45 dnů a 5 plateb kartou",
    payoutTime: "500 Kč získává doporučitel",
    status: "Aktivní",
    provider: "Air Bank a.s.",
    rewardType: "Proměnlivá odměna",
    bonusValueCzk: null,
    officialSourceUrl: "https://www.airbank.cz/co-vas-nejvic-zajima/jak-se-stat-klientem-air-bank-na-doporuceni-pritele/",
    isAffiliate: true,
    verificationStatus: "verified",
    lastVerified: "2026-07-16",
    nextReview: "2026-08-16",
    fees: ["Vedení běžného účtu je podle oficiální stránky zdarma."],
    warnings: ["500 Kč je podle aktuálních pravidel odměna pro doporučitele, ne garantovaný bonus pro nového klienta.", "Účet je nutné založit do 45 dnů na stejné české telefonní číslo a provést alespoň 5 plateb kartou v určeném období."]
  },
  {
    id: "tipli-cashback",
    name: "Tipli",
    type: "Ostatní",
    bonus: "300 Kč",
    age: "15+",
    ageGroups: ["15+", "18+"],
    tags: ["5 min", "Cashback"],
    logo: "T",
    logoClass: "bg-white text-emerald-600",
    logoUrl: `${import.meta.env.BASE_URL}assets/tipli-logo.png`,
    logoFit: "contain",
    partnerUrl: "https://www.tipli.cz/p/5332612",
    pitch: "Tipli během prvních 7 dnů dorovnává cashback z nákupů až do souhrnné výše 300 Kč.",
    description: "Cashback portál Tipli uvádí pro nové uživatele uvítací bonus až 300 Kč. Akce je aktivní prvních 7 dnů po registraci a bonus se potvrzuje po dosažení 50 Kč v potvrzených odměnách.",
    requirements: ["Věk 15+", "Platná e-mailová adresa", "Registrace přes náš odkaz", "Nákup přes Tipli v prvních 7 dnech od registrace"],
    steps: [
      "Zaregistruj se přes náš odkaz",
      "V prvních 7 dnech od registrace nakup přes Tipli a začni sbírat cashback",
      "Jakmile máš na účtu aspoň 50 Kč z potvrzených odměn, odemkne se ti bonus 300 Kč"
    ],
    completionTime: "5 min",
    minRequirement: "50 Kč potvrzeného cashbacku",
    payoutTime: "po potvrzení odměn obchodem",
    status: "Aktivní",
    provider: "Tipli s.r.o.",
    rewardType: "Cashback",
    bonusValueCzk: 300,
    officialSourceUrl: "https://www.tipli.cz/casto-kladene-otazky",
    isAffiliate: true,
    verificationStatus: "verified",
    lastVerified: "2026-07-16",
    nextReview: "2026-08-16",
    fees: ["Registrace je zdarma; pro potvrzení bonusu je nutný nákup přes Tipli."],
    warnings: ["Konkrétní výše uvítacího bonusu může být nižší než maximum 300 Kč."]
  },
  {
    id: "patrongo",
    name: "Patron GO",
    type: "Ostatní",
    bonus: "200 Kč",
    age: "18+",
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
    payoutTime: "podle konkrétní příležitosti",
    status: "Neaktivní",
    provider: "Patron GO",
    rewardType: "Proměnlivá odměna",
    bonusValueCzk: null,
    officialSourceUrl: "https://www.patrongo.com/",
    isAffiliate: true,
    verificationStatus: "needs-review",
    lastVerified: "2026-07-16",
    nextReview: null,
    fees: [],
    warnings: ["Oficiální zdroj nepotvrzuje garantovaných 200 Kč pouze za registraci. Nabídka proto není v aktivním přehledu."]
  },
  {
    id: "robinhood-trading",
    name: "Robinhood",
    type: "Investice",
    bonus: "až 50 EUR v kryptu",
    age: "18+",
    tags: ["15 min", "Vklad"],
    logo: "R",
    logoClass: "bg-white text-emerald-600",
    logoUrl: `${import.meta.env.BASE_URL}assets/robinhood-logo.png`,
    logoFit: "contain",
    partnerUrl: "https://join.robinhood.com/eu_crypto/petrak-376f276/",
    pitch: "Přesná odměna a minimální vklad se zobrazí v aplikaci před dokončením podmínek.",
    description: "Robinhood Crypto uvádí odměnu až 50 EUR v kryptoměně po schválení účtu a splnění minimálního vkladu zobrazeného v aplikaci. Přesná výše odměny i minimální vklad jsou proměnlivé.",
    requirements: ["Věk 18+", "Platný doklad totožnosti", "Minimální vklad zobrazený v aplikaci"],
    steps: [
      "Klikni na náš odkaz a zadej svůj e-mail",
      "Na ten e-mail dokonči registraci",
      "Vlož minimální částku uvedenou v aplikaci",
      "Po splnění podmínek se ti připíše odměna v kryptoměně; její hodnota může kolísat"
    ],
    completionTime: "15 min",
    minRequirement: "minimální vklad dle aplikace",
    payoutTime: "po schválení účtu a splnění podmínek",
    status: "Aktivní",
    provider: "Robinhood Europe, UAB",
    rewardType: "Kryptoměna",
    bonusValueCzk: null,
    officialSourceUrl: "https://robinhood.com/eu/en/crypto/",
    isAffiliate: true,
    verificationStatus: "verified",
    lastVerified: "2026-07-16",
    nextReview: "2026-08-16",
    fees: ["Robinhood uvádí poplatek 0,50 % z eurové hodnoty provedeného kryptoměnového obchodu."],
    warnings: ["Peněžní hodnotu odměny je nutné držet 180 dnů; dostupnost a přesné podmínky jsou omezené a mohou se měnit."],
    riskNotice: "Kryptoměny jsou vysoce volatilní. Hodnota odměny může klesnout a můžeš přijít o část nebo celou investovanou částku."
  },
  {
    id: "raiffeisenbank-ucet",
    name: "Raiffeisenbank",
    type: "Banky",
    bonus: "až 3 000 Kč",
    age: "18+",
    tags: ["15 min", "10 plateb"],
    logo: "RB",
    logoClass: "bg-[#ffe500] text-black",
    logoUrl: `${import.meta.env.BASE_URL}assets/raiffeisenbank-logo.ico`,
    logoFit: "contain",
    partnerUrl: "https://www.rb.cz/promo/odmena",
    pitch: "500 Kč za každý z prvních šesti měsíců, ve kterém uděláš alespoň 10 plateb kartou.",
    description: "Raiffeisenbank nabízí novým klientům odměnu 500 Kč za každý z prvních šesti měsíců, ve kterém zaplatí alespoň 10krát kartou. Při splnění podmínek lze získat celkem až 3 000 Kč.",
    requirements: [
      "Věk 18+",
      "Nový klient bez osobního běžného účtu u Raiffeisenbank v předchozích 6 měsících",
      "Založení osobního běžného účtu do 31. 12. 2026",
      "Alespoň 10 plateb kartou v každém z prvních 6 kalendářních měsíců"
    ],
    steps: [
      "Otevři oficiální stránku akce a vyber si osobní běžný účet",
      "Dokonči online založení a aktivuj platební kartu",
      "V každém z prvních šesti měsíců zaplať alespoň 10krát kartou",
      "Za každý splněný měsíc ti banka připíše 500 Kč"
    ],
    completionTime: "15 min",
    minRequirement: "10 plateb kartou měsíčně po dobu 6 měsíců",
    payoutTime: "500 Kč v následujícím měsíci",
    status: "Aktivní",
    provider: "Raiffeisenbank a.s.",
    rewardType: "Peněžní bonus",
    bonusValueCzk: 3000,
    officialSourceUrl: "https://www.rb.cz/promo/odmena",
    isAffiliate: false,
    verificationStatus: "verified",
    lastVerified: "2026-07-16",
    nextReview: "2026-08-16",
    validUntil: "2026-12-31",
    fees: ["Poplatky se řídí zvoleným typem účtu; před založením zkontroluj aktuální sazebník banky."],
    warnings: ["Odměna není jednorázová. Pro celých 3 000 Kč je nutné splnit 10 karetních plateb v každém z šesti po sobě jdoucích měsíců."]
  },
  {
    id: "revolut-cestovani",
    name: "Revolut",
    type: "Cestování",
    bonus: "Ušetři na cestách",
    age: "18+",
    tags: ["10 min", "Směna měn"],
    logo: "R",
    logoClass: "bg-white text-black",
    logoUrl: `${import.meta.env.BASE_URL}assets/revolut-logo.png`,
    logoFit: "contain",
    partnerUrl: "https://www.revolut.com/cs-CZ/travel/",
    pitch: "Plať v místní měně, směňuj v rámci limitu plánu a vyhni se zbytečným nákladům směnáren a DCC.",
    ctaLabel: "Ušetřit na cestách",
    compactCtaLabel: "Ušetřit",
    valueLabel: "Jak můžeš ušetřit",
    description: "Revolut může snížit náklady na cestách díky platbám v místní měně, směně měn v rámci limitu zvoleného plánu, výběrům z bankomatů do limitu a cestovním slevám přes RevPoints. Výše úspory závisí na plánu, způsobu použití a aktuálních poplatcích; nejde o peněžní bonus za registraci.",
    requirements: [
      "Věk 18+",
      "Platný doklad totožnosti",
      "Chytrý telefon s aplikací Revolut",
      "Výběr plánu podle limitů a cestovních výhod, které skutečně využiješ"
    ],
    steps: [
      "Porovnej plán Standard zdarma a placené plány včetně limitů a poplatků",
      "Založ si účet a před cestou zkontroluj kurz i zbývající limit směny a výběrů",
      "V zahraničí vždy plať v místní měně a odmítni přepočet obchodníka nebo bankomatu",
      "RevPoints použij na podporované slevy, pobyty nebo letecké míle, pokud se ti vyplatí"
    ],
    completionTime: "10 min",
    minRequirement: "založení účtu a dodržení limitů zvoleného plánu",
    payoutTime: "průběžná úspora při cestování",
    status: "Aktivní",
    provider: "Revolut Bank UAB",
    rewardType: "Cestovní výhody",
    bonusValueCzk: null,
    officialSourceUrl: "https://www.revolut.com/cs-CZ/travel/",
    isAffiliate: false,
    verificationStatus: "verified",
    lastVerified: "2026-07-16",
    nextReview: "2026-08-16",
    fees: ["Plán Standard je bez měsíčního poplatku; limity směny a výběrů i širší cestovní výhody se liší podle plánu."],
    warnings: ["Nejde o garantovanou částku úspory ani o bonus za registraci.", "U některých plánů se uplatní limity spravedlivého používání a víkendové přirážky; bankomat nebo jiná třetí strana může účtovat vlastní poplatek.", "Limity, pojištění a další podmínky vždy zkontroluj v aplikaci před použitím."]
  }
];

export const allBonuses = offerRecords;
export const bonuses = offerRecords.filter((bonus) => bonus.status === "Aktivní" && bonus.verificationStatus === "verified");
export const archivedBonuses = offerRecords.filter((bonus) => !bonuses.includes(bonus));

export const bonusAmount = (bonus: Bonus) => bonus.bonusValueCzk ?? 0;

export const isTravelOffer = (bonus: Bonus) => bonus.rewardType === "Cestovní výhody";
export const offerCtaLabel = (bonus: Bonus) => bonus.ctaLabel ?? (isTravelOffer(bonus) ? "Zjistit více" : `Získat ${bonus.bonus}`);
export const offerCompactCtaLabel = (bonus: Bonus) => bonus.compactCtaLabel ?? "Detail nabídky";
export const offerValueLabel = (_bonus: Bonus) => "Hlavní výhoda";

export const totalPotential = bonuses.reduce((sum, bonus) => sum + bonusAmount(bonus), 0);

export const formatKc = (amount: number) => `${amount.toLocaleString("cs-CZ")} Kč`;

export const formatVerifiedDate = (bonus: Bonus) => {
  if (!bonus.lastVerified) return "Čeká na kontrolu";
  const [year, month, day] = bonus.lastVerified.split("-");
  return `Ověřeno ${Number(day)}. ${Number(month)}. ${year}`;
};

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
  promoCode?: string;
  actionLabel?: string;
  // TODO: nahradit našimi pozvánkovými odkazy / kódy
  partnerUrl: string;
};

// Jen akce, které novému uživateli reálně něco dají (kredit / slevu v penězích).
export const referralDeals: ReferralDeal[] = [
  {
    id: "shein",
    name: "SHEIN",
    reward: "−60 %",
    tagline: "60% sleva na první nákup",
    logo: "S",
    logoUrl: `${import.meta.env.BASE_URL}assets/shein-logo.png`,
    color: "from-white to-slate-200 text-black",
    promoCode: "9XP543G",
    actionLabel: "Získat slevu",
    description:
      "Exkluzivní sleva pro nové uživatele SHEIN. Zaregistruj se přes náš odkaz, použij kód 9XP543G a před zaplacením si ověř uplatněnou slevu přímo v košíku.",
    steps: [
      "Otevři SHEIN přes náš odkaz a vytvoř si nový účet",
      "Při prvním nákupu zadej slevový kód 9XP543G",
      "Před zaplacením zkontroluj v košíku, že se sleva správně uplatnila"
    ],
    note: "Platí pro nové uživatele. Konkrétní podmínky a výsledná výše slevy se mohou lišit podle aktuální akce SHEIN.",
    partnerUrl: "https://onelink.shein.com/41/5uzgm7pyfokh"
  },
  {
    id: "bolt",
    name: "Bolt",
    reward: "100 Kč",
    tagline: "100 Kč sleva na 2 první jízdy",
    logo: "B",
    logoUrl: `${import.meta.env.BASE_URL}assets/bolt-logo.png`,
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
    logoUrl: `${import.meta.env.BASE_URL}assets/liftago-logo.png`,
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
    logoUrl: `${import.meta.env.BASE_URL}assets/wolt-logo.png`,
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
    logoUrl: `${import.meta.env.BASE_URL}assets/vosime-logo.png`,
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

export const suggestions = ["mBank", "Raiffeisenbank", "Revolut", "Robinhood", "3 000 Kč bonus"];

export const exchangeFilters = ["Vše", "Banky", "Investice", "Cestování", "Ostatní"];
export const ageFilters = ["Vše", "15+", "18+"];

export const detailSteps = [
  "Zaregistruj se přes náš odkaz",
  "Ověř identitu nebo účet",
  "Splň podmínky nabídky",
  "Získej bonus"
];
