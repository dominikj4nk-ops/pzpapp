/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#030b12",
        panel: "rgba(8, 22, 34, 0.78)",
        neon: "#18f26a",
        cyanGlow: "#21d4fd"
      },
      boxShadow: {
        glow: "0 8px 18px rgba(0, 0, 0, 0.24)",
        card: "0 18px 50px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};
