import { DRAW_DAY, DRAW_TIME, formatDrawDate, WEEKLY_SHARE_BONUS, type WheelPrize } from "./wheelState";

// Story obrázek 9:16 generovaný na míru výhře – uživatel si ho uloží do galerie
// a dá na Instagram story. Paleta drží identitu webu (ink + neon + cyan).

const W = 1080;
const H = 1920;

const NEON = "#18f26a";
const NEON_BRIGHT = "#22f979";
const NEON_DEEP = "#0a9e4b";
const CYAN = "#21d4fd";
const INK = "#030b12";

function seededRandom(seed: string) {
  let h = 1779033703;
  for (let i = 0; i < seed.length; i += 1) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function font(weight: number, px: number) {
  return `${weight} ${px}px Inter, system-ui, sans-serif`;
}

async function ensureFonts() {
  try {
    await Promise.all([
      document.fonts.load(font(900, 200)),
      document.fonts.load(font(800, 60)),
      document.fonts.load(font(700, 40))
    ]);
  } catch {
    // fallback na systémové písmo
  }
}

function drawBackground(ctx: CanvasRenderingContext2D, prize: WheelPrize) {
  const jackpot = prize.tier === "jackpot";

  const base = ctx.createLinearGradient(0, 0, 0, H);
  base.addColorStop(0, jackpot ? "#0a2417" : "#0b1e2e");
  base.addColorStop(0.55, jackpot ? "#04140c" : "#050f19");
  base.addColorStop(1, INK);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  const topGlow = ctx.createRadialGradient(W / 2, 620, 0, W / 2, 620, 720);
  topGlow.addColorStop(0, jackpot ? "rgba(24,242,106,.34)" : "rgba(24,242,106,.2)");
  topGlow.addColorStop(1, "rgba(24,242,106,0)");
  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, W, H);

  const cyanGlow = ctx.createRadialGradient(W * 0.85, H * 0.86, 0, W * 0.85, H * 0.86, 520);
  cyanGlow.addColorStop(0, "rgba(33,212,253,.12)");
  cyanGlow.addColorStop(1, "rgba(33,212,253,0)");
  ctx.fillStyle = cyanGlow;
  ctx.fillRect(0, 0, W, H);

  // Paprsky za výhrou
  ctx.save();
  ctx.translate(W / 2, 620);
  const rays = 18;
  for (let i = 0; i < rays; i += 1) {
    ctx.save();
    ctx.rotate((i / rays) * Math.PI * 2);
    const ray = ctx.createLinearGradient(0, 0, 0, -860);
    ray.addColorStop(0, jackpot ? "rgba(140,255,190,.12)" : "rgba(255,255,255,.05)");
    ray.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = ray;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-26, -860);
    ctx.lineTo(26, -860);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();

  // Konfety (deterministické podle výhry)
  const rand = seededRandom(prize.id);
  const colors = [NEON_BRIGHT, "#8cff4f", CYAN, "#ffffff"];
  for (let i = 0; i < 54; i += 1) {
    const x = rand() * W;
    const y = rand() * H;
    if (Math.abs(x - W / 2) < 330 && y > 300 && y < 1300) continue;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rand() * Math.PI);
    ctx.globalAlpha = 0.16 + rand() * 0.4;
    ctx.fillStyle = colors[Math.floor(rand() * colors.length)];
    if (rand() > 0.5) {
      roundedRect(ctx, -7, -11, 14, 22, 4);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, 5 + rand() * 5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
  ctx.globalAlpha = 1;

  // Vinětace
  const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.32, W / 2, H / 2, H * 0.72);
  vignette.addColorStop(0, "rgba(3,11,18,0)");
  vignette.addColorStop(1, "rgba(3,11,18,.55)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);
}

function drawHeader(ctx: CanvasRenderingContext2D) {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = font(900, 54);
  const brand = "prachyzaregistraci";
  const suffix = ".cz";
  const brandWidth = ctx.measureText(brand).width;
  const suffixWidth = ctx.measureText(suffix).width;
  const start = W / 2 - (brandWidth + suffixWidth) / 2;
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(brand, start, 170);
  ctx.fillStyle = NEON;
  ctx.fillText(suffix, start + brandWidth, 170);

  ctx.textAlign = "center";
  ctx.font = font(800, 34);
  const pillText = "KOLO ŠTĚSTÍ";
  const pillWidth = ctx.measureText(pillText).width + 88;
  roundedRect(ctx, W / 2 - pillWidth / 2, 232, pillWidth, 76, 38);
  ctx.fillStyle = "rgba(255,255,255,.08)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.2)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,.86)";
  ctx.fillText(pillText, W / 2, 272);
}

function coinGradient(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const g = ctx.createRadialGradient(x - r * 0.4, y - r * 0.45, r * 0.1, x, y, r);
  g.addColorStop(0, "#b9ffd6");
  g.addColorStop(0.45, NEON_BRIGHT);
  g.addColorStop(1, NEON_DEEP);
  return g;
}

function drawCoin(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, label = "Kč") {
  ctx.save();
  ctx.shadowColor = "rgba(3,11,18,.55)";
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 14;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = coinGradient(ctx, x, y, r);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(3,19,12,.5)";
  ctx.lineWidth = r * 0.06;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, r * 0.74, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(3,19,12,.4)";
  ctx.lineWidth = r * 0.05;
  ctx.stroke();

  ctx.fillStyle = "#03130c";
  ctx.font = font(900, r * 0.62);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y + r * 0.03);
}

