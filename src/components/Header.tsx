import { ArrowLeft, Bell, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotifications } from "./notificationState";
import { paths } from "../routes/paths";
import { BrandLogo } from "./ui";

type HeaderProps = {
  title?: string;
  back?: boolean;
  heading?: boolean;
};

export default function Header({ title, back = false, heading = true }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const notifications = useNotifications();
  const onNotifications = location.pathname === paths.notifications;
  const notificationCount = onNotifications ? 0 : notifications.length;
  const hasNotification = notificationCount > 0;
  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate(paths.home);
  };

  return (
    <header className="mb-5 flex items-center justify-between xl:hidden">
      <button
        aria-label={back ? "Zpět" : "Kontakt a podpora"}
        onClick={() => (back ? goBack() : navigate(paths.help))}
        className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 text-white/90 transition hover:bg-white/10 active:scale-95"
      >
        {back ? <ArrowLeft size={20} /> : <Mail size={19} />}
      </button>
      {title && heading ? (
        <h1 className="text-base font-semibold">{title}</h1>
      ) : title ? (
        <div className="text-base font-semibold">{title}</div>
      ) : (
        <BrandLogo onClick={() => navigate(paths.home)} className="text-[17px]" />
      )}
      <button
        aria-label="Notifikace"
        onClick={() => navigate(paths.notifications)}
        className={`relative grid h-10 w-10 place-items-center rounded-2xl text-white/90 transition hover:bg-white/10 active:scale-95 ${
          hasNotification ? "border border-neon/25 bg-neon/10 text-neon" : "bg-white/5"
        }`}
      >
        <Bell size={19} />
        {hasNotification ? (
          <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-neon px-1 text-[10px] font-black text-[#03130c] shadow-[0_4px_10px_rgba(0,0,0,.35)]">
            {notificationCount}
          </span>
        ) : null}
      </button>
    </header>
  );
}
