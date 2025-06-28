module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '1_5em': '1.5em',
      },
      colors: {
        'brand-start': '#f472b6',
        'brand-mid': '#a855f7',
        'brand-end': '#fb923c',
        'magenta-custom': '#e54cc9',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(to right, #f472b6, #a855f7, #fb923c)',
      },
      keyframes: {
        'color-cycle': {
          '0%, 100%': { color: '#f472b6' },
          '33%': { color: '#a855f7' },
          '66%': { color: '#fb923c' },
        },
      },
      animation: {
        'color-pulse': 'color-cycle 2s infinite',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['selection'],
      textColor: ['selection'],
    },
  },
  safelist: [
    'border-l-white',
    'border-l-slate-900',
    'border-r-white',
    'border-r-slate-900',
  ],

  plugins: [],
}
