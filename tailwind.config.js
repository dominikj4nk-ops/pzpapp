/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#0f172a",
        panel: "#ffffff",
        // Hlavní akcent webu – skutečná barva je v CSS proměnné --accent (src/styles.css, :root).
        // Název "neon" zůstal kvůli stávajícím třídám text-neon, bg-neon…
        neon: "rgb(var(--accent) / <alpha-value>)",
        "neon-strong": "rgb(var(--accent-strong) / <alpha-value>)",
        "neon-soft": "rgb(var(--accent-soft) / <alpha-value>)",
        "on-accent": "#ffffff",
        cyanGlow: "#60a5fa"
      },
      boxShadow: {
        glow: "0 6px 14px rgb(var(--accent) / 0.18)",
        card: "0 1px 2px rgba(15, 23, 42, 0.04)"
      }
    }
  },
  plugins: []
};
