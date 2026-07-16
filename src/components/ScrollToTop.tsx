import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Při každé změně routy odscrolluje na začátek stránky – detail nabídky se tak vždy otevře odshora. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.getElementById("app-scroll-root")?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
