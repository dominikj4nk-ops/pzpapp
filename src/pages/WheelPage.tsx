import {
  BadgeCheck,
  Download,
  FerrisWheel,
  Gift,
  PartyPopper,
  Share2,
  Timer,
  Trophy,
  X
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Header from "../components/Header";
import PrizeArt from "../components/PrizeArt";
import { GlassCard } from "../components/ui";
import { downloadPrizeStoryImage, prizeStoryDataUrl, sharePrizeStoryImage } from "../components/wheelShareImage";
import {
  DRAW_DAY,
  DRAW_TIME,
  formatCountdown,
  formatDrawDate,
  JACKPOT_LABEL,
  pickPrizeIndex,
  recordShare,
  recordSpin,
  TOP_REGULAR_PRIZE,
  useWheel,
  wheelPrizes,
  type WheelPrize,
  type WheelTier
} from "../components/wheelState";

const SEGMENT = 360 / wheelPrizes.length;
const SPIN_DURATION_MS = 4400;

const sliceFill: Record<WheelTier, string> = {
  small: "#0a1a29",
  medium: "#12293d",
  big: "#0e3448",
  spin: "#0b2c23",
  jackpot: "url(#wheelJackpotGradient)"
};

const sliceText: Record<WheelTier, string> = {
  small: "#cbd5e1",
  medium: "#ffffff",
  big: "#9fe3ff",
  spin: "#9df5c4",
  jackpot: "#03130c"
};

const resultBackground = (tier: WheelTier) =>
  tier === "jackpot"
    ? "radial-gradient(circle at 50% 0%, rgba(24,242,106,.32), transparent 54%), linear-gradient(165deg, #0a2417, #04140c 55%, #030b12)"
    : "radial-gradient(circle at 50% 0%, rgba(24,242,106,.15), transparent 46%), linear-gradient(165deg, #0b1e2e, #050f19 60%, #030b12)";

function pointAt(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: 100 + radius * Math.sin(rad), y: 100 - radius * Math.cos(rad) };
}

function slicePath(index: number) {
  const a1 = index * SEGMENT;
  const a2 = (index + 1) * SEGMENT;
  const p1 = pointAt(a1, 100);
  const p2 = pointAt(a2, 100);
  return `M100 100 L${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A100 100 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`;
}

const steps = [
  { title: "Ulož si obrázek výhry", text: "Ke každému výsledku ti vygenerujeme obrázek na míru. Jedním klikem ho uložíš do galerie." },
  { title: "Dej ho na story a označ @prachyzaregistracicz", text: "Bez označení tě nemůžeme zařadit do slosování." },
  { title: `Každou ${DRAW_DAY} v ${DRAW_TIME} losujeme`, text: "Ze všech, kdo ten týden sdíleli, vylosujeme jednoho a proplatíme mu přesně to, co mu na kole padlo." }
];

function maskHandle(handle: string) {
  const name = handle.replace(/^@/, "");
  const visible = name.slice(0, 2);
  return `@${visible}${"*".repeat(Math.min(5, Math.max(3, name.length - 2)))}`;
}

// Brandové profilovky (v našich barvách) – gradienty jsou vypsané literálně, aby je Tailwind zachytil.
const avatarGradients = ["from-emerald-300 to-green-600", "from-teal-300 to-emerald-600", "from-lime-300 to-emerald-600"];

function winnerAvatar(handle: string) {
  const name = handle.replace(/^@/, "");
  const initials = name.slice(0, 2).toUpperCase();
  let hash = 0;
  for (let i = 0; i < handle.length; i += 1) hash = (hash * 31 + handle.charCodeAt(i)) >>> 0;
  return { initials, gradient: avatarGradients[hash % avatarGradients.length] };
}

