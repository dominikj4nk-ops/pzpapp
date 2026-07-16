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
  payoutTimeLabel?: string;
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
    bonus: "1 000 Kč",
    age: "15+",
    tags: ["15 min", "Snadné"],
    logo: "mB",
    logoClass: "bg-white text-pink-600",
    logoUrl: `${import.meta.env.BASE_URL}assets/mbank-logo.png`,
    partnerUrl: "https://www.mbank.cz/mgm/ucty-mkonto.html?numer=dominikj5463",
    promoCode: "dominikj5463",
    pitch: "100 Kč za každou z prvních 10 plateb mobilem nebo chytrým zařízením.",
    compactCtaLabel: "Získat 1 000 Kč",
    description: "Po založení nového účtu přes doporučovací kód získáš 100 Kč za každou z prvních deseti kvalifikovaných plateb provedených do 60 dnů mobilem, hodinkami, prstenem nebo náramkem. Celkem může být připsáno 1 000 Kč.",
    requirements: ["Věk alespoň 15 let", "Nové mKonto nebo mKonto #navlastnitriko založené do 30. 9. 2026", "Promo kód vyplněný přímo v žádosti", "Telefon, hodinky, prsten nebo náramek pro kvalifikované platby"],
    steps: [
      "Otevři mBank přes náš odkaz a spusť žádost o mKonto nebo mKonto #navlastnitriko",
      "Do pole „Přicházím na základě akce“ ještě před odesláním žádosti zadej kód dominikj5463",
      "Po otevření účtu přidej kartu do podporovaného telefonu, hodinek, prstenu nebo náramku",
      "Do 60 dnů proveď prvních 10 kvalifikovaných a následně zaúčtovaných plateb",
      "Za každou uznanou platbu obdržíš 100 Kč, celkem 1 000 Kč"
    ],
    completionTime: "15 min",
    minRequirement: "promo kód v žádosti a 10 kvalifikovaných plateb do 60 dnů",
    payoutTime: "nejpozději do 45 dnů",
    payoutTimeLabel: "do 45 dnů",
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
    warnings: ["Promo kód nelze doplnit zpětně a akci nelze kombinovat s jinou akcí mBank pro nové klienty.", "Nezapočítávají se platby u hazardních, finančních, platebních, pojišťovacích, investičních a kryptoměnových služeb ani platby samotnou plastovou kartou."]
  },
  {
    id: "airbank-ucet",
    name: "Air Bank",
    type: "Banky",
    bonus: "500 Kč",
    age: "15+",
    tags: ["20 min", "5 plateb"],
    logo: "AB",
    logoClass: "bg-white text-lime-600",
    logoUrl: `${import.meta.env.BASE_URL}assets/airbank-logo.png`,
    logoFit: "contain",
    partnerUrl: "https://www.airbank.cz/pozvani-pratel?referrer=pkddk9",
    pitch: "500 Kč po založení prvního účtu a pěti platbách kartou.",
    ctaLabel: "Získat 500 Kč",
    compactCtaLabel: "Získat 500 Kč",
    valueLabel: "Odměna",
    description: "Air Bank připíše novému klientovi 500 Kč po registraci přes pozvánku, založení prvního účtu do 45 dnů a alespoň pěti platbách kartou v jednom způsobilém měsíci.",
    requirements: ["Věk alespoň 15 let", "České telefonní číslo s předvolbou +420", "První vlastní rámcová smlouva s aktivním účtem u Air Bank", "5 plateb kartou nebo metodou Cvak v jednom způsobilém měsíci"],
    steps: [
      "Otevři pozvánku a před vstupem do žádosti zaregistruj své české telefonní číslo",
      "Do 45 dnů si se stejným číslem založ a aktivuj svůj první vlastní běžný účet",
      "V měsíci aktivace nebo v bezprostředně následujícím měsíci proveď 5 plateb kartou nebo metodou Cvak",
      "Air Bank připíše 500 Kč nejpozději do konce následujícího kalendářního měsíce"
    ],
    completionTime: "20 min",
    minRequirement: "první účet do 45 dnů a 5 plateb kartou",
    payoutTime: "nejpozději do konce následujícího kalendářního měsíce",
    payoutTimeLabel: "do konce dalšího měsíce",
    status: "Aktivní",
    provider: "Air Bank a.s.",
    rewardType: "Peněžní bonus",
    bonusValueCzk: 500,
    officialSourceUrl: "https://www.airbank.cz/co-vas-nejvic-zajima/jak-se-stat-klientem-air-bank-na-doporuceni-pritele/",
    isAffiliate: true,
    verificationStatus: "verified",
    lastVerified: "2026-07-16",
    nextReview: "2026-08-16",
    fees: ["Vedení běžného účtu je podle oficiální stránky zdarma."],
    warnings: ["Účet je nutné založit do 45 dnů na stejné české telefonní číslo.", "Pět plateb musí proběhnout v měsíci aktivace účtu nebo v bezprostředně následujícím měsíci; platby z obou měsíců se nesčítají."]
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
    compactCtaLabel: "Získat bonus",
    description: "Tipli během prvních 7 dnů od registrace připisuje k cashbacku z nákupů bonus ve stejné výši, dokud součet bonusu nedosáhne 300 Kč. Bonus není jednorázový a k jeho výplatě musí být na účtu v jednom okamžiku alespoň 100 Kč potvrzených odměn z nákupů.",
    requirements: ["Věk 15+", "Platná e-mailová adresa", "Registrace přes náš odkaz", "Nákup přes Tipli v prvních 7 dnech od registrace"],
    steps: [
      "Zaregistruj se přes náš odkaz",
      "V prvních 7 dnech od registrace nakup přes Tipli a začni sbírat cashback",
      "Tipli během prvních 7 dnů dorovnává získaný cashback stejnou částkou, celkem do 300 Kč",
      "Počkej na potvrzení nákupů a pro výplatu udrž alespoň 100 Kč v potvrzených odměnách z nákupů"
    ],
    completionTime: "5 min",
    minRequirement: "nákupy přes Tipli během prvních 7 dnů a 100 Kč potvrzených odměn pro výplatu bonusu",
    payoutTime: "po potvrzení odměn obchodem",
    payoutTimeLabel: "po potvrzení",
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
    warnings: ["Konkrétní výše bonusu závisí na cashbacku z nákupů uskutečněných v prvních 7 dnech.", "Cizí slevový kód, změna objednávky, vrácení zboží nebo porušení podmínek obchodu může připsání cashbacku zrušit."]
  },
  {
    id: "patrongo",
    name: "Patron GO",
    type: "Ostatní",
    bonus: "200 Kč",
    age: "18+",
    tags: ["1 min", "Úspory"],
    logo: "P",
    logoClass: "bg-[#f1e9f8] text-[#31006f]",
    logoUrl: `${import.meta.env.BASE_URL}assets/patron-go-logo.svg`,
    logoFit: "contain",
    partnerUrl: "https://patrongoapp.app.link/invite/prachyzaregistraci",
    pitch: "Získej 200 Kč za dokončení odměnové příležitosti, kterou ti aplikace nabídne.",
    ctaLabel: "Získat 200 Kč",
    compactCtaLabel: "Získat 200 Kč",
    valueLabel: "Odměna",
    description: "Patron GO analyzuje pravidelné platby a upozorní tě, kde můžeš platit méně. Za dokončení odměnové příležitosti v aplikaci můžeš získat 200 Kč; samotná registrace k připsání odměny nestačí.",
    requirements: ["Věk 18+", "Chytrý telefon", "Propojení bankovního výpisu", "Doplnění PSČ"],
    steps: ["Stáhni aplikaci přes náš odkaz a zaregistruj se", "Doplň PSČ a základní údaje", "Povol bance bezpečně poslat online výpis", "Vyber příležitost k úspoře a dokonči její podmínky", "Odměnu si vyber na účet nebo ji použij v Premium katalogu"],
    completionTime: "1 min",
    minRequirement: "dokončení odměnové příležitosti v aplikaci",
    payoutTime: "po splnění podmínek konkrétní příležitosti",
    payoutTimeLabel: "dle příležitosti",
    status: "Aktivní",
    provider: "Patron GO",
    rewardType: "Peněžní bonus",
    bonusValueCzk: 200,
    officialSourceUrl: "https://www.patrongo.com/",
    isAffiliate: true,
    verificationStatus: "verified",
    lastVerified: "2026-07-16",
    nextReview: "2026-08-16",
    fees: ["Registrace a používání aplikace jsou zdarma; případné změny služby vždy zkontroluj přímo v aplikaci."],
    warnings: ["Odměna 200 Kč se nepřipisuje pouze za registraci; je potřeba dokončit odměnovou příležitost zobrazenou v aplikaci.", "Pro analýzu plateb je potřeba povolit bance pasivní předání transakční historie přes PSD2."]
  },
  {
    id: "robinhood-trading",
    name: "Robinhood",
    type: "Investice",
    bonus: "50 EUR v kryptu",
    age: "18+",
    tags: ["15 min", "Vklad"],
    logo: "R",
    logoClass: "bg-white text-emerald-600",
    logoUrl: `${import.meta.env.BASE_URL}assets/robinhood-logo.png`,
    logoFit: "contain",
    partnerUrl: "https://join.robinhood.com/eu_crypto/petrak-376f276/",
    pitch: "Přesná odměna a minimální vklad se zobrazí v aplikaci před dokončením podmínek.",
    compactCtaLabel: "Získat krypto",
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
    payoutTimeLabel: "po splnění",
    status: "Aktivní",
    provider: "Robinhood Europe, UAB",
    rewardType: "Kryptoměna",
    bonusValueCzk: null,
    officialSourceUrl: "https://robinhood.com/eu/en/support/articles/rewards/",
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
    bonus: "3 000 Kč",
    age: "18+",
    tags: ["15 min", "10 plateb"],
    logo: "RB",
    logoClass: "bg-[#ffe500] text-black",
    logoUrl: `${import.meta.env.BASE_URL}assets/raiffeisenbank-logo.svg`,
    logoFit: "symbol",
    partnerUrl: "https://onb.rb.cz/onb-web?mgm=CqbQu8",
    pitch: "500 Kč za každý z prvních šesti měsíců, ve kterém uděláš alespoň 10 plateb kartou.",
    compactCtaLabel: "Získat odměnu",
    description: "Raiffeisenbank nabízí novým klientům odměnu 500 Kč za každý z prvních šesti měsíců, ve kterém zaplatí alespoň 10krát kartou. Při splnění podmínek lze získat celkem až 3 000 Kč.",
    requirements: [
      "Věk 18+",
      "Nový klient bez osobního běžného účtu u Raiffeisenbank v předchozích 6 měsících",
      "Založení osobního běžného účtu do 31. 12. 2026",
      "Alespoň 10 plateb kartou v každém ze 6 kalendářních měsíců následujících po měsíci založení"
    ],
    steps: [
      "Otevři naši pozvánku a vyber si osobní běžný účet CHYTRÝ, AKTIVNÍ nebo EXKLUZIVNÍ",
      "Dokonči online založení a aktivuj platební kartu",
      "Od následujícího kalendářního měsíce zaplať každý měsíc alespoň 10krát kartou",
      "Za každý splněný měsíc ti banka připíše 500 Kč nejpozději do 20. dne dalšího měsíce"
    ],
    completionTime: "15 min",
    minRequirement: "10 plateb kartou měsíčně po dobu 6 měsíců",
    payoutTime: "nejpozději do 20. dne následujícího měsíce",
    payoutTimeLabel: "následující měsíc",
    status: "Aktivní",
    provider: "Raiffeisenbank a.s.",
    rewardType: "Peněžní bonus",
    bonusValueCzk: 3000,
    officialSourceUrl: "https://www.rb.cz/promo/odmena",
    isAffiliate: true,
    verificationStatus: "verified",
    lastVerified: "2026-07-16",
    nextReview: "2026-08-16",
    validUntil: "2026-12-31",
    fees: ["CHYTRÝ účet má podle oficiální stránky vedení zdarma; u ostatních tarifů před založením zkontroluj aktuální sazebník."],
    warnings: ["Odměna není jednorázová. Pro celých 3 000 Kč je nutné splnit 10 karetních plateb v každém z šesti po sobě jdoucích měsíců."]
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

export const suggestions = ["mBank", "Raiffeisenbank", "Patron GO", "Robinhood", "3 000 Kč bonus"];

export const exchangeFilters = ["Vše", "Banky", "Investice", "Ostatní"];
export const ageFilters = ["Vše", "15+", "18+"];

export const detailSteps = [
  "Zaregistruj se přes náš odkaz",
  "Ověř identitu nebo účet",
  "Splň podmínky nabídky",
  "Získej bonus"
];
