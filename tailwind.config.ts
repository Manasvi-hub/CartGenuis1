import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        star: "hsl(var(--star))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        "glass-border": "hsl(var(--glass-border))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "aurora-drift-1": {
          "0%, 100%": { transform: "translate(var(--mx,0px), var(--my,0px)) scale(1)" },
          "33%": { transform: "translate(calc(var(--mx,0px) + 60px), calc(var(--my,0px) - 40px)) scale(1.1)" },
          "66%": { transform: "translate(calc(var(--mx,0px) - 30px), calc(var(--my,0px) + 50px)) scale(0.95)" },
        },
        "aurora-drift-2": {
          "0%, 100%": { transform: "translate(calc(var(--mx,0px) * -0.7), calc(var(--my,0px) * -0.7)) scale(1)" },
          "50%": { transform: "translate(calc(var(--mx,0px) * -0.7 - 50px), calc(var(--my,0px) * -0.7 + 60px)) scale(1.15)" },
        },
        "aurora-drift-3": {
          "0%, 100%": { transform: "translate(calc(var(--mx,0px) * 0.5), calc(var(--my,0px) * 0.5)) scale(1)" },
          "40%": { transform: "translate(calc(var(--mx,0px) * 0.5 + 40px), calc(var(--my,0px) * 0.5 - 30px)) scale(1.08)" },
          "80%": { transform: "translate(calc(var(--mx,0px) * 0.5 - 50px), calc(var(--my,0px) * 0.5 + 40px)) scale(0.92)" },
        },
        "shimmer-slow": {
          "0%": { backgroundPosition: "-300% 0" },
          "100%": { backgroundPosition: "300% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
