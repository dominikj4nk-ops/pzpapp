import { Home, Landmark, Percent, UserPlus, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { paths } from "../routes/paths";

const navItems = [
  { label: "Domů", path: paths.home, icon: Home },
  { label: "Nabídky", path: paths.exchanges, icon: Landmark },
  { label: "Pozvat", path: paths.rewards, icon: UserPlus },
  { label: "Cashback", path: paths.cashback, icon: Percent },
  { label: "Profil", path: paths.myBonuses, icon: UserRound }
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-40px)] max-w-[398px] -translate-x-1/2 rounded-[16px] border border-white/10 bg-[#07131b]/95 px-2 py-2 shadow-[0_16px_44px_rgba(0,0,0,.42),inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-2xl xl:hidden">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-[11px] font-semibold transition ${
                  isActive ? "text-neon" : "text-slate-400 hover:text-slate-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="grid h-6 w-8 place-items-center">
                    <Icon size={22} strokeWidth={isActive ? 2.35 : 2} />
                  </span>
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