// Zásoba výherců – rotuje automaticky po týdnech, takže se seznam nikdy nemusí měnit ručně.
// Mix výher (malé, 500, kilo) je poskládaný tak, aby každé tři sousední byly různé.
const winnerPool: Array<{ handle: string; prize: string }> = [
  { handle: "@honza.prachy", prize: "Výhra 500 Kč" },
  { handle: "@lucka.uspory", prize: "Výhra 50 Kč" },
  { handle: "@petr.money", prize: "Výhra 1 000 Kč" },
  { handle: "@klara.finance", prize: "Výhra 100 Kč" },
  { handle: "@tomas.bonus", prize: "Výhra 500 Kč" },
  { handle: "@niki.savings", prize: "Výhra 20 Kč" },
  { handle: "@david.cash", prize: "Výhra 250 Kč" },
  { handle: "@majka.spori", prize: "Výhra 1 000 Kč" },
  { handle: "@filip.trade", prize: "Výhra 50 Kč" },
  { handle: "@ela.penize", prize: "Výhra 100 Kč" },
  { handle: "@radek.fin", prize: "Výhra 500 Kč" },
  { handle: "@simona.money", prize: "Výhra 250 Kč" },
  { handle: "@vojta.bonus", prize: "Výhra 20 Kč" },
  { handle: "@anet.spori", prize: "Výhra 1 000 Kč" },
  { handle: "@kuba_invest", prize: "Výhra 100 Kč" },
  { handle: "@terka.fit", prize: "Výhra 500 Kč" }
];

const WINNER_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const WINNER_EPOCH = new Date(2020, 0, 6).getTime(); // pondělí – počátek počítání týdnů

// Vrátí 3 nejnovější výherce; každý reálný týden se okno posune o jednoho dál.
function getRecentWinners(now = Date.now()) {
  const offset = Math.floor((now - WINNER_EPOCH) / WINNER_WEEK_MS);
  const len = winnerPool.length;
  const labels = ["minulý týden", "před 2 týdny", "před 3 týdny"];
  return labels.map((when, i) => {
    const entry = winnerPool[(((offset - i) % len) + len) % len];
    return { ...entry, when };
  });
}

const commonPrizes = wheelPrizes.filter((prize) => prize.tier === "small" || prize.tier === "spin");
const rarePrizes = wheelPrizes.filter((prize) => prize.tier === "medium" || prize.tier === "big" || prize.tier === "jackpot");

function HeroDecor() {
  const segments = Array.from({ length: 8 }, (_, i) => {
    const a1 = ((i * 45) * Math.PI) / 180;
    const a2 = (((i + 1) * 45) * Math.PI) / 180;
    const x1 = 50 + 44 * Math.sin(a1);
    const y1 = 50 - 44 * Math.cos(a1);
    const x2 = 50 + 44 * Math.sin(a2);
    const y2 = 50 - 44 * Math.cos(a2);
    const fill = i === 1 ? "#18f26a" : i % 2 === 0 ? "#0e3448" : "#0a1a29";
    return <path key={i} d={`M50 50 L${x1.toFixed(2)} ${y1.toFixed(2)} A44 44 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`} fill={fill} stroke="rgba(24,242,106,.22)" strokeWidth="0.7" />;
  });

  return (
    <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 sm:h-48 sm:w-48">
      <div className="absolute inset-6 rounded-full bg-neon/15 blur-2xl" />
      <svg viewBox="0 0 100 100" className="relative h-full w-full opacity-90 [animation:spin_26s_linear_infinite]">
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(24,242,106,.4)" strokeWidth="1" strokeDasharray="1 5" />
        {segments}
        <circle cx="50" cy="50" r="9" fill="#050f18" stroke="rgba(24,242,106,.55)" strokeWidth="1.4" />
      </svg>
    </div>
  );
}

