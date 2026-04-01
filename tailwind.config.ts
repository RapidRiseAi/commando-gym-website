import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#090909",
        surface: "#121212",
        muted: "#9ca3af",
        border: "#2a2a2a"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 8px 30px rgba(0,0,0,0.45)"
      }
    }
  },
  plugins: []
};

export default config;
