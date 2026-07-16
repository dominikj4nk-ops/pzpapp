import { allBonuses, bonuses, type Bonus } from "../data/mockData";

export const SITE_URL = "https://prachyzaregistraci.cz";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/assets/hero-trust-v3.png`;

export type SeoDescriptor = {
  title: string;
  description: string;
  canonicalPath: string;
  index: boolean;
  type?: "website" | "article";
  image?: string;
};

const staticSeo: Record<string, SeoDescriptor> = {
  "/": {
    title: "Bonusy za registraci u bank a platforem | Prachy za registraci",
    description: "Přehled aktuálních bonusů za registraci s podmínkami, detailními postupy a odkazy na oficiální zdroje. Bankovní bonusy, cashback a kryptoměny.",
    canonicalPath: "/",
    index: true
  },
  "/nabidky": {
    title: "Aktuální bonusy za registraci | Prachy za registraci",
    description: "Porovnej aktuální bonusy za registraci podle odměny, věku a potřebného času. U každé nabídky uvádíme podmínky a datum poslední kontroly.",
    canonicalPath: "/nabidky",
    index: true
  },
  "/cashback": {
    title: "Cashback a slevy pro nové uživatele | Prachy za registraci",
    description: "Přehled cashbacku, kreditů a slev pro nové uživatele. Před využitím vždy zkontroluj podmínky a platnost přímo u poskytovatele.",
    canonicalPath: "/cashback",
    index: false
  },
  "/jak-overujeme": {
    title: "Jak ověřujeme bonusové nabídky | Prachy za registraci",
    description: "Zjisti, jak kontrolujeme zdroje, podmínky, poplatky a aktuálnost bonusových nabídek a jak web vydělává na affiliate odkazech.",
    canonicalPath: "/jak-overujeme",
    index: true
  },
  "/podpora": {
    title: "Kontakt a podpora | Prachy za registraci",
    description: "Kontakt pro dotazy k nabídkám, podmínkám a nevyplaceným bonusům. Nikdy po tobě nechceme heslo ani přístup do bankovnictví.",
    canonicalPath: "/podpora",
    index: true
  },
  "/podminky": {
    title: "Podmínky použití a soukromí | Prachy za registraci",
    description: "Podmínky používání webu Prachy za registraci, affiliate spolupráce, odpovědnost, ochrana soukromí a kontaktní údaje.",
    canonicalPath: "/podminky",
    index: true
  }
};

const noindexSeo: Record<string, Omit<SeoDescriptor, "canonicalPath" | "index">> = {
  "/hledat": { title: "Hledat nabídku | Prachy za registraci", description: "Interní vyhledávání nabídek." },
  "/notifikace": { title: "Notifikace | Prachy za registraci", description: "Tvoje upozornění a rozpracované nabídky." },
  "/kolo": { title: "Kolo štěstí | Prachy za registraci", description: "Interaktivní soutěž pro návštěvníky webu." },
  "/zisk": { title: "Přehled bonusů | Prachy za registraci", description: "Soukromý přehled rozpracovaných bonusů." },
  "/nastaveni": { title: "Nastavení | Prachy za registraci", description: "Nastavení webové aplikace." }
};

function offerSeo(bonus: Bonus): SeoDescriptor {
  const active = bonus.status === "Aktivní" && bonus.verificationStatus === "verified";
  const travelOffer = bonus.rewardType === "Cestovní výhody";
  return {
    title: travelOffer
      ? `${bonus.name}: ${bonus.bonus} | Prachy za registraci`
      : `${bonus.name}: ${bonus.bonus} za splnění podmínek | Prachy za registraci`,
    description: travelOffer
      ? `${bonus.name}: jak ušetřit při cestování bez slibu pevné peněžní odměny. Detailní postup, limity, poplatky a oficiální zdroj.`
      : `${bonus.name}: ${bonus.bonus}. Podmínky, detailní postup krok za krokem, poplatky, omezení a oficiální zdroj.`,
    canonicalPath: `/nabidky/${bonus.id}`,
    index: active
  };
}

export function normalizePath(pathname: string) {
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
  return clean || "/";
}

export function getSeoForPath(pathname: string): SeoDescriptor {
  const path = normalizePath(pathname);
  if (staticSeo[path]) return staticSeo[path];
  if (noindexSeo[path]) return { ...noindexSeo[path], canonicalPath: path, index: false };

  const detailMatch = path.match(/^\/nabidky\/([^/]+)$/);
  if (detailMatch) {
    const bonus = allBonuses.find((item) => item.id === detailMatch[1]);
    if (bonus) return offerSeo(bonus);
  }

  return {
    title: "Stránka nenalezena | Prachy za registraci",
    description: "Požadovaná stránka neexistuje. Pokračuj na přehled aktuálních nabídek.",
    canonicalPath: path,
    index: false
  };
}

export function getJsonLdForPath(pathname: string) {
  const path = normalizePath(pathname);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "prachyzaregistraci.cz",
      url: `${SITE_URL}/`,
      email: "prachyzaregistraci.cz@seznam.cz"
    }
  ];

  if (path === "/") {
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "prachyzaregistraci.cz",
      inLanguage: "cs-CZ",
      publisher: { "@id": `${SITE_URL}/#organization` }
    });
  }

  const detailMatch = path.match(/^\/nabidky\/([^/]+)$/);
  const bonus = detailMatch ? bonuses.find((item) => item.id === detailMatch[1]) : undefined;
  if (bonus) {
    graph.push({
      "@type": "WebPage",
      "@id": `${SITE_URL}/nabidky/${bonus.id}#webpage`,
      url: `${SITE_URL}/nabidky/${bonus.id}`,
      name: `${bonus.name}: ${bonus.bonus}`,
      description: bonus.description,
      dateModified: bonus.lastVerified,
      inLanguage: "cs-CZ",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` }
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export const prerenderPaths = [
  "/",
  "/nabidky",
  ...bonuses.map((bonus) => `/nabidky/${bonus.id}`),
  "/cashback",
  "/jak-overujeme",
  "/podpora",
  "/podminky"
];
