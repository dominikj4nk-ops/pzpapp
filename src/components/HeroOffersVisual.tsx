import { Check } from "lucide-react";
import { bonuses, type Bonus } from "../data/mockData";

// Nabídky v ilustraci, odzadu dopředu. Data se berou z katalogu, takže částky sedí s webem.
const featuredIds = ["raiffeisenbank-ucet", "airbank-ucet", "mbank-ucet"];

const logoFit = (bonus: Bonus) =>
  bonus.logoFit === "symbol"
    ? "h-full w-auto max-w-none object-left"
    : bonus.logoFit === "contain"
      ? "h-full w-full object-contain"
      : "h-full w-full object-cover";

/**
 * Dekorativní ilustrace do hero sekce: vějíř karet se skutečnými nabídkami.
 * Rozměry jsou v CSS jednotkách cqw (viz .hero-visual v styles.css),
 * takže se celá ilustrace škáluje podle šířky, kterou dostane.
 */
export default function HeroOffersVisual({ className = "" }: { className?: string }) {
  const featured = featuredIds
    .map((id) => bonuses.find((bonus) => bonus.id === id))
    .filter((bonus): bonus is Bonus => Boolean(bonus));

  return (
    <div className={`hero-visual ${className}`} aria-hidden="true">
      <span className="hero-visual-glow" />
      {featured.map((bonus, index) => (
        <div key={bonus.id} className={`hero-visual-card hero-visual-card-${index + 1}`}>
          <span className={`hero-visual-logo ${bonus.logoClass}`}>
            <img src={bonus.logoUrl} alt="" className={logoFit(bonus)} decoding="async" />
          </span>
          <span className="hero-visual-text">
            <span className="hero-visual-name">{bonus.name}</span>
            <span className="hero-visual-amount">{bonus.bonus}</span>
          </span>
          <span className="hero-visual-age">{bonus.age}</span>
        </div>
      ))}
      <span className="hero-visual-badge">
        <Check strokeWidth={3} />
        Ověřené podmínky
      </span>
    </div>
  );
}