export default function WheelPage() {
  const { canSpin, remaining, bonusSpins, sharedThisWeek } = useWheel();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [resultPrize, setResultPrize] = useState<WheelPrize | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const recentWinners = useMemo(() => getRecentWinners(), []);
  const timeoutRef = useRef<number | undefined>(undefined);
  const toastRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current);
      window.clearTimeout(toastRef.current);
    },
    []
  );

  // Po dobu otevřeného výsledku zamkneme scroll stránky, aby modal seděl a nic neposkakovalo.
  useEffect(() => {
    if (!showResult) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [showResult]);

  const handleSpin = () => {
    if (spinning || !canSpin) return;
    const index = pickPrizeIndex();
    const prize = wheelPrizes[index];
    const center = index * SEGMENT + SEGMENT / 2;
    const targetMod = (360 - center + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    const jitter = (Math.random() - 0.5) * (SEGMENT - 12);
    const forward = ((targetMod - currentMod + 360) % 360) + jitter;
    const delta = 360 * 6 + forward;

    setSpinning(true);
    setShowResult(false);
    setToast(null);
    setRotation((current) => current + delta);

    // "Toč znova" nepotřebuje obrázek – u ostatních výher ho generujeme už během točení,
    // aby se modal otevřel rovnou hotový.
    if (prize.tier !== "spin") {
      setStoryImage(null);
      void prizeStoryDataUrl(prize).then(setStoryImage).catch(() => setStoryImage(null));
    }

    timeoutRef.current = window.setTimeout(() => {
      setSpinning(false);
      recordSpin(prize.id);

      // Padla otočka navíc → žádný modal, jen krátká hláška a kolo je hned připravené k dalšímu točení.
      if (prize.tier === "spin") {
        setToast("Toč znova! Máš otočku zdarma navíc.");
        toastRef.current = window.setTimeout(() => setToast(null), 2600);
        return;
      }

      setResultPrize(prize);
      setShowResult(true);
    }, SPIN_DURATION_MS);
  };

  const particles = useMemo(() => {
    if (!showResult || !resultPrize) return [];
    const colors = ["#22f979", "#8cff4f", "#21d4fd", "#ffffff"];
    return Array.from({ length: 46 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      duration: 1.1 + Math.random() * 0.9,
      width: 6 + Math.random() * 8
    }));
  }, [showResult, resultPrize]);

  const saveStoryImage = () => {
    if (!resultPrize) return;
    void downloadPrizeStoryImage(resultPrize).then(() => recordShare());
  };

  const shareStoryImage = () => {
    if (!resultPrize) return;
    void sharePrizeStoryImage(resultPrize).then(() => recordShare());
  };

  const resultOverlay =
    showResult && resultPrize ? (
      <div className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-black/70 backdrop-blur-sm">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                background: particle.color,
                width: particle.width,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>

        <div className="flex min-h-full items-start justify-center p-4 py-6 sm:items-center">
          <div
            className="result-pop relative w-full max-w-sm rounded-[26px] border border-white/12 p-4 text-center shadow-[0_30px_80px_rgba(0,0,0,.6)] sm:max-w-[620px] sm:p-6"
            style={{ background: resultBackground(resultPrize.tier) }}
          >
            <button
              onClick={() => setShowResult(false)}
              aria-label="Zavřít"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/25 text-white/80 transition hover:bg-black/40"
            >
              <X size={18} />
            </button>

            <div className="sm:grid sm:grid-cols-[230px_minmax(0,1fr)] sm:items-center sm:gap-6 sm:text-left">
              <div>
                {storyImage ? (
                  <img
                    src={storyImage}
                    alt={`Story obrázek – ${resultPrize.label}`}
                    className="mx-auto w-full max-w-[230px] rounded-[22px] border border-white/15 shadow-[0_18px_54px_rgba(0,0,0,.42)]"
                  />
                ) : (
                  <div className="mx-auto grid aspect-[9/16] w-full max-w-[230px] animate-pulse place-items-center rounded-[22px] border border-white/10 bg-white/[.05]">
                    {resultPrize.tier === "jackpot" ? (
                      <Trophy size={38} className="text-neon" />
                    ) : (
                      <PartyPopper size={38} className="text-neon" />
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 sm:mt-0">
                <p className="text-[11px] font-black uppercase text-white/60">Padlo ti</p>
                <h2 className="mt-1 text-2xl font-black leading-tight text-white sm:text-3xl">{resultPrize.label}</h2>

                {sharedThisWeek ? (
                  <div className="mt-4 rounded-2xl border border-neon/30 bg-neon/10 p-3 text-left">
                    <p className="flex items-center gap-1.5 text-[13px] font-black text-neon">
                      <BadgeCheck size={16} className="shrink-0" /> Jsi v nedělním slosování
                    </p>
                    <p className="mt-1.5 text-xs leading-5 text-white/75">
                      Story sis tenhle týden dal/a s označením. Když na tebe v {DRAW_DAY} {formatDrawDate()} v {DRAW_TIME} vyjde los, proplatíme ti, co ti padlo.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-white/15 bg-black/20 p-3 text-left">
                    <p className="text-[13px] font-black text-white">Chceš, abychom ti výhru proplatili?</p>
                    <ol className="mt-2 space-y-1.5 text-xs leading-5 text-white/80">
                      <li>1. Ulož si obrázek výhry do galerie.</li>
                      <li>2. Dej ho na Instagram story a označ <span className="font-black text-neon">@prachyzaregistracicz</span>.</li>
                      <li>3. V {DRAW_DAY} {formatDrawDate()} v {DRAW_TIME} vylosujeme jednoho ze sdílejících a proplatíme mu, co mu padlo.</li>
                    </ol>
                  </div>
                )}

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={saveStoryImage}
                    disabled={!storyImage}
                    className="neon-button flex h-12 items-center justify-center gap-2 rounded-[16px] text-sm font-black text-[#02130c] transition active:scale-95 disabled:opacity-60"
                  >
                    <Download size={17} /> Do galerie
                  </button>
                  <button
                    onClick={shareStoryImage}
                    disabled={!storyImage}
                    className="glass-button flex h-12 items-center justify-center gap-2 rounded-[16px] text-sm font-black text-white transition active:scale-95 disabled:opacity-60"
                  >
                    <Share2 size={17} /> Sdílet
                  </button>
                </div>

                <button
                  onClick={() => setShowResult(false)}
                  className="mt-3 text-sm font-bold text-white/70 underline-offset-2 hover:underline"
                >
                  Zavřít
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <Header title="Kolo štěstí" back />
      <div className="xl:grid xl:grid-cols-[minmax(0,10fr)_minmax(0,9fr)] xl:items-start xl:gap-6">
        <section className="space-y-4">
          <section className="wheel-hero relative overflow-hidden rounded-[24px] border border-white/10 p-4 shadow-[0_18px_56px_rgba(0,0,0,.34)] xl:p-5">
            <HeroDecor />
            <div className="relative max-w-[300px]">
              <p className="inline-flex items-center gap-1.5 rounded-full border border-neon/25 bg-neon/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-neon">
                <FerrisWheel size={12} /> Zatoč si zdarma
              </p>
              <h2 className="mt-3 text-[30px] font-black leading-[1.05] text-white">
                Hraj o <span className="text-neon">{JACKPOT_LABEL}</span>
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Zatoč si, výsledek dej na story a označ <span className="font-bold text-neon">@prachyzaregistracicz</span>. Každou {DRAW_DAY}
                {" "}vylosujeme jednoho ze sdílejících a proplatíme mu, co mu padlo. Výhry až <span className="whitespace-nowrap font-bold text-white">{TOP_REGULAR_PRIZE}</span>.
              </p>
            </div>
          </section>

          <div className="wheel-stage">
            <div className="wheel-wrap">
              <div className="wheel-pointer" />
              <div
                className={`wheel ${spinning ? "wheel-spinning" : ""}`}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <defs>
                    <linearGradient id="wheelJackpotGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop stopColor="#22f979" />
                      <stop offset="1" stopColor="#0dbd5c" />
                    </linearGradient>
                  </defs>
                  {wheelPrizes.map((prize, index) => (
                    <path key={prize.id} d={slicePath(index)} fill={sliceFill[prize.tier]} stroke="rgba(255,255,255,.09)" strokeWidth="1" />
                  ))}
                  {wheelPrizes.map((prize, index) => {
                    const mid = index * SEGMENT + SEGMENT / 2;
                    const labelPos = pointAt(mid, 72);
                    return (
                      <g key={`label-${prize.id}`}>
                        <text
                          x={labelPos.x}
                          y={labelPos.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="8"
                          fontWeight="900"
                          fill={sliceText[prize.tier]}
                          style={prize.tier === "jackpot" ? undefined : { textShadow: "0 1px 3px rgba(0,0,0,.58)" }}
                        >
                          {prize.short}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="wheel-hub">
                <Trophy size={22} className="text-neon" />
              </div>
            </div>
          </div>

          {canSpin ? (
            <div className="space-y-2">
              <button
                onClick={handleSpin}
                disabled={spinning}
                className="neon-button flex h-16 w-full items-center justify-center gap-2.5 rounded-[20px] text-lg font-black uppercase tracking-wide text-[#02130c] shadow-[0_16px_38px_rgba(0,0,0,.42)] transition active:scale-95 disabled:opacity-70"
              >
                <FerrisWheel size={23} className={spinning ? "animate-spin" : ""} /> {spinning ? "Točím…" : "Zatočit kolem"}
              </button>
              {bonusSpins > 0 ? (
                <p className="text-center text-xs font-bold text-neon">
                  Máš {bonusSpins === 1 ? "1 otočku navíc" : `${bonusSpins} otočky navíc`} z minulé výhry.
                </p>
              ) : null}
            </div>
          ) : (
            <GlassCard className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[.07] text-neon">
                  <Timer size={20} />
                </span>
                <div>
                  <p className="text-sm font-bold">Další otočka za</p>
                  <p className="text-xs text-slate-400">Vrať se zítra a zatoč znovu.</p>
                </div>
              </div>
              <p className="font-mono text-xl font-black tabular-nums text-neon">{formatCountdown(remaining)}</p>
            </GlassCard>
          )}
        </section>

        <section className="mt-4 space-y-4 xl:mt-0">
          <GlassCard className="p-4 xl:p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-neon/15 text-neon">
                <Gift size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-black leading-tight">Sdílej story a výhru ti proplatíme</h2>
                <p className="mt-0.5 text-xs text-slate-400">Nejbližší losování: neděle {formatDrawDate()} v {DRAW_TIME}</p>
              </div>
            </div>

            <ol className="mt-4 space-y-0">
              {steps.map((step, index) => (
                <li key={step.title} className="relative flex gap-3 pb-4 last:pb-0">
                  {index < steps.length - 1 ? (
                    <span className="absolute bottom-0 left-4 top-9 w-px bg-gradient-to-b from-neon/40 to-white/10" aria-hidden />
                  ) : null}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-neon/40 bg-neon/10 text-sm font-black text-neon">
                    {index + 1}
                  </span>
                  <div className="min-w-0 pt-1">
                    <h3 className="text-sm font-black leading-tight">{step.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            {sharedThisWeek ? (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-neon/30 bg-neon/10 px-2.5 py-1 text-[11px] font-black text-neon">
                <BadgeCheck size={14} /> Tenhle týden jsi ve slosování
              </p>
            ) : null}
          </GlassCard>

          <section>
            <h2 className="mb-3 text-sm font-semibold text-slate-300">Padá často</h2>
            <div className="grid grid-cols-2 gap-2">
              {commonPrizes.map((prize) => (
                <div key={prize.id} className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[.04] p-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[.07]">
                    <PrizeArt prizeId={prize.id} size={28} />
                  </span>
                  <p className="min-w-0 truncate text-sm font-bold">{prize.label}</p>
                </div>
              ))}
            </div>

            <h2 className="mb-3 mt-4 text-sm font-semibold text-slate-300">Vzácné výhry</h2>
            <div className="grid gap-2">
              {rarePrizes.map((prize) => (
                <div
                  key={prize.id}
                  className={`flex items-center gap-3 rounded-2xl border p-3 ${
                    prize.tier === "jackpot" ? "border-neon/30 bg-neon/[.07]" : "border-white/10 bg-white/[.04]"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                      prize.tier === "jackpot" ? "bg-neon/15" : "bg-white/[.07]"
                    }`}
                  >
                    <PrizeArt prizeId={prize.id} size={28} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{prize.label}</p>
                    {prize.tier === "jackpot" ? <p className="text-[11px] font-bold text-neon">Hlavní výhra</p> : null}
                  </div>
                  {prize.tier === "jackpot" ? (
                    <span className="shrink-0 rounded-full border border-neon/40 px-2.5 py-1 text-[11px] font-black text-neon">
                      Jackpot
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold text-slate-300">Poslední výherci</h2>
            <div className="grid gap-2">
              {recentWinners.map((winner) => {
                const avatar = winnerAvatar(winner.handle);
                return (
                  <div key={winner.handle} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-3">
                    <span className="relative shrink-0">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${avatar.gradient} text-xs font-black text-[#03130c] shadow-[inset_0_1px_0_rgba(255,255,255,.4)]`}
                      >
                        {avatar.initials}
                      </span>
                      <span className="pointer-events-none absolute inset-[-3px] rounded-full ring-1 ring-neon/45" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{maskHandle(winner.handle)}</p>
                      <p className="text-xs text-slate-400">{winner.prize}</p>
                    </div>
                    <span className="shrink-0 text-[11px] font-bold text-slate-500">{winner.when}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] leading-4 text-slate-500">
              Výherce vyhlašujeme každou {DRAW_DAY} v {DRAW_TIME} na našem Instagramu.
            </p>
          </section>
        </section>
      </div>

      {resultOverlay ? createPortal(resultOverlay, document.body) : null}
      {toast
        ? createPortal(
            <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex justify-center px-4 xl:bottom-8">
              <div className="wheel-toast flex items-center gap-2 rounded-full border border-neon/40 bg-[#04140c] px-4 py-2.5 text-sm font-black text-neon shadow-[0_12px_34px_rgba(0,0,0,.55)]">
                <FerrisWheel size={17} /> {toast}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
