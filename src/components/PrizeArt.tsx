import { useId } from "react";

// Custom grafika výher v identitě webu (neon + ink) – nahrazuje emoji u vzácných výher.

function useGradientId() {
  return useId().replace(/:/g, "");
}

function CoinArt({ size }: { size: number }) {
  const id = useGradientId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id={id} cx="0.35" cy="0.3" r="0.9">
          <stop stopColor="#b9ffd6" />
          <stop offset="0.45" stopColor="#22f979" />
          <stop offset="1" stopColor="#0a9e4b" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="19" fill={`url(#${id})`} />
      <circle cx="24" cy="24" r="19" stroke="rgba(3,19,12,.5)" strokeWidth="2" />
      <circle cx="24" cy="24" r="13.5" stroke="rgba(3,19,12,.4)" strokeWidth="1.6" />
      <text x="24" y="25" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="900" fill="#03130c">
        Kč
      </text>
    </svg>
  );
}

function CoinStackArt({ size }: { size: number }) {
  const id = useGradientId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#8cffbe" />
          <stop offset="1" stopColor="#0dbd5c" />
        </linearGradient>
      </defs>
      {[30, 22, 14].map((y) => (
        <g key={y}>
          <ellipse cx="24" cy={y + 5} rx="16" ry="6.5" fill="#0a9e4b" />
          <ellipse cx="24" cy={y} rx="16" ry="6.5" fill={`url(#${id})`} stroke="rgba(3,19,12,.45)" strokeWidth="1.4" />
        </g>
      ))}
      <text x="24" y="15" textAnchor="middle" dominantBaseline="central" fontSize="8.5" fontWeight="900" fill="#03130c">
        Kč
      </text>
    </svg>
  );
}

function BanknotesArt({ size }: { size: number }) {
  const id = useGradientId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#12d465" />
          <stop offset="0.5" stopColor="#22f979" />
          <stop offset="1" stopColor="#0fb257" />
        </linearGradient>
      </defs>
      <rect x="7" y="12" width="34" height="18" rx="4" fill="#0a9e4b" transform="rotate(-8 24 21)" opacity="0.75" />
      <rect x="7" y="17" width="34" height="18" rx="4" fill={`url(#${id})`} />
      <rect x="10.5" y="20.5" width="27" height="11" rx="2.5" stroke="rgba(3,19,12,.42)" strokeWidth="1.4" />
      <circle cx="24" cy="26" r="5.4" fill="rgba(3,19,12,.16)" />
      <text x="24" y="26.6" textAnchor="middle" dominantBaseline="central" fontSize="6.6" fontWeight="900" fill="#03130c">
        500
      </text>
    </svg>
  );
}

function TrophyArt({ size }: { size: number }) {
  const id = useGradientId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#b9ffd6" />
          <stop offset="0.4" stopColor="#22f979" />
          <stop offset="1" stopColor="#0a9e4b" />
        </linearGradient>
      </defs>
      <path d="M14 8h20v10c0 6.5-4.4 11-10 12-5.6-1-10-5.5-10-12V8Z" fill={`url(#${id})`} />
      <path d="M14 10h-4a1 1 0 0 0-1 1v3c0 3.6 2.3 6.4 5.6 7.4M34 10h4a1 1 0 0 1 1 1v3c0 3.6-2.3 6.4-5.6 7.4" stroke="#0a9e4b" strokeWidth="2.6" strokeLinecap="round" />
      <rect x="21.5" y="29.5" width="5" height="6" rx="1.6" fill="#0a9e4b" />
      <rect x="15" y="35.5" width="18" height="5.5" rx="2.4" fill={`url(#${id})`} />
      <path d="m24 12.6 1.5 3 3.3.5-2.4 2.3.6 3.3-3-1.6-3 1.6.6-3.3-2.4-2.3 3.3-.5 1.5-3Z" fill="#03130c" />
    </svg>
  );
}

function SpinArt({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M37.5 20.5A14 14 0 1 0 39 27" stroke="#22f979" strokeWidth="4" strokeLinecap="round" />
      <path d="M39.5 12v9h-9" stroke="#22f979" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PrizeArt({ prizeId, size = 30 }: { prizeId: string; size?: number }) {
  switch (prizeId) {
    case "jackpot":
      return <TrophyArt size={size} />;
    case "kc500":
      return <BanknotesArt size={size} />;
    case "kc250":
      return <CoinStackArt size={size} />;
    case "kc100":
      return <CoinArt size={size} />;
    case "spin":
      return <SpinArt size={size} />;
    default:
      return <CoinArt size={size} />;
  }
}
