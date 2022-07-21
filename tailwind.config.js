module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/*.html'],
  theme: {
    extend: {
      maxHeight: {
        '8/10': '90%',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