function drawCoinStack(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const thickness = r * 0.42;
  for (let i = 2; i >= 0; i -= 1) {
    const cy = y + i * thickness;
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, cy + thickness, r, r * 0.42, 0, 0, Math.PI * 2);
    ctx.fillStyle = NEON_DEEP;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x, cy, r, r * 0.42, 0, 0, Math.PI * 2);
    ctx.fillStyle = coinGradient(ctx, x, cy, r);
    ctx.fill();
    ctx.strokeStyle = "rgba(3,19,12,.45)";
    ctx.lineWidth = r * 0.05;
    ctx.stroke();
    ctx.restore();
  }
  ctx.fillStyle = "#03130c";
  ctx.font = font(900, r * 0.5);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Kč", x, y + 2);
}

function drawBanknotes(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, value: string) {
  const noteW = size * 2.1;
  const noteH = size;
  const angles = [-0.16, -0.05, 0.08];
  angles.forEach((angle, index) => {
    ctx.save();
    ctx.translate(x, y + index * 8);
    ctx.rotate(angle);
    ctx.shadowColor = "rgba(3,11,18,.5)";
    ctx.shadowBlur = 26;
    ctx.shadowOffsetY = 12;

    const g = ctx.createLinearGradient(-noteW / 2, 0, noteW / 2, 0);
    g.addColorStop(0, "#12d465");
    g.addColorStop(0.5, NEON_BRIGHT);
    g.addColorStop(1, "#0fb257");
    roundedRect(ctx, -noteW / 2, -noteH / 2, noteW, noteH, 26);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.shadowColor = "transparent";

    roundedRect(ctx, -noteW / 2 + 16, -noteH / 2 + 16, noteW - 32, noteH - 32, 16);
    ctx.strokeStyle = "rgba(3,19,12,.4)";
    ctx.lineWidth = 4;
    ctx.stroke();

    if (index === angles.length - 1) {
      ctx.beginPath();
      ctx.arc(0, 0, noteH * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(3,19,12,.16)";
      ctx.fill();
      ctx.fillStyle = "#03130c";
      ctx.font = font(900, noteH * 0.32);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(value, 0, 2);
    }
    ctx.restore();
  });
}

function drawTrophy(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  const s = size / 100;

  ctx.shadowColor = "rgba(24,242,106,.5)";
  ctx.shadowBlur = 60;

  const cup = ctx.createLinearGradient(0, -s * 70, 0, s * 40);
  cup.addColorStop(0, "#b9ffd6");
  cup.addColorStop(0.4, NEON_BRIGHT);
  cup.addColorStop(1, NEON_DEEP);

  // Pohár
  ctx.beginPath();
  ctx.moveTo(-s * 52, -s * 70);
  ctx.lineTo(s * 52, -s * 70);
  ctx.bezierCurveTo(s * 52, -s * 10, s * 30, s * 26, 0, s * 34);
  ctx.bezierCurveTo(-s * 30, s * 26, -s * 52, -s * 10, -s * 52, -s * 70);
  ctx.closePath();
  ctx.fillStyle = cup;
  ctx.fill();
  ctx.shadowColor = "transparent";

  // Ucha
  ctx.lineWidth = s * 9;
  ctx.strokeStyle = NEON_DEEP;
  ctx.beginPath();
  ctx.arc(-s * 62, -s * 44, s * 20, Math.PI * 0.35, Math.PI * 1.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(s * 62, -s * 44, s * 20, Math.PI * 1.5, Math.PI * 0.65, true);
  ctx.stroke();

  // Stopka a podstavec
  ctx.fillStyle = NEON_DEEP;
  roundedRect(ctx, -s * 9, s * 32, s * 18, s * 26, s * 6);
  ctx.fill();
  const baseG = ctx.createLinearGradient(0, s * 58, 0, s * 82);
  baseG.addColorStop(0, NEON_BRIGHT);
  baseG.addColorStop(1, NEON_DEEP);
  roundedRect(ctx, -s * 40, s * 58, s * 80, s * 24, s * 10);
  ctx.fillStyle = baseG;
  ctx.fill();

  // Lesk
  ctx.beginPath();
  ctx.moveTo(-s * 34, -s * 62);
  ctx.bezierCurveTo(-s * 40, -s * 24, -s * 34, -s * 4, -s * 22, s * 10);
  ctx.lineWidth = s * 10;
  ctx.strokeStyle = "rgba(255,255,255,.4)";
  ctx.lineCap = "round";
  ctx.stroke();

  // Hvězda na poháru
  ctx.fillStyle = "#03130c";
  ctx.font = font(900, s * 44);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("★", 0, -s * 26);
  ctx.restore();
}

function drawSpinArrows(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.lineWidth = r * 0.2;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(24,242,106,.45)";
  ctx.shadowBlur = 40;

  const arrow = (from: number, to: number) => {
    ctx.beginPath();
    ctx.arc(0, 0, r, from, to);
    ctx.strokeStyle = NEON_BRIGHT;
    ctx.stroke();
    const tipAngle = to;
    const tx = Math.cos(tipAngle) * r;
    const ty = Math.sin(tipAngle) * r;
    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(tipAngle + Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.02);
    ctx.lineTo(-r * 0.3, -r * 0.34);
    ctx.lineTo(r * 0.3, -r * 0.34);
    ctx.closePath();
    ctx.fillStyle = NEON_BRIGHT;
    ctx.fill();
    ctx.restore();
  };

  arrow(-Math.PI * 0.42, Math.PI * 0.32);
  arrow(Math.PI * 0.58, Math.PI * 1.32);
  ctx.restore();
}

function drawPrizeArt(ctx: CanvasRenderingContext2D, prize: WheelPrize) {
  const cx = W / 2;
  const cy = 620;

  // Tečkovaný prstenec kolem grafiky
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 320, 0, Math.PI * 2);
  ctx.setLineDash([4, 26]);
  ctx.lineWidth = 7;
  ctx.strokeStyle = "rgba(24,242,106,.4)";
  ctx.shadowColor = "rgba(24,242,106,.35)";
  ctx.shadowBlur = 24;
  ctx.stroke();
  ctx.restore();

  switch (prize.tier) {
    case "jackpot":
      drawTrophy(ctx, cx, cy + 10, 240);
      break;
    case "big":
      drawBanknotes(ctx, cx, cy, 190, "500");
      break;
    case "medium":
      drawCoinStack(ctx, cx, cy - 30, 150);
      break;
    case "spin":
      drawSpinArrows(ctx, cx, cy, 170);
      break;
    default:
      drawCoin(ctx, cx, cy, 175);
  }
}

function drawPrizeText(ctx: CanvasRenderingContext2D, prize: WheelPrize) {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = font(800, 40);
  ctx.fillStyle = "rgba(255,255,255,.6)";
  const eyebrow = prize.tier === "spin" ? "PADLO MI" : "PRÁVĚ JSEM VYHRÁL/A";
  ctx.save();
  const spaced = eyebrow.split("").join("  ");
  ctx.fillText(spaced, W / 2, 1058);
  ctx.restore();

  const headline = prize.tier === "spin" ? "TOČ ZNOVA" : prize.tier === "jackpot" ? JACKPOT_TEXT : prize.short;
  const headlineSize = headline.length > 8 ? 132 : 176;
  ctx.font = font(900, headlineSize);
  if (prize.tier === "jackpot" || prize.tier === "big") {
    ctx.save();
    ctx.shadowColor = "rgba(24,242,106,.55)";
    ctx.shadowBlur = 60;
    ctx.fillStyle = NEON_BRIGHT;
    ctx.fillText(headline, W / 2, 1180);
    ctx.restore();
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.fillText(headline, W / 2, 1180);
  }

  if (prize.tier === "jackpot") {
    ctx.font = font(800, 38);
    const badge = "JACKPOT";
    const bw = ctx.measureText(badge).width + 84;
    roundedRect(ctx, W / 2 - bw / 2, 1268, bw, 78, 39);
    ctx.fillStyle = "rgba(24,242,106,.14)";
    ctx.fill();
    ctx.strokeStyle = "rgba(24,242,106,.5)";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = NEON_BRIGHT;
    ctx.fillText(badge, W / 2, 1309);
  } else {
    ctx.font = font(700, 40);
    ctx.fillStyle = "rgba(255,255,255,.72)";
    ctx.fillText(prize.tier === "spin" ? "kolo štěstí mi dalo otočku navíc" : "na kole štěstí", W / 2, 1290);
  }
}

/** Vykreslí vycentrovaný text a v případě potřeby zmenší písmo, aby se vešel do maxWidth. */
function drawFittedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  maxWidth: number,
  weight: number,
  startSize: number,
  color: string
) {
  let size = startSize;
  ctx.fillStyle = color;
  for (; size > 12; size -= 1) {
    ctx.font = font(weight, size);
    if (ctx.measureText(text).width <= maxWidth) break;
  }
  ctx.font = font(weight, size);
  ctx.fillText(text, cx, y);
}

