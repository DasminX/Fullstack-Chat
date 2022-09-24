/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      0: "0",
      "1/12": "8.333333%",
      "1/4": "25%",
      "1/3": "33.333%",
      "1/2": "50%",
      "3/4": "75%",
      "5/6": "83.333333%",
    },
    maxWidth: {
      0: "0",
      "1/12": "8.333333%",
      "1/4": "25%",
      "1/3": "33.333%",
      "1/2": "50%",
      "3/4": "75%",
      "5/6": "83.333333%",
    },
    border: {
      1: "1px",
    },
  },
  plugins: [],
};
