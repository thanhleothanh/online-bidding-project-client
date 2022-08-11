module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/*.html'],
  theme: {
    extend: {
      maxHeight: {
        '8/10': '90%',
      },
      keyframes: {
        leftToRight: {
          from: { transform: 'translateX(-10%)', opacity: '0' },
          to: { transform: 'translateX(0%)', opacity: '1' },
        },
        bottomToTop: {
          from: { transform: 'translateY(-10%)', opacity: '0' },
          to: { transform: 'translateY(0%)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        leftToRight: 'leftToRight 0.5s ease-in-out',
        bottomToTop: 'bottomToTop 0.5s ease-in-out',
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
