import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
      colors: {
        // TMR Brand Colors (extracted from logo)
        'tmr-blue': '#0B1F3A', // Main dark blue from logo background
        'tmr-green': '#22C55E', // Green from circuit gradient
        'tmr-teal': '#14B8A6', // Teal accent
        'tmr-orange': '#FB923C', // Orange from gradient arc
        'tmr-yellow': '#FCD34D', // Yellow from gradient arc
        'tmr-white': '#FFFFFF', // Clean white for text
        // Legacy colors for compatibility
        'forest-green': '#0d1f14',
        'vibrant-mint': '#5ae0a0',
        'off-white': '#f5f2ed',
        primary: '#0B1F3A', // Updated to TMR blue
        accent: '#22C55E',  // Updated to TMR green
        highlight: '#FCD34D', // Updated to TMR yellow
        vibrant: '#FB923C', // Updated to TMR orange
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      textColor: {
        DEFAULT: "hsl(var(--foreground))",
      },
      backgroundColor: {
        DEFAULT: "hsl(var(--background))",
      },
      ringOffsetColor: {
        DEFAULT: "hsl(var(--background))",
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
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
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // TMR Animations
        'tmr-pulse-glow': {
          '0%, 100%': { 
            opacity: '1', 
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' 
          },
          '50%': { 
            opacity: '0.8', 
            boxShadow: '0 0 40px rgba(34, 197, 94, 0.6)' 
          },
        },
        'tmr-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'tmr-gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in': 'fade-in 0.5s ease-out forwards',
        // TMR Animation utilities
        'tmr-pulse-glow': 'tmr-pulse-glow 3s ease-in-out infinite',
        'tmr-float': 'tmr-float 4s ease-in-out infinite',
        'tmr-gradient-shift': 'tmr-gradient-shift 8s ease infinite',
      },
      // TMR Design System
      backgroundImage: {
        'tmr-gradient': 'linear-gradient(90deg, #22C55E, #3B82F6, #FB923C)',
        'tmr-gradient-subtle': 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))',
        'tmr-circuit': 'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
      },
      backdropBlur: {
        'tmr': '12px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config 