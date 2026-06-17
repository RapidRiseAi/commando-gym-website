import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        // Strictly monochrome brand: black + white + neutral greys.
        bg: "#070708",
        surface: "#0e0e11",
        "surface-2": "#15151a",
        muted: "#9aa0a6",
        border: "#26262b",
        "border-strong": "#3a3a42"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -28px rgba(0,0,0,0.85)",
        card: "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 22px 45px -28px rgba(0,0,0,0.9)",
        lift: "0 0 0 1px rgba(255,255,255,0.12), 0 30px 70px -30px rgba(0,0,0,0.95)"
      }
    }
  },
  plugins: []
};

export default config;
