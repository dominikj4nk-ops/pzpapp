import { RefreshCw } from "lucide-react";
import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  onReset?: () => void;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // ponecháno v konzoli pro diagnostiku, uživatel místo blank screenu vidí záchrannou kartu
    console.error("Chyba při vykreslení stránky:", error);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="glass mx-auto mt-6 max-w-md p-6 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/[.06] text-neon">
          <RefreshCw size={22} />
        </span>
        <h2 className="mt-3 text-lg font-black">Něco se pokazilo</h2>
        <p className="mx-auto mt-1 max-w-[300px] text-sm leading-6 text-slate-400">
          Stránku se nepodařilo zobrazit. Zkus to prosím znovu.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={this.handleReset}
            className="neon-button h-11 rounded-[16px] px-4 text-sm font-black text-[#02130c] active:scale-95"
          >
            Zkusit znovu
          </button>
          <button
            onClick={() => window.location.reload()}
            className="glass-button h-11 rounded-[16px] px-4 text-sm font-bold text-white active:scale-95"
          >
            Načíst aplikaci znovu
          </button>
        </div>
      </div>
    );
  }
}
