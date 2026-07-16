import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { GlassCard, NeonButton } from "../components/ui";
import { paths } from "../routes/paths";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header title="Stránka nenalezena" back heading={false} />
      <div className="mx-auto max-w-[720px]">
        <GlassCard className="p-6 text-center">
          <AlertTriangle className="mx-auto text-amber-300" size={28} />
          <h1 className="mt-3 text-xl font-black">Tahle stránka neexistuje</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">Odkaz mohl být změněn nebo odstraněn.</p>
          <NeonButton onClick={() => navigate(paths.exchanges)} className="mt-5">Zobrazit aktuální nabídky</NeonButton>
        </GlassCard>
      </div>
    </>
  );
}
