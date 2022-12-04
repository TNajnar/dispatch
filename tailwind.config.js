module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        base: '1rem', // 16px,
        h4: '1.125rem', // 18px
        h3: '1.25rem', // 20px
        h2: '1.5rem', // 24px [missing mobile 22px]
        h1: '1.875rem', // 30px [missing mobile 28px]
      },
      colors: {
        primary: {
          yellow: "#fabb00",
          gray: "#FFFFFF"
        },
        secondary: {
          yellow: '#FFE1A4'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
