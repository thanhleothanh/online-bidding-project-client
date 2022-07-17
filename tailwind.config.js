module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/*.html'],
  theme: {
    extend: {
      maxHeight: {
        '7/10': '70%',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
