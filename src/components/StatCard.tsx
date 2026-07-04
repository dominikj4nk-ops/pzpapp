import { ReactNode } from "react";
import { GlassCard } from "./ui";

export default function StatCard({ label, value, children }: { label: string; value: string; children?: ReactNode }) {
  return (
    <GlassCard className="p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
      {children ? <div className="mt-3">{children}</div> : null}
    </GlassCard>
  );
}
