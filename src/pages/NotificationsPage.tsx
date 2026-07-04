import { motion } from "framer-motion";
import { ArrowRight, BellRing, CheckCheck, Inbox } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { dismissBonusNotifications, useAbandonedBonuses } from "../components/notificationState";
import { GlassCard, LogoMark, NeonButton } from "../components/ui";
import type { Bonus } from "../data/mockData";
import { paths } from "../routes/paths";

type NotificationItem = {
  id: string;
  bonusId: string;
  title: string;
  text: string;
  time: string;
  bonus: Bonus;
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const abandonedBonuses = useAbandonedBonuses();

  const notifications = useMemo<NotificationItem[]>(
    () =>
      abandonedBonuses.map((bonus) => ({
        id: `abandoned-${bonus.id}`,
        bonusId: bonus.id,
        title: `${bonus.name} čeká na dokončení`,
        text: `Bonus ${bonus.bonus} máš otevřený. Buď ho dokonči, nebo ho odlož jako přečtený.`,
        time: "Rozpracováno",
        bonus
      })),
    [abandonedBonuses]
  );

  const dismissAll = () => dismissBonusNotifications(notifications.map((notification) => notification.bonusId));

  return (
    <>
      <Header title="Notifikace" />
      <section className="space-y-4 pb-24 xl:pb-0">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">Notifikace</h2>
            <p className="mt-1 text-sm text-slate-400">
              {notifications.length ? `${notifications.length} rozpracovaná nabídka` : "Žádné aktivní upozornění"}
            </p>
          </div>
          {notifications.length ? (
            <NeonButton onClick={dismissAll} className="h-10 px-3 text-xs">
              <CheckCheck size={15} className="inline" /> Přečteno
            </NeonButton>
          ) : null}
        </div>

        {notifications.length ? (
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ delay: index * 0.03, duration: 0.18 }}
              >
                <GlassCard className="p-3 transition hover:border-neon/25">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <LogoMark bonus={notification.bonus} size="sm" />
                      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#07111b] bg-neon shadow-glow" />
                    </div>

                    <button
                      onClick={() => navigate(paths.exchangeDetail(notification.bonusId))}
                      className="min-w-0 flex-1 text-left active:scale-[.99]"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-xl bg-neon/15 text-neon">
                          <BellRing size={13} />
                        </span>
                        <p className="truncate text-sm font-bold">{notification.title}</p>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{notification.text}</p>
                    </button>

                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span className="text-[11px] text-slate-500">{notification.time}</span>
                      <button
                        onClick={() => dismissBonusNotifications([notification.bonusId])}
                        className="rounded-xl border border-white/10 bg-white/[.06] px-2 py-1 text-[11px] font-bold text-slate-200 transition hover:border-neon/35 hover:text-white active:scale-95"
                      >
                        Přečteno
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <GlassCard className="p-5 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/[.06] text-slate-300">
              <Inbox size={22} />
            </span>
            <h3 className="mt-3 text-base font-bold">Všechno čisté</h3>
            <p className="mx-auto mt-1 max-w-[280px] text-sm leading-6 text-slate-400">
              Upozornění ukážeme až ve chvíli, kdy otevřeš bonus a nedokončíš ho.
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
