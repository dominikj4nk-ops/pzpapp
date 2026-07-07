import { ArrowRight, CheckCheck, FerrisWheel, Inbox, Timer, UserPlus, X } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { dismissNotification, dismissNotifications, useNotifications } from "../components/notificationState";
import { formatCountdown, JACKPOT_LABEL, useWheel } from "../components/wheelState";
import { LogoMark } from "../components/ui";
import { REFERRAL_REWARD, formatKc, type Bonus } from "../data/mockData";
import { paths } from "../routes/paths";

function NotifCard({
  icon,
  title,
  subtitle,
  cta,
  primary = false,
  onOpen,
  onDismiss,
  testId
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  cta: string;
  primary?: boolean;
  onOpen: () => void;
  onDismiss: () => void;
  testId: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      data-testid={`open-${testId}`}
      className="glass relative flex cursor-pointer items-center gap-2.5 p-3 transition hover:border-neon/25 active:scale-[.99]"
    >
      <span className="shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{title}</p>
        <p className="line-clamp-2 text-xs leading-4 text-slate-400">{subtitle}</p>
      </div>
      <span
        className={`shrink-0 rounded-xl px-3 py-2 text-xs font-black ${
          primary ? "bg-neon text-[#02130c]" : "border border-white/12 text-slate-200"
        }`}
      >
        {cta}
      </span>
      <button
        onClick={(event) => {
          event.stopPropagation();
          onDismiss();
        }}
        data-testid={`dismiss-${testId}`}
        aria-label="Přečteno"
        className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-[#0d1c2b] text-slate-400 shadow-[0_6px_14px_rgba(0,0,0,.4)] transition hover:border-white/30 hover:text-white"
      >
        <X size={13} strokeWidth={2.5} />
      </button>
    </div>
  );
}

// Psychologický háček k prohlédnuté nabídce – deterministický podle id, takže se nemění při každém překreslení.
function offerHook(bonus: Bonus) {
  let seed = 0;
  for (const ch of bonus.id) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const people = 30 + (seed % 90);
  const hooks = [
    `Dneska si ${bonus.name} vzalo dalších ${people} lidí. ${bonus.bonus} pořád čeká na tebe.`,
    `${bonus.name} má hodnocení ${bonus.rating}★ a patří k nejoblíbenějším. Škoda nechat ${bonus.bonus} ležet.`,
    `Zabere jen ${bonus.completionTime} a máš ${bonus.bonus}. Většina to dá na jeden zátah.`,
    `Byl jsi kousek od ${bonus.bonus}. Dokonči ${bonus.name}, než ti to uteče.`
  ];
  return hooks[seed % hooks.length];
}

export default function NotificationsPage() {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const { canSpin, remaining } = useWheel();

  const dismissAll = () => dismissNotifications(notifications.map((notification) => notification.id));

  return (
    <>
      <Header title="Notifikace" back />
      <section className="space-y-4">
        <button
          onClick={() => navigate(paths.wheel)}
          className={`glass relative w-full overflow-hidden p-4 text-left transition active:scale-[.99] ${
            canSpin ? "border-neon/35" : ""
          }`}
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-neon/15 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-green-500 text-white shadow-glow ${canSpin ? "wheel-glow" : ""}`}>
              <FerrisWheel size={24} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-black leading-tight">Kolo štěstí</p>
              {canSpin ? (
                <p className="mt-0.5 text-xs leading-5 text-neon">Máš otočku zdarma! Zatoč a hraj o {JACKPOT_LABEL}.</p>
              ) : (
                <p className="mt-0.5 flex items-center gap-1 text-xs leading-5 text-slate-400">
                  <Timer size={12} /> Další otočka za <span className="font-mono font-bold tabular-nums text-slate-200">{formatCountdown(remaining)}</span>
                </p>
              )}
            </div>
            <span className="shrink-0 rounded-xl bg-neon px-3 py-2 text-xs font-black text-[#02130c]">
              {canSpin ? "Zatočit" : "Otevřít"}
            </span>
          </div>
        </button>

        {notifications.length ? (
          <>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-400">Nové pro tebe: {notifications.length}</p>
              <button
                onClick={dismissAll}
                data-testid="dismiss-all-notifications"
                className="glass-button flex h-9 shrink-0 items-center gap-1.5 px-3 text-xs font-bold text-slate-200 transition active:scale-95"
              >
                <CheckCheck size={14} /> Přečíst vše
              </button>
            </div>

            <div className="space-y-2">
              {notifications.map((notification) => {
                if (notification.kind === "referral") {
                  return (
                    <NotifCard
                      key={notification.id}
                      testId={notification.id}
                      icon={
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-300/15 text-amber-300">
                          <UserPlus size={20} />
                        </span>
                      }
                      title="Pozvi kamaráda a vydělej"
                      subtitle={`${formatKc(REFERRAL_REWARD)} za každého, kdo dokončí bonus`}
                      cta="Pozvat"
                      onOpen={() => navigate(paths.rewards)}
                      onDismiss={() => dismissNotification(notification.id)}
                    />
                  );
                }

                const isViewed = notification.kind === "viewed";
                return (
                  <NotifCard
                    key={notification.id}
                    testId={notification.id}
                    icon={<LogoMark bonus={notification.bonus} size="sm" />}
                    title={isViewed ? `Koukal ses na ${notification.bonus.name}` : `Dokonči a získej ${notification.bonus.bonus}`}
                    subtitle={isViewed ? offerHook(notification.bonus) : `${notification.bonus.name} · už jsi to načal/a`}
                    cta={isViewed ? "Zobrazit" : "Dokončit"}
                    primary={!isViewed}
                    onOpen={() => navigate(paths.exchangeDetail(notification.bonus.id))}
                    onDismiss={() => dismissNotification(notification.id)}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="glass p-5 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/[.06] text-slate-300">
              <Inbox size={22} />
            </span>
            <h3 className="mt-3 text-base font-bold">Žádné nové zprávy</h3>
            <p className="mx-auto mt-1 max-w-[280px] text-sm leading-6 text-slate-400">
              Nové nabídky a rozpracované bonusy ti ukážeme tady. Zatím si zatoč kolem štěstí nahoře.
            </p>
            <button
              onClick={() => navigate(paths.exchanges)}
              className="mx-auto mt-4 flex h-10 items-center gap-1 rounded-2xl border border-white/10 bg-white/[.06] px-4 text-sm font-bold text-white transition active:scale-95"
            >
              Projít bonusy <ArrowRight size={15} />
            </button>
          </div>
        )}
      </section>
    </>
  );
}
