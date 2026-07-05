import { useEffect, useState } from "react";

const lastSpinKey = "pzp:wheel-last-spin";
const lastResultKey = "pzp:wheel-last-result";
const bonusSpinsKey = "pzp:wheel-bonus-spins";
const shareWeekKey = "pzp:wheel-share-week";
export const wheelStateEvent = "pzp:wheel-state";

export const SPIN_COOLDOWN_MS = 24 * 60 * 60 * 1000;
export const DRAW_TIME = "19:30";
export const DRAW_DAY = "neděli";
export const WEEKLY_SHARE_BONUS = 500;
export const JACKPOT_LABEL = "5 000 Kč";
export const WHEEL_TEST_MODE = true;

export type WheelTier = "small" | "medium" | "big" | "spin" | "jackpot";

export type WheelPrize = {
  id: string;
  label: string;
  short: string;
  emoji: string;
  weight: number;
  tier: WheelTier;
};

// Pořadí = pořadí segmentů na kole (8 dílků po 45°). Každý segment je nějaký výsledek,
// který má uživatel důvod dát na story. Reálný bonus se pak losuje ze sdílejících.
// Součet vah = 10 000. Výhry 500 Kč a výš drž na šanci 1:200 a nižší.
export const wheelPrizes: WheelPrize[] = [
  { id: "kc10", label: "10 Kč na účet", short: "10 Kč", emoji: "🪙", weight: 2900, tier: "small" },
  { id: "kc100", label: "100 Kč na účet", short: "100 Kč", emoji: "💵", weight: 700, tier: "medium" },
  { id: "kc20", label: "20 Kč na účet", short: "20 Kč", emoji: "🪙", weight: 2400, tier: "small" },
  { id: "jackpot", label: "5 000 Kč jackpot", short: "5 000 Kč", emoji: "🏆", weight: 5, tier: "jackpot" },
  { id: "kc50", label: "50 Kč na účet", short: "50 Kč", emoji: "💰", weight: 1600, tier: "small" },
  { id: "kc250", label: "250 Kč na účet", short: "250 Kč", emoji: "🤑", weight: 355, tier: "medium" },
  { id: "spin", label: "Toč znova hned", short: "Toč znova", emoji: "🎡", weight: 2000, tier: "spin" },
  { id: "kc500", label: "500 Kč na účet", short: "500 Kč", emoji: "💸", weight: 40, tier: "big" }
];

const totalWeight = wheelPrizes.reduce((sum, prize) => sum + prize.weight, 0);

/** Lidsky čitelná šance – procenta pro časté výhry, poměr 1:X pro vzácné. */
export function chanceLabel(prize: WheelPrize) {
  const share = prize.weight / totalWeight;
  if (share >= 0.02) return `${Math.round(share * 100)} %`;
  return `1:${Math.round(1 / share).toLocaleString("cs-CZ")}`;
}

export function pickPrizeIndex() {
  let roll = Math.random() * totalWeight;
  for (let index = 0; index < wheelPrizes.length; index += 1) {
    roll -= wheelPrizes[index].weight;
    if (roll < 0) return index;
  }
  return wheelPrizes.length - 1;
}

function readNumber(key: string) {
  try {
    const value = Number(window.localStorage.getItem(key));
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

function writeValue(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // úložiště nedostupné – stav zůstane pro tuto relaci
  }
}

export function getLastSpin() {
  return readNumber(lastSpinKey);
}

export function getBonusSpins() {
  return Math.max(0, Math.floor(readNumber(bonusSpinsKey)));
}

export function getLastResult(): WheelPrize | null {
  try {
    const id = window.localStorage.getItem(lastResultKey);
    return wheelPrizes.find((prize) => prize.id === id) ?? null;
  } catch {
    return null;
  }
}

/** Klíč týdne = datum pondělí daného týdne. Losujeme jednou týdně. */
function weekKey(now = new Date()) {
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return `${monday.getFullYear()}-${monday.getMonth() + 1}-${monday.getDate()}`;
}

export function hasSharedThisWeek() {
  try {
    return window.localStorage.getItem(shareWeekKey) === weekKey();
  } catch {
    return false;
  }
}

/** Uživatel dal výsledek na story → je v týdenním slosování o bonus. */
export function recordShare() {
  writeValue(shareWeekKey, weekKey());
  window.dispatchEvent(new Event(wheelStateEvent));
}

export function recordSpin(prizeId: string) {
  const now = Date.now();
  const freeSpinAvailable = getLastSpin() + SPIN_COOLDOWN_MS <= now;
  const bonusSpins = getBonusSpins();

  if (WHEEL_TEST_MODE) {
    writeValue(lastSpinKey, null);
  } else if (freeSpinAvailable) {
    writeValue(lastSpinKey, String(now));
  } else if (bonusSpins > 0) {
    writeValue(bonusSpinsKey, String(bonusSpins - 1));
  }

  if (prizeId === "spin") {
    writeValue(bonusSpinsKey, String(getBonusSpins() + 1));
  }

  writeValue(lastResultKey, prizeId);
  window.dispatchEvent(new Event(wheelStateEvent));
}

export function msUntilNextSpin(now = Date.now()) {
  if (WHEEL_TEST_MODE) return 0;
  const last = getLastSpin();
  if (!last) return 0;
  return Math.max(0, last + SPIN_COOLDOWN_MS - now);
}

export function formatCountdown(ms: number) {
  const totalSeconds = Math.ceil(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

/** Nejbližší termín slosování (neděle v DRAW_TIME) – vždy ten následující. */
export function nextDrawDate(now = new Date()) {
  const [hours, minutes] = DRAW_TIME.split(":").map(Number);
  const target = new Date(now);
  let daysUntil = (7 - target.getDay()) % 7; // neděle = 0
  if (daysUntil === 0 && (now.getHours() > hours || (now.getHours() === hours && now.getMinutes() >= minutes))) {
    daysUntil = 7;
  }
  target.setDate(target.getDate() + daysUntil);
  target.setHours(hours, minutes, 0, 0);
  return target;
}

/** Datum nejbližšího slosování ve formátu "12. 7.". */
export function formatDrawDate(now = new Date()) {
  const date = nextDrawDate(now);
  return `${date.getDate()}. ${date.getMonth() + 1}.`;
}

export function useWheel() {
  const [remaining, setRemaining] = useState(() => msUntilNextSpin());
  const [bonusSpins, setBonusSpins] = useState(getBonusSpins);
  const [sharedThisWeek, setSharedThisWeek] = useState(hasSharedThisWeek);
  const [lastResult, setLastResult] = useState(getLastResult);

  useEffect(() => {
    const sync = () => {
      setRemaining(msUntilNextSpin());
      setBonusSpins(getBonusSpins());
      setSharedThisWeek(hasSharedThisWeek());
      setLastResult(getLastResult());
    };
    sync();

    const timer = window.setInterval(() => setRemaining(msUntilNextSpin()), 1000);
    window.addEventListener(wheelStateEvent, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener(wheelStateEvent, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { canSpin: remaining <= 0 || bonusSpins > 0, remaining, bonusSpins, sharedThisWeek, lastResult };
}
