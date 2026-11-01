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
        bg:        "#080D1A",
        bg2:       "#0D1426",
        surface:   "#0F1729",
        surface2:  "#141E35",
        card:      "#111827",
        primary:   "#F1F5F9",
        muted:     "#94A3B8",
        accent:    "#22D3EE",
        accent2:   "#3B82F6",
        highlight: "#A855F7",
        success:   "#34D399",
        error:     "#F87171",
        border:    "rgba(34,211,238,0.12)",
        border2:   "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", '"Helvetica Neue"', "sans-serif"],
        display: ["Inter", "-apple-system", "BlinkMacSystemFont", '"Helvetica Neue"', "sans-serif"],
        mono: ['"JetBrains Mono"', '"SF Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      backgroundImage: {
        "gradient-accent":  "linear-gradient(135deg, #22D3EE, #3B82F6)",
        "gradient-purple":  "linear-gradient(135deg, #3B82F6, #A855F7)",
        "gradient-hero":    "linear-gradient(135deg, #22D3EE 0%, #3B82F6 50%, #A855F7 100%)",
        "gradient-card":    "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
      },
      animation: {
        "fade-in-up":     "fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in-left":   "fadeInLeft 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":        "fadeIn 0.7s ease-out forwards",
        "gradient-shift": "gradientShift 6s ease infinite",
        "float":          "float 6s ease-in-out infinite",
        "pulse-glow":     "pulseGlow 2s ease-in-out infinite",
        "spin-slow":      "spin 8s linear infinite",
        "blink":          "blink 1s step-start infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%":   { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":       { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":       { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 8px #34D399" },
          "50%":       { opacity: "0.6", boxShadow: "0 0 16px #34D399" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
      },
      boxShadow: {
        "glow-cyan":   "0 0 40px rgba(34,211,238,0.2), 0 0 80px rgba(34,211,238,0.08)",
        "glow-blue":   "0 0 40px rgba(59,130,246,0.2), 0 0 80px rgba(59,130,246,0.08)",
        "glow-sm":     "0 0 20px rgba(34,211,238,0.15)",
        "card-dark":   "0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
