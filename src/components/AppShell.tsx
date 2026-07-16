import {
  ArrowRight,
  BadgeCheck,
  BadgePercent,
  Gift,
  HelpCircle,
  House,
  Instagram,
  LayoutGrid,
  Mail,
  Search,
  ScrollText,
  ShieldCheck
} from "lucide-react";
import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { bonuses } from "../data/mockData";
import { paths } from "../routes/paths";
import BottomNav from "./BottomNav";
import ErrorBoundary from "./ErrorBoundary";
import { FORM_TARGET_EMAIL } from "./formMailer";
import { BrandLogo, TikTokIcon } from "./ui";

type AppShellProps = {
  children: ReactNode;
};

const navItems = [
  { label: "Přehled", path: paths.home, icon: House },
  { label: "Všechny nabídky", path: paths.exchanges, icon: LayoutGrid },
  { label: "Cashback", path: paths.cashback, icon: BadgePercent },
  { label: "Kolo štěstí", path: paths.wheel, icon: Gift }
];

const supportItems = [
  { label: "Nápověda", path: paths.help, icon: HelpCircle },
  { label: "Jak ověřujeme", path: paths.methodology, icon: ShieldCheck },
  { label: "Podmínky použití", path: paths.terms, icon: ScrollText }
];

const pageTitle = (pathname: string) => {
  if (pathname === paths.home) return "Přehled";
  if (pathname === paths.exchanges) return "Katalog nabídek";
  if (pathname.startsWith(`${paths.exchanges}/`)) return "Detail nabídky";
  if (pathname === paths.cashback) return "Cashback";
  if (pathname === paths.wheel) return "Kolo štěstí";
  if (pathname === paths.search) return "Hledání";
  if (pathname === paths.notifications) return "Oznámení";
  if (pathname === paths.profit) return "Moje odměny";
  if (pathname === paths.settings) return "Nastavení";
  if (pathname === paths.help) return "Nápověda";
  if (pathname === paths.methodology) return "Jak ověřujeme nabídky";
  if (pathname === paths.terms) return "Podmínky použití";
  return "prachyzaregistraci.cz";
};

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main id="app-scroll-root" className="app-scroll-root bg-[#030b12] text-white">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[264px] flex-col border-r border-white/10 bg-[#07111b] xl:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-5">
          <BrandLogo className="text-[18px]" onClick={() => navigate(paths.home)} />
        </div>

        <div className="dashboard-sidebar-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-normal text-slate-600">Katalog</p>
          <nav className="space-y-1" aria-label="Hlavní navigace">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === paths.home}
                  className={({ isActive }) => `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="my-5 border-t border-white/10" />
          <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-normal text-slate-600">Podpora</p>
          <nav className="space-y-1" aria-label="Podpora">
            {supportItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto pt-6">
            <div className="border-t border-white/10 px-1 pt-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-600">Stav katalogu</p>
                  <p className="mt-1 text-[22px] font-black leading-none text-white">
                    {bonuses.length} <span className="text-[11px] font-bold text-slate-400">aktivních nabídek</span>
                  </p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-neon/10 text-neon">
                  <BadgeCheck size={18} />
                </span>
              </div>
              <p className="mt-3 text-[11px] leading-5 text-slate-500">Každá nabídka má podmínky, zdroj a srozumitelný postup.</p>
              <button
                onClick={() => navigate(paths.exchanges)}
                className="glass-button mt-3 flex h-10 w-full items-center justify-between rounded-[12px] px-3.5 text-[11px] font-black text-slate-200 transition hover:border-neon/30 hover:text-white"
              >
                Procházet katalog <ArrowRight size={14} className="text-neon" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between px-1">
              <span className="text-[10px] text-slate-600">© 2026 PZR</span>
              <div className="flex items-center gap-1">
                <a href="https://www.tiktok.com/@prachyzaregistraci" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid h-8 w-8 place-items-center rounded-[10px] text-slate-500 transition hover:bg-white/[.06] hover:text-neon">
                  <TikTokIcon size={15} />
                </a>
                <a href="https://instagram.com/prachyzaregistracicz" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-8 w-8 place-items-center rounded-[10px] text-slate-500 transition hover:bg-white/[.06] hover:text-neon">
                  <Instagram size={15} />
                </a>
                <a href={`mailto:${FORM_TARGET_EMAIL}`} aria-label="E-mail" className="grid h-8 w-8 place-items-center rounded-[10px] text-slate-500 transition hover:bg-white/[.06] hover:text-neon">
                  <Mail size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="xl:ml-[264px] xl:min-w-0">
        <header className="sticky top-0 z-40 hidden h-16 items-center border-b border-white/10 bg-[#030b12]/95 px-7 backdrop-blur-xl xl:flex 2xl:px-9">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-normal text-slate-600">Prachy za registraci</p>
            <p className="mt-0.5 truncate text-base font-black text-white">{pageTitle(location.pathname)}</p>
          </div>

          <div className="ml-auto flex items-center gap-2.5">
            <button
              onClick={() => navigate(paths.search)}
              aria-label="Hledat nabídku"
              className="glass-button flex h-10 w-[230px] items-center gap-2.5 rounded-[12px] px-3.5 text-left text-xs font-semibold text-slate-400 transition hover:border-neon/30 hover:text-white"
            >
              <Search size={15} />
              Hledat bonus nebo partnera
            </button>
            {location.pathname !== paths.exchanges ? (
              <button
                onClick={() => navigate(paths.exchanges)}
                className="neon-button h-10 whitespace-nowrap rounded-[12px] px-5 text-xs font-black text-[#02130c] active:scale-[.98]"
              >
                Všechny nabídky
              </button>
            ) : null}
          </div>
        </header>

        <div className="mx-auto flex min-h-screen w-full flex-col bg-[linear-gradient(180deg,rgba(3,12,19,.86),rgba(4,18,24,.95))] shadow-[0_0_80px_rgba(0,0,0,.55)] sm:my-6 sm:min-h-[884px] sm:max-w-[calc(100%-48px)] sm:rounded-[24px] sm:border sm:border-white/10 md:max-w-[720px] lg:max-w-[960px] xl:my-0 xl:min-h-0 xl:max-w-none xl:rounded-none xl:border-0 xl:bg-transparent xl:shadow-none">
          <section className="flex min-h-screen min-w-0 flex-col xl:min-h-[calc(100vh-64px)]">
            <div className="relative flex-1">
              <div key={location.pathname} className="page-fade relative z-10 min-h-full px-4 pb-28 pt-5 sm:px-5 sm:pt-6 md:px-6 lg:px-7 xl:px-7 xl:pb-12 xl:pt-7 2xl:px-9">
                <ErrorBoundary key={location.pathname}>{children}</ErrorBoundary>
                <p className="mt-8 text-center text-[10px] text-slate-600 xl:hidden">
                  © 2026 prachyzaregistraci.cz ·{" "}
                  <NavLink to={paths.terms} className="underline underline-offset-2">
                    Podmínky použití
                  </NavLink>
                </p>
              </div>
            </div>
          </section>

          <BottomNav />
        </div>

        <footer className="hidden items-center justify-between border-t border-white/10 px-7 py-5 text-[11px] text-slate-600 xl:flex 2xl:px-9">
          <p>© 2026 prachyzaregistraci.cz · Všechna práva vyhrazena</p>
          <div className="flex items-center gap-5">
            <NavLink to={paths.methodology} className="transition hover:text-neon">Jak ověřujeme nabídky</NavLink>
            <NavLink to={paths.help} className="transition hover:text-neon">Podpora</NavLink>
            <a href={`mailto:${FORM_TARGET_EMAIL}`} className="transition hover:text-neon">{FORM_TARGET_EMAIL}</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
