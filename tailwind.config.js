/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        ...fontFamily,
        sans: [...fontFamily.sans],
        playful: ['Dosis', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
