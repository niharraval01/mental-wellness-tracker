/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#0D0F1A',
          light: '#151829',
          card: '#1A1D2E',
          border: '#252840',
        },
        violet: {
          DEFAULT: '#7C5CFC',
          light: '#9B7FFF',
          glow: 'rgba(124, 92, 252, 0.15)',
        },
        coral: {
          DEFAULT: '#FF6B6B',
          light: '#FF8A8A',
          glow: 'rgba(255, 107, 107, 0.15)',
        },
        mint: {
          DEFAULT: '#00D9A3',
          light: '#33E5B8',
          glow: 'rgba(0, 217, 163, 0.15)',
        },
        text: {
          primary: '#F0EFF8',
          muted: '#8B8FA8',
          dim: '#5A5E75',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'orb-pulse': 'orbPulse 4s ease-in-out infinite',
        'orb-fast': 'orbPulse 1.5s ease-in-out infinite',
        'orb-slow': 'orbPulse 6s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'flame': 'flame 0.5s ease-in-out infinite alternate',
        'breathe-box': 'breatheBox 16s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        orbPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flame: {
          '0%': { transform: 'scaleY(1) scaleX(1)' },
          '100%': { transform: 'scaleY(1.1) scaleX(0.95)' },
        },
        breatheBox: {
          '0%': { transform: 'scale(0.6)', opacity: '0.5' },
          '25%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1)', opacity: '1' },
          '75%': { transform: 'scale(0.6)', opacity: '0.5' },
          '100%': { transform: 'scale(0.6)', opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
