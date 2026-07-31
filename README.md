# prachyzaregistraci.cz frontend prototyp

High-fidelity responzivni frontend prototyp webove aplikace prachyzaregistraci.cz postaveny v React + Vite + TypeScript + Tailwind CSS.

## Spusteni

```bash
npm install
npm run dev
```

Vyvojovy server standardne bezi na `http://localhost:5173`.

## Produkcni nasazeni na aaPanel

Projekt se nasazuje jako staticky web. Node.js je potreba pouze pro sestaveni.

```bash
npm ci
npm run build
```

V aaPanel nastav Document root na `/www/wwwroot/prachyzaregistraci.cz/dist` a pouzij
Nginx pravidla z `deploy/aapanel-nginx.conf`. Samostatny start prikaz ani aplikacni
port nejsou potreba; HTTPS a porty 80/443 spravuje Nginx v aaPanel.
