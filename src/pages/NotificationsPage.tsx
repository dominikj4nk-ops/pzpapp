import { ArrowRight, CheckCheck, Clock3, FerrisWheel, Gift, Inbox, Timer, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { dismissNotification, dismissNotifications, useNotifications } from "../components/notificationState";
import { formatCountdown, JACKPOT_LABEL, useWheel } from "../components/wheelState";
import { GlassCard, LogoMark, NeonButton } from "../components/ui";
import { REFERRAL_REWARD, formatKc } from "../data/mockData";
import { paths } from "../routes/paths";

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
          <div className="pointer-events-none absolute -bottom-10 left-10 h-24 w-24 rounded-full bg-cyanGlow/10 blur-2xl" />
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
        ) : null}

        {notifications.length ? (
          <div className="space-y-3">
            {notifications.map((notification) => {
              if (notification.kind === "referral") {
                return (
                  <GlassCard key={notification.id} className="p-3 transition hover:border-neon/25">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-300/15 text-amber-300">
                        <UserPlus size={19} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">Pozvi kamaráda</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                          Pošli svůj odkaz a získej {formatKc(REFERRAL_REWARD)}, když kamarád dokončí bonus.
                        </p>
                      </div>
                      <button
                        onClick={() => dismissNotification(notification.id)}
                        data-testid={`dismiss-${notification.id}`}
                        className="shrink-0 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-500 transition hover:text-white"
                      >
                        Přečteno
                      </button>
                    </div>
                    <button
                      onClick={() => navigate(paths.rewards)}
                      className="glass-button mt-3 flex h-10 w-full items-center justify-center gap-1.5 whitespace-nowrap px-3 text-xs font-bold text-slate-200 transition active:scale-95"
                    >
                      <UserPlus size={14} className="text-neon" /> Získat pozvací odkaz
                    </button>
                  </GlassCard>
                );
              }

              const isNew = notification.kind === "new-offer";
              return (
                <GlassCard key={notification.id} className="p-3 transition hover:border-neon/25">
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <LogoMark bonus={notification.bonus} size="sm" />
                      <span
                        className={`absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-[#07111b] ${
                          isNew ? "bg-sky-400 text-[#02130c]" : "bg-neon text-[#02130c]"
                        }`}
                      >
                        {isNew ? <Gift size={11} /> : <Clock3 size={11} />}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">
                        {isNew ? `Nová nabídka: ${notification.bonus.name}` : `${notification.bonus.bonus} čeká na dokončení`}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                        {isNew
                          ? `Nový bonus ${notification.bonus.bonus} je k dispozici. Mrkni na něj a dokonči podmínky u partnera.`
                          : `U ${notification.bonus.name} už máš první krok za sebou. Dokonči podmínky za ${notification.bonus.completionTime} a získej odměnu.`}
                      </p>
                    </div>
                    <button
                      onClick={() => dismissNotification(notification.id)}
                      data-testid={`dismiss-${notification.id}`}
                      className="shrink-0 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-500 transition hover:text-white"
                    >
                      Přečteno
                    </button>
                  </div>
                  <div className="mt-3">
                    <NeonButton
                      onClick={() => navigate(paths.exchangeDetail(notification.bonus.id))}
                      className="h-10 w-full whitespace-nowrap px-3 text-xs"
                      data-testid={`open-${notification.id}`}
                    >
                      {isNew ? "Mrkni na nabídku" : `Dokončit · ${notification.bonus.bonus}`}
                    </NeonButton>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        ) : (
          <GlassCard className="p-5 text-center">
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
          </GlassCard>
        )}
      </section>
    </>
  );
}
