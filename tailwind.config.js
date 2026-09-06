// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e6edf5',
          100: '#b3c5e0',
          200: '#809dcc',
          300: '#4d74b7',
          400: '#1a4ca2',
          500: '#0B1F3A',
          600: '#091930',
          700: '#071326',
          800: '#050c1b',
          900: '#03060f',
        },
        gold: {
          50: '#fdf8e8',
          100: '#f9ecc3',
          200: '#f5e09e',
          300: '#f1d479',
          400: '#edc854',
          500: '#C9A227',
          600: '#a1821f',
          700: '#796117',
          800: '#504110',
          900: '#282008',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        glow: { '0%': { boxShadow: '0 0 5px #C9A227' }, '100%': { boxShadow: '0 0 20px #C9A227, 0 0 30px #C9A227' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(201, 162, 39, 0.3)',
        'glow-lg': '0 0 30px rgba(201, 162, 39, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(201, 162, 39, 0.1)',
      },
    },
  },
  plugins: [],
}
