import { useEffect, useState } from "react";

const codeKey = "pzp:referral-code";
const claimsKey = "pzp:referral-claims";
export const referralStateEvent = "pzp:referral-state";

export type ReferralClaim = {
  id: string;
  offer: string;
  completedAt: string;
  name: string;
  account: string;
  fileName: string;
  createdAt: string;
  status: "V kontrole" | "Vyplaceno";
};

export function getReferralCode() {
  try {
    const existing = window.localStorage.getItem(codeKey);
    if (existing) return existing;
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    window.localStorage.setItem(codeKey, code);
    return code;
  } catch {
    return "POZVANKA";
  }
}

export function getReferralLink() {
  return `${window.location.origin}${import.meta.env.BASE_URL}?ref=${getReferralCode()}`;
}

function readClaims(): ReferralClaim[] {
  try {
    const value = window.localStorage.getItem(claimsKey);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter((claim): claim is ReferralClaim => Boolean(claim && typeof claim.id === "string")) : [];
  } catch {
    return [];
  }
}

export function addReferralClaim(claim: Omit<ReferralClaim, "id" | "createdAt" | "status">) {
  const record: ReferralClaim = {
    ...claim,
    id: `claim-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "V kontrole"
  };
  window.localStorage.setItem(claimsKey, JSON.stringify([record, ...readClaims()]));
  window.dispatchEvent(new Event(referralStateEvent));
  return record;
}

export function useReferralClaims() {
  const [claims, setClaims] = useState(readClaims);

  useEffect(() => {
    const sync = () => setClaims(readClaims());

    window.addEventListener(referralStateEvent, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(referralStateEvent, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return claims;
}
