/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        nunito: ['Nunito', 'system-ui', 'sans-serif'],
        orbitron: ['Orbitron', 'monospace'],
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
        sora: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Outfit', 'Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'oklch(var(--card) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        // Custom palette
        'gold-primary': 'oklch(0.72 0.12 85 / <alpha-value>)',
        'gold-secondary': 'oklch(0.80 0.10 90 / <alpha-value>)',
        'forest-dark': 'oklch(0.12 0.025 145 / <alpha-value>)',
        'forest-medium': 'oklch(0.22 0.06 145 / <alpha-value>)',
        'forest-light': 'oklch(0.35 0.08 145 / <alpha-value>)',
        gold: 'oklch(0.72 0.12 85 / <alpha-value>)',
        'gold-bright': 'oklch(0.85 0.14 90 / <alpha-value>)',
        cream: 'oklch(0.95 0.02 80 / <alpha-value>)',
        'forest': 'oklch(0.22 0.06 145 / <alpha-value>)',
        'cream-light': 'oklch(0.95 0.02 80 / <alpha-value>)',
        'violet-neon': 'oklch(0.65 0.22 290 / <alpha-value>)',
        ember: 'oklch(0.65 0.20 35 / <alpha-value>)',
        midnight: 'oklch(0.10 0.02 240 / <alpha-value>)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'glow-gold': '0 0 20px oklch(0.72 0.12 85 / 0.4), 0 0 40px oklch(0.72 0.12 85 / 0.2)',
        'glow-green': '0 0 20px oklch(0.65 0.18 145 / 0.4), 0 0 40px oklch(0.65 0.18 145 / 0.2)',
        'glow-violet': '0 0 20px oklch(0.65 0.22 290 / 0.4), 0 0 40px oklch(0.65 0.22 290 / 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'shimeji-walk': 'shimeji-walk 0.4s ease-in-out infinite',
        'shimeji-idle': 'shimeji-idle 3s ease-in-out infinite',
        'shimeji-jump': 'shimeji-jump 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shimeji-celebrate': 'shimeji-celebrate 0.6s ease-in-out infinite',
        'shimeji-talk': 'shimeji-talk 0.5s ease-in-out infinite',
        'shimeji-sit': 'shimeji-sit 2s ease-in-out infinite',
        'bubble-appear': 'bubble-appear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'float': 'float 3s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'shimmer': 'shimmer 2s infinite',
        'scan-line': 'scan-line 2s linear infinite',
        'scan-ring': 'scan-ring 1.5s ease-out infinite',
        'naruto': 'naruto-idle 2s ease-in-out infinite',
        'sasuke': 'sasuke-idle 2.5s ease-in-out infinite',
        'luffy': 'luffy-idle 1.8s ease-in-out infinite',
        'zoro': 'zoro-idle 2.2s ease-in-out infinite',
        'ichigo': 'ichigo-idle 2s ease-in-out infinite',
        'rukia': 'rukia-idle 2.3s ease-in-out infinite',
        'goku': 'goku-idle 1.5s ease-in-out infinite',
        'vegeta': 'vegeta-idle 2.4s ease-in-out infinite',
        'medal-gold': 'medal-gold-glow 2s ease-in-out infinite',
        'medal-silver': 'medal-silver-glow 2s ease-in-out infinite',
        'medal-bronze': 'medal-bronze-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'slide-up': {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { transform: 'scale(0.8)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'scan-line': {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        'scan-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        'naruto-idle': {
          '0%, 100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1deg)' },
        },
        'sasuke-idle': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-4px) scale(1.02)' },
        },
        'luffy-idle': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) rotate(3deg)' },
          '75%': { transform: 'translateY(-4px) rotate(-2deg)' },
        },
        'zoro-idle': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        'ichigo-idle': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-6px) scale(1.01)' },
        },
        'rukia-idle': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-7px) rotate(1deg)' },
        },
        'goku-idle': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '33%': { transform: 'translateY(-10px) scale(1.03)' },
          '66%': { transform: 'translateY(-5px) scale(1.01)' },
        },
        'vegeta-idle': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        'medal-gold-glow': {
          '0%, 100%': { boxShadow: '0 0 10px oklch(0.72 0.12 85 / 0.6)' },
          '50%': { boxShadow: '0 0 25px oklch(0.72 0.12 85 / 0.9), 0 0 50px oklch(0.72 0.12 85 / 0.4)' },
        },
        'medal-silver-glow': {
          '0%, 100%': { boxShadow: '0 0 10px oklch(0.75 0.01 0 / 0.5)' },
          '50%': { boxShadow: '0 0 20px oklch(0.75 0.01 0 / 0.8)' },
        },
        'medal-bronze-glow': {
          '0%, 100%': { boxShadow: '0 0 10px oklch(0.60 0.10 50 / 0.5)' },
          '50%': { boxShadow: '0 0 20px oklch(0.60 0.10 50 / 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};
