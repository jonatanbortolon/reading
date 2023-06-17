/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#F37920",
        "secondary": "#0098A6",
        "light-gray-100": "#DBDEDF",
        "light-gray-300": "#A7ADB2",
        "dark-gray-500": "#6E7880",
        "dark-gray-700": "#495055",
      },
      fontFamily: {
        lato: ["var(--font-lato)"],
        "open-sans": ["var(--font-open-sans)"],
      },
      aspectRatio: {
        "book-cover": "10/15"
      }
    },
  },
  plugins: [],
}
