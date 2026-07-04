import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronRight, HelpCircle, Home, Landmark, Percent, Search, Settings, UserPlus, WalletCards } from "lucide-react";
import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { paths } from "../routes/paths";
import BottomNav from "./BottomNav";
import { useAbandonedBonuses } from "./notificationState";
import { BrandLogo, GlassCard } from "./ui";

type AppShellProps = {
  children: ReactNode;
};

const sidebarItems = [
  { label: "Domů", path: paths.home, icon: Home, color: "text-neon" },
  { label: "Nabídky", path: paths.exchanges, icon: Landmark, color: "text-sky-400" },
  { label: "Pozvat a vydělat", path: paths.rewards, icon: UserPlus, color: "text-amber-400" },
  { label: "Cashback", path: paths.cashback, icon: Percent, color: "text-pink-400" },
  { label: "Můj potenciální zisk", path: paths.profit, icon: WalletCards, color: "text-slate-300" },
  { label: "Moje bonusy", path: paths.myBonuses, icon: WalletCards, color: "text-slate-300" },
  { label: "Notifikace", path: paths.notifications, icon: Bell, color: "text-slate-300" },
  { label: "Nastavení", path: paths.settings, icon: Settings, color: "text-slate-300" },
  { label: "Nápověda a podpora", path: paths.help, icon: HelpCircle, color: "text-slate-300" }
];

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const abandonedBonuses = useAbandonedBonuses();
  const currentOfferId = location.pathname.match(/^\/(?:nabidky|burzy|exchanges)\/([^/]+)/)?.[1];
  const hasNotification = abandonedBonuses.some((bonus) => bonus.id !== currentOfferId);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(24,242,106,.18),transparent_30%),radial-gradient(circle_at_90%_85%,rgba(33,212,253,.14),transparent_28%),linear-gradient(145deg,#020911,#031813_45%,#020913)] text-white">
      <div className="mx-auto flex min-h-screen w-full flex-col bg-[linear-gradient(180deg,rgba(3,12,19,.86),rgba(4,18,24,.95))] shadow-[0_0_80px_rgba(0,0,0,.55)] sm:my-6 sm:min-h-[884px] sm:max-w-[430px] sm:rounded-[28px] sm:border sm:border-white/10 xl:my-0 xl:grid xl:max-w-none xl:grid-cols-[290px_minmax(0,1fr)_430px] xl:gap-4 xl:bg-transparent xl:p-4 xl:shadow-none">
        <aside className="glass hidden min-h-[calc(100vh-32px)] flex-col rounded-[22px] p-5 xl:flex">
          <BrandLogo className="mb-8 text-[20px]" />
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const separated = index === 5;
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
                  hasNotification ? "border-neon/30 bg-neon/15 text-neon shadow-[0_0_24px_rgba(24,242,106,.22)]" : "border-white/10 bg-white/[.05]"
                }`}
              >
                <Bell size={19} />
                {hasNotification ? <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-neon" /> : null}
              </button>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden xl:rounded-[22px] xl:border xl:border-white/10 xl:bg-[#04111c]/70">
            <div className="pointer-events-none absolute -left-24 top-12 h-52 w-52 rounded-full bg-neon/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-28 bottom-24 h-64 w-64 rounded-full bg-cyanGlow/10 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative z-10 min-h-full px-4 pb-28 pt-5 xl:px-6 xl:pb-8 xl:pt-6"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <aside className="hidden min-h-[calc(100vh-32px)] flex-col gap-4 xl:flex">
          <GlassCard className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">Můj potenciální zisk</h3>
              <span className="text-xs text-slate-400">ⓘ</span>
            </div>
            <div>
              <p className="text-3xl font-black">4 100 Kč</p>
              <p className="mt-1 text-sm text-slate-400">odhad z dostupných bonusů</p>
            </div>
            <div className="my-4 border-t border-white/10" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Top nabídky</span>
                <span className="font-bold text-white">3 450 Kč</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Rychlé bonusy</span>
                <span className="font-bold text-neon">650 Kč</span>
              </div>
            </div>
            <button onClick={() => navigate(paths.profit)} className="glass-button mt-5 flex h-11 w-full items-center justify-between px-4 text-sm font-bold">
              <span>Zobrazit rozpad zisku</span>
              <ChevronRight size={16} className="text-neon" />
            </button>
          </GlassCard>
        </aside>

        <BottomNav />
      </div>
    </main>
  );
}
