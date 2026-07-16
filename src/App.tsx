import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import ScrollToTop from "./components/ScrollToTop";
import RouteSeo from "./components/RouteSeo";
import CashbackPage from "./pages/CashbackPage";
import ExchangeDetailPage from "./pages/ExchangeDetailPage";
import ExchangesPage from "./pages/ExchangesPage";
import HelpPage from "./pages/HelpPage";
import HomePage from "./pages/HomePage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfitPage from "./pages/ProfitPage";
import MethodologyPage from "./pages/MethodologyPage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import TermsPage from "./pages/TermsPage";
import WheelPage from "./pages/WheelPage";
import { paths } from "./routes/paths";

export default function App() {
  return (
    <>
      <RouteSeo />
      <Routes>
        <Route path={paths.reviews} element={<Navigate to={paths.methodology} replace />} />
        <Route path="*" element={<AppLayout />} />
      </Routes>
    </>
  );
}

function AppLayout() {
  return (
    <AppShell>
      <ScrollToTop />
      <Routes>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.exchanges} element={<ExchangesPage />} />
        <Route path="/nabidky/:id" element={<ExchangeDetailPage />} />
        <Route path="/pozvat" element={<Navigate to={paths.exchanges} replace />} />
        <Route path={paths.cashback} element={<CashbackPage />} />
        <Route path={paths.search} element={<SearchPage />} />
        <Route path={paths.notifications} element={<NotificationsPage />} />
        <Route path={paths.wheel} element={<WheelPage />} />
        <Route path={paths.profit} element={<ProfitPage />} />
        <Route path={paths.settings} element={<SettingsPage />} />
        <Route path={paths.help} element={<HelpPage />} />
        <Route path={paths.methodology} element={<MethodologyPage />} />
        <Route path={paths.terms} element={<TermsPage />} />
        <Route path="/burzy" element={<Navigate to={paths.exchanges} replace />} />
        <Route path="/burzy/:id" element={<ExchangeDetailPage />} />
        <Route path="/exchanges" element={<Navigate to={paths.exchanges} replace />} />
        <Route path="/exchanges/:id" element={<ExchangeDetailPage />} />
        <Route path="/crypto" element={<Navigate to={paths.home} replace />} />
        <Route path="/kryptomeny" element={<Navigate to={paths.home} replace />} />
        <Route path="/vyhry" element={<Navigate to={paths.exchanges} replace />} />
        <Route path="/rewards" element={<Navigate to={paths.exchanges} replace />} />
        <Route path="/search" element={<Navigate to={paths.search} replace />} />
        <Route path="/notifications" element={<Navigate to={paths.notifications} replace />} />
        <Route path="/profit" element={<Navigate to={paths.profit} replace />} />
        <Route path="/moje-bonusy" element={<Navigate to={paths.home} replace />} />
        <Route path="/profil" element={<Navigate to={paths.home} replace />} />
        <Route path="/profile" element={<Navigate to={paths.home} replace />} />
        <Route path="/my-bonuses" element={<Navigate to={paths.home} replace />} />
        <Route path="/settings" element={<Navigate to={paths.settings} replace />} />
        <Route path="/help" element={<Navigate to={paths.help} replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}
