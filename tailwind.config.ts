import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

//const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    boxShadow: {
      '3xl': '0 0px 5px 1px rgba(0, 0, 0, 0.15)',
    },
    extend:
    {
      backgroundImage: {
        "search-background": "url('/assets/images/search.jpg')",
        "admin-login-background" : "url('/assets/images/admin-login.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'title': '#062160'
      },
      width: {
        '100': '25rem'
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwindcss-animated')
  ],
};
export default config;
