module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: "#fabb00"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
