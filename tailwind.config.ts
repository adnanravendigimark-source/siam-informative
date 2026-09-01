import type { Config } from "tailwindcss";

// Brand: "Volcanic Sunset" — a warm terracotta/coral + deep indigo-night
// palette inspired by Tenerife's volcanic coastline at dusk, deliberately
// distinct from any lagoon-turquoise or Thai-gold palette. Colors are
// expressed as space-separated RGB triplets consumed via
// rgb(var(--color-x) / <alpha-value>) so opacity utilities work.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "rgb(var(--color-cream-50) / <alpha-value>)",
          100: "rgb(var(--color-cream-100) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          light: "rgb(var(--color-ink-light) / <alpha-value>)",
        },
        coral: {
          DEFAULT: "rgb(var(--color-coral) / <alpha-value>)",
          dark: "rgb(var(--color-coral-dark) / <alpha-value>)",
          light: "rgb(var(--color-coral-light) / <alpha-value>)",
        },
        indigo: {
          DEFAULT: "rgb(var(--color-indigo) / <alpha-value>)",
          light: "rgb(var(--color-indigo-light) / <alpha-value>)",
        },
        sand: {
          DEFAULT: "rgb(var(--color-sand) / <alpha-value>)",
          dark: "rgb(var(--color-sand-dark) / <alpha-value>)",
        },
      },
      fontFamily: {
        // System font stacks on purpose — zero network requests, zero
        // font-swap layout shift, instant paint. Serif display face for
        // an editorial/guidebook feel, sans body face for readability.
        display: [
          "Iowan Old Style",
          "Palatino Linotype",
          "URW Palladio L",
          "P052",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "ui-sans-serif",
          "sans-serif",
        ],
      },
      maxWidth: {
        prose: "42rem",
        content: "72rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(30, 20, 12, 0.04), 0 8px 24px -8px rgba(30, 20, 12, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
