const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...defaultTheme.colors,
      gray: colors.blueGray,
    },
    extend: {
      colors: {
        accent: {
          light: '#FFB571',
          DEFAULT: '#FF9A3D',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
