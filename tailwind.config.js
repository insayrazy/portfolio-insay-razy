/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Theme-aware palette: values live in src/styles/base.css. `white` is the
        // foreground colour (dark in light mode); use `pure` for always-white text.
        white: 'rgb(var(--c-white) / <alpha-value>)',
        pure: '#FFFFFF',
        night: {
          DEFAULT: 'rgb(var(--c-night) / <alpha-value>)',
          950: 'rgb(var(--c-night-950) / <alpha-value>)',
          900: 'rgb(var(--c-night) / <alpha-value>)',
          800: 'rgb(var(--c-night-800) / <alpha-value>)',
          700: 'rgb(var(--c-night-700) / <alpha-value>)',
          600: 'rgb(var(--c-night-600) / <alpha-value>)',
        },
        slate: {
          200: 'rgb(var(--c-slate-200) / <alpha-value>)',
          300: 'rgb(var(--c-slate-300) / <alpha-value>)',
          400: 'rgb(var(--c-slate-400) / <alpha-value>)',
          500: 'rgb(var(--c-slate-500) / <alpha-value>)',
        },
        cyan: { 200: 'rgb(var(--c-cyan-200) / <alpha-value>)', 300: 'rgb(var(--c-cyan-300) / <alpha-value>)' },
        emerald: { 200: 'rgb(var(--c-emerald-200) / <alpha-value>)', 300: 'rgb(var(--c-emerald-300) / <alpha-value>)' },
        amber: { 100: 'rgb(var(--c-amber-100) / <alpha-value>)', 200: 'rgb(var(--c-amber-200) / <alpha-value>)', 300: 'rgb(var(--c-amber-300) / <alpha-value>)' },
        orange: { 200: 'rgb(var(--c-orange-200) / <alpha-value>)' },
        rose: { 300: 'rgb(var(--c-rose-300) / <alpha-value>)' },
        violet: { 300: 'rgb(var(--c-violet-300) / <alpha-value>)' },
        primary: {
          DEFAULT: '#6366F1',
          blue: '#3B82F6',
          indigo: '#6366F1',
          violet: '#8B5CF6',
          purple: '#A855F7',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#22D3EE',
          cyan: '#06B6D4',
          light: '#22D3EE',
          foreground: '#050816',
        },
        // shadcn/ui semantic tokens
        border: 'rgb(var(--c-white) / 0.08)',
        input: 'rgb(var(--c-white) / 0.1)',
        ring: '#818CF8',
        background: 'rgb(var(--c-night))',
        foreground: 'rgb(var(--c-white))',
        muted: {
          DEFAULT: '#111827',
          foreground: '#A5B4CF',
        },
        card: {
          DEFAULT: 'rgb(var(--c-night-700) / 0.6)',
          foreground: 'rgb(var(--c-white))',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Space Grotesk Variable"', '"Space Grotesk"', '"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.85' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3B82F6 0%, #6366F1 35%, #8B5CF6 65%, #A855F7 100%)',
        'gradient-accent': 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%)',
        'gradient-text': 'linear-gradient(90deg, #22D3EE 0%, #3B82F6 25%, #8B5CF6 50%, #A855F7 75%, #22D3EE 100%)',
        'grid-lines':
          'linear-gradient(to right, rgb(var(--c-white) / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--c-white) / 0.04) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgb(99 102 241 / 0.55)',
        'glow-lg': '0 0 80px -12px rgb(139 92 246 / 0.6)',
        'glow-cyan': '0 0 40px -8px rgb(34 211 238 / 0.55)',
        glass: '0 8px 32px 0 rgb(15 23 42 / var(--glass-shadow)), inset 0 1px 0 0 rgb(255 255 255 / 0.06)',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate3d(8%, -6%, 0) scale(1.15) rotate(25deg)' },
          '66%': { transform: 'translate3d(-6%, 8%, 0) scale(0.92) rotate(-15deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -28px, 0) rotate(12deg)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        beam: {
          '0%, 100%': { opacity: '0.15', transform: 'translateX(-10%) rotate(var(--beam-rotate, 18deg))' },
          '50%': { opacity: '0.5', transform: 'translateX(10%) rotate(var(--beam-rotate, 18deg))' },
        },
        'scroll-wheel': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '70%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        shimmer: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(100%)' },
        },
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
      animation: {
        aurora: 'aurora 22s ease-in-out infinite',
        'aurora-slow': 'aurora 32s ease-in-out infinite reverse',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 1.5s infinite',
        'float-slow': 'float-slow 14s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        beam: 'beam 9s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
        'spin-reverse': 'spin 24s linear infinite reverse',
        'scroll-wheel': 'scroll-wheel 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        blink: 'blink 1s step-end infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        'accordion-up': 'accordion-up 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
}
