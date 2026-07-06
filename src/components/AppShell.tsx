import { Bell, ChevronRight, FerrisWheel, HelpCircle, Home, Landmark, Mail, Percent, Search, Settings, UserPlus, WalletCards } from "lucide-react";
import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { bonusAmount, bonuses, formatKc, REFERRAL_REWARD, totalPotential } from "../data/mockData";
import { paths } from "../routes/paths";
import BottomNav from "./BottomNav";
import ErrorBoundary from "./ErrorBoundary";
import { useBonusProgress } from "./bonusState";
import { useNotifications } from "./notificationState";
import { BrandLogo, GlassCard, TikTokIcon } from "./ui";

const topOffersTotal = bonuses
  .filter((bonus) => bonus.type === "Banky" || bonus.type === "Investice")
  .reduce((sum, bonus) => sum + bonusAmount(bonus), 0);
const quickBonusesTotal = totalPotential - topOffersTotal;

type AppShellProps = {
  children: ReactNode;
};

const sidebarItems = [
  { label: "Domů", path: paths.home, icon: Home, color: "text-neon" },
  { label: "Nabídky", path: paths.exchanges, icon: Landmark, color: "text-sky-400" },
  { label: "Pozvat a vydělat", path: paths.rewards, icon: UserPlus, color: "text-amber-400" },
  { label: "Cashback", path: paths.cashback, icon: Percent, color: "text-pink-400" },
  { label: "Kolo štěstí", path: paths.wheel, icon: FerrisWheel, color: "text-amber-300" },
  { label: "Můj potenciální zisk", path: paths.profit, icon: WalletCards, color: "text-slate-300" },
  { label: "Notifikace", path: paths.notifications, icon: Bell, color: "text-slate-300" },
  { label: "Nastavení", path: paths.settings, icon: Settings, color: "text-slate-300" },
  { label: "Nápověda a podpora", path: paths.help, icon: HelpCircle, color: "text-slate-300" }
];

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const notifications = useNotifications();
  const { activatedIds } = useBonusProgress();
  const onNotifications = location.pathname === paths.notifications;
  const notificationCount = onNotifications ? 0 : notifications.length;
  const hasNotification = notificationCount > 0;
  const showProfitCard = location.pathname !== paths.profit;
  const showInviteCard = location.pathname !== paths.rewards;
  const showContactCard = location.pathname !== paths.help;

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(145deg,#020911,#031813_45%,#020913)] text-white">
      <div className="mx-auto flex min-h-screen w-full flex-col bg-[linear-gradient(180deg,rgba(3,12,19,.86),rgba(4,18,24,.95))] shadow-[0_0_80px_rgba(0,0,0,.55)] sm:my-6 sm:min-h-[884px] sm:max-w-[430px] sm:rounded-[28px] sm:border sm:border-white/10 xl:my-0 xl:grid xl:max-w-none xl:grid-cols-[290px_minmax(0,1fr)_430px] xl:gap-4 xl:bg-transparent xl:p-4 xl:shadow-none">
        <aside className="glass hidden min-h-[calc(100vh-32px)] flex-col rounded-[22px] p-5 xl:flex">
          <BrandLogo className="mb-8 text-[20px]" />
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const separated = index === 6;
              return (
                <div key={item.path} className={separated ? "mt-6 border-t border-white/10 pt-5" : ""}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `sidebar-link group ${isActive ? "sidebar-link-active text-neon" : "text-slate-200 hover:bg-white/[.055] hover:text-white"}`
                    }
                  >
                    <Icon size={19} strokeWidth={2.25} className={`${item.color} shrink-0 transition group-hover:scale-105`} />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                </div>
              );
            })}
          </nav>
          <p className="mt-auto border-t border-white/10 pt-5 text-xs leading-5 text-slate-500">© 2026 prachyzaregistraci.cz<br />Všechna práva vyhrazena</p>
        </aside>

        <section className="flex min-h-screen min-w-0 flex-col xl:min-h-[calc(100vh-32px)]">
          <div className="hidden items-center justify-between gap-4 pb-4 xl:flex">
            <button onClick={() => navigate(paths.search)} className="glass-button flex h-12 w-full max-w-[600px] items-center gap-3 px-5 text-left text-sm text-slate-400">
              <Search size={18} />
              Hledat bonusy a nabídky...
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(paths.notifications)}
                className={`relative grid h-11 w-11 place-items-center rounded-2xl border transition ${
                  hasNotification ? "border-neon/30 bg-neon/10 text-neon" : "border-white/10 bg-white/[.05]"
                }`}
              >
                <Bell size={19} />
                {hasNotification ? (
                  <span className="absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-neon px-1 text-[10px] font-black text-[#03130c] shadow-[0_4px_10px_rgba(0,0,0,.35)]">
                    {notificationCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden xl:rounded-[22px] xl:border xl:border-white/10 xl:bg-[#04111c]/70">
            <div key={location.pathname} className="page-fade relative z-10 min-h-full px-4 pb-28 pt-5 xl:px-6 xl:pb-8 xl:pt-6">
              <ErrorBoundary key={location.pathname}>{children}</ErrorBoundary>
            </div>
          </div>
        </section>

        <aside className="hidden min-h-[calc(100vh-32px)] flex-col gap-4 xl:flex">
          {showProfitCard ? (
          <GlassCard className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">Můj potenciální zisk</h3>
              <span className="rounded-full border border-white/10 bg-white/[.05] px-2 py-0.5 text-[11px] font-bold text-slate-300">
                {activatedIds.length}/{bonuses.length} aktivováno
              </span>
            </div>
            <div>
              <p className="text-3xl font-black">{formatKc(totalPotential)}</p>
              <p className="mt-1 text-sm text-slate-400">odhad z dostupných bonusů</p>
            </div>
            <div className="my-4 border-t border-white/10" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Top nabídky</span>
                <span className="font-bold text-white">{formatKc(topOffersTotal)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Rychlé bonusy</span>
                <span className="font-bold text-neon">{formatKc(quickBonusesTotal)}</span>
              </div>
            </div>
            <button onClick={() => navigate(paths.profit)} className="glass-button mt-5 flex h-11 w-full items-center justify-between px-4 text-sm font-bold">
              <span>Zobrazit rozpad zisku</span>
              <ChevronRight size={16} className="text-neon" />
            </button>
          </GlassCard>
          ) : null}

          {showInviteCard ? (
          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-300/15 text-amber-300">
                <UserPlus size={19} />
              </span>
              <div className="min-w-0">
                <h3 className="font-bold leading-tight">Pozvi přátele</h3>
                <p className="mt-0.5 text-xs text-slate-400">{formatKc(REFERRAL_REWARD)} za každého kamaráda</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Pošli kamarádovi svůj odkaz. Jakmile dokončí bonus, vyplatíme ti odměnu na účet.
            </p>
            <button onClick={() => navigate(paths.rewards)} className="glass-button mt-4 flex h-11 w-full items-center justify-between px-4 text-sm font-bold">
              <span>Získat odkaz</span>
              <ChevronRight size={16} className="text-neon" />
            </button>
          </GlassCard>
          ) : null}

          {showContactCard ? (
          <GlassCard className="border-neon/15 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-neon/12 text-neon">
                <Mail size={19} />
              </span>
              <div className="min-w-0">
                <h3 className="font-bold leading-tight">Kontakt a podpora</h3>
                <p className="mt-0.5 text-xs text-slate-400">Po–Pá 9:00–18:00</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <a href="mailto:kontakt@prachyzaregistraci.cz" className="glass-button flex h-11 items-center gap-3 px-4 text-sm font-bold transition">
                <Mail size={16} className="shrink-0 text-neon" />
                <span className="truncate">kontakt@prachyzaregistraci.cz</span>
              </a>
              <a href="https://www.tiktok.com/@prachyzaregistraci" target="_blank" rel="noopener noreferrer" className="glass-button flex h-11 items-center gap-3 px-4 text-sm font-bold transition">
                <span className="shrink-0 text-neon"><TikTokIcon size={16} /></span>
                <span>TikTok</span>
              </a>
            </div>
            <button onClick={() => navigate(paths.help)} className="glass-button mt-3 flex h-11 w-full items-center justify-between px-4 text-sm font-bold">
              <span>Všechny možnosti kontaktu</span>
              <ChevronRight size={16} className="text-neon" />
            </button>
          </GlassCard>
          ) : null}
        </aside>

        <BottomNav />
      </div>
    </main>
  );
}
