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
      boxShadow: {
        default: '0 0px 14px -4px rgba(0,0,0,0.3)',
        zk: '0px 0px 8px rgba(0, 0, 0, 0.2)',
      },
      colors: {
        primary: {
          yellow: "#fabb00",
          gray: '#c4c4c4',
          darkBlue1: '#1B262C',
          darkBlue: '#0F4C75',
          blue: '#3282B8',
          lightBlue: '#BBE1FA'
        },
        secondary: {
          yellow: '#FFE1A4',
          gray: "#FFFFFF",
          green: '#1ed01e',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
