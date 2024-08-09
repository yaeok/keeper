import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#63B3ED',
          dark: '#3182CE',
        },
        primaryBlue: {
          100: '#D9E6FE',
          300: '#9DB7F9',
          500: '#4979F5',
          700: '#264AF4',
          900: '#0017C1',
        },
      },
    },
  },
  plugins: [],
}
export default config
