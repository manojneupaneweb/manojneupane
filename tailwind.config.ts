import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B1120",
        bg2: "#111827",
        surface: "#111827",
        surface2: "#1E293B",
        card: "#1E293B",
        primary: "#F8FAFC",
        muted: "#94A3B8",
        accent: "#3B82F6",
        accent2: "#22D3EE",
        highlight: "#22D3EE",
        success: "#34D399",
        error: "#F87171",
        border: "#334155",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"San Francisco"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"San Francisco"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          '"SFMono-Regular"',
          "ui-monospace",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #3B82F6, #22D3EE, #34D399)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "gradient-border": "gradient-border 4s ease infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-border": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