function drawFooter(ctx: CanvasRenderingContext2D) {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const boxX = 96;
  const boxW = W - 2 * boxX;
  const boxY = 1536;
  const boxH = 268;
  const maxTextW = boxW - 88;

  roundedRect(ctx, boxX, boxY, boxW, boxH, 44);
  ctx.fillStyle = "rgba(255,255,255,.06)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.14)";
  ctx.lineWidth = 2;
  ctx.stroke();

  drawFittedText(ctx, "@prachyzaregistraci", W / 2, boxY + 72, maxTextW, 900, 50, NEON_BRIGHT);
  drawFittedText(ctx, "Sdílej výsledek na story a označ nás", W / 2, boxY + 148, maxTextW, 600, 32, "rgba(255,255,255,.7)");
  drawFittedText(
    ctx,
    `Slosování +${WEEKLY_SHARE_BONUS} Kč v ${DRAW_DAY} ${formatDrawDate()} v ${DRAW_TIME}`,
    W / 2,
    boxY + 206,
    maxTextW,
    700,
    32,
    "rgba(140,255,190,.92)"
  );
}

const JACKPOT_TEXT = "5 000 Kč";

export async function renderPrizeStoryImage(prize: WheelPrize): Promise<HTMLCanvasElement> {
  await ensureFonts();
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  drawBackground(ctx, prize);
  drawHeader(ctx);
  drawPrizeArt(ctx, prize);
  drawPrizeText(ctx, prize);
  drawFooter(ctx);
  return canvas;
}

export async function prizeStoryDataUrl(prize: WheelPrize) {
  const canvas = await renderPrizeStoryImage(prize);
  return canvas.toDataURL("image/png");
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
}

export async function downloadPrizeStoryImage(prize: WheelPrize) {
  const canvas = await renderPrizeStoryImage(prize);
  const blob = await canvasToBlob(canvas);
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `kolo-stesti-${prize.id}.png`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** Na mobilu otevře nativní sdílení s obrázkem, jinak obrázek stáhne. */
export async function sharePrizeStoryImage(prize: WheelPrize): Promise<"shared" | "downloaded"> {
  const canvas = await renderPrizeStoryImage(prize);
  const blob = await canvasToBlob(canvas);
  if (blob && typeof navigator.share === "function") {
    const file = new File([blob], `kolo-stesti-${prize.id}.png`, { type: "image/png" });
    const payload = { files: [file], title: "Kolo štěstí" };
    if (!navigator.canShare || navigator.canShare(payload)) {
      try {
        await navigator.share(payload);
        return "shared";
      } catch {
        // uživatel zrušil nebo sdílení selhalo → spadneme na stažení
      }
    }
  }
  await downloadPrizeStoryImage(prize);
  return "downloaded";
}
