// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        spacing: {
        '1_5em': '1.5em',
      },
    },
  },
   safelist: [
    'border-l-teal-400/10',
    'border-l-slate-900',
    // Add other border-l and border-r classes here if needed
    'border-r-teal-400/10',
    'border-r-slate-900',
  ],
  plugins: [],
}

