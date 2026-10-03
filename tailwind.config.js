/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tense: {
          bg: '#0C0D0E',
          surface: '#141618',
          card: '#1A1D20',
          border: '#272B30',
          muted: '#8E95A0',
          accent: '#C5A880', // Champagne timber gold
          accentHover: '#D4BC96',
          walnut: '#4B3621',
          oak: '#C29B73',
          steel: '#38BDF8',
          titanium: '#94A3B8',
          lightBg: '#F9F8F5',
          lightSurface: '#FFFFFF',
          lightCard: '#F2EFE9',
          lightBorder: '#E2DED6',
          lightText: '#181816',
          lightMuted: '#6B6861',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      letterSpacing: {
        widestPlus: '0.25em',
        ultra: '0.35em',
      },
      animation: {
        'float-slow': 'floating 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'tension-glow': 'tensionGlow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(0.4deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        tensionGlow: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 14px rgba(56, 189, 248, 0.85))' },
        }
      }
    },
  },
  plugins: [],
}
