import { ArrowLeft, Bell, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAbandonedBonuses } from "./notificationState";
import { paths } from "../routes/paths";
import { BrandLogo } from "./ui";

type HeaderProps = {
  title?: string;
  back?: boolean;
};

export default function Header({ title, back = false }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const abandonedBonuses = useAbandonedBonuses();
  const currentOfferId = location.pathname.match(/^\/(?:nabidky|burzy|exchanges)\/([^/]+)/)?.[1];
  const hasNotification = abandonedBonuses.some((bonus) => bonus.id !== currentOfferId);
  const showBack = back || Boolean(title);
  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate(paths.home);
  };

  return (
    <header className="mb-5 flex items-center justify-between xl:hidden">
      <button
        aria-label={showBack ? "Zpět" : "Menu"}
        onClick={() => (showBack ? goBack() : navigate(paths.profit))}
        className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 text-white/90 transition hover:bg-white/10 active:scale-95"
      >
        {showBack ? <ArrowLeft size={20} /> : <Menu size={20} />}
      </button>
      {title ? (
        <h1 className="text-base font-semibold">{title}</h1>
      ) : (
        <BrandLogo onClick={() => navigate(paths.home)} className="text-[17px]" />
      )}
      <button
        aria-label="Notifikace"
        onClick={() => navigate(paths.notifications)}
        className={`relative grid h-10 w-10 place-items-center rounded-2xl text-white/90 transition hover:bg-white/10 active:scale-95 ${
          hasNotification ? "bg-neon/15 text-neon shadow-[0_0_24px_rgba(24,242,106,.34)]" : "bg-white/5"
        }`}
      >
        <Bell size={19} />
        {hasNotification ? <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-neon shadow-glow" /> : null}
      </button>
    </header>
  );
}
