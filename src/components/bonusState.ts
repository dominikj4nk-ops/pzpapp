import { useEffect, useState } from "react";

const activatedKey = "pzp:activated-bonuses";
const completedKey = "pzp:completed-bonuses";
const activatedAtKey = "pzp:activated-at";
const viewedKey = "pzp:viewed-offers";
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

function readMap(key: string): Record<string, number> {
  try {
    const value = window.localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeMap(key: string, map: Record<string, number>) {
  try {
    window.localStorage.setItem(key, JSON.stringify(map));
  } catch {
    // úložiště nedostupné – přeskočíme
  }
}

/** Kdy uživatel poprvé rozdělal danou nabídku (id → timestamp). */
export function getActivatedAt() {
  return readMap(activatedAtKey);
}

/** Prohlédnuté nabídky (otevřel detail) → timestamp. Základ pro retargeting notifikace. */
export function getViewedOffers() {
  return readMap(viewedKey);
}

/** Uživatel se podíval na detail nabídky. Zaznamenáme jednorázově (kvůli notifikaci „koukal ses na…"). */
export function markBonusViewed(id: string) {
  const map = readMap(viewedKey);
  if (!map[id]) {
    map[id] = Date.now();
    writeMap(viewedKey, map);
    window.dispatchEvent(new Event(bonusStateEvent));
  }
}

export type BonusProgress = {
  activatedIds: string[];
  completedIds: string[];
};

export function getBonusProgress(): BonusProgress {
  return { activatedIds: readIds(activatedKey), completedIds: readIds(completedKey) };
}

/**
 * Uživatel klikl na „Získat bonus" → odešel k partnerovi přes náš odkaz.
 * Zaznamenáme to jen potichu (kvůli upomínce na nedokončený bonus), žádný viditelný stav.
 */
export function markBonusStarted(id: string) {
  writeIds(activatedKey, [...readIds(activatedKey), id]);
  const map = readMap(activatedAtKey);
  if (!map[id]) {
    map[id] = Date.now();
    writeMap(activatedAtKey, map);
  }
}

/** Označí bonus jako dokončený (např. po potvrzení výplaty). Zatím ho nikde v UI nenastavujeme. */
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
