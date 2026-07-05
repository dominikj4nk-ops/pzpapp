import { useEffect, useState } from "react";
import { bonuses } from "../data/mockData";
import type { Bonus } from "../data/mockData";
import { bonusStateEvent, getBonusProgress } from "./bonusState";

const dismissedKey = "pzp:dismissed-notifications";
export const notificationStateEvent = "pzp:notification-state";

// Nabídka, kterou aktuálně komunikujeme jako novou (změň ID, když přidáš další).
const NEW_OFFER_ID = "robinhood-trading";
const REFERRAL_NOTIFICATION_ID = "referral-invite";

type OfferNotification = {
  id: string;
  kind: "in-progress" | "new-offer";
  bonus: Bonus;
};

type ReferralNotification = {
  id: string;
  kind: "referral";
};

export type AppNotification = OfferNotification | ReferralNotification;

function readDismissed(): string[] {
  try {
    const value = window.localStorage.getItem(dismissedKey);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeDismissed(ids: string[]) {
  window.localStorage.setItem(dismissedKey, JSON.stringify([...new Set(ids)]));
  window.dispatchEvent(new Event(notificationStateEvent));
}

export function dismissNotification(id: string) {
  writeDismissed([...readDismissed(), id]);
}

export function dismissNotifications(ids: string[]) {
  writeDismissed([...readDismissed(), ...ids]);
}

export function getNotifications(): AppNotification[] {
  const dismissed = new Set(readDismissed());
  const { activatedIds, completedIds } = getBonusProgress();
  const list: AppNotification[] = [];

  // 1) Rozpracovaná nabídka: aktivovaná, ale nedokončená (spolehlivé, bez detekce odchodu)
  bonuses.forEach((bonus) => {
    if (activatedIds.includes(bonus.id) && !completedIds.includes(bonus.id) && !dismissed.has(`prog-${bonus.id}`)) {
      list.push({ id: `prog-${bonus.id}`, kind: "in-progress", bonus });
    }
  });

  // 2) Nová nabídka (systémová notifikace)
  const newBonus = bonuses.find((bonus) => bonus.id === NEW_OFFER_ID);
  if (newBonus && !completedIds.includes(newBonus.id) && !dismissed.has(`new-${newBonus.id}`)) {
    list.push({ id: `new-${newBonus.id}`, kind: "new-offer", bonus: newBonus });
  }

  if (!dismissed.has(REFERRAL_NOTIFICATION_ID)) {
    list.push({ id: REFERRAL_NOTIFICATION_ID, kind: "referral" });
  }

  return list;
}

export function useNotifications() {
  const [items, setItems] = useState(getNotifications);

  useEffect(() => {
    const sync = () => setItems(getNotifications());

    window.addEventListener(notificationStateEvent, sync);
    window.addEventListener(bonusStateEvent, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(notificationStateEvent, sync);
      window.removeEventListener(bonusStateEvent, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return items;
}
