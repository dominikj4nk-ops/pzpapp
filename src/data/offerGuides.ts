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
    commonMistake: "Promo kód nelze doplnit zpětně. Nezapočítají se platby samotnou plastovou kartou ani platby u hazardních, finančních, platebních, pojišťovacích, investičních a kryptoměnových služeb.",
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
    intro: "Přes pozvánku získáš 500 Kč na vyzkoušení prvního účtu u Air Bank. Rozhoduje stejné telefonní číslo, založení účtu do 45 dnů a pět plateb kartou v jednom způsobilém měsíci.",
    preparation: ["České telefonní číslo +420", "Doklad totožnosti", "Jistotu, že jde o tvůj první běžný účet u Air Bank"],
    commonMistake: "Platby z měsíce aktivace a následujícího měsíce se nesčítají. Všech pět plateb udělej v jednom z těchto dvou měsíců.",
    steps: [
      { title: "Otevři osobní pozvánku", description: "Na úvodní stránce zadej české telefonní číslo, které potom použiješ i při založení účtu.", check: "Telefonní číslo je zaregistrované přes pozvánku." },
      { title: "Do 45 dnů založ první běžný účet", description: "Pokračuj do žádosti a dokonči svou první rámcovou smlouvu s novým běžným účtem.", check: "Účet je aktivní a od registrace čísla neuplynulo více než 45 dnů." },
      { title: "Vyber jeden měsíc pro pět plateb", description: "Zaplať alespoň pětkrát kartou v měsíci aktivace, nebo v celém bezprostředně následujícím měsíci. Platby z obou měsíců se nesčítají.", check: "V jednom způsobilém kalendářním měsíci máš 5 plateb." },
      { title: "Zkontroluj připsání 500 Kč", description: "Air Bank odměnu připíše na nový běžný účet nejpozději na konci kalendářního měsíce následujícího po měsíci, ve kterém splníš všechny podmínky.", check: "Na novém účtu vidíš připsanou odměnu 500 Kč." }
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
      { title: "Udrž 100 Kč v potvrzených odměnách", description: "Bonus lze vyplatit ve chvíli, kdy máš v jednom okamžiku alespoň 100 Kč potvrzených odměn z nákupů. Nevybírej cashback dříve, než se bonus potvrdí.", check: "Na účtu je alespoň 100 Kč potvrzených odměn z nákupů a bonus je připravený k výplatě." },
      { title: "Požádej o výplatu", description: "Doplň profil a český bankovní účet a v sekci Výplaty odměn odešli žádost.", check: "Výplata je zadaná na správný bankovní účet." }
    ]
  },
  patrongo: {
    intro: "Patron GO nabízí odměnu 200 Kč za dokončení odměnové příležitosti v aplikaci. Nejprve projde tvé pravidelné platby a ukáže ti konkrétní možnosti, které můžeš vyřešit.",
    preparation: ["Věk 18+", "Chytrý telefon", "Bankovní účet podporující bezpečné propojení přes PSD2", "Přehled o pravidelných platbách, které chceš zkontrolovat"],
    commonMistake: "Nečekej 200 Kč ihned za registraci. Odměna se připíše až po dokončení konkrétní odměnové příležitosti podle podmínek zobrazených v aplikaci.",
    steps: [
      { title: "Otevři Patron GO přes náš odkaz", description: "Stáhni aplikaci a začni registraci z pozvánky. Vyplň základní údaje a PSČ; podle Patron GO zabere samotná registrace přibližně minutu.", check: "Jsi přihlášený v aplikaci Patron GO." },
      { title: "Propoj bankovní výpis", description: "V prostředí své banky potvrď pasivní předání transakční historie. Patron GO nezná tvoje přihlašovací údaje a nemůže z účtu odesílat platby.", check: "Aplikace načetla pravidelné transakce k analýze." },
      { title: "Projdi nalezené příležitosti", description: "Aplikace označí platby, u kterých může existovat levnější nebo výhodnější varianta. U každé si přečti očekávanou úsporu, podmínky a případnou odměnu.", check: "Vybral sis příležitost, která pro tebe dává ekonomický smysl." },
      { title: "Dokonči řešení v aplikaci", description: "Postupuj podle chatu a pokynů u zvolené příležitosti. Neodsouhlasuj změnu služby, dokud nerozumíš ceně, délce závazku a všem podmínkám.", check: "Příležitost je v aplikaci označená jako úspěšně vyřešená." },
      { title: "Zkontroluj odměnu 200 Kč", description: "Po uznání dokončené příležitosti se odměna objeví v Patron GO. Podle aktuálních možností ji můžeš poslat na bankovní účet nebo použít v Premium katalogu.", check: "Vidíš připsaných 200 Kč a zvolený způsob využití odměny." }
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
      { title: "Kontroluj 500 Kč následující měsíc", description: "Podle pravidel akce banka připisuje odměnu nejpozději do 20. dne měsíce následujícího po splněném měsíci. Opakuj postup šest měsíců.", check: "Po šesti splněných měsících máš připsáno 3 000 Kč." }
    ]
  }
};
