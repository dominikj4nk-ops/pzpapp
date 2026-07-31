import { allBonuses, bonuses, type Bonus } from "../data/mockData";

export const SITE_URL = "https://prachyzaregistraci.cz";
export const SITE_NAME = "Prachy za registraci";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/assets/hero-trust-v3.png`;
const SITE_CONTENT_LAST_MODIFIED = "2026-07-31";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export type SeoDescriptor = {
  title: string;
  description: string;
  canonicalPath: string;
  index: boolean;
  lastModified?: string;
  type?: "website" | "article";
  image?: string;
};

const staticSeo: Record<string, SeoDescriptor> = {
  "/": {
    title: "Bonusy za registraci u bank a platforem | Prachy za registraci",
    description: "Přehled aktuálních bonusů za registraci s podmínkami, detailními postupy a odkazy na oficiální zdroje. Bankovní bonusy, cashback a kryptoměny.",
    canonicalPath: "/",
    index: true,
    lastModified: SITE_CONTENT_LAST_MODIFIED
  },
  "/nabidky": {
    title: "Aktuální bonusy za registraci | Prachy za registraci",
    description: "Porovnej aktuální bonusy za registraci podle odměny, věku a potřebného času. U každé nabídky uvádíme podmínky a datum poslední kontroly.",
    canonicalPath: "/nabidky",
    index: true,
    lastModified: SITE_CONTENT_LAST_MODIFIED
  },
  "/cashback": {
    title: "Cashback a slevy pro nové uživatele | Prachy za registraci",
    description: "Přehled cashbacku, kreditů a slev pro nové uživatele. Před využitím vždy zkontroluj podmínky a platnost přímo u poskytovatele.",
    canonicalPath: "/cashback",
    index: false,
    lastModified: SITE_CONTENT_LAST_MODIFIED
  },
  "/jak-overujeme": {
    title: "Jak ověřujeme bonusové nabídky | Prachy za registraci",
    description: "Zjisti, jak kontrolujeme zdroje, podmínky, poplatky a aktuálnost bonusových nabídek a jak web vydělává na affiliate odkazech.",
    canonicalPath: "/jak-overujeme",
    index: true,
    lastModified: SITE_CONTENT_LAST_MODIFIED
  },
  "/podpora": {
    title: "Kontakt a podpora | Prachy za registraci",
    description: "Kontakt pro dotazy k nabídkám, podmínkám a nevyplaceným bonusům. Nikdy po tobě nechceme heslo ani přístup do bankovnictví.",
    canonicalPath: "/podpora",
    index: true,
    lastModified: SITE_CONTENT_LAST_MODIFIED
  },
  "/podminky": {
    title: "Podmínky použití a soukromí | Prachy za registraci",
    description: "Podmínky používání webu Prachy za registraci, affiliate spolupráce, odpovědnost, ochrana soukromí a kontaktní údaje.",
    canonicalPath: "/podminky",
    index: true,
    lastModified: SITE_CONTENT_LAST_MODIFIED
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
    index: active,
    lastModified: bonus.lastVerified ?? SITE_CONTENT_LAST_MODIFIED,
    type: "article"
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

function breadcrumbList(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${items[items.length - 1]?.path ?? "/"}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString()
    }))
  };
}

export function getJsonLdForPath(pathname: string) {
  const path = normalizePath(pathname);
  const seo = getSeoForPath(path);
  const canonical = new URL(seo.canonicalPath, SITE_URL).toString();
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: "prachyzaregistraci.cz",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/pzr-web-icon.png`
      },
      email: "prachyzaregistraci.cz@seznam.cz",
      sameAs: [
        "https://www.tiktok.com/@prachyzaregistraci",
        "https://www.instagram.com/prachyzaregistracicz/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: "prachyzaregistraci.cz",
      description: staticSeo["/"].description,
      inLanguage: "cs-CZ",
      publisher: { "@id": ORGANIZATION_ID }
    }
  ];

  const detailMatch = path.match(/^\/nabidky\/([^/]+)$/);
  const bonus = detailMatch ? allBonuses.find((item) => item.id === detailMatch[1]) : undefined;
  const page = {
    "@type": path === "/nabidky" ? "CollectionPage" : "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: seo.title,
    description: seo.description,
    inLanguage: "cs-CZ",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    ...(seo.lastModified ? { dateModified: seo.lastModified } : {})
  };

  if (path === "/nabidky" || path === "/") {
    const itemListId = `${SITE_URL}/nabidky#itemlist`;
    graph.push({
      ...page,
      ...(path === "/nabidky" ? { mainEntity: { "@id": itemListId } } : {})
    });
    graph.push({
      "@type": "ItemList",
      "@id": itemListId,
      name: "Aktuální bonusy za registraci",
      numberOfItems: bonuses.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: bonuses.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${item.name}: ${item.bonus}`,
        url: `${SITE_URL}/nabidky/${item.id}`
      }))
    });
  } else {
    graph.push({
      ...page,
      ...(bonus ? { name: `${bonus.name}: ${bonus.bonus}`, description: bonus.description } : {})
    });
  }

  if (path !== "/") {
    const breadcrumbs = [{ name: "Prachy za registraci", path: "/" }];
    if (bonus) breadcrumbs.push({ name: "Nabídky", path: "/nabidky" });
    breadcrumbs.push({ name: bonus?.name ?? seo.title.split(" | ")[0], path: seo.canonicalPath });
    graph.push(breadcrumbList(breadcrumbs));
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
