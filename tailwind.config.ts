import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        title: ["var(--font-josefin-sans)"],
      },
      // colors: {
      //   primary: 'var(--color-primary)',
      //   secondary: 'var(--color-secondary)',
      //   "primary-light": 'var(--color-primary-light)',
      //   "primary-dark": 'var(--color-primary-dark)',
      // },
      colors: {
        primary: colors.cyan['400'],
        secondary: colors.fuchsia['400'],
        "primary-light": colors.zinc['50'],
        "primary-dark": colors.zinc['900'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
