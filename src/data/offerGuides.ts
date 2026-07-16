export type OfferGuideStep = {
  title: string;
  description: string;
  check: string;
};
export type OfferGuide = {
  intro: string;
  preparation: string[];
  commonMistake: string;
  steps: OfferGuideStep[];
};

export const offerGuides: Record<string, OfferGuide> = {
  "mbank-ucet": {
    intro: "Drž se pořadí kroků. Nejdůležitější je zadat doporučovací kód ještě v žádosti a potom platit mobilem nebo chytrým zařízením, ne pouze plastovou kartou.",
    preparation: ["Platný občanský průkaz", "Bank iD, nebo účet u jiné banky pro ověřovací platbu", "Telefon s Apple Pay nebo Google Pay"],
    commonMistake: "Zapomenutý promo kód nebo platby samotnou plastovou kartou se do této odměny nemusí započítat.",
    steps: [
      { title: "Otevři mBank přes náš odkaz", description: "Na stránce vyber mKonto nebo účet pro mladé a spusť online žádost. Neotvírej mezitím jiný odkaz na stejnou akci.", check: "V žádosti vidíš pole pro údaje nového klienta." },
      { title: "Vlož promo kód dominikj5463", description: "Na stránce se jménem a příjmením najdi pole „Přicházím na základě akce“ a vlož do něj kód před odesláním žádosti.", check: "Kód je v poli přesně jako dominikj5463." },
      { title: "Dokonči ověření a založení účtu", description: "Použij Bank iD, nebo ověření dokladem a obličejem. Při druhé možnosti může být potřeba ověřovací platba 1 Kč z účtu na tvé jméno.", check: "Máš potvrzené otevření mKonta." },
      { title: "Přidej kartu do telefonu nebo hodinek", description: "V aplikaci mBank přidej kartu do Apple Pay, Google Pay nebo podporovaného nositelného zařízení.", check: "Karta je v peněžence aktivní a připravená platit." },
      { title: "Udělej prvních 10 kvalifikovaných plateb", description: "Do 60 dnů zaplať desetkrát mobilem, hodinkami, prstenem nebo náramkem. Počítat se mohou i online platby přes Apple Pay nebo Google Pay.", check: "Máš evidovaných 10 dokončených plateb chytrým zařízením." },
      { title: "Počkej na připsání odměn", description: "Za každou z prvních deseti uznaných plateb získáš 100 Kč. mBank uvádí odeslání nejpozději do 45 dnů od splnění podmínek.", check: "Na účtu je připsáno až 10 × 100 Kč." }
    ]
  },
  "airbank-ucet": {
    intro: "Pozvánka vede k založení prvního účtu u Air Bank. Důležité: 500 Kč podle aktuálních pravidel dostává doporučitel, ne automaticky nový klient.",
    preparation: ["České telefonní číslo +420", "Doklad totožnosti", "Jistotu, že jde o tvůj první běžný účet u Air Bank"],
    commonMistake: "Nejčastější omyl je očekávat 500 Kč na účtu nového klienta. Aktuální pravidla tuto odměnu přiznávají doporučiteli.",
    steps: [
      { title: "Otevři osobní pozvánku", description: "Na úvodní stránce zadej české telefonní číslo, které potom použiješ i při založení účtu.", check: "Telefonní číslo je zaregistrované přes pozvánku." },
      { title: "Do 45 dnů založ první běžný účet", description: "Pokračuj do žádosti a dokonči svou první rámcovou smlouvu s novým běžným účtem.", check: "Účet je aktivní a od registrace čísla neuplynulo více než 45 dnů." },
      { title: "Vyber jeden měsíc pro pět plateb", description: "Zaplať alespoň pětkrát kartou v měsíci aktivace, nebo v celém bezprostředně následujícím měsíci. Platby z obou měsíců se nesčítají.", check: "V jednom způsobilém kalendářním měsíci máš 5 plateb." },
      { title: "Zkontroluj, komu jde odměna", description: "Po splnění podmínek připíše Air Bank 500 Kč doporučiteli nejpozději na konci následujícího kalendářního měsíce.", check: "Počítáš s tím, že nový klient nemá garantovaný peněžní bonus." }
    ]
  },
  "tipli-cashback": {
    intro: "U Tipli rozhoduje správné měření nákupu. Registrace sama nestačí: během prvních 7 dnů musíš nakupovat přes Tipli a neporušit podmínky vybraného obchodu.",
    preparation: ["E-mail pro registraci", "Povolené cookies", "Vypnutý blokátor reklam pro nákup přes Tipli"],
    commonMistake: "Nákup v aplikaci obchodu, cizí slevový kód, anonymní režim nebo dlouhé přeskakování mezi kartami může zrušit měření cashbacku.",
    steps: [
      { title: "Zaregistruj se přes náš odkaz", description: "Vytvoř účet Tipli a ověř e-mail. Sedmidenní období pro uvítací bonus běží ode dne registrace.", check: "Jsi přihlášený a vidíš svůj Tipli účet." },
      { title: "Vyber obchod a přečti jeho podmínky", description: "Na Tipli otevři profil obchodu a zkontroluj sazbu cashbacku, vyloučené kategorie a povolené kupóny.", check: "Víš, na co přesně se cashback vztahuje." },
      { title: "Proklikni se z Tipli přímo do obchodu", description: "Povol cookies, vypni Adblock a dokonči nákup ideálně do 30 minut ve stejném okně prohlížeče.", check: "Objednávku jsi dokončil po posledním prokliku z Tipli." },
      { title: "Počkej na registraci a potvrzení cashbacku", description: "Odměna se obvykle zaregistruje do 48 hodin. Obchod ji může potvrzovat až 70 dnů kvůli vrácení nebo stornu objednávky.", check: "V Tipli vidíš registrovanou nebo potvrzenou odměnu." },
      { title: "Nasbírej bonus až 300 Kč", description: "Během prvních 7 dnů Tipli dorovnává získaný cashback stejnou částkou, dokud souhrnný bonus nedosáhne maxima 300 Kč.", check: "Rozumíš, že 300 Kč není jednorázová odměna za samotnou registraci." },
      { title: "Požádej o výplatu", description: "Po potvrzení odměn doplň profil a český bankovní účet a v sekci Výplaty odměn odešli žádost.", check: "Výplata je zadaná na správný bankovní účet." }
    ]
  },
  "robinhood-trading": {
    intro: "Robinhood uvádí odměnu až 50 EUR v kryptu. Přesná částka a minimální vklad nejsou pevné; vždy se řiď tím, co se zobrazí přímo v aplikaci před vkladem.",
    preparation: ["Věk 18+ a podporovaná země", "Platný doklad totožnosti", "Bankovní účet pro SEPA vklad", "Ochota nést riziko kolísání krypta"],
    commonMistake: "Částka 50 EUR není garantovaná a peněžní hodnotu odměny je nutné po připsání držet 180 dnů.",
    steps: [
      { title: "Otevři pozvánku a zadej e-mail", description: "Registraci začni přes náš odkaz a pokračuj se stejnou e-mailovou adresou v aplikaci Robinhood.", check: "Aplikace zobrazuje rozpracovanou registraci a případnou promo nabídku." },
      { title: "Dokonči ověření účtu", description: "Nahraj požadovaný doklad, vyplň osobní údaje a počkej na schválení. Dostupnost odměny závisí i na jurisdikci.", check: "Účet je schválený a promo je v aplikaci aktivní." },
      { title: "Přečti přesnou nabídku před vkladem", description: "V aplikaci si poznamenej minimální vklad, výši odměny a termín. Pokud nabídku nevidíš, nevkládej peníze jen podle tohoto webu.", check: "Znáš konkrétní minimální vklad a očekávanou odměnu." },
      { title: "Pošli požadovaný vklad", description: "Proveď SEPA převod z účtu, který můžeš používat. Připsání standardního převodu může trvat až dva pracovní dny.", check: "Vklad je v aplikaci připsaný a podmínka označená jako splněná." },
      { title: "Zkontroluj připsané krypto", description: "Po splnění podmínek se odměna objeví jako kryptoměna. Její eurová hodnota může od první chvíle růst i klesat.", check: "V portfoliu vidíš připsanou odměnu." },
      { title: "Dodrž 180denní omezení", description: "Peněžní hodnotu odměny drž na účtu 180 dnů. Před obchodem počítej také s aktuálním poplatkem Robinhood a tržním rizikem.", check: "Nevybíráš hodnotu odměny před koncem omezení." }
    ]
  },
  "raiffeisenbank-ucet": {
    intro: "Odměna se nesplní jednou. Každý z prvních šesti celých kalendářních měsíců musíš udělat alespoň 10 karetních plateb, abys za daný měsíc získal 500 Kč.",
    preparation: ["Věk nad 18 let", "Žádný osobní běžný účet u Raiffeisenbank v předchozích 6 měsících", "Akci 6 × 500 Kč jsi dříve nevyužil"],
    commonMistake: "Měsíc s méně než 10 platbami propadne a šestiměsíční období se neprodlouží. Převody mezi účty se jako platby kartou nepočítají.",
    steps: [
      { title: "Ověř si nárok", description: "Potvrď, že splňuješ věk, nejsi současný ani nedávný klient s osobním běžným účtem a stejnou akci jsi už nečerpal.", check: "Splňuješ všechny tři vstupní podmínky." },
      { title: "Založ osobní běžný účet", description: "Na oficiální stránce vyber vhodný účet a dokonči online žádost nejpozději do uvedeného konce akce.", check: "Účet je aktivní a spadá do akce 6 × 500 Kč." },
      { title: "Aktivuj kartu nebo mobilní peněženku", description: "Údaje karty můžeš po založení účtu přidat do Apple Pay, Peněženky Google nebo RaiPay a začít platit bez čekání na plastovou kartu.", check: "Karta je aktivní a první platba prošla." },
      { title: "Počkej na první celý kalendářní měsíc", description: "První způsobilý měsíc je kalendářní měsíc následující po měsíci založení účtu.", check: "Víš, který den začíná první z tvých šesti měsíců." },
      { title: "Každý měsíc zaplať alespoň 10krát", description: "Počítají se platby kartou v obchodě, online i přes mobilní peněženku. Udělej si rezervu a nenechávej desátou platbu na poslední den.", check: "V každém způsobilém měsíci máš alespoň 10 zaúčtovaných plateb." },
      { title: "Kontroluj 500 Kč následující měsíc", description: "Banka připisuje odměnu do 15. dne měsíce následujícího po splněném měsíci. Opakuj postup šest měsíců.", check: "Po šesti splněných měsících máš připsáno až 3 000 Kč." }
    ]
  },
  "revolut-cestovani": {
    intro: "Revolut ti neposílá fixní bonus. Úspora vzniká správným použitím: vhodný plán, směna v rámci limitu, platba v místní měně a rozumné výběry z bankomatu.",
    preparation: ["Doklad totožnosti a telefon", "Přehled zemí a měn na cestě", "Odhad měsíční útraty, směny a výběrů"],
    commonMistake: "Nikdy nepotvrzuj přepočet do Kč nabízený terminálem nebo bankomatem. DCC obvykle používá kurz provozovatele, ne kurz tvé karty.",
    steps: [
      { title: "Nejdřív porovnej plány", description: "Začni plánem Standard zdarma a srovnej jeho limity s placenými plány. Placený plán ber jen tehdy, když jeho limity a výhody převýší měsíční cenu.", check: "Znáš cenu plánu a limity směny i výběrů." },
      { title: "Založ a ověř účet", description: "Stáhni aplikaci, ověř totožnost a vytvoř si virtuální nebo fyzickou kartu. Virtuální kartu můžeš přidat do Apple Pay nebo Google Pay.", check: "Karta je aktivní a můžeš s ní platit." },
      { title: "Před cestou zkontroluj směnu", description: "V aplikaci si zobraz kurz, případný poplatek a zbývající limit. U plánů s víkendovou přirážkou směňuj raději před víkendem.", check: "Před potvrzením směny vidíš celkový náklad." },
      { title: "V zahraničí vždy vyber místní měnu", description: "Terminálu nebo bankomatu odmítni převod do CZK. Nech směnu provést Revolut v měně obchodníka.", check: "Na terminálu potvrzuješ částku v místní měně." },
      { title: "Hlídej limit výběrů a cizí poplatky", description: "Vybírej jen do limitu svého plánu. Bankomat může účtovat vlastní poplatek, i když Revolut žádný další poplatek nepřidá.", check: "Před výběrem vidíš poplatek bankomatu a zbývající limit." },
      { title: "RevPoints používej jen tam, kde dávají smysl", description: "Body můžeš podle podmínek převádět na letecké míle nebo slevy na podporované pobyty a aktivity. Vždy porovnej cenu i bez bodů.", check: "Zvolená odměna skutečně snižuje cenu tvé cesty." },
      { title: "Po cestě zkontroluj reálnou úsporu", description: "Porovnej kurzy, poplatky a cenu plánu s běžnou kartou nebo směnárnou. Podle výsledku uprav plán pro další cestu.", check: "Víš, za co jsi ušetřil a za co jsi naopak zaplatil." }
    ]
  }
};
