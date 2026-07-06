import { motion } from "framer-motion";
import { Check, ChevronRight, HelpCircle, Mail, Search, Star } from "lucide-react";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
import type { Bonus } from "../data/mockData";
import { paths } from "../routes/paths";

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass ${className}`}>{children}</div>;
}

/** TikTok logo – lucide brand ikony nemá, proto vlastní minimalistické SVG. */
export function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 3c.4 2.1 1.8 3.7 3.9 4v3c-1.5 0-2.9-.5-3.9-1.2v6.4c0 3.3-2.6 5.8-5.8 5.8S5 18.5 5 15.2c0-3.2 2.5-5.7 5.7-5.8v3.1c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.8 2.8 2.8 2.8-1.3 2.8-2.8V3h3Z" />
    </svg>
  );
}

export function SectionHeading({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="min-w-0 truncate text-lg font-bold xl:text-xl">{title}</h2>
      {action && onAction ? (
        <button onClick={onAction} className="flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-300 transition hover:text-white">
          {action} <ChevronRight size={14} />
        </button>
      ) : null}
    </div>
  );
}

export function VerifiedBadge({ size = 18 }: { size?: number }) {
  return (
    <span className="verified-badge" style={{ width: size, height: size }}>
      <Check size={Math.max(10, size - 7)} strokeWidth={4} />
    </span>
  );
}

export function BrandLogo({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  const content = (
    <>
      <span className="whitespace-nowrap">
        <span className="text-white">prachyzaregistraci</span><span className="text-neon">.cz</span>
      </span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`flex items-center gap-1 whitespace-nowrap font-black tracking-normal ${className}`}>
        {content}
      </button>
    );
  }

  return <div className={`flex items-center gap-1 whitespace-nowrap font-black tracking-normal ${className}`}>{content}</div>;
}

export function NeonButton({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...buttonProps
}: HTMLMotionProps<"button"> & {
  variant?: "primary" | "ghost";
}) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.01 }}
      {...buttonProps}
      className={`h-12 rounded-[18px] px-4 text-sm font-bold transition ${
        variant === "primary"
          ? "neon-button text-[#02130c]"
          : "glass-button text-white"
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function SearchBar({
  placeholder,
  value,
  onChange,
  onFocus
}: {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
}) {
  return (
    <label className="glass-button flex h-11 items-center gap-2 px-3 text-slate-300">
      <Search size={17} />
      <input
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
      />
    </label>
  );
}

export function FilterTabs({
  tabs,
  active,
  onChange
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`filter-tab ${active === tab ? "filter-tab-active" : ""}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function LogoMark({ bonus, size = "md" }: { bonus: Bonus; size?: "sm" | "md" | "lg" }) {
  const dimensions = size === "lg" ? "h-16 w-16 text-2xl" : size === "sm" ? "h-10 w-10 text-sm" : "h-14 w-14 text-xl";
  return (
    <div className={`relative grid ${dimensions} shrink-0 place-items-center overflow-hidden rounded-2xl ${bonus.logoClass} font-black shadow-[0_12px_28px_rgba(0,0,0,.35)]`}>
      <img
        src={bonus.logoUrl}
        alt={`${bonus.name} logo`}
        className="relative z-10 h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = "none";
          event.currentTarget.nextElementSibling?.classList.remove("hidden");
        }}
      />
      <span className="hidden">{bonus.logo}</span>
    </div>
  );
}

function RankShield({ rank }: { rank: number }) {
  const gradientId = useId().replace(/:/g, "");
  const highlightId = `${gradientId}-shine`;
  const colors =
    rank === 1
      ? {
          stops: ["#fef08a", "#fbbf24", "#fb923c"],
          text: "#211400",
          shadow: "drop-shadow(0 8px 10px rgba(0,0,0,.24))"
        }
      : rank === 2
        ? {
            stops: ["#f8fafc", "#cffafe", "#cbd5e1"],
            text: "#07111c",
            shadow: "drop-shadow(0 8px 10px rgba(0,0,0,.22))"
          }
        : {
            stops: ["#fed7aa", "#f59e0b", "#f43f5e"],
            text: "#1d0a02",
            shadow: "drop-shadow(0 8px 10px rgba(0,0,0,.24))"
          };

  return (
    <span className="absolute -left-1.5 -top-1.5 z-20 h-9 w-8 font-black" style={{ filter: colors.shadow }}>
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 32 36" fill="none">
        <defs>
          <linearGradient id={gradientId} x1="3" y1="0" x2="30" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor={colors.stops[0]} />
            <stop offset="0.58" stopColor={colors.stops[1]} />
            <stop offset="1" stopColor={colors.stops[2]} />
          </linearGradient>
          <linearGradient id={highlightId} x1="0" y1="0" x2="32" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255,255,255,.62)" />
            <stop offset="0.42" stopColor="rgba(255,255,255,0)" />
            <stop offset="1" stopColor="rgba(0,0,0,.18)" />
          </linearGradient>
        </defs>
        <path d="M8 0H24C28.42 0 32 3.58 32 8V25.92L16 36L0 25.92V8C0 3.58 3.58 0 8 0Z" fill={`url(#${gradientId})`} />
        <path d="M8 0H24C28.42 0 32 3.58 32 8V25.92L16 36L0 25.92V8C0 3.58 3.58 0 8 0Z" fill={`url(#${highlightId})`} />
        <ellipse cx="16" cy="25.4" rx="11" ry="3.2" fill="rgba(0,0,0,.1)" />
      </svg>
      <span
        className="absolute left-1/2 top-2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-white/72 text-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_3px_8px_rgba(0,0,0,.16)]"
        style={{ color: colors.text }}
      >
        {rank}
      </span>
    </span>
  );
}

export function BonusCard({ bonus, rank }: { bonus: Bonus; rank?: number }) {
  const navigate = useNavigate();

  return (
    <motion.article
      whileTap={{ scale: 0.985 }}
      onClick={() => navigate(paths.exchangeDetail(bonus.id))}
      className="relative h-full cursor-pointer rounded-[20px] border border-white/10 bg-white/[.055] p-3 shadow-card transition hover:border-neon/30 lg:p-4"
    >
      {rank ? <RankShield rank={rank} /> : null}
      <div className="flex h-full items-center gap-3 lg:flex-col lg:items-start">
        <LogoMark bonus={bonus} />
        <div className="min-w-0 flex-1 lg:w-full">
          <div className="flex items-center gap-1">
            <h3 className="truncate font-bold">{bonus.name}</h3>
            <VerifiedBadge size={17} />
          </div>
          <p className="text-xs text-slate-400">{bonus.type}</p>
          <p className="mt-1 text-lg font-black text-neon">{bonus.bonus}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <span className="rounded-lg border border-neon/20 bg-neon/10 px-2 py-1 text-[11px] font-bold text-neon">
              {bonus.age}
            </span>
            {bonus.tags.map((tag) => (
              <span key={tag} className="rounded-lg bg-white/[.07] px-2 py-1 text-[11px] text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-4 lg:w-full lg:flex-row lg:items-center lg:justify-between">
          <span className="flex items-center gap-1 text-sm font-semibold">
            <Star className="fill-yellow-300 text-yellow-300" size={15} />
            {bonus.rating}
          </span>
          <button
            onClick={(event) => {
              event.stopPropagation();
              navigate(paths.exchangeDetail(bonus.id));
            }}
            className="neon-button h-10 whitespace-nowrap rounded-[14px] px-4 text-xs font-black text-[#02130c] active:scale-95 lg:min-w-[130px]"
          >
            Získat<span className="hidden lg:inline"> {bonus.bonus}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function ExchangeCard({ bonus }: { bonus: Bonus }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(paths.exchangeDetail(bonus.id))}
      className="glass-button flex w-full items-center gap-3 p-3 text-left transition active:scale-[.99]"
    >
      <LogoMark bonus={bonus} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{bonus.name}</p>
        <p className="text-sm font-black text-neon">{bonus.bonus}</p>
      </div>
      <span className="flex items-center gap-1 text-xs font-semibold text-slate-100">
        <Star className="fill-yellow-300 text-yellow-300" size={13} />
        {bonus.rating}
      </span>
      <ChevronRight size={16} className="text-slate-500" />
    </button>
  );
}

export function ContactCard({ title = "Potřebuješ poradit?", text = "Odpovídáme obvykle do pár hodin." }: { title?: string; text?: string }) {
  const navigate = useNavigate();

  return (
    <GlassCard className="p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/[.07] text-neon">
          <Mail size={19} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-black">{title}</h3>
          <p className="mt-0.5 text-xs leading-5 text-slate-400">{text}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href="mailto:kontakt@prachyzaregistraci.cz"
          className="glass-button flex h-11 items-center justify-center gap-2 px-3 text-xs font-bold text-white transition active:scale-95"
        >
          <Mail size={15} className="text-neon" /> Napsat e-mail
        </a>
        <button
          onClick={() => navigate(paths.help)}
          className="glass-button flex h-11 items-center justify-center gap-2 px-3 text-xs font-bold text-white transition active:scale-95"
        >
          <HelpCircle size={15} className="text-neon" /> Nápověda
        </button>
      </div>
    </GlassCard>
  );
}

export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[.08] py-3 text-sm last:border-0">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

export function ProgressRing({ value = 4, total = 12, size = 112 }: { value?: number; total?: number; size?: number }) {
  const gradientId = useId();
  const percent = value / total;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent);

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size} viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={radius} stroke="rgba(255,255,255,.09)" strokeWidth="12" fill="none" />
        <motion.circle
          cx="56"
          cy="56"
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#18f26a" />
            <stop offset="0.58" stopColor="#8cff4f" />
            <stop offset="1" stopColor="#2d8cff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-black">
          {value}<span className="text-sm text-slate-400">/{total}</span>
        </p>
        <p className="text-[10px] text-slate-400">aktivováno</p>
      </div>
    </div>
  );
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`flex h-7 w-12 items-center rounded-full p-1 transition ${checked ? "bg-neon shadow-[0_6px_12px_rgba(0,0,0,.2)]" : "bg-white/15"}`}
      aria-pressed={checked}
    >
      <span className={`h-5 w-5 rounded-full bg-white shadow transition ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}
