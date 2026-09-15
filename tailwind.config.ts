import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        guide: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        navy: {
          DEFAULT: "#0f2b48",
          dark: "#081b2e",
          deep: "#0c233c",
          light: "#1e3a5f",
          card: "#112a46",
        },
        ocean: {
          DEFAULT: "#0284c7",
          dark: "#0369a1",
          light: "#f0f9ff",
          border: "#bae6fd",
          cyan: "#06b6d4",
          teal: "#0d9488",
        },
        lagoon: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        accent: {
          DEFAULT: "#0284c7",
          hover: "#0369a1",
          gold: "#d97706",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        body: ["var(--font-body)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        prose: "48rem",
        content: "76rem",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        card: "0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 12px 24px -6px rgba(15, 43, 72, 0.12), 0 6px 12px -4px rgba(15, 43, 72, 0.08)",
        lift: "0 8px 16px -4px rgba(15, 43, 72, 0.08), 0 4px 8px -2px rgba(15, 43, 72, 0.04)",
        glow: "0 0 25px -5px rgba(6, 182, 212, 0.25)",
        "glow-gold": "0 0 25px -5px rgba(245, 158, 11, 0.25)",
        luxury: "0 20px 35px -10px rgba(8, 27, 46, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;

