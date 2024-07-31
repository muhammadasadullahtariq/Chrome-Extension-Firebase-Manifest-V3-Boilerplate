/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1b5696",
        cultured: "#F6F6F6",
      },
      borderColor: {
        primary: "#1b5696",
        cultured: "#F6F6F6",
      },
    },
  },
  plugins: [],
};
