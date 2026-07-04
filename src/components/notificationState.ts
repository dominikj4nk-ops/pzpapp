import { useEffect, useState } from "react";
import { bonuses } from "../data/mockData";
import type { Bonus } from "../data/mockData";

const abandonedKey = "pzp:abandoned-bonuses";
export const notificationStateEvent = "pzp:notification-state";
const pendingAbandonedTimers = new Map<string, ReturnType<typeof window.setTimeout>>();

function readIds() {
  try {
    const value = window.localStorage.getItem(abandonedKey);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]) {
  window.localStorage.setItem(abandonedKey, JSON.stringify([...new Set(ids)]));
  window.dispatchEvent(new Event(notificationStateEvent));
}

export function cancelScheduledBonusAbandoned(id: string) {
  const timer = pendingAbandonedTimers.get(id);
  if (!timer) return;
  window.clearTimeout(timer);
  pendingAbandonedTimers.delete(id);
}

export function markBonusAbandoned(id: string) {
  cancelScheduledBonusAbandoned(id);
  writeIds([...readIds(), id]);
}

export function scheduleBonusAbandoned(id: string) {
  cancelScheduledBonusAbandoned(id);
  const timer = window.setTimeout(() => {
    pendingAbandonedTimers.delete(id);
    markBonusAbandoned(id);
  }, 180);
  pendingAbandonedTimers.set(id, timer);
}

export function markBonusCompleted(id: string) {
  cancelScheduledBonusAbandoned(id);
  writeIds(readIds().filter((item) => item !== id));
}

export function dismissBonusNotifications(ids: string[]) {
  const dismissed = new Set(ids);
  ids.forEach(cancelScheduledBonusAbandoned);
  writeIds(readIds().filter((item) => !dismissed.has(item)));
}

export function getAbandonedBonuses() {
  const ids = readIds();
  return ids.map((id) => bonuses.find((bonus) => bonus.id === id)).filter((bonus): bonus is Bonus => Boolean(bonus));
}

export function useAbandonedBonuses() {
  const [items, setItems] = useState(getAbandonedBonuses);

  useEffect(() => {
    const sync = () => setItems(getAbandonedBonuses());

    window.addEventListener(notificationStateEvent, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(notificationStateEvent, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return items;
}
