import { useEffect, useState } from "react";

const activatedKey = "pzp:activated-bonuses";
const completedKey = "pzp:completed-bonuses";
export const bonusStateEvent = "pzp:bonus-state";

function readIds(key: string) {
  try {
    const value = window.localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  window.localStorage.setItem(key, JSON.stringify([...new Set(ids)]));
  window.dispatchEvent(new Event(bonusStateEvent));
}

export type BonusProgress = {
  activatedIds: string[];
  completedIds: string[];
};

export function getBonusProgress(): BonusProgress {
  return { activatedIds: readIds(activatedKey), completedIds: readIds(completedKey) };
}

export function markBonusActivated(id: string) {
  writeIds(activatedKey, [...readIds(activatedKey), id]);
}

export function markBonusFinished(id: string) {
  writeIds(activatedKey, [...readIds(activatedKey), id]);
  writeIds(completedKey, [...readIds(completedKey), id]);
}

export function useBonusProgress() {
  const [progress, setProgress] = useState(getBonusProgress);

  useEffect(() => {
    const sync = () => setProgress(getBonusProgress());

    window.addEventListener(bonusStateEvent, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(bonusStateEvent, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return progress;
}
